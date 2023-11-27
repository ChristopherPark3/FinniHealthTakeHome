// Purpose of this is strictly to get all patients in the database

export async function getPatients() {
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "GET-AllPatients" }),
  });
  const data: unknown = await response.json();
  //@ts-ignore
  const newData: any[] = data?.data;
  return newData;
}

export async function createNewPatient(
  firstName: string,
  middleName: string,
  lastName: string,
  DOB: string,
  status: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  other: {},
) {
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
      zipCode: zip,
      other,
    }),
  });

  return response
}

export async function updateField(id: string, statusUpdate: string) {
  const response = await fetch('/api/patients',{
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({type: 'UPDATE-PatientStatus',id, statusUpdate})
  })

  return response.json()
}