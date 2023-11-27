"use client";

import { type Dispatch, type FC, type SetStateAction, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateField } from "../../(apiFuncs)/patient";
import { toast, Toaster } from "sonner";

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const NewFieldModal: FC<ModalProps> = ({ open, setOpen }) => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => updateField("Christopher", newFieldName),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  const [newFieldType, setNewFieldType] = useState("");
  const [newFieldName, setNewFieldName] = useState("");

  const handleClose = () => setOpen(false);

  const handleNewFieldSubmission = async () => {
    const response = await mutateAsync();
    const { message, details }: { message: string; details: unknown } =
      (await response.json()) as { message: string; details: string };
    if (message === `Successfully created ${newFieldName} field`) {
      toast.success(`Successfully created ${newFieldName} field`);
      setNewFieldType("");
      setNewFieldName("");
      handleClose();
    } else {
      toast.error(`There was an error creating ${newFieldName} field`);
      console.log(details);
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute left-[50%] top-[50%] flex h-[20rem] w-[40rem] translate-x-[-50%] translate-y-[-50%] flex-col gap-6 rounded bg-slate-50 p-8">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a new field
          </Typography>
          <TextField
            label="Name of new field"
            required
            onChange={(e) => setNewFieldName(e.target.value)}
          />
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Field data type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newFieldType}
                label="New Field Type"
                onChange={(e: SelectChangeEvent) =>
                  setNewFieldType(e.target.value)
                }
              >
                <MenuItem value={"Text"}>Text</MenuItem>
                <MenuItem value={"Number"}>Number</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            className="bg-orange hover:bg-purple"
            onClick={handleNewFieldSubmission}
          >
            Create new field
          </Button>
        </Box>
      </Modal>
      <Toaster />
    </div>
  );
};
