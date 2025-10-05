# 🚀 Alexander's Cloud Security Job Agent - Complete Setup Guide

## 📋 Overview

This automated job search system will help Alexander find and apply to Cloud Security positions using:
- **5 RSS Feeds** from Indeed Germany
- **Google Sheets** for job tracking
- **Google Apps Script** for automated cover letter generation
- **Make.com** for workflow automation
- **Gmail** for notifications and applications

**Total Cost: €0.00/month** (using free tiers)

---

## 🎯 Quick Start (30 minutes)

### Step 1: Google Sheets Setup (5 min)

1. **Create Google Sheet:**
   - Go to [sheets.google.com](https://sheets.google.com)
   - Create new sheet: "Alexander's Job Tracker"
   - Import the CSV template: `alexander-job-tracker-template.csv`

2. **Set up columns:**
   ```
   A: Datum (Date)
   B: Status (NEW/BEREIT/VERSENDET/INTERVIEW/SKIP)
   C: Job-Titel (Job Title)
   D: Firma (Company)
   E: Link (Job URL)
   F: Beschreibung (Description - max 500 chars)
   G: Score (1-10)
   H: Anschreiben (Cover Letter)
   ```

3. **Get Sheet ID:**
   - Copy the Sheet ID from URL: `https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit`
   - Save this for Make.com setup

### Step 2: Google Apps Script Setup (10 min)

1. **Open Apps Script:**
   - In your Google Sheet: Extensions → Apps Script
   - Delete default code
   - Paste content from `alexander-apps-script.js`

2. **Save and Authorize:**
   - Click Save (💾)
   - Click Run → `setupTrigger`
   - Authorize permissions when prompted

3. **Test the script:**
   - Add a test job with status "NEU"
   - Run `processAllNewJobs()`
   - Check if cover letter is generated

### Step 3: Make.com Setup (15 min)

1. **Create Account:**
   - Go to [make.com](https://make.com)
   - Sign up for free account
   - Create new scenario

2. **Add RSS Modules:**
   - Add 5 RSS modules with these URLs:
     ```
     https://de.indeed.com/rss?q=cloud+security+engineer&l=remote&radius=50&sort=date
     https://de.indeed.com/rss?q=devsecops+engineer&l=deutschland&sort=date
     https://de.indeed.com/rss?q=microsoft+security+azure&l=remote&sort=date
     https://de.indeed.com/rss?q=security+analyst+cloud&l=heidelberg&radius=100&sort=date
     https://de.indeed.com/rss?q=cybersecurity+engineer&l=remote&sort=date
     ```

3. **Add Router:**
   - Connect all RSS modules to a Router
   - This combines all feeds into one stream

4. **Add Filter:**
   - Filter for relevant keywords:
     - Title contains: "Cloud Security", "DevSecOps", "Security Engineer", "Azure Security", "Microsoft Security", "Cybersecurity"
     - Description contains: "Azure", "AWS", "Zero Trust", "DevOps", "CI/CD", "Remote", "Cloud", "Security"
     - Title NOT contains: "Junior", "Praktikum", "Werkstudent", "Intern"

5. **Add Google Sheets:**
   - Connect your Google account
   - Select your sheet
   - Map columns as specified in the config

6. **Add Gmail Notification:**
   - Connect Gmail account
   - Use template from `gmail-templates.txt`

7. **Test and Activate:**
   - Run test execution
   - If successful, activate the scenario

---

## 📊 Daily Workflow

### Morning (Automated - 7:00 AM)
- Make.com scans 5 RSS feeds
- Filters relevant jobs
- Adds to Google Sheet with status "NEU"
- Sends email notification

### Morning (Automated - 8:00 AM)
- Apps Script processes "NEU" jobs
- Generates personalized cover letters
- Updates status to "BEREIT"
- Sends confirmation email

### Morning (Manual - 9:00 AM)
- Check Google Sheet (5 minutes)
- Review generated cover letters
- Send 2-3 applications via Gmail
- Update status to "VERSENDET"

**Total daily time investment: 10 minutes**

---

## 🔧 Advanced Configuration

### Customize Job Filters

Edit the Make.com filter to add/remove keywords:

**Must-have keywords (in title or description):**
- Cloud Security
- DevSecOps
- Azure Security
- Security Engineer
- Cybersecurity Engineer
- Security Analyst
- Microsoft Security
- Zero Trust

**Bonus keywords (increase score):**
- Azure
- Microsoft 365
- DevOps
- CI/CD
- Kubernetes
- Container Security
- SIEM
- Threat Modelling
- ISO 27001
- BSI C5
- Security Copilot
- AI
- Automation
- Remote
- Hybrid

**Exclusion keywords:**
- Junior
- Praktikum
- Werkstudent
- Intern
- Student
- Ausbildung
- 0-2 Jahre
- Entry Level

### Customize Cover Letter Generation

Edit the Apps Script to modify cover letter templates:

1. **Add new skills sections** based on job requirements
2. **Modify scoring algorithm** for better job matching
3. **Add company-specific personalization**
4. **Include project examples** from your portfolio

### Add More Job Sources

**LinkedIn Jobs (via API):**
```
https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=Cloud%20Security%20Engineer&location=Germany&f_TPR=r86400&f_WT=2,3
```

**StepStone (via web scraping):**
```
https://www.stepstone.de/jobs/cloud-security?radius=50&location=Heidelberg
```

**Xing Jobs (via RSS):**
- Create job alert on Xing
- Generate RSS feed
- Add to Make.com workflow

---

## 📱 Mobile Notifications (Optional)

### Telegram Bot Setup

1. **Create Bot:**
   - Message @BotFather on Telegram
   - Send `/newbot`
   - Name: "Alexander Job Agent"
   - Username: "alexander_job_bot"
   - Copy the Bot Token

2. **Get Chat ID:**
   - Message @userinfobot
   - Copy your Chat ID

3. **Add to Make.com:**
   - Add Telegram module after Google Sheets
   - Configure with Bot Token and Chat ID
   - Message template:
     ```
     🚨 NEUER JOB-MATCH!
     
     📋 {{title}}
     🏢 {{author}}
     ⭐ Score: {{score}}/10
     
     {{link}}
     
     Cloud Security | Azure | DevSecOps
     ```

### Push Notifications

For immediate notifications on your phone:
- Enable Gmail push notifications
- Set up Google Sheets mobile app
- Use IFTTT for additional automation

---

## 📈 Success Tracking

### Weekly Review

Check these metrics every Friday:

- **Jobs Found:** Target 50+ per week
- **Applications Sent:** Target 20+ per week
- **Responses Received:** Track response rate
- **Interviews Scheduled:** Track conversion rate
- **Offers Received:** Track success rate

### Monthly Optimization

**Week 1:** Review and adjust filters
**Week 2:** Optimize cover letter templates
**Week 3:** Add new job sources
**Week 4:** Analyze success metrics

### Success Metrics Dashboard

Create a simple dashboard in Google Sheets:

```
A1: =COUNTIF(B:B,"VERSENDET")     // Applications sent
B1: =COUNTIF(B:B,"INTERVIEW")     // Interviews scheduled
C1: =COUNTIF(B:B,"ANGEBOT")       // Job offers
D1: =B1/A1*100                    // Interview rate %
E1: =C1/B1*100                    // Offer rate %
```

---

## 🛠️ Troubleshooting

### Common Issues

**1. Apps Script not running:**
- Check trigger is set up correctly
- Verify permissions are granted
- Test with `testScript()` function

**2. Make.com not finding jobs:**
- Verify RSS URLs are working
- Check filter conditions
- Test individual modules

**3. Cover letters not generating:**
- Check job status is "NEU"
- Verify Apps Script permissions
- Check for errors in execution log

**4. Gmail notifications not working:**
- Verify Gmail connection in Make.com
- Check email address is correct
- Test with manual execution

### Debug Mode

Enable debug logging in Apps Script:

```javascript
function debugMode() {
  console.log('Debug mode enabled');
  // Add console.log statements throughout the code
}
```

### Manual Override

If automation fails, you can always:
1. Manually add jobs to Google Sheet
2. Run `processAllNewJobs()` in Apps Script
3. Manually send applications via Gmail

---

## 🔒 Security & Privacy

### Data Protection
- All data stays in your Google account
- No third-party data collection
- RSS feeds are publicly available
- Make.com only processes job data

### GDPR Compliance
- No personal data stored externally
- You control all your information
- Easy to delete data anytime
- Transparent data processing

### Best Practices
- Use strong passwords
- Enable 2FA on all accounts
- Regularly review permissions
- Keep scripts updated

---

## 🎯 Success Tips

### Maximize Job Matches
1. **Keep filters broad initially** - you can always narrow down
2. **Review and adjust weekly** - job market changes
3. **Add new keywords** based on job descriptions you see
4. **Monitor competitor job postings** for new trends

### Improve Application Success
1. **Personalize each cover letter** - don't just use templates
2. **Research companies** before applying
3. **Follow up after 1 week** if no response
4. **Track what works** - which applications get responses

### Stay Organized
1. **Use consistent naming** for job applications
2. **Set up Gmail labels** for different job types
3. **Keep a simple CRM** in Google Sheets
4. **Schedule regular reviews** of your progress

---

## 📞 Support

### If you need help:

1. **Check the troubleshooting section** above
2. **Review Make.com documentation** for workflow issues
3. **Check Google Apps Script logs** for script errors
4. **Test each component individually** to isolate issues

### Quick Fixes:

- **RSS not working:** Check if Indeed changed their feed format
- **Script errors:** Verify all column references are correct
- **No jobs found:** Widen filter criteria temporarily
- **Email issues:** Check Gmail connection in Make.com

---

## 🚀 Ready to Start?

1. **Set up Google Sheets** (5 min)
2. **Install Apps Script** (10 min)
3. **Configure Make.com** (15 min)
4. **Test everything** (5 min)
5. **Activate automation** (1 min)

**Total setup time: 35 minutes**

**Daily maintenance: 10 minutes**

**Expected results: 50+ jobs/week, 20+ applications/week**

---

*Good luck with your job search, Alexander! This system will help you stay organized and efficient while finding your perfect Cloud Security role.* 🎯