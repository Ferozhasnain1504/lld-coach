import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  problemId: string;
  problemTitle: string;

  classes: string;
  responsibilities: string;
  relationships: string;
  assumptions: string;
  explanation: string;

  status:
    | "SUBMITTED"
    | "EVALUATING"
    | "COMPLETED"
    | "FAILED";

  evaluation?: {
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

    evaluatedAt: Date;
  };

  createdAt: Date;
}

const SubmissionSchema = new Schema<ISubmission>(
  {
    problemId: {
      type: String,
      required: true,
    },

    problemTitle: {
      type: String,
      required: true,
    },

    classes: {
      type: String,
      required: true,
    },

    responsibilities: {
      type: String,
      required: true,
    },

    relationships: {
      type: String,
      required: true,
    },

    assumptions: {
      type: String,
      required: true,
    },

    explanation: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "SUBMITTED",
        "EVALUATING",
        "COMPLETED",
        "FAILED",
      ],
      default: "SUBMITTED",
    },

    evaluation: {
      overallScore: Number,

      criteria: {
        requirementUnderstanding: Number,
        responsibilities: Number,
        couplingCohesion: Number,
        abstraction: Number,
        extensibility: Number,
        edgeCases: Number,
        explanation: Number,
      },

      strengths: [String],
      improvements: [String],

      evaluatedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Submission =
  mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", SubmissionSchema);