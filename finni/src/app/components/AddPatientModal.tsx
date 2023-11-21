"use client";

import { type SyntheticEvent } from "react";

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
  const handleClose = () => {
    onClose();
  };
  return (
    <>
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
                <Input placeholder="First name" />
              </FormControl>
              <FormControl>
                <FormLabel>Middle name</FormLabel>
                <Input placeholder="Middle name" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last name</FormLabel>
                <Input placeholder="First name" />
              </FormControl>
            </div>
            <div id="Patient-DOB-Status" className="flex gap-4">
              <FormControl>
                <FormLabel>Date of birth</FormLabel>
                <Input
                  type="date"
                  placeholder="MM/DD/YYYY"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Patient Status</FormLabel>
                <Select placeholder="Select a patient status">
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
                <Input />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>City</FormLabel>
                <Input />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>State</FormLabel>
                <Input />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Zip Code</FormLabel>
                <NumberInput>
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </div>
            <Button>Add a field</Button>
          </ModalBody>
          <ModalFooter>
            <Button bgColor="#ED762F" onClose={handleClose}>
              Create Patient
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
