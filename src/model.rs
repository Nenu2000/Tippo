use chrono::{Duration, Local, NaiveDate};
use serde::{Deserialize, Serialize};
use std::collections::{BTreeMap, BTreeSet, VecDeque};

pub const VERSION: &str = env!("CARGO_PKG_VERSION");
pub const ROUND_SECONDS: u32 = 45;
pub const RANKS: [(&str, u32); 6] = [
    ("Bronze", 0), ("Silber", 200), ("Gold", 600), ("Platin", 1500),
    ("Diamant", 3500), ("Meister", 7500),
];
pub const BADGES: [(&str, &str); 10] = [
    ("Erster Schritt", "Erste Übung beendet"),
    ("Prüfungsreif", "Ersten Test abgeschlossen"),
    ("Sprinter", "Einen Sprint beendet"),
    ("Makellos", "100 % Genauigkeit ab 50 Anschlägen"),
    ("Tempo 100", "100 Anschläge pro Minute"),
    ("Tempo 150", "150 Anschläge pro Minute"),
    ("Tempo 200", "200 Anschläge pro Minute"),
    ("Neuer Rekord", "Eigenen Bestwert geschlagen"),
    ("Dranbleiber", "3 Tage in Folge geübt"),
    ("Wochenserie", "7 Tage in Folge geübt"),
];

#[derive(Clone, Serialize, Deserialize)]
pub struct Lesson {
    pub title: String,
    pub text: String,
}

impl Lesson {
    pub fn group(&self) -> &str {
        self.title
            .split_once(" - ")
            .map_or("Eigene Texte", |(group, _)| group)
    }
}

pub fn lessons() -> Vec<Lesson> {
    serde_json::from_str::<Vec<(String, String)>>(include_str!("../assets/lessons.json"))
        .expect("Die eingebauten Tippo-Texte sind gültig.")
        .into_iter()
        .map(|(title, text)| Lesson { title, text })
        .collect()
}

#[derive(Clone, Copy, Default, PartialEq, Serialize, Deserialize)]
pub enum WritingFont {
    #[default]
    Serif,
    Sans,
    Mono,
}

#[derive(Serialize, Deserialize)]
#[serde(default)]
pub struct Settings {
    pub scale: u32,
    pub font: WritingFont,
    pub daily_minutes: u32,
    pub target_speed: u32,
    pub hints: bool,
    pub finger_colors: bool,
    pub sound: bool,
    pub lock: bool,
    pub auto_update: bool,
    pub expanded: bool,
    pub text_folder: Option<std::path::PathBuf>,
    pub name: String,
    pub class: String,
}

impl Default for Settings {
    fn default() -> Self {
        Self {
            scale: 100, font: WritingFont::Serif, daily_minutes: 10, target_speed: 0,
            hints: true, finger_colors: false, sound: false, lock: false,
            auto_update: false, expanded: false, text_folder: None, name: String::new(), class: String::new(),
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize)]
pub enum Mode {
    Practice,
    Test,
    Sprint,
    Drill,
}

impl Mode {
    pub fn label(self) -> &'static str {
        match self {
            Self::Practice => "Übung",
            Self::Test => "Test",
            Self::Sprint => "Sprint",
            Self::Drill => "Schwächentraining",
        }
    }
}

pub struct Run {
    pub lesson: Lesson,
    pub target: Vec<char>,
    pub typed: Vec<char>,
    pub input: String,
    pub mode: Mode,
    pub limit: Option<u32>,
    pub started: Option<std::time::Instant>,
    pub attempts: u32,
    pub errors: u32,
    pub keys: BTreeMap<char, (u32, u32)>,
    pub samples: Vec<u32>,
}

pub fn target_text(text: &str, limit: usize) -> Vec<char> {
    let normalized = text.split_whitespace().collect::<Vec<_>>().join(" ");
    if normalized.is_empty() {
        return Vec::new();
    }
    if limit == 0 {
        let mut chars = normalized.chars().take(6000).collect::<Vec<_>>();
        if normalized.chars().count() > chars.len() {
            if let Some(last) = chars.windows(2).rposition(|pair| pair == ['.', ' ']) {
                if last > 3000 {
                    chars.truncate(last + 1);
                }
            }
        }
        return chars;
    }
    let mut repeated = normalized.chars().chain(std::iter::once(' ')).cycle()
        .take(limit.min(6000)).collect::<Vec<_>>();
    while repeated.last() == Some(&' ') {
        repeated.pop();
    }
    repeated
}

