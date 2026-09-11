# LLD Coach

LLD Coach is an MVP platform for practicing Low-Level Design (LLD) problems and receiving structured feedback on submitted designs.

The platform allows learners to:

- Choose an LLD problem
- Read the problem requirements
- Submit a structured design
- Receive AI-powered evaluation
- Review rubric-based feedback
- See evidence from their submitted design
- Get actionable improvement suggestions
- View previous attempts and scores

## Features

### 1. LLD Problem Practice

Currently supported:

- Parking Lot

Additional problems such as Elevator System, Vending Machine, Splitwise, and Library Management are planned.

### 2. Structured LLD Submission

Learners submit:

- Classes / Entities
- Responsibilities
- Relationships
- Assumptions / Edge Cases
- Design Explanation

### 3. Deterministic Validation

Before AI evaluation, the backend validates that the required submission fields are present.

### 4. AI-Powered Evaluation

The platform uses Google's Gemini API to evaluate the submitted design across seven dimensions:

1. Requirement Understanding
2. Class Responsibilities
3. Coupling & Cohesion
4. Abstraction
5. Extensibility
6. Edge Cases
7. Explanation Quality

The evaluator returns:

- Overall score
- Rubric breakdown
- Strengths
- Improvements
- Evidence from the submitted design
- Actionable suggestions

### 5. Evaluation Status

Submissions follow this flow:

```text
SUBMITTED
    ↓
EVALUATING
    ↓
COMPLETED
    or
FAILED
```
### 6. Attempt History

Previous attempts are stored and can be reviewed later.

The history page displays:

- Problem
- Attempt date
- Evaluation status
- Score
- Feedback

Each attempt can be opened to view the original submission and its evaluation.

## Tech Stack
- Next.js
- React
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- Google Gemini API

## Project Structure
lld-coach/
├── app/
│   ├── api/
│   │   └── submissions/
│   │       ├── route.ts
│   │       └── [id]/
│   │           └── evaluate/
│   │               └── route.ts
│   ├── history/
│   │   └── page.tsx
│   ├── practice/
│   │   └── parking-lot/
│   │       └── page.tsx
│   ├── problems/
│   │   └── parking-lot/
│   │       └── page.tsx
│   ├── submissions/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── db.ts
│   ├── evaluator.ts
│   └── validation.ts
├── models/
│   └── submission.ts
├── AI_USAGE.md
├── package.json
└── README.md

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Ferozhasnain1504/lld-coach
cd lld-coach
```

### 2. Install dependencies
```bash
npm install
```
Open:
```bash
http://localhost:3000
```

## Evaluation Architecture
The submission flow separates deterministic validation from AI-based evaluation.
```text
User submits LLD
       ↓
Backend validation
       ↓
Submission persisted in MongoDB
       ↓
Status = EVALUATING
       ↓
Gemini evaluation
       ↓
Structured evaluation result
       ↓
Evaluation persisted
       ↓
Status = COMPLETED
       ↓
Feedback displayed
```

This separation keeps basic validation deterministic while using AI for design-quality judgment.

## AI Usage
Details about the AI evaluation approach, prompt strategy, structured output, retry handling, and API usage are documented in:

```text
AI_USAGE.md
```

## Current Scope
This project intentionally focuses on a working MVP rather than implementing a large number of LLD problems.

The current end-to-end flow is implemented for the Parking Lot problem.

Future improvements may include:

- More LLD problems
- Diagram submission
- More advanced deterministic checks
- Improved evaluation analytics
- Authentication and user-specific attempt 
- history
- Deployment

## Licence
This project was built as an internship engineering assignment.