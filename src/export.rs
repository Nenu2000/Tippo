use ab_glyph::{point, Font, FontRef, ScaleFont};
use std::{fs, io, path::Path};

use crate::{design::read_font, model::Record};

pub fn png_image(path: &Path, record: &Record, certificate: bool) -> io::Result<()> {
    let font_bytes = read_font(if certificate { "segoeui.ttf" } else { "consola.ttf" })
        .ok_or_else(|| io::Error::new(io::ErrorKind::NotFound, "Windows-Schriftart fehlt."))?;
    let font = FontRef::try_from_slice(&font_bytes).map_err(io::Error::other)?;
    let mut lines = Vec::new();
    if !certificate {
        for line in record.report().lines() {
            let chars = line.chars().collect::<Vec<_>>();
            if chars.is_empty() { lines.push(String::new()); }
            lines.extend(chars.chunks(82).map(|part| part.iter().collect::<String>()));
        }
    }
    let (width, height) = if certificate { (1200, 850) }
        else { (1000, (lines.len() * 22 + 148).max(1350)) };
    let mut pixels = vec![255u8; width * height * 3];
    let mut write = |text: &str, size: f32, x: f32, y: f32| {
        let scaled = font.as_scaled(size);
        let mut cursor = point(x, y);
        let mut previous = None;
        for char in text.chars() {
            let id = scaled.glyph_id(char);
            if let Some(last) = previous { cursor.x += scaled.kern(last, id); }
            if let Some(glyph) = font.outline_glyph(id.with_scale_and_position(size, cursor)) {
                let bounds = glyph.px_bounds();
                glyph.draw(|offset_x, offset_y, coverage| {
                    let px = bounds.min.x as i32 + offset_x as i32;
                    let py = bounds.min.y as i32 + offset_y as i32;
                    if px >= 0 && py >= 0 && px < width as i32 && py < height as i32 {
                        let index = (py as usize * width + px as usize) * 3;
                        let value = (255.0 - coverage * 231.0) as u8;
                        for channel in &mut pixels[index..index + 3] { *channel = (*channel).min(value); }
                    }
                });
            }
            cursor.x += scaled.h_advance(id);
            previous = Some(id);
        }
    };
    if certificate {
        write("Tippo", 35.0, 95.0, 103.0);
        write("URKUNDE", 88.0, 95.0, 212.0);
        write("Diese Urkunde erhält", 29.0, 95.0, 312.0);
        let name = if record.name.is_empty() { "Tippo-Schüler/in" } else { &record.name };
        write(name, 54.0, 95.0, 391.0);
        write(&format!("{} Anschläge pro Minute", record.speed), 45.0, 95.0, 515.0);
        write(&format!("{:.1} % Genauigkeit · {} Anschläge", record.accuracy, record.attempts), 31.0, 95.0, 609.0);
        write(&record.title, 29.0, 95.0, 689.0);
        write(&record.date, 25.0, 95.0, 757.0);
    } else {
        for (index, line) in lines.iter().enumerate() {
            write(line, 18.0, 58.0, 74.0 + index as f32 * 22.0);
        }
    }
    let mut encoder = png::Encoder::new(fs::File::create(path)?, width as u32, height as u32);
    encoder.set_color(png::ColorType::Rgb);
    encoder.set_depth(png::BitDepth::Eight);
    let mut writer = encoder.write_header().map_err(io::Error::other)?;
    writer.write_image_data(&pixels).map_err(io::Error::other)?;
    writer.finish().map_err(io::Error::other)?;
    Ok(())
}

#[cfg(windows)]
pub fn print_file(path: &Path) -> io::Result<()> {
    use std::os::windows::ffi::OsStrExt;
    #[link(name = "shell32")]
    extern "system" {
        fn ShellExecuteW(hwnd: isize, verb: *const u16, file: *const u16,
            parameters: *const u16, directory: *const u16, show: i32) -> isize;
    }
    let verb = "print".encode_utf16().chain([0]).collect::<Vec<_>>();
    let file = path.as_os_str().encode_wide().chain([0]).collect::<Vec<_>>();
    // Windows receives a path and a verb separately. No command line is constructed.
    let result = unsafe { ShellExecuteW(0, verb.as_ptr(), file.as_ptr(), std::ptr::null(), std::ptr::null(), 1) };
    if result > 32 { Ok(()) } else { Err(io::Error::other("Windows hat für diese Datei keinen Druckbefehl.")) }
}

#[cfg(not(windows))]
pub fn print_file(_: &Path) -> io::Result<()> {
    Err(io::Error::new(io::ErrorKind::Unsupported, "Drucken ist in der Windows-Version verfügbar."))
}

#[cfg(windows)]
pub fn error_sound() {
    #[link(name = "user32")]
    extern "system" { fn MessageBeep(kind: u32) -> i32; }
    // MessageBeep queues the standard Windows sound.
    unsafe { MessageBeep(u32::MAX); }
}

#[cfg(not(windows))]
pub fn error_sound() {}