impl Run {
    pub fn new(lesson: Lesson, mode: Mode, minutes: u32, length: usize) -> Option<Self> {
        let target = target_text(&lesson.text, length);
        if target.is_empty() {
            return None;
        }
        let limit = matches!(mode, Mode::Test | Mode::Sprint).then_some(minutes * 60);
        Some(Self { lesson, target, typed: Vec::new(), input: String::new(), mode, limit,
            started: None, attempts: 0, errors: 0, keys: BTreeMap::new(), samples: Vec::new() })
    }

    pub fn seconds(&self) -> f32 {
        self.started.map_or(0.0, |start| start.elapsed().as_secs_f32())
    }

    pub fn remaining(&self) -> f32 {
        self.limit.map_or(self.seconds(), |limit| (limit as f32 - self.seconds()).max(0.0))
    }

    pub fn finished(&self) -> bool {
        self.typed.len() == self.target.len()
            || self.limit.is_some_and(|limit| self.seconds() >= limit as f32)
    }

    pub fn sync_input(&mut self, lock: bool) {
        let next = self.input.chars().collect::<Vec<_>>();
        let common = self.typed.iter().zip(&next).take_while(|(a, b)| a == b).count();
        // Änderungen bleiben auf das Ende beschränkt. Die Rücktaste kann deaktiviert sein.
        if common == self.typed.len() || (!lock && common == next.len()) {
            self.typed.truncate(common);
            for &char in next.iter().skip(common) {
                let Some(&expected) = self.target.get(self.typed.len()) else { break; };
                self.started.get_or_insert_with(std::time::Instant::now);
                let key = expected.to_lowercase().next().unwrap_or(expected);
                let counts = self.keys.entry(key).or_default();
                counts.0 += 1;
                self.attempts += 1;
                if char != expected {
                    self.errors += 1;
                    counts.1 += 1;
                }
                self.typed.push(char);
            }
        }
        self.input = self.typed.iter().collect();
    }

    pub fn accuracy(&self) -> f32 {
        if self.attempts == 0 { 100.0 } else { 100.0 * (1.0 - self.errors as f32 / self.attempts as f32) }
    }

    pub fn speed(&self) -> u32 {
        ((self.attempts - self.errors) as f32 * 60.0 / self.seconds().max(1.0)).round() as u32
    }

    pub fn sample(&mut self) {
        let second = self.seconds().floor() as usize;
        self.samples.resize(second, self.attempts - self.errors);
    }
}

#[derive(Clone, Serialize, Deserialize)]
pub struct Record {
    pub title: String,
    pub mode: Mode,
    pub name: String,
    pub class: String,
    pub date: String,
    pub seconds: u32,
    pub limit: Option<u32>,
    pub attempts: u32,
    pub errors: u32,
    pub speed: u32,
    pub accuracy: f32,
    pub typed: String,
    pub keys: BTreeMap<char, (u32, u32)>,
    pub samples: Vec<u32>,
    pub aborted: bool,
    pub xp: u32,
}

impl Record {
    pub fn report(&self) -> String {
        let duration = self.limit.map_or(String::from("–"), |s| format!("{} Min.", s / 60));
        let abort = if self.aborted { " (vorzeitig beendet)" } else { "" };
        format!(
            "TIPPO – Schreibtest\n===================\n\nName: {}\nKlasse: {}\nDatum: {}\nTextvorlage: {}\nMaximale Dauer: {}\nBenötigte Zeit: {}{}\nAnschläge: {}\nTastfehler: {}\nGenauigkeit: {:.1} %\nNetto/Minute: {}\n\n--- Abgetippter Text ---\n{}\n",
            self.name, self.class, self.date, self.title, duration, clock(self.seconds), abort,
            self.attempts, self.errors, self.accuracy, self.speed, self.typed
        )
    }
}

