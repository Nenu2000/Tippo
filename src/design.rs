use eframe::egui::{self, Color32, FontData, FontDefinitions, FontFamily, FontId, Frame,
    Image, ImageSource, Rect, RichText, Stroke, Ui, Vec2};
use std::{fs, path::PathBuf};

pub const BG: Color32 = Color32::from_rgb(7, 7, 8);
pub const CARD: Color32 = Color32::from_rgb(17, 17, 20);
pub const WASH: Color32 = Color32::from_rgb(23, 23, 28);
pub const LINE: Color32 = Color32::from_rgb(40, 40, 48);
pub const BORDER: Color32 = Color32::from_rgb(115, 115, 128);
pub const WHITE: Color32 = Color32::WHITE;
pub const MUTED: Color32 = Color32::from_rgb(173, 173, 185);
pub const BLUE: Color32 = Color32::from_rgb(73, 98, 244);
pub const LIGHT_BLUE: Color32 = Color32::from_rgb(165, 177, 255);
pub const GOLD: Color32 = Color32::from_rgb(222, 194, 141);
pub const RED: Color32 = Color32::from_rgb(255, 154, 144);

#[derive(Clone, Copy)]
pub enum Icon { Logo, Home, Chart, Doc, Game, Book, Pie, Bolt, Settings, Close, Chevron, Medal, Parcel }

pub fn icon_source(icon: Icon) -> ImageSource<'static> {
    match icon {
        Icon::Logo => egui::include_image!("../assets/logo.svg"),
        Icon::Home => egui::include_image!("../assets/home.svg"),
        Icon::Chart => egui::include_image!("../assets/chart.svg"),
        Icon::Doc => egui::include_image!("../assets/doc.svg"),
        Icon::Game => egui::include_image!("../assets/game.svg"),
        Icon::Book => egui::include_image!("../assets/book.svg"),
        Icon::Pie => egui::include_image!("../assets/pie.svg"),
        Icon::Bolt => egui::include_image!("../assets/bolt.svg"),
        Icon::Settings => egui::include_image!("../assets/set.svg"),
        Icon::Close => egui::include_image!("../assets/x.svg"),
        Icon::Chevron => egui::include_image!("../assets/chev.svg"),
        Icon::Medal => egui::include_image!("../assets/medal.svg"),
        Icon::Parcel => egui::include_image!("../assets/box.svg"),
    }
}

pub fn image(icon: Icon, width: f32) -> Image<'static> {
    let height = if matches!(icon, Icon::Logo) { width * 102.0 / 340.0 } else { width };
    Image::new(icon_source(icon)).fit_to_exact_size(egui::vec2(width, height))
}

pub fn read_font(file: &str) -> Option<Vec<u8>> {
    let directory = PathBuf::from(std::env::var_os("WINDIR")?).join("Fonts");
    fs::read(directory.join(file)).ok()
}

pub fn configure(ctx: &egui::Context) {
    let mut visuals = egui::Visuals::dark();
    visuals.panel_fill = BG;
    visuals.window_fill = CARD;
    visuals.extreme_bg_color = WASH;
    visuals.faint_bg_color = WASH;
    visuals.selection.bg_fill = BLUE;
    visuals.override_text_color = Some(WHITE);
    for widget in [&mut visuals.widgets.inactive, &mut visuals.widgets.hovered, &mut visuals.widgets.active] {
        widget.corner_radius = 9.into();
        widget.bg_stroke = Stroke::new(1.0, LINE);
    }
    visuals.widgets.inactive.bg_fill = WASH;
    visuals.widgets.hovered.bg_fill = Color32::from_rgb(42, 42, 52);
    visuals.widgets.active.bg_fill = Color32::from_rgb(54, 61, 102);
    ctx.set_visuals(visuals);
    ctx.style_mut(|style| {
        style.spacing.item_spacing = egui::vec2(10.0, 10.0);
        style.spacing.button_padding = egui::vec2(12.0, 7.0);
        style.text_styles.insert(egui::TextStyle::Body, FontId::proportional(16.0));
    });
    let mut fonts = FontDefinitions::default();
    if let Some(bytes) = read_font("segoeui.ttf") {
        fonts.font_data.insert("tippo-ui".to_owned(), FontData::from_owned(bytes).into());
        fonts.families.entry(FontFamily::Proportional).or_default().insert(0, "tippo-ui".to_owned());
    }
    for (family, files) in [("tippo-display", ["bahnschrift.ttf", "segoeuib.ttf"]), ("tippo-serif", ["pala.ttf", "georgia.ttf"])] {
        let mut stack = fonts.families[&FontFamily::Proportional].clone();
        if let Some(bytes) = files.iter().find_map(|file| read_font(file)) {
            fonts.font_data.insert(family.to_owned(), FontData::from_owned(bytes).into());
            stack.insert(0, family.to_owned());
        }
        fonts.families.insert(FontFamily::Name(family.into()), stack);
    }
    ctx.set_fonts(fonts);
    egui_extras::install_image_loaders(ctx);
}

