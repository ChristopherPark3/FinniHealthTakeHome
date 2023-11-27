import ActionBar from "./ActionBar";
import PatientDisplayTable from "./PatientDisplayTable";

export default function PatientDisplayContainer() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-16">
      <ActionBar />
      <PatientDisplayTable />
    </div>
  );
}
