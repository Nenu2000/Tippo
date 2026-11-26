#![cfg_attr(all(windows, not(debug_assertions)), windows_subsystem = "windows")]

mod design;
mod export;
mod model;

use design::*;
use eframe::egui::{self, Align, Color32, FontFamily, FontId, Id, Layout, Rect, RichText, ScrollArea, Stroke, Ui};
use model::*;
use std::{
    fs, io::Write, path::Path,
    time::{Duration, Instant, SystemTime, UNIX_EPOCH},
};

const STORAGE_KEY: &str = "tippo-v1";
const KEY_ROWS: [&str; 4] = ["^1234567890ß´", "qwertzuiopü+", "asdfghjklöä#", "<yxcvbnm,.-"];
const FINGERS: [(&str, &str, [u8; 3]); 9] = [
    ("^1qa<y", "Linker kleiner Finger", [83, 49, 39]), ("2wsx", "Linker Ringfinger", [84, 67, 38]),
    ("3edc", "Linker Mittelfinger", [61, 81, 46]), ("45rtfgvb", "Linker Zeigefinger", [40, 83, 74]),
    ("67zuhjnm", "Rechter Zeigefinger", [43, 69, 93]), ("8ik,", "Rechter Mittelfinger", [58, 57, 94]),
    ("9ol.", "Rechter Ringfinger", [73, 50, 91]), ("0ß´pü+öä#-", "Rechter kleiner Finger", [92, 50, 77]),
    (" ", "Daumen", [52, 52, 64]),
];

#[derive(Clone, Copy, PartialEq)]
enum Page { Home, Progress, Game, Run, Result, Update }

#[derive(Clone, Copy, Debug, PartialEq)]
enum Dialog { Texts, Add, Test, Stop, Settings, Saved, Analysis, Report, Certificate }

struct Countdown { at: Instant, mode: Mode, minutes: u32, length: usize }

struct Tippo {
    data: Data,
    lessons: Vec<Lesson>,
    page: Page,
    dialog: Option<Dialog>,
    anchor: Option<Rect>,
    filter: String,
    draft_title: String,
    draft_text: String,
    draft_name: String,
    draft_class: String,
    minutes: u32,
    length: usize,
    run: Option<Run>,
    report: Option<Record>,
    remaining: Option<Countdown>,
    game: Option<Game>,
    game_end: Option<Instant>,
    game_status: String,
    focus: bool,
    notice: Option<UpdateNotice>,
    toast: Option<(String, Instant)>,
}

impl Tippo {
    fn new(ctx: &egui::Context, data: Data, notice: Option<UpdateNotice>) -> Self {
        configure(ctx);
        let page = if data.settings.auto_update && notice.is_some() { Page::Update } else { Page::Home };
        let mut app = Self {
            data, lessons: lessons(), page, dialog: None, anchor: None, filter: "Alle".into(),
            draft_title: String::new(), draft_text: String::new(), draft_name: String::new(),
            draft_class: String::new(), minutes: 10, length: 0, run: None, report: None, remaining: None,
            game: None, game_end: None, game_status: "Ein fertiges Wort wird automatisch verschickt.".into(),
            focus: false, notice, toast: None,
        };
        app.read_text_folder();
        if !app.available_lessons().any(|lesson| lesson.title == app.data.selected) {
            app.data.selected = app.lessons[0].title.clone();
        }
        app
    }

    fn available_lessons(&self) -> impl Iterator<Item = &Lesson> { self.lessons.iter().chain(&self.data.personal) }

    fn current(&self) -> Lesson {
        self.available_lessons().find(|lesson| lesson.title == self.data.selected).unwrap_or(&self.lessons[0]).clone()
    }

    fn notify(&mut self, text: impl Into<String>) { self.toast = Some((text.into(), Instant::now())); }

    fn go(&mut self, page: Page) {
        if self.page == Page::Game && page != Page::Game { self.finish_game(false); }
        self.page = page;
        self.dialog = None;
    }

    fn open_texts(&mut self, anchor: Option<Rect>) {
        self.filter = self.current().group().to_owned();
        self.anchor = anchor;
        self.dialog = Some(Dialog::Texts);
    }

    fn change_lesson(&mut self, title: String) {
        self.data.selected = title;
        self.go(Page::Home);
    }

    fn store_text(&mut self, name: &str, text: &str) -> Result<String, String> {
        if text.trim().is_empty() { return Err("Gib zuerst einen Text ein.".into()); }
        let sanitized = name.trim().trim_end_matches(".txt").chars()
            .map(|ch| if ch.is_control() || "\\/:*?\"<>|".contains(ch) { '_' } else { ch })
            .take(60).collect::<String>();
        let base = sanitized.trim_matches([' ', '.']);
        let base = if base.is_empty() { "Eigener Text" } else { base };
        let mut title = base.to_owned();
        for suffix in 2.. {
            if !self.available_lessons().any(|lesson| lesson.title.eq_ignore_ascii_case(&title)) { break; }
            title = format!("{base}_{suffix}");
        }
        if let Some(folder) = &self.data.settings.text_folder {
            let filename = format!("{title}.txt");
            let path = folder.join("Texte").join(filename);
            write_new(&path, text).map_err(|error| format!("Datei konnte nicht gespeichert werden. {error}"))?;
        }
        self.data.personal.push(Lesson { title: title.clone(), text: text.trim_start_matches('\u{feff}').to_owned() });
        Ok(title)
    }

    fn import(&mut self) {
        let Some(files) = rfd::FileDialog::new().add_filter("Textdateien", &["txt"]).pick_files() else { return; };
        let mut last = None;
        let mut failed = 0;
        for path in files {
            let result = fs::read_to_string(&path).map_err(|error| error.to_string()).and_then(|text|
                self.store_text(path.file_stem().and_then(|stem| stem.to_str()).unwrap_or("Eigener Text"), &text));
            match result { Ok(title) => last = Some(title), Err(_) => failed += 1 }
        }
        if let Some(title) = last {
            self.change_lesson(title);
            self.notify("Text importiert und ausgewählt.");
        }
        if failed > 0 { self.notify(format!("{failed} Datei(en) konnten nicht importiert werden.")); }
    }

    fn read_text_folder(&mut self) {
        let Some(folder) = &self.data.settings.text_folder else { return; };
        let Ok(entries) = fs::read_dir(folder.join("Texte")) else { return; };
        let mut imported = Vec::new();
        for path in entries.flatten().map(|entry| entry.path()) {
            if path.extension().and_then(|ext| ext.to_str()).is_none_or(|ext| !ext.eq_ignore_ascii_case("txt")) { continue; }
            let Some(title) = path.file_stem().and_then(|file| file.to_str()) else { continue; };
            if self.available_lessons().any(|lesson| lesson.title == title) { continue; }
            if let Ok(text) = fs::read_to_string(&path) {
                if !text.trim().is_empty() { imported.push(Lesson { title: title.to_owned(), text }); }
            }
        }
        self.data.personal.extend(imported);
    }

    fn connect_folder(&mut self) {
        let Some(path) = rfd::FileDialog::new().pick_folder() else { return; };
        if let Err(error) = fs::create_dir_all(path.join("Texte")).and_then(|()|
            fs::create_dir_all(path.join("Gesicherte Texte"))) {
            self.notify(format!("Ordner konnte nicht verbunden werden. {error}"));
            return;
        }
        self.data.settings.text_folder = Some(path);
        self.read_text_folder();
        self.notify("Ordner verbunden.");
    }

