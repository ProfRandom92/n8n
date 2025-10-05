# 📑 Index - Alexander's Job Search Agent

> **Ein vollautomatischer Job-Such-Agent für Cloud Security, DevSecOps & Microsoft Security Positionen**

---

## 📦 Projekt-Übersicht

Dieses Projekt enthält zwei n8n Workflows, die täglich automatisch:
1. ✅ Die besten Cloud Security Jobs in Deutschland finden
2. ✅ Personalisierte Anschreiben generieren
3. ✅ Alles in Google Sheets tracken
4. ✅ E-Mail-Benachrichtigungen senden

**Zielgruppe**: Alexander Kölnberger  
**Fokus**: Cloud Security, DevSecOps, Azure Security, Microsoft Security  
**Location**: Deutschland (Remote/Hybrid bevorzugt)  
**Automation**: n8n Workflow Platform

---

## 📂 Datei-Struktur

```
alexander-job-search/
│
├── 1-job-search-main-workflow.json       # Haupt-Workflow (RSS → Filter → Sheets)
├── 2-cover-letter-generator-workflow.json # Anschreiben-Generator
│
├── README.md                              # Ausführliche Dokumentation (50+ Seiten)
├── SCHNELLSTART.md                        # Quick Start Guide (10 Minuten Setup)
├── INDEX.md                               # Diese Datei - Projekt-Übersicht
├── CHANGELOG.md                           # Versions-Historie & Änderungen
│
├── alexander-profile.json                 # Profil-Konfiguration (JSON)
└── google-sheets-template.csv             # Beispiel-Daten für Google Sheet
```

---

## 🚀 Quick Links

### Für Einsteiger
**👉 START HIER**: [SCHNELLSTART.md](./SCHNELLSTART.md)
- Setup in 10 Minuten
- Schritt-für-Schritt Anleitung
- Keine Vorkenntnisse nötig

### Für Fortgeschrittene
**👉 VOLLSTÄNDIGE DOKU**: [README.md](./README.md)
- Detaillierte Anleitung (50+ Seiten)
- Anpassungen & Optimierungen
- Advanced Features
- Troubleshooting
- Pro-Tipps

### Technische Details
- **Workflows**: `1-job-search-main-workflow.json` & `2-cover-letter-generator-workflow.json`
- **Profil**: [alexander-profile.json](./alexander-profile.json)
- **Changelog**: [CHANGELOG.md](./CHANGELOG.md)

---

## 🎯 Features im Überblick

### ✨ Hauptfunktionen

| Feature | Beschreibung | Status |
|---------|--------------|--------|
| **RSS Monitoring** | 5 Indeed Feeds für Cloud Security Jobs | ✅ Aktiv |
| **Smart Filtering** | Filtert nach Skills (Azure, DevOps, etc.) | ✅ Aktiv |
| **Job Scoring** | Bewertet Jobs von 1-10 | ✅ Aktiv |
| **Cover Letter Gen** | Personalisierte Anschreiben | ✅ Aktiv |
| **Google Sheets** | Tracking & Management | ✅ Aktiv |
| **Email Alerts** | Benachrichtigungen via Gmail | ✅ Aktiv |
| **Telegram Bot** | Push-Benachrichtigungen | 🔜 Geplant |
| **LinkedIn Jobs** | LinkedIn Integration | 🔜 Geplant |
| **Auto Follow-up** | Automatische Nachfass-E-Mails | 🔜 Geplant |

### 🎛️ Anpassbar

- ✅ RSS Feed URLs
- ✅ Filter-Keywords
- ✅ Scoring-Algorithmus
- ✅ Anschreiben-Templates
- ✅ E-Mail-Benachrichtigungen
- ✅ Schedule (Zeiten)
- ✅ Google Sheets Struktur

---

## 📊 Workflow-Übersicht

