"use client";

import { useState } from "react";

import Button from "@mui/material/Button";
import { NewPatientModal } from "./NewPatientModal";


export default function ActionBar() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        className="bg-orange hover:bg-purple"
      >
        Add Patient
      </Button>
      <NewPatientModal open={open} setOpen={setOpen} />
    </div>
  );
}
