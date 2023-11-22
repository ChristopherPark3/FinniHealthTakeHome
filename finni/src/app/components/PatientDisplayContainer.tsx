"use client";
import { createContext, useContext, useState } from "react";
import PatientDisplayNavbar from "./PatientDisplayNavbar";
import PatientDisplayTable from "./PatientDisplayTable";

// Initializing a new context for active fields bc each individual checkbox to handle any change is nested
export const ActiveFieldsContext = createContext({
  "First Name": true,
  "Middle Name": true,
  "Last Name": true,
  "Date of birth": true,
  Status: true,
  Address: true,
  Other: true,
});

export const PatientFilterContext = createContext("");

export default function PatientDisplayContainer() {
  const [activeFields, setActiveFields] = useState({
    "First Name": true,
    "Middle Name": true,
    "Last Name": true,
    "Date of birth": true,
    Status: true,
    Address: true,
  });
  const [filterParam, setFilterParam] = useState("");

  return (
    <PatientFilterContext.Provider value={[filterParam, setFilterParam]}>
      <ActiveFieldsContext.Provider value={[activeFields, setActiveFields]}>
        <div className="flex min-h-screen flex-col items-center gap-10 px-10 pt-10 ">
          <PatientDisplayNavbar />
          <PatientDisplayTable />
        </div>
      </ActiveFieldsContext.Provider>
    </PatientFilterContext.Provider>
  );
}
