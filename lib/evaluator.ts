type EvaluationInput = {
  classes: string;
  responsibilities: string;
  relationships: string;
  assumptions: string;
  explanation: string;
};

type EvaluationResult = {
  overallScore: number;

  criteria: {
    requirementUnderstanding: number;
    responsibilities: number;
    couplingCohesion: number;
    abstraction: number;
    extensibility: number;
    edgeCases: number;
    explanation: number;
  };

  strengths: string[];
  improvements: string[];
};

export function evaluateSubmission(
  input: EvaluationInput
): EvaluationResult {
  // Measure the amount of information provided
  const classesLength = input.classes.trim().length;

  const responsibilitiesLength =
    input.responsibilities.trim().length;

  const relationshipsLength =
    input.relationships.trim().length;

  const assumptionsLength =
    input.assumptions.trim().length;

  const explanationLength =
    input.explanation.trim().length;

  // Basic deterministic checks

  const requirementUnderstanding =
    assumptionsLength > 80 ? 8 : 5;

  const responsibilities =
    responsibilitiesLength > 120 ? 8 : 5;

  const couplingCohesion =
    relationshipsLength > 100 ? 8 : 5;

  const abstraction =
    classesLength > 80 ? 7 : 5;

  const extensibility =
    explanationLength > 150 ? 8 : 5;

  const edgeCases =
    assumptionsLength > 150 ? 8 : 5;

  const explanation =
    explanationLength > 150 ? 8 : 5;

  // Calculate overall score
  const scores = [
    requirementUnderstanding,
    responsibilities,
    couplingCohesion,
    abstraction,
    extensibility,
    edgeCases,
    explanation,
  ];

  const overallScore = Math.round(
    scores.reduce((sum, score) => sum + score, 0) /
      scores.length
  );

  // Generate strengths and improvements
  const strengths: string[] = [];
  const improvements: string[] = [];

  if (responsibilities >= 8) {
    strengths.push(
      "The submission provides reasonably detailed class responsibilities."
    );
  } else {
    improvements.push(
      "Clarify the responsibility of each major class."
    );
  }

  if (couplingCohesion >= 8) {
    strengths.push(
      "The submission explains relationships between the main classes."
    );
  } else {
    improvements.push(
      "Explain more clearly how the classes interact."
    );
  }

  if (edgeCases >= 8) {
    strengths.push(
      "The submission documents useful system assumptions and edge cases."
    );
  } else {
    improvements.push(
      "Add more assumptions and edge cases."
    );
  }

  if (explanation >= 8) {
    strengths.push(
      "The design explanation provides useful reasoning."
    );
  } else {
    improvements.push(
      "Explain the reasoning behind important design decisions."
    );
  }

  return {
    overallScore,

    criteria: {
      requirementUnderstanding,
      responsibilities,
      couplingCohesion,
      abstraction,
      extensibility,
      edgeCases,
      explanation,
    },

    strengths,
    improvements,
  };
}