pub fn display(size: f32) -> FontId { FontId::new(size, FontFamily::Name("tippo-display".into())) }

pub fn headline(text: impl Into<String>, size: f32) -> RichText {
    RichText::new(text).font(display(size)).strong()
}

pub fn label(text: impl Into<String>) -> RichText { RichText::new(text).size(12.0).color(MUTED).strong() }

pub fn card(fill: Color32, margin: i8, radius: u8) -> Frame {
    Frame::new().fill(fill).stroke(Stroke::new(1.0, LINE)).corner_radius(radius)
        .inner_margin(egui::Margin::same(margin))
}

pub fn pill(ui: &mut Ui, text: &str, primary: bool, height: f32) -> egui::Response {
    ui.add(egui::Button::new(headline(text.to_uppercase(), if height < 48.0 { 15.0 } else { 18.0 }))
        .fill(if primary { BLUE } else { Color32::TRANSPARENT })
        .stroke(if primary { Stroke::NONE } else { Stroke::new(1.4, BORDER) })
        .corner_radius(100).min_size(egui::vec2(68.0, height)))
}

pub fn icon_button(ui: &mut Ui, icon: Icon, text: &str, width: f32, selected: bool, expanded: bool) -> egui::Response {
    let (rect, response) = ui.allocate_exact_size(egui::vec2(width, 44.0), egui::Sense::click());
    response.widget_info(|| egui::WidgetInfo::labeled(egui::WidgetType::Button, ui.is_enabled(), text));
    if selected || response.hovered() || response.has_focus() {
        ui.painter().rect_filled(rect, 12.0, Color32::from_rgb(36, 36, 44));
    }
    let center = if expanded { rect.left_center() + Vec2::new(24.0, 0.0) } else { rect.center() };
    let size = if matches!(icon, Icon::Logo) { egui::vec2(52.0, 15.6) } else { Vec2::splat(22.0) };
    image(icon, size.x).paint_at(ui, Rect::from_center_size(center, size));
    if expanded {
        ui.painter().text(center + Vec2::new(22.0, 0.0), egui::Align2::LEFT_CENTER, text, FontId::proportional(15.0), WHITE);
    }
    response.on_hover_text(text)
}

pub fn ring(ui: &mut Ui, seconds: u32, goal: u32, size: f32) {
    let (rect, _) = ui.allocate_exact_size(Vec2::splat(size), egui::Sense::hover());
    let radius = size * 0.435;
    ui.painter().circle_stroke(rect.center(), radius, Stroke::new(size * 0.085, Color32::from_rgb(48, 48, 57)));
    let fraction = (seconds as f32 / goal.max(1) as f32).clamp(0.0, 1.0);
    if fraction > 0.0 {
        let end = (fraction * 80.0).ceil() as u32;
        let points = (0..=end).map(|n| {
            let angle = std::f32::consts::TAU * fraction * n as f32 / end as f32 - std::f32::consts::FRAC_PI_2;
            rect.center() + Vec2::angled(angle) * radius
        }).collect::<Vec<_>>();
        let thickness = size * 0.085;
        ui.painter().circle_filled(points[0], thickness / 2.0, BLUE);
        ui.painter().circle_filled(points[end as usize], thickness / 2.0, BLUE);
        ui.painter().add(egui::Shape::line(points, Stroke::new(thickness, BLUE)));
    }
    ui.painter().text(rect.center() - egui::vec2(0.0, size * 0.051), egui::Align2::CENTER_CENTER,
        crate::model::clock(seconds), display(size * 0.23), WHITE);
    ui.painter().text(rect.center() + egui::vec2(0.0, size * 0.148), egui::Align2::CENTER_CENTER,
        "HEUTE GEÜBT", FontId::proportional((size * 0.059).max(9.0)), MUTED);
}

pub fn spark(ui: &mut Ui, values: &[u32]) {
    let (rect, _) = ui.allocate_exact_size(egui::vec2(ui.available_width(), 92.0), egui::Sense::hover());
    if values.len() < 2 {
        ui.painter().text(rect.left_center(), egui::Align2::LEFT_CENTER, "Noch zu wenig Ergebnisse.",
            FontId::proportional(13.0), MUTED);
        return;
    }
    for fraction in [0.25, 0.5, 0.75] {
        let y = rect.top() + rect.height() * fraction;
        ui.painter().hline(rect.x_range(), y, Stroke::new(1.0, LINE));
    }
    let max = values.iter().copied().max().unwrap_or(1).max(10) as f32 * 1.10;
    let points = values.iter().enumerate().map(|(index, speed)| egui::pos2(
        rect.left() + index as f32 * rect.width() / (values.len() - 1) as f32,
        rect.bottom() - *speed as f32 * rect.height() / max,
    )).collect();
    ui.painter().add(egui::Shape::line(points, Stroke::new(2.6, BLUE)));
}
