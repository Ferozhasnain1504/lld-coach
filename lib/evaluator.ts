import { GoogleGenAI } from "@google/genai";

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
  evidence: string[];
  actionableSuggestions: string[];
};

const evaluationSchema = {
  type: "object",
  properties: {
    overallScore: {
      type: "integer",
      description: "Overall LLD score from 1 to 10.",
    },

    criteria: {
      type: "object",
      properties: {
        requirementUnderstanding: {
          type: "integer",
          description: "Score from 1 to 10.",
        },
        responsibilities: {
          type: "integer",
          description: "Score from 1 to 10.",
        },
        couplingCohesion: {
          type: "integer",
          description: "Score from 1 to 10.",
        },
        abstraction: {
          type: "integer",
          description: "Score from 1 to 10.",
        },
        extensibility: {
          type: "integer",
          description: "Score from 1 to 10.",
        },
        edgeCases: {
          type: "integer",
          description: "Score from 1 to 10.",
        },
        explanation: {
          type: "integer",
          description: "Score from 1 to 10.",
        },
      },
      required: [
        "requirementUnderstanding",
        "responsibilities",
        "couplingCohesion",
        "abstraction",
        "extensibility",
        "edgeCases",
        "explanation",
      ],
    },

    strengths: {
      type: "array",
      items: {
        type: "string",
      },
      description: "Specific strengths supported by the submission.",
    },

    improvements: {
      type: "array",
      items: {
        type: "string",
      },
      description: "Specific actionable improvements.",
    },

    evidence: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Specific observations directly grounded in the student's submitted design.",
    },

    actionableSuggestions: {
      type: "array",
      items: {
        type: "string",
      },
      description:
        "Concrete changes the student can make to improve their design.",
    },
  },

  required: [
    "overallScore",
    "criteria",
    "strengths",
    "improvements",
    "evidence",
    "actionableSuggestions",
  ],
};

export async function evaluateSubmission(
  input: EvaluationInput
): Promise<EvaluationResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const ai = new GoogleGenAI({
    apiKey
  });

  const prompt = `
You are an expert software engineer and LLD interviewer.

Evaluate the following Low-Level Design submission.

Be fair to a beginner/intermediate developer.
Do not judge based on how long the answer is.
Judge the actual quality of the proposed design.

Evaluate these dimensions:

1. Requirement Understanding
- Does the design address the main requirements?
- Are important requirements missing?

2. Class Responsibilities
- Does each class have a clear and focused responsibility?
- Avoid classes that do too many unrelated things.

3. Coupling and Cohesion
- Are relationships between classes reasonable?
- Is unnecessary coupling avoided?
- Are responsibilities cohesive?

4. Abstraction
- Are interfaces, inheritance, composition, or design patterns used appropriately?
- Do not require design patterns when they are unnecessary.

5. Extensibility
- How easily can the system support new requirements?
- Consider adding new vehicle types, payment methods, parking spot types, etc.

6. Edge Cases
- Does the design consider realistic edge cases?
- Examples: no available spot, invalid vehicle, duplicate parking, payment failure, etc.

7. Explanation Quality
- Does the explanation clearly justify important design decisions?

IMPORTANT:
- Score every criterion from 1 to 10.
- The overall score should reflect the quality of the complete design.
- Give specific feedback based ONLY on the submitted design.
- Do not invent classes or features that the user did not mention.
- Strengths should refer to things actually present in the submission.
- Improvements should be actionable and useful for improving the LLD.
- Ground feedback in the student's submitted design rather than generic Parking Lot design advice.

EVIDENCE-BASED FEEDBACK:

- The evidence array must contain specific observations from the student's actual submission.
- Each evidence item must refer to something the student explicitly wrote in their Classes, Responsibilities, Relationships, Assumptions/Edge Cases, or Design Explanation.
- Explain briefly why that observed design choice affects the LLD.
- Do not invent classes, relationships, patterns, or design decisions that are not present in the submission.

ACTIONABLE SUGGESTIONS:

- The actionableSuggestions array must contain concrete changes the student could make to improve their design.
- Suggestions must be based on weaknesses actually visible in the submission.
- Avoid generic advice such as "improve your design."
- Prefer concrete suggestions such as introducing an interface, separating a responsibility, reducing coupling, using composition, or handling a specific edge case.
- Every suggestion should be relevant to the student's actual design.

Here is the student's submission:

CLASSES / ENTITIES:
${input.classes}

RESPONSIBILITIES:
${input.responsibilities}

RELATIONSHIPS:
${input.relationships}

ASSUMPTIONS / EDGE CASES:
${input.assumptions}

DESIGN EXPLANATION:
${input.explanation}
`;

let response;

for (let attempt = 0; attempt < 3; attempt++) {
  try {
    response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: evaluationSchema
      }
    });

    break;
  } catch (error: any) {
    const status = error?.status;

    if (status !== 503 || attempt === 2) {
      throw error;
    }

    const delay = 5000 * Math.pow(2, attempt);

    console.log(
      `Gemini temporarily unavailable. Retrying in ${
        delay / 1000
      } seconds...`
    );

    await new Promise((resolve) =>
      setTimeout(resolve, delay)
    );
  }
}

  if (!response.text) {
    throw new Error("Gemini returned an empty response.");
  }

  const result = JSON.parse(response.text) as EvaluationResult;

  return result;
}