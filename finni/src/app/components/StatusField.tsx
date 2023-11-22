import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from "@chakra-ui/react";

export default function StatusField({ currentStatus }) {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {currentStatus}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} position="fixed" bgColor="white">
          <div className="flex flex-col flex-wrap gap-2">
            <Button>Inquiry</Button>
            <Button>Onboarding</Button>
            <Button>Active</Button>
            <Button>Churned</Button>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
