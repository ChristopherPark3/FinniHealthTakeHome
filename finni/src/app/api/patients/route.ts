/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type NextRequest, NextResponse } from "next/server";
import Patient from "~/app/(models)/patient";
import mongoose from "mongoose";

// interface NewPatientInterface {
//   firstName: string;
//   middleName?: string;
//   lastName: string;
//   status: string;
//   address: string;
//   [additionalField: string]: string | number | undefined
// }

// type QueryBody = Record<string, string | number | undefined>;

const MONGODB_URI = `mongodb+srv://chrispark:FinniHealth@finnicluster.xrymtmg.mongodb.net/`

export async function POST(req: NextRequest): Promise<NextResponse<unknown>> {
  let client;

  // Establish connection to MongoDB database
  try {
    client = await mongoose.connect(MONGODB_URI);
    console.log("Connected to database");
  } catch (error: unknown) {
    console.log({
      message: "There was an error connecting to the database",
      details: error.message,
    });
  }

  const data = await req.json();
  console.log(data)
  try {

    const action = await Patient.create(data);
    
    return NextResponse.json({message: "Patient created", })
  } catch (error) {
    return NextResponse.json({message: "Patient creation failed", details: error.message})
  }
  

}
