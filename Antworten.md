# Git-Übung – Fragen und Antworten

## Teil A

### A1 – Auf welchem Branch bist du, und welche Branches gibt es noch?

Ich befinde mich auf dem `main` branch. Es gibt noch die beiden feature branches `neuer-titel` und snacks.

### A2 – Welche Dateien meldet `git status` als „untracked“? Was bedeutet das?

Neue Dateien, die im Projektordner entstanden sind, aber noch nicht geaddet wurden, gelten als untracked und werden bei einem commit und push nicht gespeichert/hinzugefügt.

### A3 – `ls -a` zeigt einen Ordner `.git`. Was steckt darin, und was passiert, wenn man ihn löscht?

In dem `.git` Ordner wird die ganze Historie des Repos hinterlegt, und wenn man diesen löscht, so verschwinden alle Befhele (Commits, Push..) und es wird von Git als kein Projekt mehr angesehen.

## Teil B

### B1 – Woran erkennst du in der Ausgabe und im Log, dass es ein Fast-Forward war?

Sowohl `main` als auch `feature/snacks` zeigen auf exakt denselben Commit (5bbfa5a). Der Branch-Zeiger `main` wurde also lediglich auf die Position von `feature/snacks` weitergerückt. Außerdem gibt es im Log keinen separaten Merge Commit.

### B2 – Warum war hier ein Fast-Forward möglich?

Ein Fast-Forward ist immer dann möglich, wenn der Ziel-Branch (`main`) seit dem Abzweigen von `feature/snacks` keine neuen eigenen Commits erhalten hat.

`feature/snacks` hat direkt auf dem Stand von `main` aufgebaut (Commit ea6a719). Da `main` auf diesem Stand stehen geblieben ist und nicht weiterentwickelt wurde, gab es keine Abweichung (keinen Split) im Verlauf und Git musste die Zweige nicht zusammenführen, sondern konnte den Zeiger von `main` einfach nach vorne bewegen.

### Welche Commits haben `preise.js` geändert?

Die Commits b26bfdb (den Seniorenpreis ergänz), 294cecc (den Kinderpreis eingeführt) und d4f3928 (Initialer Import: Grundgerüst der KinoApp) haben die Datei angepasst.

### Unterschiede zwischen „Kinderpreis eingeführt“ und „Seniorenpreis ergänzt“ ansehen:

Kommentar „Kinder unter 14 und Senioren ab 65 zahlen weniger.“ Wurde hinzugefügt. Konstante „SENIORENPREIS = 8.50“ wurde hinzugefügt. Neue Abfrage für Seniorenpreis wurde eingerichtet. Die Bedingung „BerechnePreis“ wurde (fehlerhaft) angepasst.

### Wer hat den Commit gemacht?

Lisa Lehrling

## Teil C

### C1 – Beschreibe in einem Satz, wo der Fehler steckt und was er bewirkt.

Der Fehler befand sich im falschen Zeichen (> statt <) und bewirkte, dass alle Kinder über 14 Jahren den Kinderpreis erhielten.

### C2 – Nach `git add` zeigt `git diff` nichts mehr an, `git diff --staged` aber schon. Warum?

`git diff` vergleicht standardmäßig das Arbeitsverzeichnis (Working Directory) mit der Staging-Area (Index).

Mit `git add` werden die Änderungen in die Staging-Area übertragen

- `git diff` zeigt jetzt nichts mehr an, weil der Code im Arbeitsverzeichnis und in der Staging-Area zu diesem Zeitpunkt identisch ist

- `git diff --staged` vergleicht die Staging-Area mit dem letzten Commit (`HEAD`). Da die Änderungen nun in der Staging-Area liegen und noch nicht committed sind, werden sie hier angezeigt

## Teil D

### D1 – Ist der Commit „Werbebanner eingefügt“ nach dem Revert noch in der Historie? Was ist dazugekommen?

Der Commit wird in der Historie noch angezeigt, aber hinzugekommen ist der neue Commit 198c49c (`HEAD` -> `main`) Revert „Werbebanner eingefügt“.

### D2 – Warum nimmt man in einem Team-Repo `git revert` statt Commits einfach zu löschen?

In einem Team-Repository überschreibt das Löschen von Commits die gemeinsame Historie, was bei anderen Teammitgliedern zu schwerwiegenden Merge-Konflikten und Datenverlusten führen kann.

