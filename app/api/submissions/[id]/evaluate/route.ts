import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Submission } from "@/models/submission";
import { evaluateSubmission } from "@/lib/evaluator";

export async function POST(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    await connectDB();

    const submission = await Submission.findById(id);

    if (!submission) {
      return NextResponse.json(
        {
          error: "Submission not found.",
        },
        {
          status: 404,
        }
      );
    }

    // Prevent duplicate evaluation
    if (submission.status === "EVALUATING") {
      return NextResponse.json(
        {
          error: "Submission is already being evaluated.",
        },
        {
          status: 409,
        }
      );
    }

    if (submission.status === "COMPLETED") {
      return NextResponse.json({
        message: "Submission has already been evaluated.",
        evaluation: submission.evaluation,
      });
    }

    // Mark as evaluating
    submission.status = "EVALUATING";
    await submission.save();

    try {
      const result = evaluateSubmission({
        classes: submission.classes,
        responsibilities: submission.responsibilities,
        relationships: submission.relationships,
        assumptions: submission.assumptions,
        explanation: submission.explanation,
      });

      submission.evaluation = {
        ...result,
        evaluatedAt: new Date(),
      };

      submission.status = "COMPLETED";

      await submission.save();

      return NextResponse.json({
        message: "Evaluation completed.",
        status: submission.status,
        evaluation: submission.evaluation,
      });
    } catch (evaluationError) {
      console.error(
        "Evaluation failed:",
        evaluationError
      );

      submission.status = "FAILED";

      await submission.save();

      return NextResponse.json(
        {
          error: "Evaluation failed.",
          status: "FAILED",
        },
        {
          status: 500,
        }
      );
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}