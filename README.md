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

## Branch vor dem Merge testen

Die Änderungen können unabhängig von `main` geprüft werden:

```sh
git fetch origin
git switch <dein-feature-branch>
git pull --ff-only
python3 -m http.server 8000 --bind 127.0.0.1
```

Im Browser `http://127.0.0.1:8000` öffnen. Start, Bewegung, Rotation, Sofort-Fallenlassen, Pause/Fortsetzen und Neustart prüfen.

Für einen Test in Safari auf einem echten iPhone den Server auf einem Rechner im selben vertrauenswürdigen WLAN stattdessen mit `python3 -m http.server 8000 --bind 0.0.0.0` starten. Auf dem iPhone `http://<LAN-IP-des-Rechners>:8000` öffnen. Tippen, Wischen, gehaltene Steuertasten sowie wiederholtes schnelles Tippen und Pinch-Gesten prüfen: Im Spielbereich soll kein Zoom ausgelöst werden. Den Server anschließend mit Strg+C beenden.

### Cloudflare-Vorschau direkt aus dem PR

Die freigegebene Version bleibt unter https://davvidk.github.io/tetris/ und wird erst durch einen Merge nach `main` aktualisiert.

Cloudflare Pages kann dasselbe GitHub-Repository anbinden und für Feature-Branches beziehungsweise Pull Requests eigene Vorschau-URLs erzeugen. Änderungen pushen, den Browser-Test und Cloudflare-Build abwarten und die Preview-URL am PR öffnen. Erst nach deinem Test wird gemerged. Es ist kein Download und kein zusätzliches Repository nötig.

Die Anbindung an dein Cloudflare-Konto ist noch erforderlich. Die vollständigen Einstellungen stehen in [docs/preview-setup.md](docs/preview-setup.md): Framework `None`, Build `bash scripts/build-preview.sh`, Ausgabe `dist`, Production-Branch `main`, Preview-Builds für Feature-Branches aktivieren. Für den ersten Test den Branch `feat/separate-preview` verwenden; vor dem Merge enthält `main` das Build-Skript noch nicht.

Der Workflow in diesem PR führt ausschließlich Browser-Tests aus und veröffentlicht keine PR-Stände auf der normalen GitHub-Pages-Adresse. Cloudflare und die Tests laufen unabhängig. Die Browser-Tests ersetzen den manuellen Test auf echtem iOS Safari nicht.

Die Tests können mit Node.js 24 und Playwright 1.62.1 auch lokal ausgeführt werden. Bei laufendem Python-Server:

```sh
npm install --prefix /tmp/tetris-tests --no-audit --no-fund playwright@1.62.1
/tmp/tetris-tests/node_modules/.bin/playwright install chromium
NODE_PATH=/tmp/tetris-tests/node_modules node tests/smoke.cjs
```
