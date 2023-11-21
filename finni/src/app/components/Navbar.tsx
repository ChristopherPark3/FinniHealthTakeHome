import AddPatientButton from "./AddPatientButton";
import { useState } from "react";

export default function Navbar() {
  const [openModal, setOpenModal] = useState(false)
  return (
    <div id="Navbar-Container" className="flex justify-between p-4">
      <img src="https://assets-global.website-files.com/6297d5d89ac9c5b4308579e1/6297d5d89ac9c550828579f0_Logo.svg" />
      <div className="flex min-w-[15rem] p-2 justify-between">
        <button>View</button>
        <AddPatientButton openModal={openModal} setOpenModal={setOpenModal}/>
      </div>
    </div>
  );
}
