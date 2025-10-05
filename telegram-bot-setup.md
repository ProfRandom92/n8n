# Alexander's Telegram Bot Setup

## Bot Creation

### Step 1: Create Bot
1. **Telegram öffnen** → Suche: `@BotFather`
2. **Sende:** `/newbot`
3. **Bot Name:** "Alexander Job Agent"
4. **Username:** "alexander_job_bot"
5. **Kopiere Bot Token:** `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

### Step 2: Get Chat ID
1. **Suche:** `@userinfobot`
2. **Sende:** `/start`
3. **Kopiere Chat ID:** `123456789`

## Make.com Integration

### Module Configuration
```json
{
  "module_type": "Telegram",
  "name": "Send Job Notification",
  "config": {
    "bot_token": "YOUR_BOT_TOKEN",
    "chat_id": "YOUR_CHAT_ID",
    "message": "🚨 NEUER JOB-MATCH!\n\n📋 {{title}}\n🏢 {{author}}\n⭐ Score: {{score}}/10\n\n{{link}}\n\nCloud Security | Azure | DevSecOps"
  }
}
```

### Advanced Message Template
```
🚨 NEUER JOB-MATCH!

📋 {{title}}
🏢 {{author}}
📍 {{location}}
⭐ Score: {{score}}/10

💡 Keywords: {{keywords}}

{{link}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 Cloud Security | Azure | DevSecOps
📱 Alexander's Job Agent
```

## Bot Commands (Optional)

### Add to BotFather
```
/start - Start the job search agent
/status - Show current job statistics
/help - Show available commands
```

### Bot Response Script
```javascript
// Add to Make.com webhook
function handleTelegramCommand(update) {
  const message = update.message.text;
  const chatId = update.message.chat.id;
  
  switch(message) {
    case '/start':
      return `🚀 Alexander's Job Agent aktiviert!\n\nIch suche täglich nach passenden Cloud Security Jobs für dich.`;
    case '/status':
      return `📊 Job Statistics:\n\n✅ Jobs gefunden: 67\n📤 Bewerbungen: 23\n📧 Antworten: 8\n🎯 Interviews: 3`;
    case '/help':
      return `🤖 Available Commands:\n\n/start - Activate agent\n/status - Show statistics\n/help - Show this help`;
    default:
      return `❓ Unbekannter Befehl. Sende /help für verfügbare Befehle.`;
  }
}
```

## Notification Settings

### Job Match Criteria
- **Score ≥ 7:** Sofortige Benachrichtigung
- **Score 5-6:** Tägliche Zusammenfassung
- **Score < 5:** Keine Benachrichtigung

### Message Frequency
- **Max 10 Nachrichten/Tag** (Spam-Schutz)
- **Nur bei neuen Jobs** (keine Duplikate)
- **Gruppierung möglich** (mehrere Jobs in einer Nachricht)

## Privacy & Security

### Bot Permissions
- ✅ **Nur Nachrichten senden** (keine Daten lesen)
- ✅ **Keine Gruppen-Admin-Rechte**
- ✅ **Keine persönlichen Daten speichern**

### Data Protection
- **Keine Job-Daten im Bot gespeichert**
- **Nur Benachrichtigungen** (keine Analyse)
- **Bot Token sicher aufbewahren**

## Troubleshooting

### Bot antwortet nicht
1. **Bot Token prüfen** (korrekt kopiert?)
2. **Chat ID prüfen** (richtige Nummer?)
3. **Bot gestartet?** (Sende `/start` an Bot)

### Keine Nachrichten
1. **Make.com Workflow aktiv?**
2. **Telegram Modul konfiguriert?**
3. **Test-Nachricht senden**

### Zu viele Nachrichten
1. **Filter anpassen** (höhere Score-Schwelle)
2. **Häufigkeit reduzieren** (weniger RSS-Checks)
3. **Gruppierung aktivieren**

## Advanced Features

### Job Categories
```
🔵 Azure Security
🟢 DevSecOps
🟡 Microsoft Security
🟠 Cloud Engineer
🔴 Cybersecurity
```

### Company Highlights
```
⭐ SAP - 3 Matches
⭐ Siemens - 2 Matches
⭐ AWS - 2 Matches
```

### Daily Summary
```
📊 ALEXANDER'S DAILY JOB REPORT

📅 2025-01-06
━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Jobs gefunden: 5
📤 Bewerbungen: 2
📧 Antworten: 1
🎯 Interviews: 0
━━━━━━━━━━━━━━━━━━━━━━━━━━

Top Matches:
• Cloud Security Engineer @ SAP (Score: 9)
• DevSecOps Engineer @ Siemens (Score: 8)

🚀 Keep going! 💪
```

## Cost

- **Telegram Bot:** Kostenlos
- **Make.com Integration:** Inklusive in Free Tier
- **Total:** 0,00 €/Monat

## Setup Checklist

- [ ] Bot bei @BotFather erstellt
- [ ] Bot Token kopiert
- [ ] Chat ID ermittelt
- [ ] Make.com Modul konfiguriert
- [ ] Test-Nachricht gesendet
- [ ] Workflow aktiviert
- [ ] Benachrichtigungen empfangen

## Support

Bei Problemen:
1. **Bot Token neu generieren** (BotFather)
2. **Make.com Logs prüfen**
3. **Telegram App aktualisieren**
4. **Workflow neu starten**