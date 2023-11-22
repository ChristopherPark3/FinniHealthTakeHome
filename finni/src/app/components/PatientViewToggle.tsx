import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

export default function PatientViewToggle() {
  return (
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
          bgColor="white"
          position="fixed"
          rounded="md"
        >
          Insert Checkboxes here
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
