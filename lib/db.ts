import mongoose from "mongoose";

let cached = (
  global as typeof globalThis & {
    mongoose?: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
  }
).mongoose;

if (!cached) {
  cached = {
    conn: null,
    promise: null,
  };

  (
    global as typeof globalThis & {
      mongoose?: typeof cached;
    }
  ).mongoose = cached;
}

export async function connectDB() {
  if (cached!.conn) {
    return cached!.conn;
  }

  if (!cached!.promise) {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error("Please define MONGODB_URI in .env.local");
    }

    cached!.promise = mongoose.connect(mongoUri);
  }

  cached!.conn = await cached!.promise;

  return cached!.conn;
}