#[derive(Default, Serialize, Deserialize)]
#[serde(default)]
pub struct Data {
    pub settings: Settings,
    pub personal: Vec<Lesson>,
    pub selected: String,
    pub xp: u32,
    pub daily: BTreeMap<String, u32>,
    pub tests: Vec<Record>,
    pub recent: VecDeque<u32>,
    pub skills: BTreeMap<char, (u32, u32)>,
    pub records: BTreeMap<String, u32>,
    pub badges: BTreeSet<usize>,
    pub game_best: u32,
}

impl Data {
    pub fn today(&self) -> u32 {
        self.daily.get(&day(Local::now().date_naive())).copied().unwrap_or(0)
    }

    pub fn streak(&self) -> u32 {
        let today = Local::now().date_naive();
        let first = if self.today() == 0 { today - Duration::days(1) } else { today };
        (0..).take_while(|i| self.daily.get(&day(first - Duration::days(*i))).copied().unwrap_or(0) > 0)
            .count() as u32
    }

    pub fn rank(&self) -> usize {
        RANKS.iter().rposition(|(_, threshold)| self.xp >= *threshold).unwrap_or(0)
    }

    pub fn finish(&mut self, run: Run, aborted: bool) -> Option<Record> {
        if run.attempts == 0 || run.speed() > 800 {
            return None;
        }
        let now = Local::now();
        let seconds = run.seconds().round().max(1.0) as u32;
        let speed = run.speed();
        let accuracy = run.accuracy();
        let previous = self.records.get(&run.lesson.title).copied().unwrap_or(0);
        let best = run.mode != Mode::Drill && speed > previous;
        if best { self.records.insert(run.lesson.title.clone(), speed); }
        let xp = (run.attempts - run.errors + 5) / 10
            + 10 * u32::from(run.mode == Mode::Test)
            + 10 * u32::from(run.errors == 0)
            + 5 * u32::from(best && previous > 0);
        self.xp += xp;
        *self.daily.entry(day(now.date_naive())).or_default() += seconds;
        self.recent.push_back(speed);
        if self.recent.len() > 12 { self.recent.pop_front(); }
        for (&key, &(attempts, errors)) in &run.keys {
            let pair = self.skills.entry(key).or_default();
            pair.0 += attempts;
            pair.1 += errors;
        }
        let streak = self.streak();
        let earned = [true, run.mode == Mode::Test, run.mode == Mode::Sprint,
            run.errors == 0 && run.attempts >= 50, speed >= 100, speed >= 150,
            speed >= 200, best && previous > 0, streak >= 3, streak >= 7];
        self.badges.extend(earned.iter().enumerate().filter_map(|(i, yes)| yes.then_some(i)));
        let record = Record {
            title: run.lesson.title, mode: run.mode, name: self.settings.name.clone(),
            class: self.settings.class.clone(), date: now.format("%d.%m.%Y %H:%M").to_string(),
            seconds, limit: run.limit, attempts: run.attempts, errors: run.errors, speed, accuracy,
            typed: run.input, keys: run.keys, samples: run.samples, aborted, xp,
        };
        if record.mode == Mode::Test { self.tests.push(record.clone()); }
        Some(record)
    }

    pub fn weak_keys(&self) -> Vec<(char, u32, u32)> {
        let mut keys = self.skills.iter().filter_map(|(&key, &(all, errors))|
            (errors > 0).then_some((key, all, errors))).collect::<Vec<_>>();
        keys.sort_by(|a, b| (b.2 as u64 * a.1 as u64).cmp(&(a.2 as u64 * b.1 as u64))
            .then_with(|| b.2.cmp(&a.2)));
        keys
    }
}

fn day(date: NaiveDate) -> String { date.format("%Y-%m-%d").to_string() }

pub fn clock(seconds: u32) -> String { format!("{}:{:02}", seconds / 60, seconds % 60) }

pub struct Game {
    words: Vec<&'static str>,
    queue: VecDeque<&'static str>,
    state: u64,
    pub input: String,
    pub score: u32,
    pub streak: u32,
    pub delivered: u32,
    pub invalid: bool,
    had_error: bool,
}

