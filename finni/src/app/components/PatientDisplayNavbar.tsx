import AddPatientButton from "./AddPatientButton";
import PatientViewToggle from "./PatientViewToggle";

import { Input } from "@chakra-ui/react";

export default function PatientDisplayNavbar() {
  return (
    <div id="Patient-Display" className="mt-[3rem] flex gap-4">
      <Input borderColor="grey" placeholder="Filter by" />
      <PatientViewToggle />
      <AddPatientButton />
    </div>
  );
}
