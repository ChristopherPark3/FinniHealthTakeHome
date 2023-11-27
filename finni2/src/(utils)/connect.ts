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
