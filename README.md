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
git switch feat/tetris-github-pages
git pull --ff-only
python3 -m http.server 8000 --bind 127.0.0.1
```

Im Browser `http://127.0.0.1:8000` öffnen. Start, Bewegung, Rotation, Sofort-Fallenlassen, Pause/Fortsetzen und Neustart prüfen.

Für einen Test in Safari auf einem echten iPhone den Server auf einem Rechner im selben vertrauenswürdigen WLAN stattdessen mit `python3 -m http.server 8000 --bind 0.0.0.0` starten. Auf dem iPhone `http://<LAN-IP-des-Rechners>:8000` öffnen. Tippen, Wischen, gehaltene Steuertasten sowie wiederholtes schnelles Tippen und Pinch-Gesten prüfen: Im Spielbereich soll kein Zoom ausgelöst werden. Den Server anschließend mit Strg+C beenden.

### Live-Vorschau ohne Download

Jeder Push auf einen `feat/**`-Branch und jeder Pull Request nach `main` startet unter **Actions → Branch testen** Browser-Tests für Desktop und ein mobiles Touch-Profil.

Für `feat/tetris-github-pages` veröffentlicht der Workflow nach erfolgreichen Tests zusätzlich eine Vorschau unter dem eigenen URL-Pfad `/previews/tetris/`. Es ist kein Merge nötig. Die Original-HTML bleibt unverändert.

Einmalige Aktivierung im Repository:

1. Unter **Settings → Pages → Source** „GitHub Actions“ auswählen.
2. Falls die Umgebung `github-pages` nur bestimmte Branches zulässt, unter **Settings → Environments → github-pages** den Branch `feat/tetris-github-pages` für Deployments zulassen.
3. Unter **Actions → Branch testen** den jüngsten Lauf dieses Branches öffnen und gegebenenfalls erneut ausführen. Nach erfolgreichem Deployment die URL beim Job `preview` öffnen.

Bei der Standardadresse ist die Vorschau unter `https://davvidk.github.io/tetris/previews/tetris/` erreichbar; bei einer eigenen Pages-Domain gilt deren Basisadresse. Diese Adresse funktioniert erst nach erfolgreichem Deployment.

**Hinweis:** GitHub Pages unterstützt pro Repository eine Website. Dieser Vorschau-Workflow veröffentlicht ausschließlich den Vorschau-Pfad; ein vorhandenes Pages-Deployment würde dadurch ersetzt. Im aktuellen `main` liegt noch keine Website. Für eine gleichzeitig weiterlaufende Produktionswebsite mit unabhängigem Deployment ist ein separates Pages-Repository oder ein Vorschau-Anbieter nötig. Nach dem Merge kann für die reguläre Website wieder „Deploy from a branch“, `main`, `/ (root)` eingestellt werden.

Die Browser-Tests ersetzen den manuellen Test des Zoom-Fixes in iOS Safari nicht. Es werden keine Downloads oder Merges für den Browser-Test benötigt.

Die Tests können mit Node.js 24 und Playwright 1.62.1 auch lokal ausgeführt werden. Bei laufendem Python-Server:

```sh
npm install --prefix /tmp/tetris-tests --no-audit --no-fund playwright@1.62.1
/tmp/tetris-tests/node_modules/.bin/playwright install chromium
NODE_PATH=/tmp/tetris-tests/node_modules node tests/smoke.cjs
```
