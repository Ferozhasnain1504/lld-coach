import Link from "next/link";
import { connectDB } from "@/lib/db";
import { Submission } from "@/models/submission";

type ScoreRowProps = {
  label: string;
  score: number;
};

function ScoreRow({ label, score }: ScoreRowProps) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800 py-4 last:border-b-0">
      <span className="text-slate-300">{label}</span>

      <div className="flex items-center gap-3">
        <div className="w-32 h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full"
            style={{ width: `${score * 10}%` }}
          />
        </div>

        <span className="font-semibold w-10 text-right">
          {score}/10
        </span>
      </div>
    </div>
  );
}

export default async function SubmissionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();

  const submission = await Submission.findById(id).lean();

  if (!submission) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Submission Not Found
          </h1>

          <p className="text-slate-400 mt-3">
            We couldn't find this submission.
          </p>

          <Link
            href="/history"
            className="inline-block mt-6 px-5 py-2 rounded-lg bg-white text-black"
          >
            ← Back to History
          </Link>
        </div>
      </main>
    );
  }

  const evaluation = submission.evaluation;

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}

        <div className="mb-10">
          <Link
            href="/history"
            className="text-slate-400 hover:text-white"
          >
            ← Back to History
          </Link>

          <div className="mt-6">
            <p className="text-sm text-blue-400 font-medium">
              LLD PRACTICE
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {submission.problemTitle}
            </h1>

            <p className="text-slate-400 mt-2">
              Evaluation and feedback for your submission.
            </p>
          </div>
        </div>

        {!evaluation ? (
          <div className="border border-slate-800 bg-slate-900 rounded-2xl p-8 text-center">
            {submission.status === "SUBMITTED" && (
              <>
                <h2 className="text-xl font-semibold">
                  Submission Received
                </h2>

                <p className="text-slate-400 mt-2">
                  Your design has been submitted and is waiting for evaluation.
                </p>
              </>
            )}

            {submission.status === "EVALUATING" && (
              <>
                <h2 className="text-xl font-semibold">
                  Evaluation in Progress
                </h2>

                <p className="text-slate-400 mt-2">
                  Your LLD design is currently being evaluated. Please check back shortly.
                </p>
              </>
            )}

            {submission.status === "FAILED" && (
              <>
                <h2 className="text-xl font-semibold">
                  Evaluation Failed
                </h2>

                <p className="text-slate-400 mt-2">
                  We couldn't complete the evaluation for this submission.
                  Please try submitting your design again.
                </p>

                <Link
                  href="/practice/parking-lot"
                  className="inline-block mt-6 px-5 py-2 rounded-lg bg-white text-black font-medium hover:bg-slate-200"
                >
                  Try Again
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">

            {/* Your Submission */}

            <section className="border border-slate-800 bg-slate-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold">
                Your Submission
              </h2>

              <p className="text-slate-400 mt-2">
                Here's the LLD design you submitted for evaluation.
              </p>

              <div className="mt-6 space-y-6">

                <div>
                  <h3 className="font-semibold text-blue-400">
                    Classes / Entities
                  </h3>
                  <p className="text-slate-300 mt-2 whitespace-pre-wrap">
                    {submission.classes}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-400">
                    Responsibilities
                  </h3>
                  <p className="text-slate-300 mt-2 whitespace-pre-wrap">
                    {submission.responsibilities}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-400">
                    Relationships
                  </h3>
                  <p className="text-slate-300 mt-2 whitespace-pre-wrap">
                    {submission.relationships}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-400">
                    Assumptions / Edge Cases
                  </h3>
                  <p className="text-slate-300 mt-2 whitespace-pre-wrap">
                    {submission.assumptions}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-blue-400">
                    Design Explanation
                  </h3>
                  <p className="text-slate-300 mt-2 whitespace-pre-wrap">
                    {submission.explanation}
                  </p>
                </div>

              </div>
            </section>

            {/* Overall Score */}

            <section className="border border-slate-800 bg-slate-900 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

                <div>
                  <p className="text-slate-400">
                    Overall Score
                  </p>

                  <h2 className="text-6xl font-bold mt-2">
                    {evaluation.overallScore}
                    <span className="text-2xl text-slate-500">
                      /10
                    </span>
                  </h2>

                  <p className="text-slate-400 mt-3">
                    AI-generated LLD evaluation
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 text-green-400 text-sm">
                    {submission.status}
                  </span>

                  <p className="text-sm text-slate-500 mt-3">
                    {new Date(
                      submission.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

              </div>
            </section>

            {/* Rubric */}

            <section className="border border-slate-800 bg-slate-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-2">
                Rubric Breakdown
              </h2>

              <p className="text-slate-400 mb-5">
                Here's how your design performed across the
                major LLD criteria.
              </p>

              <ScoreRow
                label="Requirement Understanding"
                score={evaluation.criteria.requirementUnderstanding}
              />

              <ScoreRow
                label="Class Responsibilities"
                score={evaluation.criteria.responsibilities}
              />

              <ScoreRow
                label="Coupling & Cohesion"
                score={evaluation.criteria.couplingCohesion}
              />

              <ScoreRow
                label="Abstraction"
                score={evaluation.criteria.abstraction}
              />

              <ScoreRow
                label="Extensibility"
                score={evaluation.criteria.extensibility}
              />

              <ScoreRow
                label="Edge Cases"
                score={evaluation.criteria.edgeCases}
              />

              <ScoreRow
                label="Explanation Quality"
                score={evaluation.criteria.explanation}
              />
            </section>

            {/* Strengths */}

            <section className="border border-slate-800 bg-slate-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold">
                What You Did Well
              </h2>

              <div className="mt-5 space-y-3">
                {evaluation.strengths.length > 0 ? (
                  evaluation.strengths.map(
                    (strength, index) => (
                      <div
                        key={index}
                        className="flex gap-3"
                      >
                        <span className="text-green-400">
                          ✓
                        </span>

                        <p className="text-slate-300">
                          {strength}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-slate-400">
                    No strengths were provided.
                  </p>
                )}
              </div>
            </section>

            {/* Improvements */}

            <section className="border border-slate-800 bg-slate-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold">
                How You Can Improve
              </h2>

              <div className="mt-5 space-y-3">
                {evaluation.improvements.length > 0 ? (
                  evaluation.improvements.map(
                    (improvement, index) => (
                      <div
                        key={index}
                        className="flex gap-3"
                      >
                        <span className="text-yellow-400">
                          →
                        </span>

                        <p className="text-slate-300">
                          {improvement}
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-slate-400">
                    No improvements were provided.
                  </p>
                )}
              </div>
            </section>
            
            {/* Evidence */}
            <section className="border border-slate-800 bg-slate-900 rounded-2xl p-8">
              <h2 className="text-2xl font-bold">
                Evidence From Your Design
              </h2>

              <p className="text-slate-400 mt-2">
                The AI evaluator identified these observations directly from
                your submitted design.
              </p>

              <div className="mt-5 space-y-3">
                {evaluation.evidence && evaluation.evidence.length > 0 ? (
                  evaluation.evidence.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-3"
                    >
                      <span className="text-blue-400">
                        •
                      </span>

                      <p className="text-slate-300">
                        {item}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400">
                    No evidence was provided for this evaluation.
                  </p>
                )}
              </div>
            </section>

            {/* Actionable Suggestions */}

            <section className="border border-slate-800 bg-slate-900 rounded-2xl p-8">
            <h2 className="text-2xl font-bold">
                Actionable Suggestions
            </h2>

            <p className="text-slate-400 mt-2">
                Concrete changes you can make to improve your LLD.
            </p>

            <div className="mt-5 space-y-3">
                {evaluation.actionableSuggestions &&
                evaluation.actionableSuggestions.length > 0 ? (
                evaluation.actionableSuggestions.map((suggestion, index) => (
                    <div
                    key={index}
                    className="flex gap-3"
                    >
                    <span className="text-purple-400">
                        →
                    </span>

                    <p className="text-slate-300">
                        {suggestion}
                    </p>
                    </div>
                ))
                ) : (
                <p className="text-slate-400">
                    No actionable suggestions were provided for this evaluation.
                </p>
                )}
            </div>
            </section>

            {/* Actions */}

            <div className="flex flex-wrap gap-4 pt-2">

              <Link
                href="/practice/parking-lot"
                className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-slate-200"
              >
                Try Again
              </Link>

              <Link
                href="/history"
                className="px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-900"
              >
                View History
              </Link>

              <Link
                href="/"
                className="px-6 py-3 rounded-lg border border-slate-700 hover:bg-slate-900"
              >
                Back Home
              </Link>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}