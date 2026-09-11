type SubmissionInput = {
  classes: string;
  responsibilities: string;
  relationships: string;
  assumptions: string;
  explanation: string;
};

export function validateSubmission(input: SubmissionInput) {
  const errors: string[] = [];

  if (!input.classes.trim()) {
    errors.push("Classes / Entities are required.");
  }

  if (!input.responsibilities.trim()) {
    errors.push("Responsibilities are required.");
  }

  if (!input.relationships.trim()) {
    errors.push("Relationships are required.");
  }

  if (!input.assumptions.trim()) {
    errors.push("Assumptions / Edge Cases are required.");
  }

  if (!input.explanation.trim()) {
    errors.push("Design Explanation is required.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}