`git revert` ist sicher, da es die Historie unverändert lässt und das Rückgängigmachen stattdessen transparent als neuen Commit dokumentiert.

## Teil E

### E1 – Was ist der Unterschied zwischen > und >> beim echo-Befehl?

- > (Überschreiben): Leitet die Ausgabe in eine Datei um und überschreibt deren gesamten bisherigen Inhalt. Existiert die Datei noch nicht, wird sie neu erstellt.

  - Beispiel: `echo "Hallo" > datei.txt`

- >> (Anhängen): Leitet die Ausgabe ebenfalls in eine Datei um, fügt den Text aber am Ende der Datei an, ohne den bestehenden Inhalt zu löschen. Existiert die Datei noch nicht, wird sie ebenfalls neu erstellt.

  - Beispiel: `echo "Welt" >> datei.txt`

### E2 – Was zeigt `git status` vor und nach dem Anlegen der `.gitignore`?

Vor dem Anlegen der `.gitignore`: `git status` zeigt die beiden unüberwachten Dateien/Ordner `kasse.log` und `test/` im Bereich Untracked files an.

Nach dem Anlegen der `.gitignore`: `kasse.log` und `test/` werden von Git ignoriert und verschwinden vollständig aus der Anzeige. Unter Untracked files wird jetzt nur noch die neu erstellte Datei `.gitignore` selbst gelistet.

## Teil F

### F1 – Warum ist `git merge --ff-only` hier gescheitert?

Der Fast-Forward-Merge bricht ab, weil der Ziel-Branch seit dem Abzweigen des Feature-Branches neue, eigene Commits erhalten hat. Die Historie ist dadurch nicht mehr linear. Da --ff-only strikt verbietet, einen neuen Merge-Commit zu erstellen, verweigert Git die Zusammenführung.

### F2 – Was bedeuten `HEAD` und `feature/neuer-titel` in den Konfliktmarkern?

`HEAD`: Zeigt den Stand des Branches, auf dem du dich aktuell befindest). Das ist der Code, der dort vor dem Merge stand.

`feature/neuer-titel`: Zeigt den Stand aus dem Branch, den du einpflegen möchtest. Das sind die Änderungen, die dazukommen sollten.

### F3 – Warum konnte Git den Konflikt nicht allein lösen?

Git kann Textdateien automatisch zusammenführen, solange die Änderungen an verschiedenen Stellen oder in verschiedenen Dateien stattgefunden haben.

Der Konflikt entsteht, weil in beiden Branches dieselben Zeilen in derselben Datei unterschiedlich verändert wurden. Git weiß nicht, welche Variante fachlich korrekt ist (oder ob beide kombiniert werden sollen) und überlässt diese Entscheidung daher bewusst dem Entwickler.

## Teil G

### G1 – Warum steht dort „up to date“, obwohl es auf GitHub Änderungen gibt?

`git status` prüft nur deinen lokalen Zustand. Git weiß noch nicht, dass sich auf GitHub etwas geändert hat, weil es sich nicht automatisch mit dem Server verbindet. Für dein lokales Git ist der Stand auf dem Server immer noch der, der beim letzten Datenabgleich bekannt war.

### G2 – Was hat `git fetch` gemacht und was hat `git pull` zusätzlich gemacht?

- `git fetch`: Lädt die neuen Commits von GitHub herunter und aktualisiert die Remote-Tracking-Branches (z. B. `origin/main`), ohne deine lokalen Arbeitsdateien zu verändern. Danach weiß `git status`, dass lokale und Remote-Branches abweichen.

- `git pull` (zusätzlich): Führt die heruntergeladenen Änderungen direkt in deinen lokalen Branch zusammen.

### G3 – Was bedeutet `-u` bei `git push -u origin ...`?

`-u` (Kurzform für `--set-upstream`) verknüpft den lokalen Branch dauerhaft mit dem Ziel-Branch auf dem Remote-Server (z. B. `origin/main`). Dadurch merkt sich Git die Verbindung, sodass man in Zukunft einfach nur noch `git push` oder `git pull` eingeben kannst, ohne Repository- und Branch-Namen erneut tippen zu müssen.

### G4 – Warum wurde `kontakt.md` erst nach `git pull` lokal sichtbar?

Erst durch `git pull` wurden die neuen Daten vom Server heruntergeladen und automatisch in dem lokalen Arbeitsordner integriert (fetch + merge), sodass die Datei auf der Festplatte angelegt wurde.
