import { type NewPatientInterface } from "~/(types)/types";
import { useState, useEffect } from "react";
import type Observable

// Purpose of this is strictly to get all patients in the database
export async function useFetchData() {
  const [fetchedData, setFetchedData] = useState([]);

  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "GET-AllPatients" }),
  });
  const data: NewPatientInterface[] = response.json();
  setFetchedData(data);

  return fetchedData;
}
