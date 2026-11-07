# Separates Vorschau-Repository einrichten

Ziel ist `davvidk/testris-preview` (Schreibweise wie angefragt). Das Produktionsrepository `davvidk/tetris` bleibt auf Pages-Quelle `main`, `/ (root)`.

## Einmalige Einrichtung

1. Das öffentliche Repository `davvidk/testris-preview` erstellen. Das aktuelle Codex-GitHub-Token darf keine neuen Repositorys erstellen (GitHub antwortet mit HTTP 403). Die Repository-Erstellung oder eine passende Berechtigung der Anbindung ist daher Voraussetzung.
2. Der Codex-GitHub-Anbindung Zugriff auf das neue Repository gewähren. Codex kann dann die folgenden Schritte übernehmen; kein manuelles Kopieren des Workflows nötig.
3. Die Vorlage `docs/preview-workflow.yml` aus diesem PR im Vorschau-Repository als `.github/workflows/preview.yml` auf `main` speichern.
4. Im Vorschau-Repository Pages-Quelle **GitHub Actions** aktivieren. In der Umgebung `github-pages` Deployments von `main` zulassen. Actions müssen aktiviert sein.
5. Den Workflow **Tetris PR-Vorschau** auf `main` einmal starten. Eine optionale PR-Nummer legt einen bestimmten PR fest; ohne Eingabe wird der neueste aktualisierte offene PR gewählt, andernfalls `main`.
6. Erfolgreiche Browser-Tests und das Pages-Deployment prüfen. Erst dann ist https://davvidk.github.io/testris-preview/ bereit.

## Danach

- Änderungen in einen Feature-Branch von `davvidk/tetris` pushen und einen PR nach `main` öffnen.
- Das Vorschau-Repository sucht alle zehn Minuten nach dem aktuellsten offenen PR. Geplante Actions können verzögert werden. Der Workflow kann auch direkt gestartet werden.
- Unter https://davvidk.github.io/testris-preview/ testen. Die Datei `preview.json` nennt den veröffentlichten Commit. Erst nach erfolgreichem Deployment entspricht die Adresse dem neuen Stand; bei Fehlern bleibt die letzte erfolgreiche Version sichtbar.
- Erst nach Freigabe den PR mergen. GitHub Pages veröffentlicht dann `main` unter https://davvidk.github.io/tetris/.

Das Vorschau-Repository hat nur Leserechte beim Abrufen des öffentlichen Quellrepositorys. Der Build-Job führt dessen Tests ohne Schreibrechte und ohne gespeicherte Checkout-Zugangsdaten aus. Erst der getrennte Deployment-Job bekommt Pages-Schreibrechte, ausschließlich im Vorschau-Repository. Keine persönlichen Tokens oder Cross-Repository-Schreibrechte sind nötig.

Es gibt genau eine gemeinsame Vorschau. Bei mehreren offenen PRs wird der neueste aktualisierte PR gewählt; für parallele Vorschauen pro PR wäre ein anderes Konzept nötig. Ein manuell ausgewählter PR kann beim nächsten Zeitplanlauf ersetzt werden. Nach 60 Tagen ohne Aktivität kann GitHub geplante Workflows in öffentlichen Repositorys deaktivieren; dann wieder aktivieren. Die Vorschau ist öffentlich, ebenso wie das Originalrepository.
