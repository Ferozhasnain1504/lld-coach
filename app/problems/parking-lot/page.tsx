import Link from "next/link";

export default function ParkingLotPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-xl font-bold">
            LLD Coach
          </Link>

          <Link
            href="/"
            className="text-sm text-slate-400 hover:text-white"
          >
            ← All Problems
          </Link>
        </div>
      </header>

      {/* Problem */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        {/* Difficulty */}
        <span className="rounded-full bg-slate-800 px-3 py-1 text-sm text-slate-300">
          Medium
        </span>

        <h1 className="mt-5 text-4xl font-bold">
          Parking Lot
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-400">
          Design a parking lot system that can manage multiple
          floors, different types of vehicles, parking spots,
          tickets, and payments.
        </p>

        {/* Requirements */}
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-7">
          <h2 className="text-xl font-semibold">
            Requirements
          </h2>

          <ul className="mt-5 space-y-4 text-slate-300">
            <li>✓ The parking lot can have multiple floors.</li>
            <li>✓ Each floor can contain different parking spots.</li>
            <li>✓ The system should support different vehicle types.</li>
            <li>✓ A vehicle should be assigned an appropriate parking spot.</li>
            <li>✓ The system should generate a parking ticket.</li>
            <li>✓ The system should support vehicle exit and payment.</li>
          </ul>
        </div>

        {/* What to think about */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-7">
          <h2 className="text-xl font-semibold">
            Think about
          </h2>

          <ul className="mt-5 space-y-3 text-slate-400">
            <li>• What classes would you create?</li>
            <li>• What responsibility should each class have?</li>
            <li>• How should the classes interact?</li>
            <li>• Where would you use interfaces or abstractions?</li>
            <li>• How would your design change if EV parking spots were added?</li>
          </ul>
        </div>

        {/* Start */}
        <div className="mt-10 flex justify-end">
          <Link
            href="/practice/parking-lot"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Start Practice →
          </Link>
        </div>
      </section>
    </main>
  );
}