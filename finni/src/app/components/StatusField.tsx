import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
} from "@chakra-ui/react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateField } from "~/(apiFuncs)/Patients";
import { useState } from "react";

export default function StatusField({
  currentStatus,
  id,
}: {
  currentStatus: string;
  id: string;
}) {
  const [status, setStatus] = useState(currentStatus);

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: () => updateField(id, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["patients"] }),
  });

  const updateStatus = async (statusUpdate: string) => {
    setStatus(statusUpdate)
    const response = await mutateAsync();
    console.log("Update response", response);
  };

  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              {status}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} position="fixed" bgColor="white">
          <div className="flex flex-col flex-wrap gap-2">
            <Button onClick={() => updateStatus("Inquiry")}>Inquiry</Button>
            <Button onClick={() => updateStatus("Onboarding")}>Onboarding</Button>
            <Button onClick={() => updateStatus("Active")}>Active</Button>
            <Button onClick={() => updateStatus("Churned")}>Churned</Button>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