    fn begin(&mut self, mode: Mode, minutes: u32, length: usize) {
        let lesson = if mode == Mode::Drill {
            let keys = self.data.weak_keys().into_iter().map(|(key, _, _)| key).filter(|key| !key.is_whitespace())
                .take(3).collect::<Vec<_>>();
            if keys.is_empty() { self.notify("Noch keine häufigen Tippfehler vorhanden."); return; }
            let mut words = Vec::<String>::new();
            for source in self.available_lessons() {
                for word in source.text.split_whitespace() {
                    let word = word.trim_matches(|ch: char| !ch.is_alphabetic()).to_lowercase();
                    if word.chars().count() >= 3 && keys.iter().any(|key| word.contains(*key)) && !words.contains(&word) {
                        words.push(word);
                    }
                    if words.len() >= 22 { break; }
                }
                if words.len() >= 22 { break; }
            }
            for key in &keys { if words.len() < 8 { words.push(key.to_string().repeat(4)); } }
            Lesson { title: format!("Schwächentraining · {}", keys.iter().map(char::to_string).collect::<Vec<_>>().join(" ")),
                text: words.join(" ") }
        } else { self.current() };
        let Some(run) = Run::new(lesson, mode, minutes, length) else { self.notify("Dieser Text ist leer."); return; };
        self.go(Page::Run);
        self.run = Some(run);
        self.focus = true;
    }

    fn count_in(&mut self, mode: Mode, minutes: u32, length: usize) {
        self.dialog = None;
        self.remaining = Some(Countdown { at: Instant::now() + Duration::from_secs(3), mode, minutes, length });
    }

    fn open_test(&mut self) {
        self.draft_name.clone_from(&self.data.settings.name);
        self.draft_class.clone_from(&self.data.settings.class);
        self.dialog = Some(Dialog::Test);
    }

    fn finish_run(&mut self, run: Run, aborted: bool) {
        let empty = run.attempts == 0;
        let Some(record) = self.data.finish(run, aborted) else {
            self.go(Page::Home);
            self.notify(if empty { "Übung beendet." } else { "Ergebnis zu schnell und daher nicht gewertet." });
            return;
        };
        self.go(Page::Result);
        self.report = Some(record.clone());
        if record.mode == Mode::Test {
            if let Some(folder) = &self.data.settings.text_folder {
                let time = LocalStamp::now();
                let mut index = 0;
                loop {
                    let suffix = if index == 0 { String::new() } else { format!("-{index}") };
                    let path = folder.join("Gesicherte Texte").join(format!("Tippo-Test-{time}{suffix}.txt"));
                    match write_new(&path, &record.report()) {
                        Ok(()) => break,
                        Err(error) if error.kind() == std::io::ErrorKind::AlreadyExists => index += 1,
                        Err(error) => { self.notify(format!("TXT-Datei konnte nicht gespeichert werden. {error}")); break; }
                    }
                }
            }
            self.dialog = Some(Dialog::Report);
        }
    }

    fn start_game(&mut self) {
        let seed = SystemTime::now().duration_since(UNIX_EPOCH).unwrap_or_default().as_nanos() as u64;
        self.game = Some(Game::new(seed));
        self.game_end = Some(Instant::now() + Duration::from_secs(ROUND_SECONDS as u64));
        self.game_status = "Tippe die erste Aufschrift.".into();
        self.focus = true;
    }

    fn finish_game(&mut self, time_up: bool) {
        if self.game_end.take().is_none() { return; }
        if let Some(game) = &mut self.game {
            let record = game.score > self.data.game_best;
            self.data.game_best = self.data.game_best.max(game.score);
            self.game_status = format!("{} {} {} · {} {}.{}",
                if time_up { "Zeit abgelaufen." } else { "Runde beendet." }, game.delivered,
                if game.delivered == 1 { "Paket" } else { "Pakete" }, game.score,
                if game.score == 1 { "Punkt" } else { "Punkte" }, if record { " Neuer Rekord!" } else { "" });
            game.input.clear();
        }
    }

    fn nav(&mut self, ctx: &egui::Context) {
        let expanded = self.data.settings.expanded && ctx.content_rect().width() >= 850.0;
        let width = if expanded { 258.0 } else { 70.0 };
        egui::SidePanel::left("tippo-nav").exact_width(width).resizable(false)
            .frame(egui::Frame::new().fill(CARD).stroke(Stroke::new(1.0, LINE)).inner_margin(egui::Margin::same(8)))
            .show(ctx, |ui| {
                ui.set_width(width - 18.0);
                ui.add_space(5.0);
                if expanded {
                    ui.horizontal(|ui| {
                        ui.add(image(Icon::Logo, 102.0));
                        ui.with_layout(Layout::right_to_left(Align::Center), |ui| {
                            if icon_button(ui, Icon::Close, "Seitenleiste schließen", 44.0, false, false).clicked() {
                                self.data.settings.expanded = false;
                            }
                        });
                    });
                } else if icon_button(ui, Icon::Logo, "Seitenleiste öffnen", 54.0, false, false).clicked() {
                    self.data.settings.expanded = ctx.content_rect().width() >= 850.0 && !self.data.settings.expanded;
                    if ctx.content_rect().width() < 850.0 { self.open_texts(None); }
                }
                ui.add_space(9.0);
                for (icon, name, page) in [
                    (Icon::Home, "Start", Some(Page::Home)), (Icon::Chart, "Fortschritt", Some(Page::Progress)),
                    (Icon::Doc, "Texte", None), (Icon::Game, "Spiel", Some(Page::Game)),
                ] {
                    if icon_button(ui, icon, name, width - 18.0, page == Some(self.page), expanded).clicked() {
                        if let Some(page) = page { self.go(page); } else { self.open_texts(None); }
                    }
                }
                ui.with_layout(Layout::bottom_up(Align::Min), |ui| {
                    if icon_button(ui, Icon::Settings, "Einstellungen", width - 18.0, false, expanded).clicked() {
                        self.dialog = Some(Dialog::Settings);
                    }
                    if !self.data.weak_keys().is_empty()
                        && icon_button(ui, Icon::Bolt, "Schwächen üben", width - 18.0, false, expanded).clicked() {
                        self.begin(Mode::Drill, 0, 0);
                    }
                    if icon_button(ui, Icon::Pie, "Fehleranalyse", width - 18.0, false, expanded).clicked() {
                        self.dialog = Some(Dialog::Analysis);
                    }
                    if icon_button(ui, Icon::Book, "Gesicherte Texte", width - 18.0, false, expanded).clicked() {
                        self.dialog = Some(Dialog::Saved);
                    }
                });
            });
    }

    fn home(&mut self, ui: &mut Ui) {
        let width = ui.available_width();
        let wide = width >= 710.0;
        let padding = (width * 0.066).clamp(20.0, 72.0);
        card(CARD, padding as i8, 32).show(ui, |ui| {
            ui.set_min_width((width - padding * 2.0 - 2.0).max(100.0));
            if wide {
                let left = (ui.available_width() - 290.0).max(290.0);
                ui.horizontal(|ui| {
                    ui.allocate_ui_with_layout(egui::vec2(left, 0.0), Layout::top_down(Align::Min), |ui| {
                        self.hero(ui, left);
                    });
                    ui.add_space(12.0);
                    ui.vertical(|ui| {
                        ui.add_space((left * 0.19).clamp(35.0, 99.0));
                        self.daily(ui, 268.0, false);
                    });
                });
            } else {
                self.hero(ui, ui.available_width());
                ui.add_space(9.0);
                self.daily(ui, ui.available_width(), true);
            }
        });
    }

