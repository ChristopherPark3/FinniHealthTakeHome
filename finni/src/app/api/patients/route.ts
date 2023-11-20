/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import Patient from "~/app/(models)/patient";
import mongoose from "mongoose";
import { dbConnect, dbDisconnect } from "~/(utils)/connect";

export async function POST(
  req: NextRequest,
): Promise<void | NextResponse<unknown>> {
  // Establish connection to MongoDB database
  await dbConnect("POST");

  const data = await req.json();

  try {
    await Patient.create(data);
    // Disconnect from database
    await dbDisconnect()
    return NextResponse.json({ message: "Patient created" });
  } catch (error) {
    return NextResponse.json({
      message: "Patient creation failed",
      details: error.message,
    });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect("GET");
}
