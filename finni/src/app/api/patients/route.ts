import { type NextRequest, NextResponse } from "next/server";
import Patient from "~/app/(models)/patient";

interface NewPatientInterface {
  firstName: string;
  middleName?: string;
  lastName: string;
  status: string;
  address: string;
  // [additionalField: string]: string | number | undefined
}

type QueryBody = Record<string, string | number | undefined>;

export async function POST(req: NextRequest): Promise<NextResponse<unknown>> {
  try {
    const queryBody: QueryBody = {};
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body: NewPatientInterface = await req.json();
    for (const key in body) {
      queryBody[key] = body[key];
    }
    console.log("QueryBody", queryBody);
    const patient = await Patient.create(queryBody as QueryBody);
    console.log("patient", patient)
    return NextResponse.json({ message: "New patient successfully added." });
  } catch (error) {
    return NextResponse.json({ message: "Error in New Patient API", error });
  }
}
