"use client";

import { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { NewPatientModal } from "./NewPatientModal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

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
