"use client";

import {
  type SyntheticEvent,
  useState,
  Fragment,
  useContext
} from "react";
import { toast, Toaster } from "sonner";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  NumberInput,
  NumberInputField,
  Select,
} from "@chakra-ui/react";



export default function AddPatientModal({ isOpen, onClose }: any) {
  // using useState hook for data because I was having issues with new FormData() and am running out of time
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [DOB, setDOB] = useState("");
  const [status, setStatus] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [other, setOther] = useState({});

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    // Request to create a new patient
    const response = await fetch("http://localhost:3000/api/patients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "POST-CreatePatient",
        firstName,
        middleName,
        lastName,
        DOB,
        status,
        address,
        city,
        state,
        zipCode: zip,
        other,
      }),
    });
    const { message, data } = await response.json();
    console.log(message);
    if (message === "Patient created") {
      // toast.success is just a toast imported from sonner library
      toast.success(`Patient ${firstName} ${lastName} has been created`);
      console.log(data)
    } else if (message === "Patient creation failed") {
      toast.error(`Failed to create patient ${firstName} ${lastName}`);
    }

    onClose();
  };


  // Could definitely modularize how I am updating the state for each field to be POSTed to db.
  // Some sort of helper would suffice.
  return (
    <Fragment>
      <Modal
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent className="flex min-h-[40rem] min-w-[70rem]">
          <ModalHeader className="">Add a new patient</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col gap-4">
            <div id="Patient-Name" className="flex gap-4">
              <FormControl isRequired>
                <FormLabel>First name</FormLabel>
                <Input
                  placeholder="First name"
                  name="firstName"
                  onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement;
                    setFirstName(target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Middle name</FormLabel>
                <Input
                  placeholder="Middle name"
                  name="middleName"
                  onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement;
                    setMiddleName(target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  name="lastName"
                  onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement;
                    setLastName(target.value);
                  }}
                />
              </FormControl>
            </div>
            <div id="Patient-DOB-Status" className="flex gap-4">
              <FormControl>
                <FormLabel>Date of birth</FormLabel>
                <Input
                  type="date"
                  placeholder="MM/DD/YYYY"
                  name="DOB"
                  onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement;
                    setDOB(target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Patient Status</FormLabel>
                <Select
                  placeholder="Select a patient status"
                  name="status"
                  onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement;
                    setStatus(target.value);
                  }}
                >
                  <option>Inquiry</option>
                  <option>Onboarding</option>
                  <option>Active</option>
                  <option>Churned</option>
                </Select>
              </FormControl>
            </div>
            <div id="Patient-Address" className="flex gap-4">
              <FormControl isRequired>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement;
                    setAddress(target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  name="city"
                  onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement;
                    setCity(target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  name="state"
                  placeholder="CA"
                  onChange={(e: SyntheticEvent) => {
                    const target = e.target as HTMLInputElement;
                    setState(target.value);
                  }}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Zip Code</FormLabel>
                <NumberInput>
                  <NumberInputField
                    name="zipCode"
                    onChange={(e: SyntheticEvent) => {
                      const target = e.target as HTMLInputElement;
                      setZip(target.value);
                    }}
                  />
                </NumberInput>
              </FormControl>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button>Add a field</Button>
            <Button
              type="submit"
              id="Create-Patient-Button"
              form="add-patient-form"
              bgColor="#ED762F"
              onClick={handleSubmit}
              _hover={{ background: "#4a3a54", color: "white" }}
            >
              Create Patient
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster richColors />
    </Fragment>
  );
}
