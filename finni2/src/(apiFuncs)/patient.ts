// Purpose of this is strictly to get all patients in the database

import { type NewPatientInterface } from "~/(types)/types";

export async function getPatients() {
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "GET-AllPatients" }),
  });
  const data: unknown = await response.json();
  //@ts-expect-error data is something I have to type still
  const newData: NewPatientInterface[] = data?.data as NewPatientInterface[];
  return newData;
}

export async function createNewPatient({
  firstName,
  middleName,
  lastName,
  DOB,
  status,
  address,
  city,
  state,
  zipCode,
  other,
}: NewPatientInterface) {
  const response = await fetch("http://localhost:3000/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "POST-CreatePatient",
      firstName,
      middleName,
      lastName,
      DOB,
      status,
      address,
      city,
      state,
      zipCode,
      other,
    }),
  });

  return response;
}

export async function updateField(firstName: string, newFieldName: string) {
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "UPDATE-NewField", firstName, newFieldName }),
  });

  return response;
}
