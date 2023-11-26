import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Checkbox,
} from "@chakra-ui/react";
import { DropdownCheckbox } from "./DropdownCheckbox";
import { useContext } from "react";
import { ActiveFieldsContext } from "./PatientDisplayContainer";

export default function PatientViewToggle() {
  //@ts-expect-error using for useContext hook
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
              <Checkbox
                value={"First Name"}
                isChecked={activeFields["First Name"]}
                onChange={(e) => {
                  !activeFields["First Name"]
                    ? setActiveFields({ ...activeFields, "First Name": true })
                    : setActiveFields({ ...activeFields, "First Name": false });
                }}
              >
                First Name
              </Checkbox>
              <Checkbox
                value={"Middle Name"}
                isChecked={activeFields["Middle Name"]}
                onChange={(e) => {
                  !activeFields["Middle Name"]
                    ? setActiveFields({ ...activeFields, "Middle Name": true })
                    : setActiveFields({ ...activeFields, "Middle Name": false });
                }}
              >
                Middle Name
              </Checkbox>
              <Checkbox
                value={"Last Name"}
                isChecked={activeFields["Last Name"]}
                onChange={(e) => {
                  !activeFields["Last Name"]
                    ? setActiveFields({ ...activeFields, "Last Name": true })
                    : setActiveFields({ ...activeFields, "Last Name": false });
                }}
              >
                Last Name
              </Checkbox>
              <Checkbox
                value={"Date of birth"}
                isChecked={activeFields["Date of birth"]}
                onChange={(e) => {
                  !activeFields["Date of birth"]
                    ? setActiveFields({ ...activeFields, "Date of birth": true })
                    : setActiveFields({ ...activeFields, "Date of birth": false });
                }}
              >
                Date of birth
              </Checkbox>
              <Checkbox value={"Status"} isChecked={activeFields["Status"]} onChange={(e) => {
                  !activeFields["Status"]
                    ? setActiveFields({ ...activeFields, "Status": true })
                    : setActiveFields({ ...activeFields, "Status": false });
                }}>
                Status
              </Checkbox>
              <Checkbox value={"Address"} isChecked={activeFields["Address"]} onChange={(e) => {
                  !activeFields["Address"]
                    ? setActiveFields({ ...activeFields, "Address": true })
                    : setActiveFields({ ...activeFields, "Address": false });
                }}>
                Address
              </Checkbox>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
