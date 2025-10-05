/**
 * Alexander's Job Search Automation - Google Apps Script
 * Automatically generates personalized cover letters for Cloud Security positions
 * 
 * Author: Alexander Kölnberger
 * Last Updated: 2025-01-06
 */

function generiereAnschreiben() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  // Check if there are any rows to process
  if (lastRow < 2) {
    console.log('No data rows found in sheet');
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
      const keywords = analyzeJobDescription(beschreibung);
      
      // Generate personalized cover letter
      const anschreiben = generateCoverLetter(jobTitel, firma, keywords);
      
      // Calculate relevance score
      const score = calculateRelevanceScore(keywords);
      
      // Write results to sheet
      sheet.getRange(i, 7).setValue(score); // Score
      sheet.getRange(i, 8).setValue(anschreiben); // Cover letter
      sheet.getRange(i, 2).setValue("BEREIT"); // Status
      
      processedCount++;
    }
  }
  
  // Send notification if jobs were processed
  if (processedCount > 0) {
    sendNotification(processedCount);
  }
  
  console.log(`Processed ${processedCount} new job applications`);
}

/**
 * Analyzes job description for relevant keywords and technologies
 */
function analyzeJobDescription(description) {
  const desc = description.toLowerCase();
  
  return {
    istAzure: desc.includes("azure") || desc.includes("microsoft"),
    istAWS: desc.includes("aws") || desc.includes("amazon"),
    istDevOps: desc.includes("devops") || desc.includes("ci/cd") || desc.includes("pipeline"),
    istZeroTrust: desc.includes("zero trust") || desc.includes("zero-trust"),
    istAI: desc.includes("ai") || desc.includes("copilot") || desc.includes("artificial intelligence"),
    istKubernetes: desc.includes("kubernetes") || desc.includes("k8s") || desc.includes("container"),
    istSIEM: desc.includes("siem") || desc.includes("security information"),
    istISO27001: desc.includes("iso 27001") || desc.includes("iso27001"),
    istBSI: desc.includes("bsi") || desc.includes("c5"),
    istRemote: desc.includes("remote") || desc.includes("home office"),
    istHybrid: desc.includes("hybrid") || desc.includes("flexible")
  };
}

/**
 * Generates personalized cover letter based on job requirements
 */
function generateCoverLetter(jobTitel, firma, keywords) {
  let anschreiben = `Sehr geehrte Damen und Herren,

mit großem Interesse habe ich Ihre Stellenausschreibung für die Position "${jobTitel}" gelesen.

Als Cloud-Security-Spezialist mit umfangreicher Weiterbildung in Cybersecurity, Microsoft Security Essentials und Generative AI bringe ich genau die Expertise mit, die Sie suchen. `;

  // Add relevant skills based on job description
  if (keywords.istAzure) {
    anschreiben += "Meine Kenntnisse in Azure Security und nativen Cloud-Security-Lösungen ";
  } else if (keywords.istAWS) {
    anschreiben += "Meine Erfahrung mit AWS Security und Cloud-Security-Architekturen ";
  } else {
    anschreiben += "Meine umfassende Erfahrung mit Cloud-Security (Azure, AWS) ";
  }
  
  anschreiben += "ermöglichen es mir, Zero-Trust-Konzepte und Security-in-Depth-Strategien erfolgreich umzusetzen.\n\n";
  
  anschreiben += "Meine Qualifikationen umfassen:\n";
  anschreiben += "• Cloud Security & DevSecOps: Integration von Sicherheitsrichtlinien in CI/CD-Pipelines, Erfahrung mit SonarQube und Schwachstellenanalyse\n";
  
  if (keywords.istAI) {
    anschreiben += "• AI-gestützte Security: Microsoft Security Copilot Zertifizierung und praktische Erfahrung mit KI-Agenten für automatisierte Incident Response\n";
  } else {
    anschreiben += "• Microsoft Security: Zertifizierungen in Microsoft Security Essentials und Security Copilot, Kenntnisse von ISO 27001 und BSI C5\n";
  }
  
  if (keywords.istDevOps) {
    anschreiben += "• DevSecOps-Integration: Praktische Projekterfahrung mit GitHub Actions, Threat Modelling und Sicherheitsautomatisierung\n";
  } else {
    anschreiben += "• Sicherheitsanalyse: Threat-Modelling, Risikoanalysen und technische Umsetzung von Security-Requirements\n";
  }
  
  if (keywords.istKubernetes) {
    anschreiben += "• Container Security: Erfahrung mit Kubernetes-Sicherheit und Container-Härtung\n";
  }
  
  anschreiben += "• Kommunikation: Deutsch (C1), Englisch (Business-Level) und ausgeprägte Teamfähigkeit für die Zusammenarbeit mit DevOps-Teams\n\n";
  
  anschreiben += "In aktuellen Projekten habe ich bereits CI/CD-Sicherheitsintegration mit SonarQube und GitHub Actions realisiert sowie AI-gestützte Prototypen für schnellere Incident Response entwickelt.\n\n";
  
  anschreiben += "Gerne überzeuge ich Sie in einem persönlichen Gespräch von meiner Motivation und meinen Fähigkeiten. Ich freue mich auf Ihre Rückmeldung!\n\n";
  
  anschreiben += "Mit freundlichen Grüßen\n";
  anschreiben += "Alexander Kölnberger\n";
  anschreiben += "0160 9223 4709";
  
  return anschreiben;
}

/**
 * Calculates relevance score based on keyword matches
 */
function calculateRelevanceScore(keywords) {
  let score = 5; // Base score
  
  // Core Cloud Security skills
  if (keywords.istAzure) score += 2;
  if (keywords.istAWS) score += 1;
  if (keywords.istDevOps) score += 2;
  if (keywords.istZeroTrust) score += 2;
  if (keywords.istAI) score += 1;
  if (keywords.istKubernetes) score += 1;
  if (keywords.istSIEM) score += 1;
  if (keywords.istISO27001) score += 1;
  if (keywords.istBSI) score += 1;
  
  // Work arrangement preferences
  if (keywords.istRemote) score += 1;
  if (keywords.istHybrid) score += 0.5;
  
  return Math.min(score, 10); // Cap at 10
}

/**
 * Sends email notification about processed jobs
 */
function sendNotification(processedCount) {
  const email = "alexanderkoelnberger@gmail.com";
  const subject = `✅ ${processedCount} Anschreiben generiert!`;
  const body = `Hallo Alexander!

Ich habe für ${processedCount} Jobs personalisierte Anschreiben erstellt.

Öffne dein Google Sheet und versende die Bewerbungen!

🚀 Viel Erfolg bei der Jobsuche!

---
Alexander's Job Search Agent
Automatisiert generiert am ${new Date().toLocaleDateString('de-DE')}`;
  
  try {
    GmailApp.sendEmail(email, subject, body);
    console.log(`Notification sent to ${email}`);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
}

/**
 * Sets up daily trigger for automatic execution
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
 * Manual trigger for testing
 */
function testGeneration() {
  console.log('Testing cover letter generation...');
  generiereAnschreiben();
}

/**
 * Reset all jobs to "NEU" status for testing
 */
function resetJobStatus() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const lastRow = sheet.getLastRow();
  
  for (let i = 2; i <= lastRow; i++) {
    const status = sheet.getRange(i, 2).getValue();
    if (status === "BEREIT" || status === "VERSENDET") {
      sheet.getRange(i, 2).setValue("NEU");
    }
  }
  
  console.log('Job statuses reset to NEU');
}