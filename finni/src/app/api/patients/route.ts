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
  console.log(data)

  // cases for different types of requests
  if (data.type === "POST-CreatePatient") {
    try {
      await Patient.create(data);
      // Disconnect from database
      await dbDisconnect();
      return NextResponse.json({ message: "Patient created" });
    } catch (error) {
      return NextResponse.json({
        message: "Patient creation failed",
        details: error.message,
      });
    }
  }
  if (data.type === "GET-AllPatients") {
    try {
      // find all patients
      const patients = await Patient.find({});
      return NextResponse.json({
        message: "Request for all patients successful",
        data: patients,
      });
    } catch (error) {
      return NextResponse.json({
        message: "Failed to get all patients",
        details: error.message,
      });
    }
  }
  if (data.type === "GET-OnePatient") {
    try {
      // find all patients
      const patient = await Patient.find({firstName: data.firstName});
      return NextResponse.json({
        message: "GET request for one patient successful",
        data: patient,
      });
    } catch (error) {
      return NextResponse.json({
        message: "Failed to get patient",
        details: error.message,
      });
    }
  }
}

export async function DELETE(req: NextRequest): Promise<void | NextResponse<unknown>> {
  await dbConnect('DELETE')
    
  try {

  } catch (error) {
    return NextResponse.json({
      message: "Failed to delete patient",
      details: error.message,
    });
  }
}