    fn hero(&mut self, ui: &mut Ui, width: f32) {
        ui.label(label("SCHREIBTRAINING · KLASSE 7–10"));
        let size = (width * 0.24).clamp(48.0, 137.0);
        let (title, _) = ui.allocate_exact_size(egui::vec2(width, size * 1.75), egui::Sense::hover());
        ui.painter().text(title.left_top(), egui::Align2::LEFT_TOP, "JETZT", display(size), WHITE);
        ui.painter().text(title.left_top() + egui::vec2(0.0, size * 0.84), egui::Align2::LEFT_TOP, "TIPPEN.", display(size), BLUE);
        ui.add_space(12.0);
        ui.add(egui::Label::new(RichText::new("Wähle einen Text und leg mit einer Übung oder einem Test los.")
            .size(18.0).color(MUTED)).wrap());
        ui.add_space(6.0);
        card(WASH, 13, 19).show(ui, |ui| {
            let current = self.current();
            let inner = (width.min(460.0) - 28.0).max(150.0);
            ui.set_width(inner);
            ui.horizontal(|ui| {
                ui.allocate_ui_with_layout(egui::vec2((inner - 108.0).max(70.0), 42.0), Layout::top_down(Align::Min), |ui| {
                    ui.spacing_mut().item_spacing.y = 1.0;
                    ui.label(label("AKTUELLER TEXT"));
                    ui.add(egui::Label::new(headline(current.title.to_uppercase(), 23.0)).truncate())
                        .on_hover_text(current.title);
                });
                let edit = pill(ui, "Ändern", false, 42.0);
                if edit.clicked() { self.open_texts(Some(edit.rect)); }
            });
        });
        ui.add_space(10.0);
        ui.horizontal_wrapped(|ui| {
            if pill(ui, "Üben", true, 54.0).clicked() { self.begin(Mode::Practice, 0, 0); }
            ui.horizontal(|ui| {
                ui.spacing_mut().item_spacing.x = 2.0;
                if pill(ui, "Test starten", false, 54.0).clicked() { self.open_test(); }
                let more = icon_button(ui, Icon::Chevron, "Weitere Modi", 44.0, false, false);
                egui::Popup::menu(&more).show(|ui| {
                    if ui.button("Sprint · 60 Sekunden").clicked() { self.count_in(Mode::Sprint, 1, 0); }
                    if ui.button("Wortpost").clicked() { self.go(Page::Game); }
                });
            });
        });
    }

    fn daily(&self, ui: &mut Ui, width: f32, horizontal: bool) {
        card(WASH, if horizontal { 14 } else { 23 }, 25).show(ui, |ui| {
            ui.set_min_width((width - if horizontal { 30.0 } else { 48.0 }).max(100.0));
            let chips = |ui: &mut Ui| {
                let days = self.data.streak();
                for (title, value, rank) in [
                    ("Serie", format!("{days} {}", if days == 1 { "Tag" } else { "Tage" }), false),
                    ("Rang", RANKS[self.data.rank()].0.to_owned(), true),
                ] {
                    card(Color32::from_rgb(41, 41, 48), 6, 30).show(ui, |ui| {
                        ui.horizontal(|ui| {
                            ui.label(RichText::new(title).size(13.0).strong());
                            if rank { ui.add(image(Icon::Medal, 13.0)); }
                            ui.label(RichText::new(value).size(13.0).color(GOLD));
                        });
                    });
                }
            };
            let seconds = self.data.today();
            let goal = self.data.settings.daily_minutes * 60;
            if horizontal {
                ui.horizontal(|ui| { ring(ui, seconds, goal, 112.0); ui.vertical(chips); });
            } else {
                ui.vertical_centered(|ui| { ring(ui, seconds, goal, 216.0); ui.add_space(12.0); chips(ui); });
            }
        });
    }

    fn progress(&self, ui: &mut Ui) {
        ui.label(headline("DEIN FORTSCHRITT", 54.0));
        ui.add_space(12.0);
        let rank = self.data.rank();
        let next = RANKS.get(rank + 1).map(|(_, xp)| *xp);
        let earned = self.data.xp.saturating_sub(RANKS[rank].1);
        let fraction = next.map_or(1.0, |xp| earned as f32 / (xp - RANKS[rank].1) as f32);
        let panels = |index: usize, ui: &mut Ui| {
            card(CARD, 17, 20).show(ui, |ui| {
                ui.set_min_width((ui.available_width() - 4.0).max(60.0));
                match index {
                    0 => {
                        ui.label(label("RANG"));
                        ui.horizontal(|ui| {
                            ui.add(image(Icon::Medal, 30.0));
                            ui.label(headline(RANKS[rank].0.to_uppercase(), 38.0));
                        });
                        ui.add(egui::ProgressBar::new(fraction).fill(BLUE));
                        ui.label(label(next.map_or_else(|| format!("{} XP · Höchster Rang", self.data.xp),
                            |xp| format!("{} XP · noch {} bis {}", self.data.xp, xp - self.data.xp, RANKS[rank + 1].0))));
                        ui.horizontal_wrapped(|ui| {
                            for (index, (name, _)) in RANKS.iter().enumerate() {
                                ui.label(RichText::new(*name).size(11.0).color(if index == rank { LIGHT_BLUE } else { MUTED }));
                            }
                        });
                    }
                    1 => {
                        ui.label(label("NETTO-ANSCHLÄGE PRO MINUTE"));
                        let samples = self.data.recent.iter().copied().collect::<Vec<_>>();
                        spark(ui, &samples);
                        if !samples.is_empty() {
                            ui.label(label(format!("Ø {} · Bestwert {}", samples.iter().sum::<u32>() / samples.len() as u32,
                                samples.iter().max().unwrap_or(&0))));
                        }
                    }
                    _ => {
                        ui.label(label("HEUTE GEÜBT"));
                        ui.label(headline(clock(self.data.today()), 46.0));
                        let remaining = (self.data.settings.daily_minutes * 60).saturating_sub(self.data.today());
                        ui.label(label(if remaining == 0 { "Tagesziel erreicht".to_owned() }
                            else { format!("Noch {} bis zum Tagesziel", clock(remaining)) }));
                    }
                }
            });
        };
        if ui.available_width() >= 730.0 {
            ui.columns(3, |columns| for (index, ui) in columns.iter_mut().enumerate() { panels(index, ui); });
        } else {
            for index in 0..3 { panels(index, ui); }
        }
        ui.add_space(19.0);
        ui.label(headline("ABZEICHEN", 30.0));
        let columns = (ui.available_width() / 171.0).floor().max(1.0) as usize;
        for row in BADGES.chunks(columns).enumerate() {
            ui.columns(columns, |cells| {
                for (column, (title, info)) in row.1.iter().enumerate() {
                    let active = self.data.badges.contains(&(row.0 * columns + column));
                    let ui = &mut cells[column];
                    card(if active { Color32::from_rgb(28, 24, 19) } else { CARD }, 12, 14).show(ui, |ui| {
                        ui.set_min_size(egui::vec2(ui.available_width(), 84.0));
                        ui.add(image(Icon::Medal, 20.0));
                        ui.label(RichText::new(*title).strong());
                        ui.label(label(*info));
                    });
                }
            });
        }
    }
}

fn write_new(path: &Path, text: &str) -> std::io::Result<()> {
    let mut file = fs::OpenOptions::new().write(true).create_new(true).open(path)?;
    if let Err(error) = file.write_all(text.as_bytes()) {
        drop(file);
        let _ = fs::remove_file(path);
        return Err(error);
    }
    Ok(())
}