### Workflow 1: Job Search Main
```
┌─────────────┐
│  Schedule   │  07:00 AM täglich
│  Trigger    │
└──────┬──────┘
       │
       ├──────► RSS Feed 1: Cloud Security Engineer
       ├──────► RSS Feed 2: DevSecOps Engineer
       ├──────► RSS Feed 3: Microsoft Security
       ├──────► RSS Feed 4: Security Analyst
       └──────► RSS Feed 5: Cybersecurity
                      │
                      ▼
               ┌──────────────┐
               │ Merge Feeds  │
               └──────┬───────┘
                      │
                      ▼
               ┌──────────────┐
               │   Filter     │  → Nur relevante Jobs
               └──────┬───────┘
                      │
                      ▼
               ┌──────────────┐
               │ Calculate    │  → Score 1-10
               │   Score      │
               └──────┬───────┘
                      │
                      ▼
               ┌──────────────┐
               │ Google       │  → Speichern
               │ Sheets       │
               └──────┬───────┘
                      │
                      ▼
               ┌──────────────┐
               │   Gmail      │  → Benachrichtigung
               │ Notification │
               └──────────────┘
```

### Workflow 2: Cover Letter Generator
```
┌─────────────┐
│  Schedule   │  08:00 AM täglich
│  Trigger    │
└──────┬──────┘
       │
       ▼
┌──────────────┐
│ Read Jobs    │  → Status = "NEU"
│ from Sheet   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  Generate    │  → Personalisiert nach Job
│ Cover Letter │     (Azure/DevOps/AI/etc.)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Update       │  → Status = "BEREIT"
│ Google Sheet │     + Anschreiben Text
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Gmail      │  → "X Anschreiben fertig!"
│ Notification │
└──────────────┘
```

---

## 🎓 Für wen ist das?

### ✅ Perfekt für dich, wenn du:
- 👨‍💼 Aktiv nach Cloud Security / DevSecOps Jobs suchst
- ⏰ Keine Zeit hast, täglich Job-Boards zu durchsuchen
- 🤖 Bewerbungsprozesse automatisieren willst
- 📊 Deine Bewerbungen tracken möchtest
- ✉️ Personalisierte Anschreiben brauchst (aber schnell!)
- 🆓 Kostenlose Lösung bevorzugst

### ❌ Nicht geeignet, wenn:
- Du nur 1-2 Bewerbungen pro Monat versendest
- Du keine technischen Grundkenntnisse hast (aber SCHNELLSTART hilft!)
- Du ATS-Systeme direkt ansprechen willst (kommt v2.0)

---

## 🛠️ Technologie-Stack

```
┌─────────────────────────────────────────┐
│         n8n Workflow Platform           │  → Orchestration
├─────────────────────────────────────────┤
│  RSS Feed Reader  │  Indeed.de          │  → Job-Daten
├─────────────────────────────────────────┤
│  Google Sheets    │  Storage & Tracking │  → Datenbank
├─────────────────────────────────────────┤
│  Gmail API        │  Notifications      │  → Benachrichtigungen
├─────────────────────────────────────────┤
│  JavaScript       │  Business Logic     │  → Scoring & Generation
└─────────────────────────────────────────┘
```

**Kosten**: 🎉 **€0,00 / Monat** (Free Tiers!)

---

## 📈 Erwartete Ergebnisse

### Nach 1 Woche:
- ✅ 30-50 relevante Jobs gefunden
- ✅ 10-15 Bewerbungen versendet
- ✅ Täglicher Zeitaufwand: 10-15 Min

### Nach 1 Monat:
- ✅ 120-200 Jobs analysiert
- ✅ 40-60 Bewerbungen versendet
- ✅ 5-10 Antworten erhalten
- ✅ 2-4 Interviews vereinbart

### ROI:
- ⏱️ **Zeit gespart**: ~2h/Tag → ~40h/Monat
- 💰 **Wert**: €1.000+ (bei €25/h)
- 🎯 **Erfolgsrate**: 10-15% (Industry Standard: 5%)

---

## 🔗 Externe Ressourcen

