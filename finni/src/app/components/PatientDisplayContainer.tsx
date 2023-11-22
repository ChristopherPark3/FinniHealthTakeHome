"use client";
import { createContext, useState } from "react";
import PatientDisplayNavbar from "./PatientDisplayNavbar";
import PatientDisplayTable from "./PatientDisplayTable";

export const ActiveFieldsContext = createContext({
  "First Name": true,
  "Middle Name": true,
  "Last Name": true,
  "Date of birth": true,
  "Status": true,
  "Address": true,
});

export default function PatientDisplayContainer() {
  const [activeFields, setActiveFields] = useState({
    "First Name": true,
    "Middle Name": true,
    "Last Name": true,
    "Date of birth": true,
    "Status": true,
    "Address": true,
  });

  return (
    <ActiveFieldsContext.Provider value={[activeFields, setActiveFields]}>
      <div className="flex min-h-screen flex-col items-center gap-10 px-10 pt-10 ">
        <PatientDisplayNavbar />
        <PatientDisplayTable />
      </div>
    </ActiveFieldsContext.Provider>
  );
}