impl Tippo {
    fn exercise(&mut self, ui: &mut Ui) {
        let Some(mut run) = self.run.take() else { self.go(Page::Home); return; };
        if run.finished() { self.finish_run(run, false); return; }
        let mut stop = ui.input(|input| input.key_pressed(egui::Key::Escape)) && self.dialog.is_none();
        ui.horizontal(|ui| {
            ui.label(label(format!("{} · {}", run.lesson.title.to_uppercase(), run.mode.label().to_uppercase())));
            ui.with_layout(Layout::right_to_left(Align::Center), |ui| {
                stop |= pill(ui, "Beenden (Esc)", false, 42.0).clicked();
            });
        });
        ui.add(egui::ProgressBar::new(run.typed.len() as f32 / run.target.len() as f32).fill(BLUE));
        if let Some(limit) = run.limit {
            ui.add(egui::ProgressBar::new(run.seconds() / limit.max(1) as f32).fill(MUTED));
        }
        ui.add_space(7.0);
        let speed = if run.seconds() > 2.0 { run.speed() } else { 0 };
        ui.horizontal(|ui| {
            for (value, description) in [
                (speed.to_string(), "ANSCHLÄGE/MIN."),
                (format!("{:.0} %", run.accuracy()), "GENAUIGKEIT"),
                (clock(run.remaining() as u32), if run.limit.is_some() { "RESTZEIT" } else { "ZEIT" }),
            ] {
                ui.vertical(|ui| {
                    ui.label(headline(value, 52.0));
                    ui.label(label(description));
                });
                ui.add_space((ui.available_width() * 0.07).min(45.0));
            }
        });
        let font = FontId::new((ui.available_width() * 0.038).clamp(23.0, 41.0)
            * self.data.settings.scale as f32 / 100.0, match self.data.settings.font {
                WritingFont::Serif => FontFamily::Name("tippo-serif".into()),
                WritingFont::Sans => FontFamily::Proportional,
                WritingFont::Mono => FontFamily::Monospace,
            });
        let cursor = run.typed.len();
        let start = run.target[..cursor.saturating_sub(23)].iter().rposition(|ch| *ch == ' ').map_or(0, |i| i + 1);
        let ending = (cursor + 280).min(run.target.len());
        let goal = ((run.seconds() * self.data.settings.target_speed as f32) / 60.0) as usize;
        let mut passage = egui::text::LayoutJob::default();
        for index in start..ending {
            let expected = run.target[index];
            let (color, background) = match run.typed.get(index) {
                Some(&actual) if actual != expected && run.mode != Mode::Test => (RED, Color32::from_rgb(81, 38, 36)),
                Some(_) => (MUTED, Color32::TRANSPARENT),
                None if index == cursor => (WHITE, Color32::from_rgb(41, 53, 112)),
                None => (WHITE, Color32::TRANSPARENT),
            };
            let underline = if self.data.settings.target_speed > 0 && index == goal && index >= cursor
                { Stroke::new(1.0, MUTED) } else { Stroke::NONE };
            passage.append(&expected.to_string(), 0.0, egui::TextFormat {
                font_id: font.clone(), color, background, underline, ..Default::default()
            });
        }
        card(CARD, 14, 16).show(ui, |ui| {
            ui.set_min_height(font.size * 3.5);
            ui.set_width(ui.available_width());
            ScrollArea::vertical().id_salt("exercise-passage").max_height(font.size * 3.8).show(ui, |ui| {
                ui.add(egui::Label::new(passage).wrap().selectable(false));
            });
        });
        let entry = ui.add_sized([ui.available_width(), 44.0], egui::TextEdit::singleline(&mut run.input)
            .id_salt("exercise-input").hint_text("Hier tippen, um zu schreiben").font(font));
        if self.focus && self.dialog.is_none() {
            entry.request_focus();
            self.focus = false;
        }
        if entry.changed() {
            let errors = run.errors;
            run.sync_input(self.data.settings.lock);
            if self.data.settings.sound && run.errors > errors { export::error_sound(); }
        }
        if let Some(next) = run.target.get(run.typed.len()).copied() {
            if self.data.settings.hints {
                let name = if next == ' ' { "Leertaste".into() } else { next.to_string() };
                let finger = finger(next).map_or("", |entry| entry.1);
                ui.label(RichText::new(format!("Nächste Taste: {name} · {finger}")).color(MUTED));
            }
            if self.data.settings.target_speed > 0 && run.started.is_some() {
                let difference = run.typed.len() as i64 - goal as i64;
                ui.label(label(format!("Ziel {} · {} {}", self.data.settings.target_speed,
                    difference.abs(), if difference >= 0 { "voraus" } else { "zurück" })));
            }
            if ui.ctx().content_rect().height() >= 625.0 {
                keyboard(ui, self.data.settings.hints.then_some(next), self.data.settings.finger_colors, None);
            }
        }
        run.sample();
        if stop && run.mode == Mode::Test && run.attempts > 0 && !run.finished() {
            self.dialog = Some(Dialog::Stop);
            self.run = Some(run);
        } else if run.finished() || stop {
            let aborted = !run.finished();
            self.finish_run(run, aborted);
        } else {
            self.run = Some(run);
            ui.ctx().request_repaint_after(Duration::from_millis(100));
        }
    }

    fn result(&mut self, ui: &mut Ui) {
        let Some(record) = self.report.clone() else { self.go(Page::Home); return; };
        let first = |app: &mut Self, ui: &mut Ui| {
            ui.label(label(format!("{} · {}", record.title, record.mode.label()).to_uppercase()));
            let title = if record.speed >= 200 { "WELTKLASSE." }
                else if record.speed >= 150 { "STARK GEMACHT." }
                else if record.speed >= 100 { "SAUBER GETIPPT." }
                else if record.accuracy >= 97.0 { "GENAU RICHTIG." } else { "WEITER SO." };
            ui.label(headline(title, (ui.available_width() * 0.115).clamp(34.0, 69.0)));
            ui.label(headline(record.speed.to_string(), (ui.available_width() * 0.31).clamp(82.0, 155.0)));
            ui.label(label("NETTO-ANSCHLÄGE PRO MINUTE"));
            ui.add_space(14.0);
            ui.horizontal_wrapped(|ui| {
                if pill(ui, "Nochmal", true, 52.0).clicked() {
                    match record.mode {
                        Mode::Test => { app.go(Page::Home); app.open_test(); }
                        Mode::Sprint => app.count_in(Mode::Sprint, 1, 0),
                        mode => app.begin(mode, 0, 0),
                    }
                }
                if !app.data.weak_keys().is_empty() && pill(ui, "Schwächen üben", false, 45.0).clicked() {
                    app.begin(Mode::Drill, 0, 0);
                }
                if pill(ui, "Urkunde", false, 45.0).clicked() { app.dialog = Some(Dialog::Certificate); }
                if pill(ui, "Fertig", false, 45.0).clicked() { app.go(Page::Home); }
            });
        };
        let second = |ui: &mut Ui| {
            card(CARD, 16, 21).show(ui, |ui| {
                ui.label(label("TEMPO-VERLAUF"));
                let values = record.samples.iter().enumerate().map(|(i, value)| {
                    let window = (i + 1).min(5);
                    let baseline = if i >= window { record.samples[i - window] } else { 0 };
                    (value.saturating_sub(baseline) * 60) / window as u32
                }).collect::<Vec<_>>();
                spark(ui, &values);
            });
            card(CARD, 16, 21).show(ui, |ui| {
                ui.label(label("AUSWERTUNG"));
                ui.horizontal_wrapped(|ui| {
                    for item in [format!("{:.1} % Genauigkeit", record.accuracy), format!("{} Fehler", record.errors),
                        format!("{} brutto", record.attempts * 60 / record.seconds.max(1)), clock(record.seconds), format!("+{} XP", record.xp)] {
                        ui.label(RichText::new(item).background_color(WASH).size(14.0));
                    }
                });
            });
            card(CARD, 16, 21).show(ui, |ui| {
                ui.label(label("SCHWÄCHEN-KARTE"));
                keyboard(ui, None, false, Some(&record));
            });
        };
        if ui.available_width() >= 770.0 {
            ui.columns(2, |columns| { first(self, &mut columns[0]); second(&mut columns[1]); });
        } else {
            first(self, ui);
            second(ui);
        }
    }