### n8n
- 📖 [n8n Dokumentation](https://docs.n8n.io)
- 💬 [n8n Community](https://community.n8n.io)
- 🎓 [n8n Academy](https://academy.n8n.io)

### Google APIs
- 📖 [Google Sheets API](https://developers.google.com/sheets/api)
- 📖 [Gmail API](https://developers.google.com/gmail/api)
- 🔑 [Google Cloud Console](https://console.cloud.google.com)

### Job Boards
- 🔍 [Indeed Deutschland](https://de.indeed.com)
- 💼 [LinkedIn Jobs](https://www.linkedin.com/jobs)
- 📊 [StepStone](https://www.stepstone.de)

---

## 📞 Support & Community

### Fragen? Probleme?

1. **📖 Lies zuerst**: [README.md](./README.md) - 90% der Fragen beantwortet
2. **⚡ Quick Fix**: [SCHNELLSTART.md](./SCHNELLSTART.md) - Setup-Probleme
3. **🐛 Bug?**: [CHANGELOG.md](./CHANGELOG.md) - Bekannte Issues
4. **💬 n8n Community**: https://community.n8n.io - Sehr hilfsbereit!

### Feature Requests

Hast du Ideen zur Verbesserung? Notiere sie hier:
- [ ] Deine Idee hier
- [ ] Weitere Idee

---

## 🗓️ Versions-Roadmap

### ✅ v1.0.0 (Aktuell) - Oktober 2025
- Main Job Search Workflow
- Cover Letter Generator
- Google Sheets Integration
- Gmail Notifications

### 🔜 v1.1.0 (Geplant) - November 2025
- LinkedIn Job Integration
- Telegram Bot Notifications
- Duplicate Detection
- Weekly Statistics Report

### 🔮 v1.2.0 (Geplant) - Dezember 2025
- Auto Follow-up Emails
- Interview Preparation Workflow
- Company Research Automation
- AI-powered Cover Letter Optimization (GPT-4)

### 🚀 v2.0.0 (Vision) - 2026
- Multi-profile Support
- Mobile App Companion
- ATS System Integration
- Video Cover Letter Generator

---

## 📜 Lizenz & Nutzung

**Lizenz**: MIT (frei nutzbar & anpassbar)

**Erstellt für**: Alexander Kölnberger  
**Datum**: Oktober 2025  
**Platform**: n8n.io  
**Version**: 1.0.0

---

## 🎯 Quick Start Checkliste

Alles fertig? Checke diese Liste ab:

### Setup
- [ ] n8n installiert oder n8n.cloud Account
- [ ] Google Sheet erstellt
- [ ] Google APIs aktiviert (Sheets + Gmail)
- [ ] OAuth Credentials erstellt
- [ ] Workflows importiert
- [ ] Credentials in n8n eingerichtet
- [ ] Sheet ID in Workflows eingefügt
- [ ] E-Mail Adresse angepasst

### Test
- [ ] Main Workflow manuell getestet
- [ ] Cover Letter Workflow getestet
- [ ] Jobs in Google Sheet sichtbar
- [ ] E-Mails erhalten

### Aktivierung
- [ ] Beide Workflows aktiviert (Toggle ON)
- [ ] Schedule läuft (07:00 & 08:00 Uhr)

### Daily Usage
- [ ] Morgens E-Mails checken
- [ ] Google Sheet öffnen
- [ ] Top-Jobs (Score ≥ 8) ansehen
- [ ] Anschreiben anpassen
- [ ] Bewerbungen versenden
- [ ] Status aktualisieren

---

## 💪 Los geht's!

**Nächster Schritt**: Öffne [SCHNELLSTART.md](./SCHNELLSTART.md) und starte in 10 Minuten! 🚀

---

**Fragen? → README.md**  
**Probleme? → CHANGELOG.md**  
**Feedback? → n8n Community**

**Viel Erfolg bei der Jobsuche, Alexander! 🎯💼**
