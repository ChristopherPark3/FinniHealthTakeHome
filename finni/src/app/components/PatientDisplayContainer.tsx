import PatientDisplayNavbar from "./PatientDisplayNavbar";
import PatientDisplayTable from "./PatientDisplayTable";

export default function PatientDisplayContainer() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-10 pt-10 px-10 ">
      <PatientDisplayNavbar />
      <PatientDisplayTable />
    </div>
  );
}