    fn wortpost(&mut self, ui: &mut Ui) {
        ui.label(label("SPIELMODUS · 45 SEKUNDEN"));
        ui.horizontal(|ui| {
            ui.spacing_mut().item_spacing.x = 0.0;
            ui.label(headline("WORT", 64.0));
            ui.label(headline("POST.", 64.0).color(BLUE));
        });
        ui.label(RichText::new("Tippe die Aufschrift, um ein Paket abzuschicken. Je drei richtige Wörter in Folge bringen mehr Punkte. Ein Tippfehler unterbricht die Serie.").color(MUTED));
        ui.add_space(8.0);
        if self.game_end.is_some_and(|end| Instant::now() >= end) { self.finish_game(true); }
        let active = self.game_end.is_some();
        let remaining = self.game_end.map_or_else(|| if self.game.is_some() { 0 } else { ROUND_SECONDS },
            |end| end.saturating_duration_since(Instant::now()).as_secs_f32().ceil() as u32);
        card(CARD, 21, 24).show(ui, |ui| {
            let score = self.game.as_ref().map_or(0, |game| game.score);
            let streak = self.game.as_ref().map_or(0, |game| game.streak);
            ui.columns(4, |columns| {
                for (ui, (title, value)) in columns.iter_mut().zip([
                    ("RESTZEIT", clock(remaining)), ("PUNKTE", score.to_string()),
                    ("SERIE", streak.to_string()), ("REKORD", self.data.game_best.to_string()),
                ]) {
                    ui.label(label(title));
                    ui.label(headline(value, 40.0));
                }
            });
            ui.add(egui::ProgressBar::new(remaining as f32 / ROUND_SECONDS as f32).fill(BLUE));
            let column_count = if ui.available_width() < 520.0 { 2 } else { 3 };
            ui.columns(column_count, |columns| {
                for (index, ui) in columns.iter_mut().enumerate() {
                    card(if index == 0 { Color32::from_rgb(32, 41, 83) } else { WASH }, 12, 14).show(ui, |ui| {
                        ui.set_min_size(egui::vec2(ui.available_width(), 86.0));
                        ui.add(image(Icon::Parcel, 21.0));
                        ui.label(label(["JETZT TIPPEN", "DANACH", "IN DER WARTESCHLANGE"][index]));
                        ui.label(RichText::new(self.game.as_ref().map_or("–", |game| game.word(index))).monospace().size(22.0).strong());
                    });
                }
            });
            ui.horizontal_wrapped(|ui| {
                let mut empty = String::new();
                let input = self.game.as_mut().map_or(&mut empty, |game| &mut game.input);
                let entry = ui.add_enabled(active, egui::TextEdit::singleline(input).id_salt("wortpost-input")
                    .hint_text("Paketaufschrift tippen").desired_width((ui.available_width() - 175.0).max(175.0))
                    .min_size(egui::vec2(0.0, 43.0)));
                if self.focus && active && self.dialog.is_none() { entry.request_focus(); self.focus = false; }
                if entry.changed() {
                    if let Some(game) = &mut self.game {
                        if let Some(points) = game.accept() {
                            self.game_status = format!("Paket verschickt. +{points} {}.", if points == 1 { "Punkt" } else { "Punkte" });
                        } else if game.invalid { self.game_status = "Tippfehler. Korrigiere die Aufschrift.".into(); }
                        else { self.game_status = "Aufschrift weiter tippen.".into(); }
                    }
                }
                let action = if active { "Runde beenden" } else if self.game.is_some() { "Noch eine Runde" } else { "Spiel starten" };
                if pill(ui, action, true, 47.0).clicked() {
                    if active { self.finish_game(false); } else { self.start_game(); }
                }
            });
            let color = if active && self.game.as_ref().is_some_and(|game| game.invalid) { RED } else { MUTED };
            ui.label(RichText::new(&self.game_status).color(color));
        });
        if active { ui.ctx().request_repaint_after(Duration::from_millis(100)); }
    }

    fn update_page(&mut self, ui: &mut Ui) {
        ui.add_space((ui.ctx().content_rect().height() * 0.12).min(90.0));
        ui.vertical_centered(|ui| {
            card(CARD, 37, 25).show(ui, |ui| {
                ui.set_width(ui.available_width().min(555.0));
                ui.with_layout(Layout::top_down(Align::Min), |ui| {
                    ui.add(image(Icon::Logo, 116.0));
                    ui.add_space(13.0);
                    if let Some(notice) = &self.notice {
                        ui.label(headline(format!("v{}", notice.version), 88.0).color(LIGHT_BLUE));
                        ui.label(headline("UPDATE VERFÜGBAR", 40.0));
                        if !notice.notes.is_empty() { ui.label(RichText::new(&notice.notes).color(MUTED)); }
                    } else {
                        ui.label(headline(format!("v{VERSION}"), 88.0).color(LIGHT_BLUE));
                        ui.label(headline("UPDATE-INFORMATION", 40.0));
                        ui.label(RichText::new("Für diese Installation liegt kein neuer Update-Hinweis vor.").color(MUTED));
                    }
                    ui.label(label(format!("INSTALLIERT · v{VERSION}")));
                    ui.add_space(5.0);
                    ui.horizontal_wrapped(|ui| {
                        if pill(ui, "Zum Schreibtraining", true, 48.0).clicked() { self.go(Page::Home); }
                        if let Some(url) = repo_url() { ui.hyperlink_to("Zum Repository", url); }
                    });
                });
            });
        });
    }
}

fn finger(char: char) -> Option<&'static (&'static str, &'static str, [u8; 3])> {
    let lower = char.to_lowercase().next().unwrap_or(char);
    FINGERS.iter().find(|(keys, _, _)| keys.contains(lower))
}

fn keyboard(ui: &mut Ui, next: Option<char>, colors: bool, record: Option<&Record>) {
    let width = ((ui.available_width() - 48.0) / 13.0).clamp(13.0, if record.is_some() { 26.0 } else { 42.0 });
    let active = next.map(|ch| ch.to_lowercase().next().unwrap_or(ch));
    ui.vertical_centered(|ui| {
        for row in KEY_ROWS.into_iter().chain([" "]) {
            ui.horizontal(|ui| {
                ui.spacing_mut().item_spacing.x = 4.0;
                let row_width = if row == " " { width * 6.0 } else { (width + 4.0) * row.chars().count() as f32 - 4.0 };
                ui.add_space(((ui.available_width() - row_width) / 2.0).max(0.0));
                for char in row.chars() {
                    let key_width = if char == ' ' { width * 6.0 } else { width };
                    let (rect, _) = ui.allocate_exact_size(egui::vec2(key_width, width * 0.86), egui::Sense::hover());
                    let fill = if active == Some(char) { BLUE }
                        else if record.and_then(|record| record.keys.get(&char)).is_some_and(|(_, errors)| *errors > 0) {
                            Color32::from_rgb(106, 49, 48)
                        } else if colors {
                            finger(char).map_or(WASH, |(_, _, [r, g, b])| Color32::from_rgb(*r, *g, *b))
                        } else { WASH };
                    ui.painter().rect(rect, 6.0, fill, Stroke::new(1.0, LINE), egui::StrokeKind::Inside);
                    let text = if char == 'ß' { "ß".into() } else { char.to_uppercase().to_string() };
                    ui.painter().text(rect.center(), egui::Align2::CENTER_CENTER, text,
                        FontId::proportional((width * 0.33).clamp(8.0, 14.0)), WHITE);
                }
            });
        }
    });
}

