# ⚡ Schnellstart Guide - Alexander's Job-Agent in 10 Minuten

## 🎯 Ziel
In **10 Minuten** hast du einen vollautomatischen Job-Such-Agenten, der täglich die besten Cloud Security Jobs für dich findet!

---

## ✅ Voraussetzungen Check

- [ ] Google Konto (Gmail)
- [ ] 10 Minuten Zeit
- [ ] Browser

---

## 🚀 Setup in 5 Schritten

### 🔹 Schritt 1: n8n starten (2 Min)

**Option A: n8n Cloud (EMPFOHLEN)**
1. Gehe zu https://n8n.io
2. Klicke "Start for free"
3. Registriere mit Google Account
4. ✅ Fertig!

**Option B: Lokal mit Docker**
```bash
docker run -it --rm --name n8n -p 5678:5678 -v ~/.n8n:/home/node/.n8n n8nio/n8n
```
Öffne: http://localhost:5678

---

### 🔹 Schritt 2: Google Sheet erstellen (1 Min)

1. Öffne https://sheets.google.com
2. Klicke "Blank" für neues Sheet
3. Name: **"Alexander Job Tracker"**
4. Kopiere diese Spalten in Zeile 1:

```
Datum | Status | Job-Titel | Firma | Link | Beschreibung | Score | Anschreiben
```

5. **Wichtig**: Kopiere die Sheet ID aus der URL
   ```
   https://docs.google.com/spreadsheets/d/[DIESE_ID_KOPIEREN]/edit
   ```

---

### 🔹 Schritt 3: Google APIs aktivieren (3 Min)

1. Gehe zu https://console.cloud.google.com
2. Erstelle neues Projekt: **"n8n-job-search"**
3. Aktiviere APIs:
   - **Google Sheets API** (Suche → Enable)
   - **Gmail API** (Suche → Enable)
4. Gehe zu **Credentials** → **Create Credentials** → **OAuth client ID**
5. Configure consent screen:
   - User Type: **External**
   - App name: **n8n Job Agent**
   - User support email: **deine@email.com**
   - Developer contact: **deine@email.com**
   - Scopes: ⏭️ Skip
   - Test users: **+ ADD USERS** → deine@email.com
   - ✅ Save
6. Zurück zu **Create OAuth client ID**:
   - Application type: **Web application**
   - Name: **n8n**
   - Authorized redirect URIs:
     - n8n Cloud: `https://app.n8n.cloud/rest/oauth2-credential/callback`
     - Lokal: `http://localhost:5678/rest/oauth2-credential/callback`
7. **KOPIERE**: Client ID + Client Secret

---

### 🔹 Schritt 4: Workflows importieren (2 Min)

1. **Download** beide Workflow-Dateien:
   - `1-job-search-main-workflow.json`
   - `2-cover-letter-generator-workflow.json`

2. In n8n:
   - Klicke **Workflows** (links)
   - **Import from File**
   - Wähle `1-job-search-main-workflow.json`
   - Repeat für zweiten Workflow

---

### 🔹 Schritt 5: Credentials einrichten (2 Min)

#### Google Sheets Credentials

1. n8n → **Home** → **Settings** (unten links) → **Credentials**
2. **New Credential** → **Google Sheets OAuth2 API**
3. Name: **"Google Sheets Account"**
4. Füge ein:
   - **Client ID**: (aus Schritt 3)
   - **Client Secret**: (aus Schritt 3)
5. **Connect my account** → Erlaube Zugriff
6. ✅ **Save**

#### Gmail Credentials

1. **New Credential** → **Gmail OAuth2 API**
2. Name: **"Gmail Account"**
3. Gleiche **Client ID** und **Client Secret**
4. **Connect my account** → Erlaube Zugriff
5. ✅ **Save**

---

## ⚙️ Workflows konfigurieren

### Workflow 1: Job Search Main

1. Öffne Workflow: **"Alexander's Job Search Agent - Main"**
2. Klicke Node: **"Add to Google Sheets"**
3. **Credential**: Wähle "Google Sheets Account"
4. **Document**: Wähle "Alexander Job Tracker"
5. **Sheet**: Wähle "Sheet1"
6. ✅ **Save**

7. Klicke Node: **"Gmail Benachrichtigung"**
8. **Credential**: Wähle "Gmail Account"
9. Ersetze `DEINE_SHEET_ID` mit deiner echten Sheet ID (2x im Message Body)
10. Ändere E-Mail auf: `alexanderkoelnberger@gmail.com`
11. ✅ **Save**

### Workflow 2: Cover Letter Generator

