import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Submission } from "@/models/submission";
import { validateSubmission } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      problemId,
      problemTitle,
      classes,
      responsibilities,
      relationships,
      assumptions,
      explanation,
    } = body;

    // Basic validation
    if (
      !problemId ||
      !problemTitle ||
      !classes ||
      !responsibilities ||
      !relationships ||
      !assumptions ||
      !explanation
    ) {
      return NextResponse.json(
        {
          error: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    const validation = validateSubmission({
      classes,
      responsibilities,
      relationships,
      assumptions,
      explanation,
    });

    if (!validation.valid) {
      return NextResponse.json(
        {
          error: "Submission validation failed.",
          details: validation.errors,
        },
        { status: 400 }
      );
    }

    await connectDB();

    const submission = await Submission.create({
      problemId,
      problemTitle,
      classes,
      responsibilities,
      relationships,
      assumptions,
      explanation,
      status: "SUBMITTED",
    });

    return NextResponse.json(
      {
        message: "Submission saved successfully.",
        submissionId: submission._id,
        status: submission.status,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Submission error:", error);

    return NextResponse.json(
      {
        error: "Failed to save submission.",
      },
      {
        status: 500,
      }
    );
  }
}