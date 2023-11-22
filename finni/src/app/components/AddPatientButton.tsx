import AddPatientModal from "./AddPatientModal";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const key = {
  "First Name": "firstName",
  "Middle Name": "middleName",
  "Last Name": "lastName",
  "Date of birth": "status",
  Address: { City: "city", State: "state" },
};

export default function AddPatientButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div id="AddPatientModal">
      <Button
        bgColor="#ED762F"
        _hover={{ background: "#4a3a54", color: "white" }}
        onClick={onOpen}
      >
        Add a new patient
      </Button>
      <AddPatientModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}
