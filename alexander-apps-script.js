/**
 * Alexander's Job Search Automation - Google Apps Script
 * Automatically generates personalized cover letters for job applications
 * 
 * Setup Instructions:
 * 1. Open Google Sheets
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Save and run setupTrigger() once
 * 5. Authorize permissions
 */

function generiereAnschreiben() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  // Check if we have data (skip header row)
  if (lastRow < 2) {
    console.log('No job data found');
    return;
  }
  
  let processedCount = 0;
  
  for (let i = 2; i <= lastRow; i++) {
    const status = sheet.getRange(i, 2).getValue();
    
    if (status === "NEU") {
      const jobTitel = sheet.getRange(i, 3).getValue();
      const firma = sheet.getRange(i, 4).getValue();
      const beschreibung = sheet.getRange(i, 6).getValue();
      
      // Analyze job description for relevant keywords
      const istAzure = beschreibung.toLowerCase().includes("azure");
      const istDevOps = beschreibung.toLowerCase().includes("devops") || 
                       beschreibung.toLowerCase().includes("ci/cd") ||
                       beschreibung.toLowerCase().includes("cicd");
      const istZeroTrust = beschreibung.toLowerCase().includes("zero trust") || 
                          beschreibung.toLowerCase().includes("zero-trust");
      const istAI = beschreibung.toLowerCase().includes("ai") || 
                   beschreibung.toLowerCase().includes("copilot") ||
                   beschreibung.toLowerCase().includes("artificial intelligence");
      const istKubernetes = beschreibung.toLowerCase().includes("kubernetes") ||
                           beschreibung.toLowerCase().includes("k8s");
      const istSIEM = beschreibung.toLowerCase().includes("siem") ||
                     beschreibung.toLowerCase().includes("security information");
      
      // Generate personalized cover letter
      let anschreiben = `Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihre Stellenausschreibung für die Position "${jobTitel}" gelesen.

Als Cloud-Security-Spezialist mit umfangreicher Weiterbildung in Cybersecurity, Microsoft Security Essentials und Generative AI bringe ich genau die Expertise mit, die Sie suchen. `;

      // Add relevant skills based on job description
      if (istAzure) {
        anschreiben += "Meine Kenntnisse in Azure Security und nativen Cloud-Security-Lösungen ";
      } else if (beschreibung.toLowerCase().includes("aws")) {
        anschreiben += "Meine Erfahrung mit Cloud-Security (Azure, AWS) ";
      } else {
        anschreiben += "Meine Erfahrung mit Cloud-Security ";
      }
      
      anschreiben += "ermöglichen es mir, Zero-Trust-Konzepte und Security-in-Depth-Strategien erfolgreich umzusetzen.\n\n";
      
      anschreiben += "Meine Qualifikationen umfassen:\n";
      anschreiben += "• Cloud Security & DevSecOps: Integration von Sicherheitsrichtlinien in CI/CD-Pipelines, Erfahrung mit SonarQube und Schwachstellenanalyse\n";
      
      if (istAI) {
        anschreiben += "• AI-gestützte Security: Microsoft Security Copilot Zertifizierung und praktische Erfahrung mit KI-Agenten für automatisierte Incident Response\n";
      } else {
        anschreiben += "• Microsoft Security: Zertifizierungen in Microsoft Security Essentials und Security Copilot, Kenntnisse von ISO 27001 und BSI C5\n";
      }
      
      if (istDevOps) {
        anschreiben += "• DevSecOps-Integration: Praktische Projekterfahrung mit GitHub Actions, Threat Modelling und Sicherheitsautomatisierung\n";
      } else {
        anschreiben += "• Sicherheitsanalyse: Threat-Modelling, Risikoanalysen und technische Umsetzung von Security-Requirements\n";
      }
      
      if (istKubernetes) {
        anschreiben += "• Container Security: Erfahrung mit Kubernetes Security, Container Scanning und Runtime Protection\n";
      }
      
      if (istSIEM) {
        anschreiben += "• Security Monitoring: Kenntnisse in SIEM-Lösungen, Log-Analyse und Incident Response\n";
      }
      
      anschreiben += "• Kommunikation: Deutsch (C1), Englisch (Business-Level) und ausgeprägte Teamfähigkeit für die Zusammenarbeit mit DevOps-Teams\n\n";
      
      anschreiben += "In aktuellen Projekten habe ich bereits CI/CD-Sicherheitsintegration mit SonarQube und GitHub Actions realisiert sowie AI-gestützte Prototypen für schnellere Incident Response entwickelt.\n\n";
      
      anschreiben += "Gerne überzeuge ich Sie in einem persönlichen Gespräch von meiner Motivation und meinen Fähigkeiten. Ich freue mich auf Ihre Rückmeldung!\n\n";
      
      anschreiben += "Mit freundlichen Grüßen\n";
      anschreiben += "Alexander Kölnberger\n";
      anschreiben += "0160 9223 4709";
      
      // Write cover letter to column H
      sheet.getRange(i, 8).setValue(anschreiben);
      
      // Calculate score based on keyword matches
      let score = 5; // Base score
      if (istAzure) score += 2;
      if (istDevOps) score += 2;
      if (istZeroTrust) score += 1;
      if (istAI) score += 1;
      if (istKubernetes) score += 1;
      if (istSIEM) score += 1;
      
      // Bonus for remote work
      if (beschreibung.toLowerCase().includes("remote") || 
          beschreibung.toLowerCase().includes("hybrid")) {
        score += 1;
      }
      
      // Cap score at 10
      score = Math.min(score, 10);
      sheet.getRange(i, 7).setValue(score);
      
      // Change status
      sheet.getRange(i, 2).setValue("BEREIT");
      processedCount++;
    }
  }
  
  // Send notification if jobs were processed
  if (processedCount > 0) {
    const email = "alexanderkoelnberger@gmail.com";
    const subject = `✅ ${processedCount} Anschreiben generiert!`;
    const body = `Hallo Alexander!\n\nIch habe für ${processedCount} Jobs personalisierte Anschreiben erstellt.\n\nÖffne dein Google Sheet und versende die Bewerbungen!\n\n🚀 Viel Erfolg!`;
    
    try {
      GmailApp.sendEmail(email, subject, body);
      console.log(`Notification sent for ${processedCount} processed jobs`);
    } catch (error) {
      console.log('Error sending email:', error);
    }
  }
  
  console.log(`Processed ${processedCount} new jobs`);
}

/**
 * Setup daily trigger to run at 8:00 AM
 * Run this function once to set up automation
 */
function setupTrigger() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'generiereAnschreiben') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new trigger: Daily at 8:00 AM
  ScriptApp.newTrigger('generiereAnschreiben')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
    
  console.log('Daily trigger set up for 8:00 AM');
}

/**
 * Manual function to process all NEW jobs immediately
 * Useful for testing or immediate processing
 */
function processAllNewJobs() {
  generiereAnschreiben();
}

/**
 * Test function to verify the script works
 */
function testScript() {
  console.log('Testing Alexander\'s Job Search Script...');
  
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  console.log(`Found ${lastRow - 1} rows of data`);
  
  if (lastRow >= 2) {
    const testJob = {
      title: sheet.getRange(2, 3).getValue(),
      company: sheet.getRange(2, 4).getValue(),
      status: sheet.getRange(2, 2).getValue()
    };
    
    console.log('Sample job:', testJob);
  }
  
  console.log('Test completed successfully!');
}