"use client";

import { useState } from "react";
import Link from "next/link";

export default function ParkingLotPracticePage() {
  const [classes, setClasses] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [relationships, setRelationships] = useState("");
  const [assumptions, setAssumptions] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("/api/submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problemId: "parking-lot",
        problemTitle: "Parking Lot",
        classes,
        responsibilities,
        relationships,
        assumptions,
        explanation,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Something went wrong.");
      return;
    }

      const evaluationResponse = await fetch(
        `/api/submissions/${data.submissionId}/evaluate`,
        {
          method: "POST",
        }
      );

      const evaluationData =
        await evaluationResponse.json();

      if (!evaluationResponse.ok) {
        alert(
          evaluationData.error ||
            "Evaluation failed."
        );
        return;
      }

      window.location.href = `/submissions/${data.submissionId}`;
    } catch (error) {
      console.error(error);
      alert("Unable to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            LLD Coach
          </Link>

          <Link
            href="/problems/parking-lot"
            className="text-sm text-slate-400 hover:text-white"
          >
            ← Problem
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Page heading */}
        <div className="mb-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
              Medium
            </span>

            <span className="text-sm text-slate-500">
              LLD Practice
            </span>
          </div>

          <h1 className="text-4xl font-bold">
            Parking Lot
          </h1>

          <p className="mt-3 max-w-3xl text-slate-400">
            Design a parking lot system that supports multiple
            floors, different vehicle types, parking spots,
            tickets, and payments.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Requirements sidebar */}
          <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-6 lg:sticky lg:top-6">
            <h2 className="text-lg font-semibold">
              Requirements
            </h2>

            <ul className="mt-5 space-y-4 text-sm text-slate-400">
              <li>✓ Multiple parking floors</li>
              <li>✓ Different parking spots</li>
              <li>✓ Different vehicle types</li>
              <li>✓ Assign appropriate spot</li>
              <li>✓ Generate parking ticket</li>
              <li>✓ Vehicle exit and payment</li>
            </ul>

            <div className="mt-8 border-t border-slate-800 pt-6">
              <h3 className="text-sm font-medium">
                Before you submit
              </h3>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Think about responsibilities, abstractions,
                relationships, extensibility, and edge cases.
              </p>
            </div>
          </aside>

          {/* Design form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            {/* Classes */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <label
                htmlFor="classes"
                className="text-lg font-semibold"
              >
                1. Classes
              </label>

              <p className="mt-2 text-sm text-slate-400">
                What classes or interfaces would you create?
              </p>

              <textarea
                id="classes"
                value={classes}
                onChange={(e) => setClasses(e.target.value)}
                placeholder={`Example:

ParkingLot
ParkingFloor
ParkingSpot
Vehicle
ParkingTicket
Payment`}
                className="mt-4 min-h-40 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
                required
              />
            </section>

            {/* Responsibilities */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <label
                htmlFor="responsibilities"
                className="text-lg font-semibold"
              >
                2. Responsibilities
              </label>

              <p className="mt-2 text-sm text-slate-400">
                What responsibility does each important class have?
              </p>

              <textarea
                id="responsibilities"
                value={responsibilities}
                onChange={(e) =>
                  setResponsibilities(e.target.value)
                }
                placeholder={`Example:

ParkingLot: manages floors and parking operations.
ParkingFloor: manages spots on a floor.
ParkingSpot: represents an individual parking space.
Vehicle: stores vehicle information.`}
                className="mt-4 min-h-44 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
                required
              />
            </section>

            {/* Relationships */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <label
                htmlFor="relationships"
                className="text-lg font-semibold"
              >
                3. Relationships
              </label>

              <p className="mt-2 text-sm text-slate-400">
                Explain how your classes interact with each other.
              </p>

              <textarea
                id="relationships"
                value={relationships}
                onChange={(e) =>
                  setRelationships(e.target.value)
                }
                placeholder={`Example:

ParkingLot contains multiple ParkingFloors.
ParkingFloor contains multiple ParkingSpots.
ParkingTicket is associated with a Vehicle.
ParkingLot assigns a ParkingSpot to a Vehicle.`}
                className="mt-4 min-h-40 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
                required
              />
            </section>

            {/* Assumptions */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <label
                htmlFor="assumptions"
                className="text-lg font-semibold"
              >
                4. Assumptions
              </label>

              <p className="mt-2 text-sm text-slate-400">
                What assumptions are you making about the system?
              </p>

              <textarea
                id="assumptions"
                value={assumptions}
                onChange={(e) =>
                  setAssumptions(e.target.value)
                }
                placeholder={`Example:

• One vehicle occupies one parking spot.
• A spot can hold only one vehicle.
• Payment is required before exit.
• Each ticket belongs to one vehicle.`}
                className="mt-4 min-h-36 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
                required
              />
            </section>

            {/* Explanation */}
            <section className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <label
                htmlFor="explanation"
                className="text-lg font-semibold"
              >
                5. Design Explanation
              </label>

              <p className="mt-2 text-sm text-slate-400">
                Explain your important design decisions and trade-offs.
              </p>

              <textarea
                id="explanation"
                value={explanation}
                onChange={(e) =>
                  setExplanation(e.target.value)
                }
                placeholder="Why did you choose this design? Where would you use abstraction or an interface? How could your design handle a new requirement such as EV charging spots?"
                className="mt-4 min-h-48 w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-white outline-none placeholder:text-slate-600 focus:border-slate-500"
                required
              />
            </section>

            {/* Submit */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <div>
                <p className="font-medium">
                  Ready to submit?
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  You will receive structured feedback on your design.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmitting ? "Evaluating..." : "Submit Design →"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}