impl Tippo {
    fn show_dialog(&mut self, ctx: &egui::Context) {
        let Some(dialog) = self.dialog else { return; };
        let screen = ctx.content_rect();
        let width = (screen.width() - 70.0).min(match dialog {
            Dialog::Texts => 460.0,
            Dialog::Report | Dialog::Certificate => 625.0,
            _ => 525.0,
        });
        let id = Id::new(("tippo-dialog", format!("{dialog:?}")));
        let mut modal = egui::Modal::new(id).frame(card(CARD, 22, 22));
        if dialog == Dialog::Texts && screen.width() >= 680.0 {
            if let Some(anchor) = self.anchor {
                let left = (anchor.right() - width - 44.0).clamp(12.0, (screen.right() - width - 61.0).max(12.0));
                let top = if screen.bottom() - anchor.bottom() > 445.0 { anchor.bottom() + 8.0 }
                    else { (anchor.top() - 440.0).max(12.0) };
                modal = modal.area(egui::Area::new(id).order(egui::Order::Foreground)
                    .fixed_pos(egui::pos2(left, top)).movable(false));
            }
        }
        let result = modal.show(ctx, |ui| {
            ui.set_width(width);
            ui.horizontal(|ui| {
                ui.label(headline(match dialog {
                    Dialog::Texts => "TEXT AUSWÄHLEN", Dialog::Add => "EIGENER TEXT",
                    Dialog::Test => "TEST STARTEN", Dialog::Stop => "TEST BEENDEN?",
                    Dialog::Settings => "EINSTELLUNGEN", Dialog::Saved => "GESICHERTE TEXTE",
                    Dialog::Analysis => "FEHLERANALYSE", Dialog::Report => "SCHREIBTEST",
                    Dialog::Certificate => "DEINE URKUNDE",
                }, 31.0));
                ui.with_layout(Layout::right_to_left(Align::Center), |ui| {
                    if icon_button(ui, Icon::Close, "Schließen", 42.0, false, false).clicked() {
                        self.dismiss(dialog);
                    }
                });
            });
            ScrollArea::vertical().id_salt(("dialog-scroll", id)).max_height(screen.height() - 130.0)
                .show(ui, |ui| {
                    ui.set_min_width(width - 12.0);
                    match dialog {
                        Dialog::Texts => self.texts_dialog(ui),
                        Dialog::Add => self.add_dialog(ui),
                        Dialog::Test => self.test_dialog(ui),
                        Dialog::Settings => self.settings_dialog(ui),
                        Dialog::Saved => self.saved_dialog(ui),
                        Dialog::Analysis => self.analysis_dialog(ui),
                        Dialog::Report | Dialog::Certificate => self.record_dialog(ui, dialog == Dialog::Certificate),
                        Dialog::Stop => {
                            ui.label("Dein bisheriges Ergebnis wird gespeichert.");
                            ui.horizontal(|ui| {
                                if pill(ui, "Weiterschreiben", false, 42.0).clicked() { self.dismiss(dialog); }
                                if pill(ui, "Test beenden", true, 42.0).clicked() {
                                    if let Some(run) = self.run.take() { self.finish_run(run, true); }
                                }
                            });
                        }
                    }
                });
        });
        if result.should_close() && self.dialog == Some(dialog) { self.dismiss(dialog); }
    }

    fn dismiss(&mut self, dialog: Dialog) {
        self.dialog = None;
        if dialog == Dialog::Stop { self.focus = true; }
    }

    fn texts_dialog(&mut self, ui: &mut Ui) {
        let mut groups = vec!["Alle".to_owned()];
        for lesson in self.available_lessons() {
            let group = lesson.group();
            if !groups.iter().any(|existing| existing == group) { groups.push(group.to_owned()); }
        }
        if !groups.contains(&self.filter) { self.filter = "Alle".into(); }
        ui.horizontal_wrapped(|ui| {
            for group in groups {
                if ui.selectable_label(self.filter == group, &group).clicked() { self.filter = group; }
            }
        });
        let mut chosen = None;
        ScrollArea::vertical().id_salt(("texts-list", &self.filter)).max_height(250.0).show(ui, |ui| {
            for lesson in self.available_lessons().filter(|lesson| self.filter == "Alle" || self.filter == lesson.group()) {
                let count = lesson.text.chars().count();
                let item = egui::Button::selectable(self.data.selected == lesson.title,
                    format!("{}\n{} Zeichen", lesson.title, count))
                    .min_size(egui::vec2(ui.available_width() - 3.0, 46.0));
                if ui.add(item).clicked() { chosen = Some(lesson.title.clone()); }
            }
        });
        if let Some(title) = chosen { self.change_lesson(title); }
        ui.separator();
        ui.horizontal_wrapped(|ui| {
            if pill(ui, "TXT importieren", false, 42.0).clicked() { self.import(); }
            if pill(ui, "Eigener Text", true, 42.0).clicked() {
                self.draft_title.clear();
                self.draft_text.clear();
                self.dialog = Some(Dialog::Add);
                self.focus = true;
            }
        });
    }

    fn add_dialog(&mut self, ui: &mut Ui) {
        ui.label(label("NAME DER TEXTVORLAGE"));
        let name = ui.add(egui::TextEdit::singleline(&mut self.draft_title)
            .desired_width(f32::INFINITY).char_limit(60).hint_text("Mein Übungstext"));
        if self.focus { name.request_focus(); self.focus = false; }
        ui.label(label("TEXT SCHREIBEN ODER EINFÜGEN"));
        ui.add(egui::TextEdit::multiline(&mut self.draft_text).desired_width(f32::INFINITY).desired_rows(8));
        ui.horizontal_wrapped(|ui| {
            if pill(ui, "Abbrechen", false, 42.0).clicked() { self.dialog = Some(Dialog::Texts); }
            if pill(ui, "Speichern und auswählen", true, 42.0).clicked() {
                let title = self.draft_title.clone();
                let text = self.draft_text.clone();
                match self.store_text(&title, &text) {
                    Ok(title) => { self.change_lesson(title); self.notify("Text hinzugefügt und ausgewählt."); }
                    Err(error) => self.notify(error),
                }
            }
        });
    }

