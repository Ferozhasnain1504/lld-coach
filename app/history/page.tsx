import Link from "next/link";
import { connectDB } from "@/lib/db";
import {Submission} from "@/models/submission";

export default async function HistoryPage() {
  await connectDB();

  const submissions = await Submission.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-12">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <Link
            href="/"
            className="text-slate-400 hover:text-white"
          >
            ← Back to Home
          </Link>

          <h1 className="text-4xl font-bold mt-6">
            Attempt History
          </h1>

          <p className="text-slate-400 mt-2">
            Review your previous LLD practice attempts.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            {submissions.length}{" "}
            {submissions.length === 1 ? "attempt" : "attempts"} recorded
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="border border-slate-800 rounded-xl p-8 text-center">
            <p className="text-slate-400">
              No attempts yet.
            </p>

            <Link
              href="/problems/parking-lot"
              className="inline-block mt-4 bg-white text-black px-5 py-2 rounded-lg"
            >
              Start Practicing
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission: any) => (
              <div
                key={submission._id.toString()}
                className="border border-slate-800 bg-slate-900 rounded-xl p-6 flex items-center justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold">
                    {submission.problemTitle}
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    {new Date(
                      submission.createdAt
                    ).toLocaleDateString()}
                  </p>

                  <p className="text-sm mt-3">
                    Status:{" "}
                    <span
                      className={
                        submission.status === "COMPLETED"
                          ? "text-green-400"
                          : submission.status === "EVALUATING"
                          ? "text-blue-400"
                          : submission.status === "FAILED"
                          ? "text-red-400"
                          : "text-yellow-400"
                      }
                    >
                      {submission.status}
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  {submission.evaluation?.overallScore ? (
                    <p className="text-3xl font-bold">
                      {submission.evaluation.overallScore}/10
                    </p>
                  ) : (
                    <p className="text-slate-400">
                      Not evaluated
                    </p>
                  )}

                  <Link
                    href={`/submissions/${submission._id}`}
                    className="inline-block mt-3 text-sm underline"
                  >
                    View Feedback →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}