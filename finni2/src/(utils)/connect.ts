/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function dbConnect(string: string): Promise<void> {
  let client;

  try {
    client = await mongoose.connect(MONGODB_URI!);
    console.log(`Connected to database for ${string} request`);
  } catch (error: unknown) {
    console.log({
      message: "There was an error connecting to the database",
      //@ts-expect-error no error type
      details: error.message,
    });
    return;
  }
}

export async function dbDisconnect(): Promise<void> {
  await mongoose.disconnect();
  console.log("Disconnected from database");
  return;
}
