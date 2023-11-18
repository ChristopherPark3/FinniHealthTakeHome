"use client";

export default function HomePage() {
  const handleClick = async () => {
    const response = await fetch("/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: "hello" }),
    });
    const responseJSON = await response.json();
    console.log(responseJSON);
  };
  return <button onClick={handleClick}>test</button>;
}
