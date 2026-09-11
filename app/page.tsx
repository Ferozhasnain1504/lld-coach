import Link from "next/link";

const problems = [
  {
    title: "Parking Lot",
    difficulty: "Medium",
    description:
      "Design a parking lot system that supports multiple floors, vehicle types, parking spots, tickets, and payments.",
    tags: ["OOP", "SOLID", "Design Patterns"],
  },
  {
    title: "Elevator System",
    difficulty: "Hard",
    description:
      "Design an elevator system that handles multiple elevators, floor requests, scheduling, and movement.",
    tags: ["OOP", "State", "Strategy"],
  },
  {
    title: "Vending Machine",
    difficulty: "Easy",
    description:
      "Design a vending machine that supports products, payments, inventory management, and change.",
    tags: ["OOP", "State", "Encapsulation"],
  },
  {
    title: "Splitwise",
    difficulty: "Medium",
    description:
      "Design an expense-sharing system where users can create expenses and track balances.",
    tags: ["OOP", "Strategy", "Collections"],
  },
  {
    title: "Library Management",
    difficulty: "Medium",
    description:
      "Design a library system that manages books, members, borrowing, returning, and availability.",
    tags: ["OOP", "SOLID", "Abstraction"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold">LLD Coach</h1>
            <p className="text-sm text-slate-400">
              Practice. Design. Improve.
            </p>
          </div>

          <Link
            href="/history"
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800"
          >
            My Attempts
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium text-blue-400">
            LOW-LEVEL DESIGN PRACTICE
          </p>

          <h2 className="text-5xl font-bold tracking-tight">
            Design better systems.
            <br />
            Understand why.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-400">
            Practice real-world LLD problems, submit your design, and receive
            structured feedback on your responsibilities, abstractions,
            coupling, and extensibility.
          </p>
        </div>
      </section>

      {/* Problems */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold">Choose a problem</h3>
          <p className="mt-2 text-slate-400">
            Pick a problem and start designing.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-slate-600"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  {problem.difficulty}
                </span>
              </div>

              <h4 className="text-xl font-semibold">{problem.title}</h4>

              <p className="mt-3 flex-1 text-sm leading-6 text-slate-400">
                {problem.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {problem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {problem.title === "Parking Lot" ? (
                <Link
                  href="/problems/parking-lot"
                  className="mt-6 w-full rounded-lg bg-white px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-slate-200"
                >
                  Practice →
                </Link>
              ) : (
                <button
                  disabled
                  className="mt-6 w-full cursor-not-allowed rounded-lg border border-slate-700 px-4 py-3 text-center text-sm font-semibold text-slate-500"
                >
                  Coming Soon
                </button>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}