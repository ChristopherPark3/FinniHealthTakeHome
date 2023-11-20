/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import Patient from "~/app/(models)/patient";
import mongoose from "mongoose";
import { connect } from "~/(utils)/connect";

export async function POST(
  req: NextRequest,
): Promise<void | NextResponse<unknown>> {
  // Establish connection to MongoDB database
  await connect("POST");

  const data = await req.json();

  try {
    await Patient.create(data);
    return NextResponse.json({ message: "Patient created" });
  } catch (error) {
    return NextResponse.json({
      message: "Patient creation failed",
      details: error.message,
    });
  }
  // Disconnect from database
  await mongoose.disconnect();
  console.log("Disconnected from database");
}

export async function GET(req: NextRequest) {
  await connect("GET");
}