impl Game {
    pub fn new(seed: u64) -> Self {
        let mut game = Self {
            words: include_str!("../assets/words.txt").lines().collect(),
            queue: VecDeque::new(), state: seed | 1, input: String::new(),
            score: 0, streak: 0, delivered: 0, invalid: false, had_error: false,
        };
        for _ in 0..3 { game.fill(""); }
        game
    }

    fn fill(&mut self, previous: &str) {
        let options = self.words.iter().copied().filter(|word|
            *word != previous && !self.queue.contains(word)).collect::<Vec<_>>();
        self.state ^= self.state << 13;
        self.state ^= self.state >> 7;
        self.state ^= self.state << 17;
        self.queue.push_back(options[(self.state % options.len() as u64) as usize]);
    }

    pub fn word(&self, index: usize) -> &'static str { self.queue[index] }

    pub fn accept(&mut self) -> Option<u32> {
        let actual = self.input.to_lowercase();
        let expected = self.word(0).to_lowercase();
        self.invalid = !expected.starts_with(&actual);
        if self.invalid {
            self.streak = 0;
            self.had_error = true;
        } else if actual == expected {
            if !self.had_error { self.streak += 1; }
            let bonus = (1 + self.streak / 3).min(3);
            self.score += bonus;
            self.delivered += 1;
            self.had_error = false;
            self.input.clear();
            let previous = self.queue.pop_front().expect("Drei Pakete stehen bereit.");
            self.fill(previous);
            return Some(bonus);
        }
        None
    }
}

pub struct UpdateNotice {
    pub version: String,
    pub notes: String,
}

impl UpdateNotice {
    pub fn parse(text: &str) -> Option<Self> {
        let (version, notes) = text.trim().split_once('\n').unwrap_or((text.trim(), ""));
        let version = version.trim().trim_start_matches('v');
        fn numbers(version: &str) -> Option<[u32; 3]> {
            let parts = version.split('.').map(str::parse::<u32>).collect::<Result<Vec<_>, _>>().ok()?;
            parts.try_into().ok()
        }
        (numbers(version)? > numbers(VERSION)?).then(|| Self {
            version: version.to_owned(), notes: notes.trim().to_owned(),
        })
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn bundled_texts_and_unicode_limits() {
        assert_eq!(lessons().len(), 22);
        assert_eq!(target_text("  Öl\n und   Salz", 6).iter().collect::<String>(), "Öl und");
        assert_eq!(target_text("ü!", 7).iter().collect::<String>(), "ü! ü! ü");
    }

    #[test]
    fn practice_tracks_corrections_and_lock() {
        let lesson = Lesson { title: "Test".into(), text: "Ärger".into() };
        let mut run = Run::new(lesson, Mode::Practice, 0, 0).unwrap();
        run.input = "Äa".into();
        run.sync_input(false);
        assert_eq!(run.keys[&'r'], (1, 1));
        run.input = "Ä".into();
        run.sync_input(true);
        assert_eq!(run.input, "Äa");
        run.input = "Ä".into();
        run.sync_input(false);
        run.input.push_str("rger");
        run.sync_input(false);
        assert!(run.finished());
        assert_eq!((run.attempts, run.errors), (6, 1));
    }

    #[test]
    fn wortpost_awards_series_and_resets_on_error() {
        let mut game = Game::new(7);
        for bonus in [1, 1, 2] {
            let word = game.word(0);
            game.input.push_str(word);
            assert_eq!(game.accept(), Some(bonus));
        }
        assert_eq!(game.score, 4);
        let previous = game.word(0);
        game.input.push('!');
        assert_eq!(game.accept(), None);
        assert_eq!(game.streak, 0);
        game.input = previous.to_owned();
        assert_eq!(game.accept(), Some(1));
        assert!(!game.queue.contains(&previous));
    }

    #[test]
    fn update_notice_requires_a_newer_local_version() {
        assert!(UpdateNotice::parse("0.7.2\nGleich").is_none());
        assert!(UpdateNotice::parse("0.7.1\nÄlter").is_none());
        assert!(UpdateNotice::parse("https://example.com").is_none());
        let notice = UpdateNotice::parse("v0.8.0\r\nNeue Texte.").unwrap();
        assert_eq!(notice.version, "0.8.0");
        assert_eq!(notice.notes, "Neue Texte.");
        assert!(!Settings::default().auto_update);
    }
}