    fn test_dialog(&mut self, ui: &mut Ui) {
        ui.label(label("NAME"));
        ui.add(egui::TextEdit::singleline(&mut self.draft_name).desired_width(f32::INFINITY).char_limit(40));
        ui.label(label("KLASSE"));
        ui.add(egui::TextEdit::singleline(&mut self.draft_class).desired_width(f32::INFINITY).char_limit(12));
        ui.horizontal(|ui| {
            ui.label(label("MAXIMALE DAUER (MINUTEN)"));
            ui.add(egui::DragValue::new(&mut self.minutes).range(1..=180));
        });
        ui.horizontal(|ui| {
            ui.label(label("ANSCHLÄGE (0 = GANZER TEXT)"));
            ui.add(egui::DragValue::new(&mut self.length).range(0..=6000));
        });
        if pill(ui, "Los geht’s", true, 44.0).clicked() {
            if self.draft_name.trim().is_empty() || self.draft_class.trim().is_empty() {
                self.notify("Gib deinen Namen und deine Klasse ein.");
            } else {
                self.data.settings.name = self.draft_name.trim().to_owned();
                self.data.settings.class = self.draft_class.trim().to_owned();
                self.count_in(Mode::Test, self.minutes, self.length);
            }
        }
    }

    fn settings_dialog(&mut self, ui: &mut Ui) {
        {
            let settings = &mut self.data.settings;
            ui.horizontal(|ui| {
                ui.label("Schriftgröße");
                ui.add(egui::Slider::new(&mut settings.scale, 90..=170).step_by(10.0).suffix(" %"));
            });
            ui.horizontal(|ui| {
                ui.label("Schriftart");
                egui::ComboBox::from_id_salt("writing-font").selected_text(match settings.font {
                    WritingFont::Serif => "Serif", WritingFont::Sans => "Sans", WritingFont::Mono => "Schreibmaschine",
                }).show_ui(ui, |ui| {
                    for (font, title) in [(WritingFont::Serif, "Serif"), (WritingFont::Sans, "Sans"), (WritingFont::Mono, "Schreibmaschine")] {
                        ui.selectable_value(&mut settings.font, font, title);
                    }
                });
            });
            ui.horizontal(|ui| {
                ui.label("Tagesziel");
                egui::ComboBox::from_id_salt("daily").selected_text(format!("{} Min.", settings.daily_minutes)).show_ui(ui, |ui| {
                    for minutes in [5, 10, 15, 20, 30] { ui.selectable_value(&mut settings.daily_minutes, minutes, format!("{minutes} Min.")); }
                });
            });
            ui.horizontal(|ui| {
                ui.label("Zieltempo");
                egui::ComboBox::from_id_salt("goal").selected_text(if settings.target_speed == 0 { "Aus".into() }
                    else { format!("{} Anschläge/Min.", settings.target_speed) }).show_ui(ui, |ui| {
                    for speed in [0, 100, 150, 200, 250, 300] {
                        ui.selectable_value(&mut settings.target_speed, speed, if speed == 0 { "Aus".into() } else { speed.to_string() });
                    }
                });
            });
            ui.checkbox(&mut settings.hints, "Leuchttaste und Fingerhinweis");
            ui.checkbox(&mut settings.finger_colors, "Fingerfarben");
            ui.checkbox(&mut settings.sound, "Ton bei Tippfehlern");
            ui.checkbox(&mut settings.lock, "Korrektur gesperrt");
        }
        ui.separator();
        ui.horizontal_wrapped(|ui| {
            ui.label("Ordner für Texte und Testergebnisse");
            if pill(ui, "Ordner wählen", false, 40.0).clicked() { self.connect_folder(); }
            if self.data.settings.text_folder.is_some() && ui.button("Trennen").clicked() {
                self.data.settings.text_folder = None;
            }
        });
        ui.separator();
        ui.label(headline(format!("TIPPO v{VERSION}"), 27.0));
        ui.checkbox(&mut self.data.settings.auto_update, "Automatische Updates");
        ui.label(label("Der Schalter speichert deine Einstellung. Zurzeit zeigt er nur lokale Update-Hinweise beim Start an."));
        ui.horizontal_wrapped(|ui| {
            if pill(ui, "Update-Info", false, 42.0).clicked() {
                self.notice = local_update_notice();
                self.go(Page::Update);
            }
            if let Some(url) = repo_url() { ui.hyperlink_to("Zum Repository", url); }
        });
        if pill(ui, "Fertig", true, 42.0).clicked() { self.dialog = None; }
    }

    fn saved_dialog(&mut self, ui: &mut Ui) {
        if self.data.tests.is_empty() { ui.label("Noch keine gesicherten Texte."); }
        let mut chosen = None;
        for record in self.data.tests.iter().rev() {
            if ui.button(format!("{} · {} · {}", record.date, record.name, record.title)).clicked() { chosen = Some(record.clone()); }
        }
        if let Some(record) = chosen { self.report = Some(record); self.dialog = Some(Dialog::Report); }
    }

    fn analysis_dialog(&self, ui: &mut Ui) {
        let rows = self.data.weak_keys();
        if rows.is_empty() { ui.label("Noch keine Fehler aufgezeichnet."); return; }
        egui::Grid::new("analysis").striped(true).show(ui, |ui| {
            for title in ["Taste", "Fehler", "Gefordert", "Anteil"] { ui.label(label(title)); }
            ui.end_row();
            for (key, attempts, errors) in rows.into_iter().take(12) {
                ui.label(if key == ' ' { "Leer".to_owned() } else { key.to_uppercase().to_string() });
                ui.label(errors.to_string());
                ui.label(attempts.to_string());
                ui.label(format!("{:.1} %", 100.0 * errors as f32 / attempts.max(1) as f32));
                ui.end_row();
            }
        });
    }

    fn record_dialog(&mut self, ui: &mut Ui, certificate: bool) {
        let Some(record) = self.report.clone() else { self.dialog = None; return; };
        let on_paper = |ui: &mut Ui| {
            ui.set_width(ui.available_width());
            if certificate {
                ui.vertical_centered(|ui| {
                    ui.add(image(Icon::Logo, 105.0).tint(Color32::BLACK));
                    ui.label(headline("URKUNDE", 42.0).color(BG));
                    ui.label(RichText::new("Diese Urkunde erhält").color(BG));
                    ui.label(RichText::new(if record.name.is_empty() { "Tippo-Schüler/in" } else { &record.name }).size(26.0).strong().color(BG));
                    ui.label(RichText::new(format!("{} Anschläge pro Minute · {:.1} % Genauigkeit", record.speed, record.accuracy)).color(BG));
                    ui.label(RichText::new(&record.title).color(BG));
                    ui.label(RichText::new(&record.date).color(BG));
                });
            } else {
                ScrollArea::vertical().id_salt("report-paper").max_height(370.0).show(ui, |ui| {
                    ui.add(egui::Label::new(RichText::new(record.report()).monospace().color(BG)).wrap().selectable(true));
                });
            }
        };
        card(Color32::from_rgb(250, 248, 240), 21, 7).show(ui, on_paper);
        ui.horizontal_wrapped(|ui| {
            if pill(ui, "Drucken", true, 42.0).clicked() {
                let extension = if certificate { "png" } else { "txt" };
                let path = std::env::temp_dir().join(format!("Tippo-{}-{}.{}", std::process::id(), LocalStamp::now(), extension));
                let saved = if certificate { export::png_image(&path, &record, true) } else { write_new(&path, &record.report()) };
                if let Err(error) = saved.and_then(|()| export::print_file(&path)) { self.notify(error.to_string()); }
            }
            if pill(ui, "Als Bild", false, 42.0).clicked() {
                if let Some(path) = rfd::FileDialog::new().add_filter("PNG-Bild", &["png"])
                    .set_file_name(if certificate { "Tippo-Urkunde.png" } else { "Tippo-Schreibtest.png" }).save_file() {
                    match export::png_image(&path, &record, certificate) {
                        Ok(()) => self.notify("Bild gespeichert."), Err(error) => self.notify(error.to_string()),
                    }
                }
            }
            if !certificate && pill(ui, "Als TXT", false, 42.0).clicked() {
                if let Some(path) = rfd::FileDialog::new().add_filter("Textdatei", &["txt"])
                    .set_file_name("Tippo-Schreibtest.txt").save_file() {
                    match fs::write(path, record.report()) {
                        Ok(()) => self.notify("Bericht gespeichert."), Err(error) => self.notify(error.to_string()),
                    }
                }
            }
        });
    }

