// Purpose of this is strictly to get all patients in the database
export async function POSTHelper(type: string) {
  const response = await fetch("/api/patients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type }),
  });

  const data: unknown = await response.json();
  const newData: unknown = data.data
  return newData;
}
