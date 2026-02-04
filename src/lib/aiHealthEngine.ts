// Mock AI Health Intelligence Engine
// This simulates AI analysis for health risk scoring

export interface HealthAnalysisInput {
  symptoms: string[];
  severity: number;
  sleepScore: number;
  allergies: string[];
  pastDiagnoses: string[];
  age?: number;
  smoking?: boolean;
  alcohol?: boolean;
  activityLevel?: string;
}

export interface HealthAnalysisResult {
  healthRiskScore: number;
  urgencyLevel: "normal" | "monitor" | "emergency";
  recommendedDoctorType: string;
  reasoning: string[];
  summary: string;
}

// Symptom severity weights
const symptomWeights: Record<string, number> = {
  "chest-tightness": 25,
  "dizziness": 15,
  "headache": 10,
  "fatigue": 8,
  "anxiety": 12,
  "nausea": 10,
  "fever": 15,
  "cough": 8,
};

// Diagnosis risk factors
const diagnosisRiskFactors: Record<string, number> = {
  "Type 2 Diabetes": 15,
  "Hypertension (High BP)": 20,
  "Asthma": 12,
  "Heart Disease": 25,
  "Thyroid Disorder": 8,
  "Anxiety Disorder": 10,
  "Sleep Apnea": 12,
};

export function analyzeHealth(input: HealthAnalysisInput): HealthAnalysisResult {
  const reasoning: string[] = [];
  let baseScore = 0;

  // Analyze symptoms
  if (input.symptoms.length > 0) {
    input.symptoms.forEach((symptom) => {
      const weight = symptomWeights[symptom] || 5;
      baseScore += weight * (input.severity / 10);
    });
    reasoning.push(
      `${input.symptoms.length} symptom(s) reported with severity ${input.severity}/10`
    );
  }

  // Analyze sleep
  if (input.sleepScore < 50) {
    baseScore += 15;
    reasoning.push(`Low sleep score (${input.sleepScore}) indicates poor rest quality`);
  } else if (input.sleepScore < 70) {
    baseScore += 8;
    reasoning.push(`Moderate sleep score (${input.sleepScore}) suggests room for improvement`);
  }

  // Analyze past diagnoses
  input.pastDiagnoses.forEach((diagnosis) => {
    const riskFactor = diagnosisRiskFactors[diagnosis] || 5;
    baseScore += riskFactor;
    reasoning.push(`Pre-existing condition: ${diagnosis} increases baseline risk`);
  });

  // Lifestyle factors
  if (input.smoking) {
    baseScore += 15;
    reasoning.push("Smoking habit significantly increases health risks");
  }

  if (input.alcohol) {
    baseScore += 8;
    reasoning.push("Alcohol consumption contributes to risk factors");
  }

  if (input.activityLevel === "sedentary") {
    baseScore += 10;
    reasoning.push("Sedentary lifestyle increases cardiovascular risk");
  }

  // Age factor
  if (input.age) {
    if (input.age > 60) {
      baseScore += 15;
      reasoning.push("Age-related risk factors considered");
    } else if (input.age > 45) {
      baseScore += 8;
      reasoning.push("Middle-age health considerations factored in");
    }
  }

  // Normalize score to 0-100
  const healthRiskScore = Math.min(100, Math.max(0, Math.round(baseScore)));

  // Determine urgency level
  let urgencyLevel: "normal" | "monitor" | "emergency" = "normal";
  let recommendedDoctorType = "General Physician";

  if (healthRiskScore >= 70 || input.symptoms.includes("chest-tightness")) {
    urgencyLevel = "emergency";
    recommendedDoctorType = input.symptoms.includes("chest-tightness")
      ? "Cardiologist"
      : "Emergency Medicine Specialist";
    reasoning.push("⚠️ Elevated risk detected - immediate medical attention recommended");
  } else if (healthRiskScore >= 40) {
    urgencyLevel = "monitor";
    recommendedDoctorType = input.pastDiagnoses.includes("Heart Disease")
      ? "Cardiologist"
      : input.pastDiagnoses.includes("Asthma")
      ? "Pulmonologist"
      : "General Physician";
    reasoning.push("Regular monitoring and follow-up consultation advised");
  } else {
    reasoning.push("Current health status appears stable");
  }

  // Generate summary
  const summary = generateSummary(healthRiskScore, urgencyLevel, input);

  return {
    healthRiskScore,
    urgencyLevel,
    recommendedDoctorType,
    reasoning,
    summary,
  };
}

function generateSummary(
  score: number,
  urgency: string,
  input: HealthAnalysisInput
): string {
  const scoreLabel =
    score < 30 ? "low" : score < 60 ? "moderate" : score < 80 ? "elevated" : "high";

  let summary = `Your current health risk score is ${score}/100 (${scoreLabel}). `;

  if (input.symptoms.length > 0) {
    summary += `You reported ${input.symptoms.length} symptom(s) with a severity of ${input.severity}/10. `;
  }

  if (input.sleepScore < 60) {
    summary += "Your sleep quality needs attention. ";
  }

  if (urgency === "emergency") {
    summary +=
      "Given your symptoms and health profile, we strongly recommend seeking immediate medical consultation.";
  } else if (urgency === "monitor") {
    summary +=
      "We recommend scheduling a check-up with your healthcare provider within the next few days.";
  } else {
    summary +=
      "Continue maintaining healthy habits and log any new symptoms for tracking.";
  }

  return summary;
}

// Calculate sleep score based on hours and quality
export function calculateSleepScore(hours: number, quality: string): number {
  let baseScore = 0;

  // Hours scoring (optimal is 7-9 hours)
  if (hours >= 7 && hours <= 9) {
    baseScore = 70;
  } else if (hours >= 6 && hours < 7) {
    baseScore = 55;
  } else if (hours > 9 && hours <= 10) {
    baseScore = 60;
  } else if (hours >= 5 && hours < 6) {
    baseScore = 40;
  } else if (hours > 10) {
    baseScore = 45;
  } else {
    baseScore = 25;
  }

  // Quality adjustment
  const qualityBonus: Record<string, number> = {
    excellent: 30,
    good: 20,
    average: 10,
    poor: 0,
  };

  return Math.min(100, baseScore + (qualityBonus[quality] || 0));
}

// Generate blockchain-style access key
export function generateAccessKey(): {
  accessKey: string;
  keyHash: string;
} {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let accessKey = "";

  // Generate 4 groups of 4 characters
  for (let g = 0; g < 4; g++) {
    for (let i = 0; i < 4; i++) {
      accessKey += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    if (g < 3) accessKey += "-";
  }

  // Generate mock hash (SHA-256 style)
  const hashChars = "0123456789abcdef";
  let keyHash = "";
  for (let i = 0; i < 64; i++) {
    keyHash += hashChars.charAt(Math.floor(Math.random() * hashChars.length));
  }

  return { accessKey, keyHash };
}