    fn render(&mut self, ctx: &egui::Context) {
        if let Some(countdown) = &self.remaining {
            let time = countdown.at.saturating_duration_since(Instant::now());
            if time.is_zero() {
                let countdown = self.remaining.take().expect("Aktiver Countdown");
                self.begin(countdown.mode, countdown.minutes, countdown.length);
            } else {
                if ctx.input(|input| input.key_pressed(egui::Key::Escape)) {
                    self.remaining = None;
                    return;
                }
                egui::CentralPanel::default().frame(egui::Frame::new().fill(BG)).show(ctx, |ui| {
                    ui.centered_and_justified(|ui| {
                        ui.vertical_centered(|ui| {
                            ui.label(label("MACH DICH BEREIT"));
                            ui.label(headline(time.as_secs_f32().ceil().to_string(), 203.0).color(LIGHT_BLUE));
                        });
                    });
                });
                ctx.request_repaint_after(Duration::from_millis(80));
                return;
            }
        }
        if self.dialog.is_none() && self.page == Page::Home && !ctx.wants_keyboard_input() {
            let typed = ctx.input(|input| input.events.iter().find_map(|event| match event {
                egui::Event::Text(text) if !text.trim().is_empty() => Some(text.clone()),
                _ => None,
            }));
            if let Some(typed) = typed {
                self.begin(Mode::Practice, 0, 0);
                if let Some(run) = &mut self.run {
                    run.input = typed;
                    run.sync_input(self.data.settings.lock);
                }
                ctx.input_mut(|input| input.events.retain(|event| !matches!(event, egui::Event::Text(_))));
            }
        }
        if self.dialog.is_none() && (self.page == Page::Run || (self.page == Page::Game && self.game_end.is_some())) {
            ctx.input_mut(|input| input.events.retain(|event| !matches!(event, egui::Event::Paste(_))));
        }
        if self.page == Page::Result && self.dialog.is_none()
            && ctx.input(|input| input.key_pressed(egui::Key::Escape)) { self.go(Page::Home); }
        if matches!(self.page, Page::Home | Page::Progress | Page::Game) { self.nav(ctx); }
        egui::CentralPanel::default().frame(egui::Frame::new().fill(BG).inner_margin(egui::Margin::same(18)))
            .show(ctx, |ui| {
                ScrollArea::vertical().id_salt(("tippo-page", self.page as u8)).auto_shrink([false, false]).show(ui, |ui| {
                    let width = ui.available_width().min(1090.0);
                    let margin = ((ui.available_width() - width) / 2.0 - ui.spacing().item_spacing.x).max(0.0);
                    ui.horizontal(|ui| {
                        if margin > 0.0 { ui.add_space(margin); }
                        ui.allocate_ui_with_layout(egui::vec2(width, 0.0), Layout::top_down(Align::Min), |ui| {
                            ui.set_width(width);
                            match self.page {
                                Page::Home => self.home(ui), Page::Progress => self.progress(ui), Page::Game => self.wortpost(ui),
                                Page::Run => self.exercise(ui), Page::Result => self.result(ui), Page::Update => self.update_page(ui),
                            }
                            if matches!(self.page, Page::Home | Page::Progress | Page::Game) {
                                ui.add_space(45.0);
                                ui.horizontal_wrapped(|ui| {
                                    ui.label(label(format!("© {} Tippo", chrono::Local::now().format("%Y"))));
                                    ui.with_layout(Layout::right_to_left(Align::Center), |ui| {
                                        ui.label(label("Texte und Ergebnisse bleiben auf diesem Gerät."));
                                    });
                                });
                            }
                        });
                    });
                });
            });
        self.show_dialog(ctx);
        if let Some((message, at)) = self.toast.as_ref() {
            if at.elapsed() < Duration::from_secs(4) {
                egui::Area::new(Id::new("tippo-toast")).order(egui::Order::Tooltip)
                    .interactable(false).anchor(egui::Align2::CENTER_BOTTOM, egui::vec2(0.0, -20.0))
                    .show(ctx, |ui| { card(WASH, 12, 12).show(ui, |ui| { ui.label(message); }); });
                ctx.request_repaint_after(Duration::from_secs(4).saturating_sub(at.elapsed()));
            } else { self.toast = None; }
        }
    }
}

fn local_update_notice() -> Option<UpdateNotice> {
    let executable = std::env::current_exe().ok()?;
    let file = executable.parent()?.join("update-info.txt");
    if file.metadata().ok()?.len() > 64 * 1024 { return None; }
    UpdateNotice::parse(&fs::read_to_string(file).ok()?)
}

fn repo_url() -> Option<&'static str> {
    let url = option_env!("TIPPO_REPO_URL")?;
    let slug = url.strip_prefix("https://github.com/")?;
    let (owner, repo) = slug.split_once('/')?;
    let valid = |name: &str| !name.is_empty()
        && name.bytes().all(|byte| byte.is_ascii_alphanumeric() || b"-_.".contains(&byte));
    (valid(owner) && valid(repo)).then_some(url)
}

impl eframe::App for Tippo {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) { self.render(ctx); }
    fn save(&mut self, storage: &mut dyn eframe::Storage) { eframe::set_value(storage, STORAGE_KEY, &self.data); }
    fn auto_save_interval(&self) -> Duration { Duration::from_secs(2) }
}

fn main() -> eframe::Result {
    let options = eframe::NativeOptions {
        viewport: egui::ViewportBuilder::default().with_title(format!("Tippo v{VERSION}"))
            .with_app_id("Tippo").with_inner_size([1280.0, 820.0]).with_min_inner_size([560.0, 540.0]),
        renderer: eframe::Renderer::Glow,
        ..Default::default()
    };
    eframe::run_native("Tippo", options, Box::new(|context| {
        let data = context.storage.and_then(|storage| eframe::get_value(storage, STORAGE_KEY)).unwrap_or_default();
        Ok(Box::new(Tippo::new(&context.egui_ctx, data, local_update_notice())))
    }))
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn renders_every_native_screen_at_two_window_sizes() {
        let ctx = egui::Context::default();
        let mut app = Tippo::new(&ctx, Data::default(), UpdateNotice::parse("0.8.0\nNeue Texte."));
        for size in [[1280.0, 820.0], [560.0, 540.0]] {
            for page in [Page::Home, Page::Progress, Page::Game, Page::Run, Page::Result, Page::Update] {
                if page == Page::Run { app.begin(Mode::Practice, 0, 0); }
                if page == Page::Result {
                    let mut run = Run::new(app.current(), Mode::Practice, 0, 0).unwrap();
                    run.input.push(run.target[0]);
                    run.sync_input(false);
                    app.finish_run(run, true);
                }
                app.go(page);
                let output = ctx.run(egui::RawInput {
                    screen_rect: Some(Rect::from_min_size(egui::Pos2::ZERO, egui::vec2(size[0], size[1]))),
                    ..Default::default()
                }, |ctx| app.render(ctx));
                assert!(!output.shapes.is_empty());
            }
        }
    }
}

struct LocalStamp;
impl LocalStamp {
    fn now() -> String { chrono::Local::now().format("%Y-%m-%d-%H%M%S").to_string() }
}
