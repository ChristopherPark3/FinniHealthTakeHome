import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { DropdownCheckbox } from "./DropdownCheckbox";
import { useContext } from "react";
import { ActiveFieldsContext } from "./PatientDisplayContainer";

export default function PatientViewToggle() {
  const [activeFields, setActiveFields] = useContext(ActiveFieldsContext);

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton rounded="md">
              <Box as="span" flex="1" textAlign="left">
                View
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            pt={4}
            bgColor="white"
            position="fixed"
            rounded="md"
          >
            <div
              id="Panel-Container"
              className="flex flex-col flex-wrap gap-2 "
            >
              <DropdownCheckbox field={"First Name"} checked={activeFields["First Name"]} />
              <DropdownCheckbox field={"Middle Name"} checked={activeFields["Middle Name"]} />
              <DropdownCheckbox field={"Last Name"} checked={activeFields["Last Name"]} />
              <DropdownCheckbox field={"Date of birth"} checked={activeFields["Date of birth"]} />
              <DropdownCheckbox field={"Status"} checked={activeFields["Status"]} />
              <DropdownCheckbox field={"Address"} checked={activeFields["Address"]} />
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
