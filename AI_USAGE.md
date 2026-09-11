# AI Usage

## Overview

The LLD Coach platform uses Google's Gemini API to evaluate learner submissions and provide structured feedback on Low-Level Design solutions.

The AI evaluation is used after a learner submits a solution for a practice problem such as Parking Lot.

## What AI Is Used For

Gemini evaluates the learner's submitted LLD across seven dimensions:

1. Requirement Understanding
2. Class Responsibilities
3. Coupling and Cohesion
4. Abstraction
5. Extensibility
6. Edge Cases
7. Explanation Quality

The evaluator produces:

- Overall score
- Rubric scores
- Strengths
- Improvements
- Evidence from the learner's design
- Actionable suggestions

## Input Provided to the AI

The evaluator sends the learner's structured submission to Gemini:

- Classes / Entities
- Responsibilities
- Relationships
- Assumptions / Edge Cases
- Design Explanation

The AI is explicitly instructed to evaluate the actual submitted design rather than relying on generic Parking Lot solutions.

## Prompt Strategy

The prompt instructs Gemini to:

- Evaluate each rubric criterion from 1 to 10.
- Be fair to beginner/intermediate developers.
- Avoid judging based on answer length.
- Ground feedback in the learner's actual submission.
- Avoid inventing classes, relationships, patterns, or features.
- Identify specific strengths supported by the submission.
- Identify weaknesses that can be improved.
- Provide evidence tied directly to the learner's design.
- Provide concrete and actionable suggestions.

This makes the feedback more useful than generic LLD advice.

## Structured Output

Gemini is requested to return JSON using a response schema.

The expected structure contains:

```text
overallScore
criteria
  requirementUnderstanding
  responsibilities
  couplingCohesion
  abstraction
  extensibility
  edgeCases
  explanation
strengths
improvements
evidence
actionableSuggestions
```