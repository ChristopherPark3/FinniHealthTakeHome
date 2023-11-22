
import AddPatientModal from "./AddPatientModal"
import {useDisclosure } from "@chakra-ui/react"
import {Button} from '@chakra-ui/react'

export default function AddPatientButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()


  return (
    <div id="AddPatientModal">
      <Button bgColor="#ED762F"_hover={{background: "#4a3a54", color: "white"}} onClick={onOpen}>
        Add a new patient
      </Button>
      <AddPatientModal isOpen={isOpen} onClose={onClose}/>
    </div>
  );
}
