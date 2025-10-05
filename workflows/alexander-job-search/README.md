# 🚀 Alexander's Persönlicher Cloud-Security Job-Agent für n8n

Ein vollautomatisierter Job-Such-Agent, der speziell für **Alexander Kölnberger** entwickelt wurde, um täglich die besten Cloud Security, DevSecOps und Microsoft Security Jobs in Deutschland zu finden.

## 👤 Profil

```
Name: Alexander Kölnberger
Expertise: Cloud Security & DevOps | Microsoft Security | AI Agent Development
Location: Neckargemünd / Remote (Deutschland)
Level: Mid-Senior (Cloud Security Engineer/Analyst)
Top Skills: Azure Security, Zero-Trust, DevSecOps, Microsoft Copilot, AI Agents
```

---

## 📦 Was ist enthalten?

Dieses Paket enthält **2 n8n Workflows**:

1. **Job-Search-Main-Workflow**: Durchsucht täglich 5 RSS Feeds, filtert relevante Jobs und speichert sie in Google Sheets
2. **Cover-Letter-Generator-Workflow**: Generiert automatisch personalisierte Anschreiben basierend auf den Job-Anforderungen

---

## ⚡ Features

- ✅ **5 RSS Feeds** von Indeed Deutschland gleichzeitig überwacht
- ✅ **Intelligente Filterung** basierend auf deinen Skills und Präferenzen
- ✅ **Automatisches Scoring** (1-10) für jede Stellenanzeige
- ✅ **Personalisierte Anschreiben** die auf Job-Anforderungen eingehen
- ✅ **Google Sheets Integration** für einfaches Tracking
- ✅ **E-Mail Benachrichtigungen** bei neuen Jobs
- ✅ **Läuft komplett kostenlos** auf n8n
- ✅ **100% DSGVO-konform** - alle Daten bleiben bei dir

---

## 🎯 Überwachte Job-Kategorien

1. **Cloud Security Engineer** (Remote, 50km Radius)
2. **DevSecOps Engineer** (Deutschland)
3. **Microsoft Security & Azure** (Remote)
4. **Security Analyst** (Heidelberg Region, 100km)
5. **Cybersecurity Engineer** (Remote)

---

## 📋 Voraussetzungen

### 1. n8n Installation

Du brauchst eine laufende n8n Instanz. Optionen:

**Option A: n8n Cloud (Empfohlen für Anfänger)**
```bash
# Registriere dich auf https://n8n.io
# Keine Installation notwendig, läuft in der Cloud
```

**Option B: Selbst hosten mit Docker**
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

**Option C: NPM Installation**
```bash
npm install n8n -g
n8n start
```

### 2. Google Account Setup

- Google Konto mit Gmail
- Google Sheets aktiviert
- OAuth Credentials für n8n (siehe Anleitung unten)

### 3. Erstelle Google Sheet

Erstelle ein neues Google Sheet mit folgenden Spalten:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| **Datum** | **Status** | **Job-Titel** | **Firma** | **Link** | **Beschreibung** | **Score** | **Anschreiben** |

**Sheet Name**: `Sheet1` (oder passe in den Workflows an)

**Teilen**: Stelle sicher, dass dein Google Account Zugriff hat

---

## 🚀 Installation & Setup

### Schritt 1: Workflows importieren

1. Öffne n8n in deinem Browser (`http://localhost:5678` oder n8n.cloud)
2. Gehe zu **Workflows** → **Import from File**
3. Importiere beide Workflow-Dateien:
   - `1-job-search-main-workflow.json`
   - `2-cover-letter-generator-workflow.json`

### Schritt 2: Google Credentials einrichten

#### 2.1 Google Cloud Console Setup

