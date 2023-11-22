import AddPatientModal from "./AddPatientModal";
import { useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

// key here is to be used for the purposes of matching fields in the UI to the keys in the db
const key = {
  "First Name": "firstName",
  "Middle Name": "middleName",
  "Last Name": "lastName",
  "Date of birth": "status",
  Address: { City: "city", State: "state" },
};

export default function AddPatientButton() {
  // useDisclosure hook from ChakraUI for modal functionality
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
