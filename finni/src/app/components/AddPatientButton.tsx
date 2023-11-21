"use client";
import { useState } from "react";
import AddPatientModal from "./AddPatientModal"
import {useDisclosure } from "@chakra-ui/react"

export default function AddPatientButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <div id="AddPatientModal">
      <button className="bg-primary" onClick={onOpen}>
        Add a new patient
      </button>
      <AddPatientModal isOpen={isOpen} onClose={onClose}/>
    </div>
  );
}
