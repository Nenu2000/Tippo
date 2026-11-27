<div align="center">

<!-- Logo: Datei in /assets ablegen und den Pfad anpassen -->
<img src="assets/Logo.png" alt="Tippo" width="180">

# Tippo

**Das Zehnfinger-Schreibtraining für Windows. Schnell, nativ und Open Source.**

Eine freie Alternative zu Tubp 10.0, geschrieben in Rust.

[![Version](https://img.shields.io/badge/Version-0.7.2-4D6BFE?style=for-the-badge)](https://github.com/Nenu2000/Tippo)
[![Plattform](https://img.shields.io/badge/Windows-x64-0078D4?style=for-the-badge&logo=windows&logoColor=white)](#installation)
[![Rust](https://img.shields.io/badge/Rust-egui-DEA584?style=for-the-badge&logo=rust&logoColor=black)](https://www.rust-lang.org/)
[![Lizenz](https://img.shields.io/badge/Lizenz-MIT-3DA35D?style=for-the-badge)](#lizenz)

[Download](#installation) · [Funktionen](#funktionen) · [Selbst bauen](#aus-dem-quellcode-bauen) · [Mitmachen](#mitmachen) · [Fehler melden](https://github.com/Nenu2000/Tippo/issues)

</div>

---

## Über das Projekt

Tippo trainiert das Schreiben mit zehn Fingern. Die App ist eine native Windows-Anwendung mit eigenem Fenster, ohne Browser und ohne Konto. Sie startet schnell, läuft offline und speichert alle Daten lokal auf deinem Rechner.

Die Oberfläche verwendet die Texte, Farben und SVG-Symbole der Tippo-Website, damit sich App und Web gleich anfühlen.

## Funktionen

- **Native Windows-App.** Rust und egui, eigenes Fenster, kein Webview.
- **Übungstexte und eigene Vorlagen.** Trainiere mit den mitgelieferten Texten oder lege eigene Vorlagen an.
- **Testergebnisse.** Deine Ergebnisse bleiben gespeichert, damit du deinen Fortschritt siehst.
- **Wortpost-Rekord.** Dein Bestwert wird lokal festgehalten.
- **Einstellungen.** Alles Wichtige lässt sich in der App anpassen.
- **Lokale Datenhaltung.** Vorlagen, Ergebnisse, Einstellungen und Rekorde liegen in den App-Daten. Es sind weder Zugangsdaten noch ein API-Schlüssel nötig.
- **Dezenter Update-Hinweis.** Neue Versionen werden nur angezeigt, nie automatisch installiert. Details unter [Updates](#updates).
- **Geprüfte Builds.** Jeder Build läuft über GitHub Actions und führt die Rust-Tests sowie Oberflächenchecks bei zwei Fenstergrößen aus.

## Screenshots

<!-- Screenshots in /assets ablegen und die Pfade anpassen -->

| Start | Schreiben | Ergebnis |
| :---: | :---: | :---: |
| <img src="assets/screenshot-start.png" alt="Startseite" width="280"> | <img src="assets/screenshot-schreiben.png" alt="Schreibansicht" width="280"> | <img src="assets/screenshot-ergebnis.png" alt="Ergebnis" width="280"> |

## Installation

### Voraussetzungen

- Windows 10 oder neuer, 64 Bit
- Keine weitere Software nötig

### Schritt für Schritt

1. Lade [`Tippo-Windows-x64-UI.zip`](https://github.com/Nenu2000/Tippo/blob/main/Tippo-Windows-x64-UI.zip) herunter.
2. Prüfe die Datei wie [unten beschrieben](#download-prüfen).
3. Entpacke das Archiv in einen Ordner deiner Wahl.
4. Starte die enthaltene `.exe`.

> [!NOTE]
> Die App ist nicht installiert, sondern läuft direkt aus dem Ordner. Zum Entfernen löschst du einfach den Ordner. Deine Daten liegen getrennt in den App-Daten.

### Download prüfen

Vergleiche die SHA-256-Prüfsumme mit dem Eintrag in [`SHA256.txt`](SHA256.txt). In der PowerShell:

```powershell
Get-FileHash .\Tippo-Windows-x64-UI.zip -Algorithm SHA256
```

Stimmt der Wert nicht überein, führe die Datei nicht aus und melde das als [Issue](https://github.com/Nenu2000/Tippo/issues).

### Hinweis von Windows SmartScreen

Die EXE ist derzeit nicht mit einem Herausgeberzertifikat signiert. Windows kann deshalb beim ersten Start warnen. Das passiert bei Programmen ohne etablierte Reputation, auch wenn sie sauber sind. Wenn die Prüfsumme stimmt, wählst du **Weitere Informationen** und dann **Trotzdem ausführen**.

## Updates

Unter **Einstellungen → Tippo v0.7.2** gibt es den Schalter **Automatische Updates**. Er ist standardmäßig aus. Solange kein Updater eingebaut ist, steuert er nur, ob beim Start ein lokaler Hinweis erscheint. Mit **Update-Info** öffnest du die Projektseite jederzeit selbst.

Für einen lokalen Hinweis legst du neben die EXE eine UTF-8-Datei `update-info.txt`. Die erste Zeile enthält die neuere Version, der Rest die Neuerungen:

```text
0.8.0
Neue Übungstexte und Verbesserungen für kleine Fenster.
```

Der Hinweis löst weder eine Installation noch einen Download aus.

## Aus dem Quellcode bauen

### Voraussetzungen

- [Rust](https://www.rust-lang.org/tools/install) (stable)
- Windows 10 oder neuer
- Git

### Lokal

```powershell
git clone https://github.com/Nenu2000/Tippo.git
cd Tippo

cargo test
cargo run --release
```

Die fertige Datei liegt danach unter `target\release\`.

### Mit GitHub Actions

Der Workflow **Tippo Windows** baut die App auf einem Windows-Runner:

1. Öffne im Repository **Actions → Tippo Windows**.
2. Wähle **Run workflow**.
3. Lade nach dem Lauf das Artefakt herunter. Es enthält `Tippo-v0.7.2.exe` und die SHA-256-Prüfsumme.

Der Workflow führt vor dem Build die Rust-Tests und die Oberflächenchecks bei zwei Fenstergrößen aus. Er braucht keine Geheimnisse und keine Zugangsdaten. Die Repository-Adresse setzt der Build selbst aus dem Workflow.

> [!WARNING]
> Der Workflow erzeugt eine **unsignierte** EXE. Für eine Authenticode-Signatur ist ein vertrauenswürdiges Herausgeberzertifikat nötig.

## Projektstruktur

```text
Tippo/
├── .github/workflows/   Windows-Build, Tests und Oberflächenchecks
├── assets/              Symbole, Schriften und Bilder
├── src/                 Quellcode der App (Rust)
├── Cargo.toml           Abhängigkeiten und Build-Konfiguration
├── SHA256.txt           Prüfsummen der Downloads
└── README.md
```

## Roadmap

- [x] Native Windows-App mit eigenem Fenster
- [x] Eigene Vorlagen, Testergebnisse und Rekord lokal speichern
- [x] Automatisierte Tests und Oberflächenchecks in der Cloud
- [ ] Eingebauter Updater
- [ ] Signierte EXE mit Herausgeberzertifikat
- [ ] Weitere Übungstexte und Trainingsmodi

Ideen und Wünsche sammeln wir in den [Issues](https://github.com/Nenu2000/Tippo/issues).

## Mitmachen

Beiträge sind willkommen, egal ob Fehlerbericht, neuer Übungstext oder Code.

1. Erstelle einen [Fork](https://github.com/Nenu2000/Tippo/fork) und einen Branch, zum Beispiel `fix/kurze-beschreibung`.
2. Halte dich an das Format und die Prüfungen von Rust:
   ```powershell
   cargo fmt
   cargo clippy
   cargo test
   ```
3. Beschreibe deine Änderung im Pull Request kurz und nenne das Issue, falls es eins gibt.

Bei Fehlern helfen diese Angaben: Windows-Version, Tippo-Version, was du getan hast, was du erwartet hast und was passiert ist. Ein Screenshot hilft oft mehr als viele Worte.

## Sicherheit

Hast du eine Sicherheitslücke gefunden, melde sie bitte nicht öffentlich, sondern über den Reiter **Security** des Repositorys (*Report a vulnerability*).

## Lizenz

<!-- PRÜFEN: Lizenz festlegen und eine Datei LICENSE im Hauptordner anlegen. Ohne Lizenzdatei ist das Projekt rechtlich nicht frei nutzbar. -->

Tippo steht unter der [MIT-Lizenz](LICENSE).

## Rechtliches

Tippo ist ein unabhängiges Projekt und steht in keiner Verbindung zu den Herstellern von Tubp. Alle genannten Produktnamen gehören ihren jeweiligen Inhabern.

<!-- PRÜFEN: Stimmt die folgende Aussage für alle mitgelieferten Übungstexte? -->
Alle mitgelieferten Übungstexte stammen von den Projektautoren oder sind frei nutzbar.

---

<div align="center">

Mit Rust gebaut. © 2026 Tippo. All rights reserved.

</div>