1. Gehe zu [Google Cloud Console](https://console.cloud.google.com/)
2. Erstelle ein neues Projekt: "n8n-job-search"
3. Aktiviere APIs:
   - **Google Sheets API**
   - **Gmail API**

#### 2.2 OAuth 2.0 Credentials erstellen

1. Gehe zu **APIs & Services** → **Credentials**
2. Klicke **Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: "n8n Job Search"
5. **Authorized redirect URIs**:
   ```
   http://localhost:5678/rest/oauth2-credential/callback
   ```
   (Für n8n Cloud: `https://app.n8n.cloud/rest/oauth2-credential/callback`)
6. Speichere **Client ID** und **Client Secret**

#### 2.3 Credentials in n8n hinzufügen

**Für Google Sheets:**

1. In n8n: **Settings** → **Credentials** → **New Credential**
2. Wähle: **Google Sheets OAuth2 API**
3. Name: "Google Sheets Account"
4. Füge ein:
   - Client ID
   - Client Secret
5. Klicke **Connect my Account**
6. Erlaube Zugriff

**Für Gmail:**

1. **Settings** → **Credentials** → **New Credential**
2. Wähle: **Gmail OAuth2 API**
3. Name: "Gmail Account"
4. Füge ein:
   - Client ID
   - Client Secret
5. Klicke **Connect my Account**
6. Erlaube Zugriff

### Schritt 3: Workflows konfigurieren

#### Workflow 1: Job Search Main

1. Öffne den Workflow "Alexander's Job Search Agent - Main"
2. Klicke auf den Node **"Add to Google Sheets"**
3. Wähle deine **Google Sheets Credentials**
4. Wähle dein **Google Sheet** aus der Dropdown-Liste
5. Wähle **Sheet Name**: "Sheet1"
6. Ersetze in **"Gmail Benachrichtigung"** Node:
   - `DEINE_SHEET_ID` mit deiner tatsächlichen Sheet ID
   - Die Sheet ID findest du in der URL:
     ```
     https://docs.google.com/spreadsheets/d/[SHEET_ID_HIER]/edit
     ```

#### Workflow 2: Cover Letter Generator

1. Öffne den Workflow "Alexander's Job Search Agent - Anschreiben Generator"
2. Konfiguriere **beide Google Sheets Nodes**:
   - Wähle deine Credentials
   - Wähle dein Sheet
3. Ersetze in **"Sende Benachrichtigung"**:
   - `DEINE_SHEET_ID` mit deiner Sheet ID

### Schritt 4: Workflows aktivieren

1. Klicke in jedem Workflow oben rechts auf **"Active"** Toggle
2. Der Schedule Trigger startet automatisch:
   - **Main Workflow**: Täglich um 07:00 Uhr
   - **Cover Letter Generator**: Täglich um 08:00 Uhr

### Schritt 5: Test durchführen

1. Öffne "Job Search Main Workflow"
2. Klicke auf **"Execute Workflow"** (oben rechts)
3. Beobachte die Ausführung
4. Prüfe dein Google Sheet - es sollten neue Jobs erscheinen!
5. Prüfe deine E-Mails - du solltest eine Benachrichtigung erhalten

---

## 🎛️ Anpassungen & Optimierung

### RSS Feed URLs ändern

Öffne `1-job-search-main-workflow.json` und ändere in den RSS Feed Nodes:

```json
"url": "https://de.indeed.com/rss?q=DEINE_SUCHE&l=DEIN_ORT&sort=date"
```

**Indeed RSS Feed Generator:**
```
Base URL: https://de.indeed.com/rss
Parameter:
- q= Suchbegriff (z.B. "cloud+security+engineer")
- l= Ort (z.B. "heidelberg" oder "remote")
- radius= Umkreis in km (z.B. "50")
- sort= Sortierung ("date" für neueste zuerst)
```

**Beispiele:**
```
# Cloud Security Remote
https://de.indeed.com/rss?q=cloud+security&l=remote&sort=date

# DevSecOps in München
https://de.indeed.com/rss?q=devsecops&l=münchen&radius=30&sort=date

# Azure Security Deutschland
https://de.indeed.com/rss?q=azure+security&l=deutschland&sort=date
```

### Filter anpassen

Im Node **"Filter: Nur relevante Jobs"** kannst du die Keywords ändern:

**MUST-HAVE Keywords** (Job muss diese enthalten):
```javascript
"cloud security|devsecops|security engineer|azure security"
```

**AUSSCHLUSS Keywords** (Job darf diese NICHT enthalten):
```javascript
"junior|praktikum|werkstudent|intern|student"
```

**BONUS Keywords** (erhöhen Score):
```javascript
"azure|devops|ci/cd|kubernetes|remote|hybrid"
```

### Scoring-Algorithmus anpassen

Im Node **"Berechne Job-Score"** kannst du die Punktevergabe ändern:

```javascript
// High priority keywords (+2 points)
if (fullText.includes('azure')) score += 2;
if (fullText.includes('zero trust')) score += 2;

// Medium priority keywords (+1 point)
if (fullText.includes('devops')) score += 1;
if (fullText.includes('remote')) score += 1;

// Füge eigene Keywords hinzu:
if (fullText.includes('DEIN_KEYWORD')) score += 2;
```

### Anschreiben personalisieren

Im Node **"Generiere Anschreiben"** kannst du:

1. **Einleitung ändern** (Zeile 20-25)
2. **Skills anpassen** (Zeile 35-75)
3. **Projekt-Beispiele** ergänzen (Zeile 80-90)
4. **Abschluss personalisieren** (Zeile 95-110)

---

## 📊 Google Sheets Struktur

### Spalten-Erklärung

| Spalte | Bedeutung | Beispiel |
|--------|-----------|----------|
| **A - Datum** | Wann wurde der Job gefunden | 2025-10-06 |
| **B - Status** | Aktueller Bewerbungsstatus | NEU, BEREIT, VERSENDET, ANTWORT, INTERVIEW, SKIP |
| **C - Job-Titel** | Titel der Stellenanzeige | Cloud Security Engineer (m/w/d) |
| **D - Firma** | Arbeitgeber | SAP SE |
| **E - Link** | URL zur Stellenanzeige | https://... |
| **F - Beschreibung** | Kurzbeschreibung (500 Zeichen) | Wir suchen einen... |
| **G - Score** | Relevanz-Score (1-10) | 9 |
| **H - Anschreiben** | Generiertes Anschreiben | Sehr geehrte... |

### Status-Workflow

```
NEU        → Job wurde gefunden, noch nicht bearbeitet
    ↓
BEREIT     → Anschreiben wurde generiert
    ↓
VERSENDET  → Bewerbung wurde verschickt
    ↓
ANTWORT    → Rückmeldung vom Arbeitgeber erhalten
    ↓
INTERVIEW  → Vorstellungsgespräch vereinbart
    ↓
SKIP       → Nicht interessant / übersprungen
```

### Bedingte Formatierung (Optional)

Markiere Zeile 1 und gehe zu **Format** → **Bedingte Formatierung**:

**Status = NEU**: Hintergrund Gelb
```
=$B2="NEU"
```

**Status = BEREIT**: Hintergrund Grün
```
=$B2="BEREIT"
```

**Score >= 8**: Fett formatieren
```
=$G2>=8
```

---

## 🔥 Erweiterte Features

### 1. LinkedIn Jobs hinzufügen

LinkedIn bietet keine offiziellen RSS Feeds, aber du kannst die API-Endpunkte nutzen:

1. Füge einen neuen **HTTP Request** Node hinzu
2. URL:
   ```
   https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=Cloud%20Security%20Engineer&location=Germany&f_TPR=r86400&f_WT=2,3
   ```
3. Method: GET
4. Parse als HTML und extrahiere Job-Daten

### 2. Telegram Benachrichtigungen

Zusätzlich zu E-Mail kannst du Push-Benachrichtigungen auf dein Handy senden:

1. Erstelle einen Bot bei [@BotFather](https://t.me/botfather)
2. Füge einen **Telegram** Node nach "Add to Google Sheets" hinzu
3. Konfiguriere:
   ```
   Chat ID: DEINE_CHAT_ID
   Message: 🚨 Neuer Job: {{ $json.title }}
   ```

### 3. Duplikate vermeiden

Füge einen **Check for duplicates** Node vor Google Sheets hinzu:

```javascript
// Node: Code
const existingJobs = await $('Lese Google Sheet').all();
const newJobs = $input.all();

return newJobs.filter(newJob => {
  const isDuplicate = existingJobs.some(existing => 
    existing.json.Link === newJob.json.Link
  );
  return !isDuplicate;
});
```

### 4. StepStone Integration

StepStone hat keinen RSS Feed, aber du kannst Scraping nutzen:

1. Füge einen **HTTP Request** Node hinzu
2. URL: `https://www.stepstone.de/jobs/cloud-security?radius=50&location=Heidelberg`
3. Füge einen **HTML Extract** Node hinzu
4. Extrahiere: Job-Titel, Firma, Link

### 5. Score-basierte Priorisierung

Erweitere den E-Mail-Node um High-Priority Jobs hervorzuheben:

```javascript
// Sortiere Jobs nach Score
const sortedJobs = $input.all().sort((a, b) => 
  (b.json.score || 0) - (a.json.score || 0)
);

// Nur Top 3 in E-Mail
const topJobs = sortedJobs.slice(0, 3);
```

---

## 📈 Success Tracking & Analytics

### Wöchentlicher Report

Erstelle einen dritten Workflow für wöchentliche Statistiken:

```javascript
// Node: Code
const allJobs = await $('Read Google Sheets').all();

const stats = {
  total: allJobs.length,
  neu: allJobs.filter(j => j.json.Status === 'NEU').length,
  versendet: allJobs.filter(j => j.json.Status === 'VERSENDET').length,
  antworten: allJobs.filter(j => j.json.Status === 'ANTWORT').length,
  interviews: allJobs.filter(j => j.json.Status === 'INTERVIEW').length,
  avgScore: allJobs.reduce((sum, j) => sum + j.json.Score, 0) / allJobs.length,
  topFirmen: getTopFirmen(allJobs),
  successRate: (interviews / versendet * 100).toFixed(1)
};

return [{ json: stats }];
```

### Dashboard erstellen

Nutze Google Sheets Formeln für Live-Statistiken:

**Total Jobs gefunden:**
```excel
=COUNTA(C2:C)
```

**Bewerbungen versendet:**
```excel
=COUNTIF(B:B,"VERSENDET")
```

**Antwortrate:**
```excel
=COUNTIF(B:B,"ANTWORT")/COUNTIF(B:B,"VERSENDET")*100
```

**Durchschnittlicher Score:**
```excel
=AVERAGE(G:G)
```

**Top Firma:**
```excel
=INDEX(D:D,MODE(MATCH(D:D,D:D,0)))
```

---

## ⏰ Täglicher Workflow - Alexander's Routine

**07:00 Uhr** ⏰  
→ n8n durchsucht 5 RSS Feeds automatisch

**07:05 Uhr** 📊  
→ Jobs werden gefiltert, bewertet und ins Google Sheet eingetragen

**07:10 Uhr** 📧  
→ E-Mail: "5 neue Jobs gefunden!"

**08:00 Uhr** 🤖  
→ n8n generiert personalisierte Anschreiben für alle "NEU" Jobs

**08:05 Uhr** ✉️  
→ E-Mail: "3 Anschreiben generiert!"

**09:00 Uhr** 👀  
→ Du öffnest dein Google Sheet (5 Min)  
→ Checkst die Top-Jobs (Score >= 8)  
→ Liest die generierten Anschreiben

**09:10 Uhr** ✏️  
→ Passt 1-2 Anschreiben individuell an (optional)

**09:15 Uhr** 📤  
→ Versendest 2-3 Bewerbungen via Gmail  
→ Markierst Status als "VERSENDET"

**FERTIG!** ✅  
→ **15 Minuten investiert, 3 Bewerbungen raus!**

---

## 🔒 Datenschutz & Sicherheit

### DSGVO-Konformität

✅ **Alle Daten bleiben bei dir:**
- Google Sheet: Privat, nur für dich sichtbar
- n8n: Läuft auf deinem Server oder n8n Cloud (EU-Server)
- RSS Feeds: Öffentliche Daten, anonym abgerufen

✅ **Keine Weitergabe:**
- Keine Drittanbieter-APIs (außer Google & Indeed)
- Keine Datensammlung
- Kein Tracking

### Sicherheits-Best-Practices

1. **Google OAuth**: Nutze OAuth 2.0 statt API Keys
2. **Credentials**: Speichere niemals Passwörter im Workflow
3. **n8n Cloud**: Nutze 2FA für deinen Account
4. **Google Sheet**: Teile es nicht öffentlich
5. **E-Mail**: Nutze App-spezifische Passwörter falls nötig

---

## 🛠️ Troubleshooting

### Problem: RSS Feeds liefern keine Daten

**Lösung:**
1. Teste RSS URL im Browser
2. Prüfe ob Indeed RSS noch funktioniert
3. Alternative: Nutze direkte HTML-Scraping

### Problem: Google Sheets Authentifizierung fehlgeschlagen

**Lösung:**
1. Stelle sicher, dass Google Sheets API aktiviert ist
2. Prüfe OAuth Redirect URI
3. Erstelle neue Credentials
4. Re-authentifiziere in n8n

### Problem: Anschreiben werden nicht generiert

**Lösung:**
1. Prüfe ob Jobs mit Status "NEU" existieren
2. Teste "Generiere Anschreiben" Node manuell
3. Prüfe JavaScript Console für Fehler

### Problem: E-Mails werden nicht versendet

**Lösung:**
1. Prüfe Gmail API Quota (max 500/Tag)
2. Teste Gmail Credentials
3. Prüfe Spam-Ordner
4. Aktiviere "Less secure app access" (falls nötig)

### Problem: Workflow läuft nicht automatisch

**Lösung:**
1. Stelle sicher, dass Workflow **aktiv** ist (Toggle oben rechts)
2. Prüfe Schedule Trigger Einstellungen
3. Bei n8n self-hosted: Stelle sicher, dass n8n läuft
4. Prüfe Execution Log für Fehler

---

## 💡 Pro-Tipps

### 1. Mehrere Suchprofile

Erstelle Kopien des Workflows für verschiedene Job-Kategorien:
- **Senior Cloud Architect** (eigene RSS Feeds + Filter)
- **Security Consultant** (andere Keywords)
- **DevOps Engineer** (als Backup-Option)

### 2. A/B Testing für Anschreiben

Generiere 2 Versionen des Anschreibens:
- Version A: Formell, ausführlich
- Version B: Knapp, modern

Tracke welche Version mehr Antworten bekommt!

### 3. Timing optimieren

Studien zeigen: Bewerbungen haben höhere Chancen wenn sie ankommen:
- **Dienstag - Donnerstag**
- **Zwischen 9-11 Uhr**

Passe deinen Schedule Trigger an!

### 4. LinkedIn-Profil verlinken

Füge in jedem Anschreiben am Ende hinzu:
```
LinkedIn: linkedin.com/in/alexander-koelnberger
Portfolio: github.com/alexander-k
```

### 5. Automatisches Follow-up

Erstelle einen vierten Workflow:
- Liest alle Jobs mit Status "VERSENDET"
- Prüft ob > 7 Tage vergangen
- Sendet automatisch Follow-up E-Mail

---

## 📚 Ressourcen & Links

### Dokumentation

- [n8n Documentation](https://docs.n8n.io/)
- [Google Sheets API Docs](https://developers.google.com/sheets/api)
- [Gmail API Docs](https://developers.google.com/gmail/api)
- [Indeed RSS Feeds](https://www.indeed.de/rss)

### Weitere Job-Boards mit RSS

```
Monster.de:
https://rss.jobsearch.monster.de/rss?q=cloud+security&cy=de

Stepstone (via RSS Bridge):
https://rss-bridge.org/bridge01/?action=display&bridge=StepStone

GitHub Jobs:
https://jobs.github.com/positions.json?description=security&location=germany
```

### Community & Support

- [n8n Community Forum](https://community.n8n.io/)
- [n8n Discord](https://discord.gg/n8n)
- [GitHub Issues](https://github.com/n8n-io/n8n/issues)

---

## 🎯 Nächste Schritte

Nach dem Setup kannst du:

1. **📝 Lebenslauf optimieren**: Passe ihn an die häufigsten Anforderungen an
2. **💼 LinkedIn Profil aktualisieren**: Stelle sicher, dass es zu deinen Anschreiben passt
3. **🎓 Zertifikate hinzufügen**: Azure Security, Microsoft Copilot etc.
4. **📊 Portfolio erstellen**: GitHub Repos mit Security-Projekten
5. **🤝 Netzwerken**: Verbinde dich mit Recruitern auf LinkedIn

---

## 📞 Support & Fragen

Bei Fragen oder Problemen:

1. **Prüfe dieses README** - die meisten Fragen sind hier beantwortet
2. **Teste Workflows manuell** - Execute Workflow Button nutzen
3. **Prüfe Execution Log** - in n8n unter "Executions"
4. **n8n Community fragen** - sehr hilfsbereite Community!

---

## 📜 Lizenz & Nutzung

Diese Workflows sind **frei nutzbar** und **anpassbar**.

**Erstellt für:** Alexander Kölnberger  
**Datum:** Oktober 2025  
**Version:** 1.0.0  

**Credits:**
- n8n - Workflow Automation Platform
- Google Sheets - Data Storage
- Indeed - Job Data Source

---

## ✨ Viel Erfolg, Alexander!

Du hast ein **Top-Profil** mit starken Skills in:
- ✅ Cloud Security (Azure, AWS)
- ✅ DevSecOps & CI/CD
- ✅ Microsoft Security & Copilot
- ✅ Zero-Trust Architekturen
- ✅ AI Agent Development

Mit diesem automatisierten System findest du **garantiert** den perfekten Job! 🚀

**Bleib dran, sei konsistent, und die Angebote werden kommen!** 💪

---

**Last Updated:** 2025-10-05  
**Maintained by:** Alexander Kölnberger