1. Öffne Workflow: **"Alexander's Job Search Agent - Anschreiben Generator"**
2. Node **"Lese neue Jobs aus Sheet"**:
   - **Credential**: "Google Sheets Account"
   - **Document**: "Alexander Job Tracker"
   - **Sheet**: "Sheet1"
   - ✅ **Save**

3. Node **"Aktualisiere Google Sheets"**:
   - Gleiche Einstellungen
   - ✅ **Save**

4. Node **"Sende Benachrichtigung"**:
   - **Credential**: "Gmail Account"
   - Ersetze `DEINE_SHEET_ID`
   - E-Mail: `alexanderkoelnberger@gmail.com`
   - ✅ **Save**

---

## ✅ Aktivieren & Testen

### Workflows aktivieren

1. Öffne **"Job Search Main"**
2. Toggle oben rechts: **"Inactive"** → **"Active"** ✅
3. Wiederhole für **"Anschreiben Generator"**

### Ersten Test durchführen

1. In **"Job Search Main"**:
2. Klicke **"Test workflow"** (oben rechts)
3. Warte 30-60 Sekunden
4. ✅ Prüfe dein Google Sheet - Jobs sollten erscheinen!
5. ✅ Prüfe deine E-Mails - Benachrichtigung sollte ankommen!

---

## 📅 Schedule ist jetzt aktiv!

Ab jetzt läuft alles automatisch:

```
🕖 07:00 Uhr → Job-Suche läuft (5 RSS Feeds)
📊 07:05 Uhr → Jobs in Google Sheet
📧 07:10 Uhr → E-Mail: "X neue Jobs!"

🕗 08:00 Uhr → Anschreiben werden generiert
✉️ 08:05 Uhr → E-Mail: "X Anschreiben fertig!"
```

---

## 🎉 Fertig!

Du hast jetzt einen vollautomatischen Job-Agenten!

### Nächste Schritte (optional):

1. **RSS Feeds anpassen** → Siehe README.md "Anpassungen"
2. **Filter optimieren** → Füge deine eigenen Keywords hinzu
3. **Anschreiben personalisieren** → Passe Textbausteine an
4. **Telegram hinzufügen** → Push-Benachrichtigungen aufs Handy

---

## 🆘 Probleme?

### ❌ "Google Sheets node: Authentication failed"
→ Lösung: Gehe zu Credentials → Google Sheets → "Reconnect Account"

### ❌ "Gmail node: Daily quota exceeded"
→ Lösung: Gmail hat max 500 E-Mails/Tag. Reduziere Benachrichtigungen.

### ❌ "RSS Feed read: No items found"
→ Lösung: Normal! Indeed RSS liefert nur neue Jobs. Warte bis morgen.

### ❌ Workflow läuft nicht automatisch
→ Lösung: Prüfe ob Toggle "Active" ist. Bei n8n Cloud: Gratis-Plan hat Limits.

---

## 📊 So nutzt du das System täglich

1. **Morgens**: Prüfe E-Mail "X neue Jobs gefunden"
2. **Google Sheet öffnen**: Sortiere nach Score (Spalte G)
3. **Top-Jobs ansehen**: Jobs mit Score ≥ 8
4. **Anschreiben checken**: Spalte H lesen
5. **Bei Bedarf anpassen**: Personalisiere 1-2 Sätze
6. **Bewerbung senden**: via Gmail
7. **Status ändern**: "BEREIT" → "VERSENDET"

**Zeit-Investment**: 10-15 Min/Tag für 2-3 Bewerbungen! 🚀

---

## 💡 Pro-Tipps

### Tipp 1: High-Score Jobs priorisieren
```
Score 9-10 → Sofort bewerben!
Score 7-8  → Prüfen und ggf. bewerben
Score 5-6  → Nur wenn Zeit ist
```

### Tipp 2: Bedingte Formatierung in Google Sheets
```
Score >= 8 → Zeile grün markieren
Status = NEU → Fett formatieren
Status = VERSENDET → Grau hinterlegen
```

### Tipp 3: Beste Bewerbungszeiten
```
Dienstag - Donnerstag
09:00 - 11:00 Uhr
= Höchste Erfolgsquote!
```

---

## 🎯 Viel Erfolg, Alexander!

Mit diesem System findest du garantiert den perfekten Cloud Security Job! 💪

**Fragen?** → Lies das ausführliche README.md

**Probleme?** → n8n Community ist super hilfreich: https://community.n8n.io

---

**Setup-Zeit**: ⏱️ 10 Minuten  
**Täglicher Aufwand**: ⏱️ 10-15 Minuten  
**Ergebnis**: 🎯 2-3 qualitativ hochwertige Bewerbungen pro Tag!
