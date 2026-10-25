# Tetris Touch

Eigenständiges Tetris-Spiel für Desktop und Smartphone. Die originale HTML-Datei ist unverändert als `index.html` eingebunden; JavaScript und CSS sind enthalten. Es sind keine Pakete, Build-Schritte, externen Dienste oder Zugangsdaten nötig.

## Lokal starten

Im Repository-Verzeichnis:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Anschließend im Browser `http://127.0.0.1:8000` öffnen. Beenden mit Strg+C.

## GitHub Pages

Nach dem Merge in `main` im Repository **Settings → Pages** öffnen:

1. Unter **Build and deployment → Source** „Deploy from a branch“ wählen.
2. Branch `main` und Ordner `/ (root)` auswählen und speichern.

GitHub Pages veröffentlicht die `index.html` direkt. `.nojekyll` kennzeichnet die Website als statische Dateien ohne Jekyll-Verarbeitung. Die Veröffentlichungsadresse wird in den Pages-Einstellungen angezeigt.

## Steuerung

- Smartphone: Buttons zum Bewegen, Drehen und Fallenlassen; auf dem Spielfeld wischen zum Bewegen und Absenken, tippen zum Drehen.
- Tastatur: Pfeiltasten bewegen und drehen; Leertaste lässt den Stein sofort fallen. `P` oder Escape pausiert.
- „Neu“ startet neu. Der Bestwert wird lokal im Browser gespeichert.

## iOS-Zoom-Fix

Die originale Viewport-Konfiguration, `touch-action`-Regeln und nicht passiven Gesture-/Touch-Listener sind erhalten. Sie unterdrücken Zoom-Gesten im Spielbereich. Das Verhalten auf echten iPhones sollte zusätzlich in Safari geprüft werden.
