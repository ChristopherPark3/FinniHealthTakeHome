import { type SyntheticEvent, useContext } from "react";
import AddPatientButton from "./AddPatientButton";
import PatientViewToggle from "./PatientViewToggle";
import { POSTHelper } from "~/(hooks/helpers)/POSTHelper";
import { PatientFilterContext } from "./PatientDisplayContainer";
import { Input } from "@chakra-ui/react";

export default function PatientDisplayNavbar() {
  // Get context for patient filter
  const [filterParam, setFilterParam] = useContext(PatientFilterContext)

  // handler for field equality search
  const handleSearch = (e: SyntheticEvent) => {
    const searchParameter: string = e.target.value
    setFilterParam(searchParameter)
  }
  

  return (
    <div id="Patient-Display" className="mt-[3rem] flex gap-4">
      <Input onChange={handleSearch} borderColor="grey" placeholder="Search by name" />
      <PatientViewToggle />
      <AddPatientButton />
    </div>
  );
}

/*
  For now, just going to store the fetched data in client browser. 
    - When I think about it, what makes sense to me is to interact with a cache in btw the client and the server
*/
