# Tippo v0.7.2 für Windows

Native Rust-App mit egui und einem eigenen Windows-Fenster. Die Oberfläche verwendet die Texte, Farben und SVG-Symbole der Tippo-Website. Eigene Vorlagen, Testergebnisse, Einstellungen und der Wortpost-Rekord werden lokal in den App-Daten gespeichert.

## Windows-Cloud-Build

Lege den Inhalt dieses Ordners einschließlich des versteckten Ordners `.github` in die Wurzel eines GitHub-Repositorys. Starte dort unter **Actions → Tippo Windows → Run workflow** den Windows-Runner. Der Workflow führt die Rust-Tests und die Oberflächenchecks bei zwei Fenstergrößen aus. Anschließend erzeugt er ein Artefakt mit `Tippo-v0.7.2.exe` und ihrer SHA-256-Prüfsumme.

Die App benötigt weder GitHub-Zugangsdaten noch einen API-Schlüssel. Der Build setzt die Repository-Adresse aus dem GitHub-Workflow. Die App öffnet den Link bei einem Klick in den Einstellungen.

## Update-Hinweise

Unter **Einstellungen → Tippo v0.7.2** steht der Schalter **Automatische Updates** standardmäßig auf aus. Solange kein Updater eingebaut ist, steuert er die Anzeige eines lokalen Hinweises beim Start. Mit **Update-Info** lässt sich die Seite jederzeit öffnen.

Für einen lokalen Hinweis lege eine UTF-8-Datei `update-info.txt` neben die EXE. Die erste Zeile enthält eine neuere Version und der restliche Inhalt die Neuerungen. Ein Beispiel für den Inhalt

```text
0.8.0
Neue Übungstexte und Verbesserungen für kleine Fenster.
```

Die App zeigt den Hinweis im Stil der bisherigen 404-Karte. Der Hinweis löst keine Installation und keinen Download aus.

## Windows-Signatur

Der Workflow erstellt eine unsignierte EXE. Für Authenticode benötigst du ein vertrauenswürdiges Herausgeberzertifikat. SmartScreen kann auch bei einer sauberen EXE ohne etablierte Reputation nachfragen.
