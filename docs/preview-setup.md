# Cloudflare Pages: Vorschau direkt aus dem Pull Request

Die freigegebene Website bleibt https://davvidk.github.io/tetris/. GitHub Pages veröffentlicht dort weiterhin nur `main`, `/ (root)`. Cloudflare Pages stellt unabhängig davon Vorschauen aus demselben Repository bereit. Kein zweites Repository und kein Cloudflare-Token im Projekt sind nötig.

## Einmalige Verbindung im Cloudflare-Konto

Die Cloudflare-GitHub-Verbindung kann nicht mit den GitHub-Rechten dieser Codex-Sitzung eingerichtet werden. Ein Cloudflare-Projekt ist deshalb noch nicht angelegt.

1. Im Cloudflare-Dashboard **Workers & Pages** öffnen und ein **Pages**-Projekt mit Git-Integration erstellen (nicht einen Worker und nicht „Direct Upload“).
2. GitHub verbinden und der Cloudflare-GitHub-App Zugriff auf `davvidk/tetris` geben. Das Repository auswählen.
3. Folgende Build-Einstellungen verwenden:

   | Einstellung | Wert |
   | --- | --- |
   | Projektname | `tetris-preview` (sofern verfügbar) |
   | Production branch | `main` |
   | Framework preset | `None` |
   | Build command | `bash scripts/build-preview.sh` |
   | Build output directory | `dist` |
   | Root directory | Repository-Hauptverzeichnis / leer lassen |
   | Environment variables / Secrets | Keine erforderlich |

4. In den Branch-/Deployment-Einstellungen Preview-Deployments für alle gewünschten Feature-Branches aktivieren. Für **Production** und **Preview** denselben Build-Befehl und dasselbe Output-Verzeichnis verwenden.
5. Für den ersten Test ausdrücklich den offenen PR #2 beziehungsweise `feat/separate-preview` bauen. Das Build-Skript existiert vor dem Merge nur auf diesem Branch; ein initialer Build von `main` mit diesem Befehl kann daher noch fehlschlagen. Nach dem Merge funktioniert derselbe Befehl auch auf `main`. Falls Cloudflare beim Verbinden zunächst nur `main` baut, danach den Feature-Branch auswählen und dessen Deployment starten; alternativ einen neuen Commit auf diesem Branch pushen.
6. Nach erfolgreichem Deployment die **Preview**-URL aus dem Cloudflare-Check am PR beziehungsweise aus der Deployment-Ansicht öffnen. Cloudflare kann für die PR-Integration zusätzliche GitHub-App-Berechtigungen anfordern; nur für das ausgewählte Repository freigeben.

Die Oberfläche kann andere Bezeichnungen verwenden. Entscheidend sind die Pages-Git-Integration, `main` als Production-Branch und aktivierte Preview-Builds für Feature-Branches.

## Vor jedem Merge

1. Änderungen auf einen Feature-Branch pushen und einen PR nach `main` öffnen.
2. Den erfolgreichen Browser-Test im GitHub-Check und den erfolgreichen Cloudflare-Preview-Build abwarten. Beide laufen unabhängig; ein erfolgreicher Cloudflare-Build allein bestätigt keine bestandenen Browser-Tests.
3. Die zu diesem PR gehörende Preview-URL öffnen. Das Deployment muss den aktuellen Commit des PRs anzeigen. Keine Vorschau-Adresse vorab aus dem Projektnamen ableiten; die tatsächlich erzeugte URL aus dem Check verwenden.
4. Start, Wischen, Tippen/Drehen, gehaltene Steuertasten, Hard Drop, Pause/Fortsetzen und Neustart testen. Den Zoom-Fix zusätzlich auf einem echten iPhone in Safari prüfen.
5. Erst danach den PR mergen. GitHub Pages veröffentlicht dann `main` unter der bisherigen Spieladresse. Cloudflare verändert die GitHub-Pages-Einstellungen nicht.

Cloudflare legt zusätzlich eine eigene Production-Adresse für das Pages-Projekt an; diese ist von der freigegebenen GitHub-Pages-Spieladresse unabhängig. Für den Vorabtest immer die zum PR gehörende Preview-URL verwenden. Vorschauen sind standardmäßig öffentlich. Bestwerte werden pro Browser-Origin gespeichert und deshalb nicht automatisch von der normalen Spieladresse in die Vorschau übernommen.

## Lokalen Build prüfen

```sh
bash scripts/build-preview.sh
cmp index.html dist/index.html
python3 -m http.server 8000 --bind 127.0.0.1 --directory dist
```

Der Build kopiert ausschließlich `index.html` und `.nojekyll` nach `dist/`. Spiellogik, Touch-Steuerung und iOS-Zoom-Fix werden nicht verändert. `dist/` ist ein ignoriertes lokales Build-Ergebnis. Für die normale GitHub-Pages-Veröffentlichung bleibt die `index.html` im Repository-Hauptverzeichnis maßgeblich.

Offizielle Anleitungen:

- https://developers.cloudflare.com/pages/get-started/git-integration/
- https://developers.cloudflare.com/pages/configuration/preview-deployments/
- https://developers.cloudflare.com/pages/configuration/branch-build-controls/
