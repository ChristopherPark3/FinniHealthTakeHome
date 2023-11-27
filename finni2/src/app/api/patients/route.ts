/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import { dbConnect, dbDisconnect } from "../../../(utils)/connect";
import Patient from "../../(models)/patient";
import { type NewPatientInterface } from "../../../(types)/types";
export async function POST(
  req: NextRequest,
): Promise<void | NextResponse<unknown>> {
  // Establish connection to MongoDB database
  await dbConnect("POST");

  const data: {
    type: string;
    firstName?: string;
    lastName?: string;
    newFieldName?: string | number | symbol;
    param?: string
  } = await req.json();
  console.log(data);

  // cases for different types of requests
  if (data.type === "POST-CreatePatient") {
    try {
      //@ts-expect-error definitely callable from mongoose docs. Suppose there is no type for this method
      const patient = await Patient.create(data);
      // Disconnect from database
      await dbDisconnect();
      return NextResponse.json({ message: "Patient created", data: patient });
    } catch (error) {
      return NextResponse.json({
        message: "Patient creation failed",
        //@ts-expect-error no error type
        details: error.message,
      });
    }
  }
  if (data.type === "GET-AllPatients") {
    try {
      // find all patients
      //@ts-expect-error definitely callable from mongoose docs. Suppose there is no type for this method
      const patients: NewPatientInterface[] = await Patient.find({});
      await dbDisconnect();
      return NextResponse.json({
        message: "Request for all patients successful",
        data: patients,
      });
    } catch (error: unknown) {
      return NextResponse.json({
        message: "Failed to get all patients",
        //@ts-expect-error no error type
        details: error.message,
      });
    }
  }
  if (data.type === "GET-FilterName") {
    try {
      // find by search
      const { param } = data;
      //@ts-expect-error definitely callable from mongoose docs. Suppose there is no type for this method
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
        //@ts-expect-error no error type
        details: error.message,
      });
    }
  }
  if (data.type === "UPDATE-NewField") {
    try {
      const { firstName, newFieldName } = data;

      const filter = { firstName };
      const value = { other: { [String(newFieldName)]: "test" } };

      //@ts-expect-error definitely callable from mongoose docs. Suppose there is no type for this method

      const result = await Patient.findOneAndUpdate(filter, value);
      // const updateStatus = await Patient.set(filter, value);
      await dbDisconnect();
      return NextResponse.json({
        message: `Successfully created ${String(newFieldName)} field`,
        data: result,
      });
    } catch (error) {
      return NextResponse.json({
        message: "Failed to update patient",
        //@ts-expect-error no error type
        details: error?.message,
      });
    }
  }
}

// export async function DELETE(
//   req: NextRequest,
// ): Promise<void | NextResponse<unknown>> {
//   await dbConnect("DELETE");

//   try {
//   } catch (error) {
//     return NextResponse.json({
//       message: "Failed to delete patient",
//       //@ts-expect-error no error type
//       details: error?.message,
//     });
//   }
// }
