/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import { dbConnect, dbDisconnect } from "../../../(utils)/connect";
import Patient from "../../(models)/patient";
import { NewPatientInterface } from "../../../(types)/types";
export async function POST(
  req: NextRequest,
): Promise<void | NextResponse<unknown>> {
  // Establish connection to MongoDB database
  await dbConnect("POST");

  const data = await req.json();
  console.log(data);

  // cases for different types of requests
  if (data.type === "POST-CreatePatient") {
    try {
      const patient = await Patient.create(data);
      // Disconnect from database
      await dbDisconnect();
      return NextResponse.json({ message: "Patient created", data: patient });
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
      const patients: NewPatientInterface[] = await Patient.find({});
      await dbDisconnect();
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
  if (data.type === "GET-FilterName") {
    try {
      // find by search
      const { param } = data;
      const patient = await Patient.find(
        { firstName: `/${param}/` },
        "firstName lastName",
      );
      await dbDisconnect();
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
  if (data.type === "UPDATE-NewField") {
    try {
      const { firstName, newFieldName } = data;

      const filter = { firstName };
      const value = { other: {[newFieldName]: 'test'} };

      const updateStatus = await Patient.updateOne(filter, value);
      await dbDisconnect();
      return NextResponse.json({
        message: `Successfully created ${newFieldName} field`,
        data: updateStatus,
      });
    } catch (error) {
      return NextResponse.json({
        message: "Failed to update patient",
        details: error?.message,
      });
    }
  }
}

export async function DELETE(
  req: NextRequest,
): Promise<void | NextResponse<unknown>> {
  await dbConnect("DELETE");

  try {
  } catch (error) {
    return NextResponse.json({
      message: "Failed to delete patient",
      details: error?.message,
    });
  }
}

export async function UPDATE(
  req: NextRequest,
): Promise<void | NextResponse<unknown>> {
  // fitler by id stored in mongodb
  await dbConnect("UPDATE");
  const data = await req.json();

  try {
    const { id, statusUpdate } = data;

    const filter = { _id: id };
    const value = { status: statusUpdate };

    const updateStatus = await Patient.findOneAndUpdate(id, statusUpdate);
    await dbDisconnect();
    return NextResponse.json({
      message: `Status successfully updated to ${statusUpdate}`,
      data: updateStatus,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Failed to update patient",
      details: error?.message,
    });
  }
}
