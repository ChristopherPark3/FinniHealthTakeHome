"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import {
  SetStateAction,
  type FC,
  Dispatch,
  useState,
  SyntheticEvent,
} from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateField } from "@mui/x-date-pickers/DateField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { NewPatientInterface } from "~/(types)/types";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNewPatient } from "../../(apiFuncs)/patient";
import { toast, Toaster } from "sonner";

const dateKey: { [key: string]: string } = {
  Jan: "01",
  Feb: "02",
  Mar: "03",
  Apr: "04",
  May: "05",
  Jun: "06",
  Jul: "07",
  Aug: "08",
  Sep: "09",
  Oct: "10",
  Nov: "11",
  Dec: "12",
};

interface ModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const NewPatientModal: FC<ModalProps> = ({ open, setOpen }) => {
  const handleClose = () => setOpen(false);
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState<NewPatientInterface>({
    firstName: "",
    middleName: "",
    lastName: "",
    DOB: "",
    status: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    other: {},
  });

  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: () => createNewPatient(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });

  const handleSubmit = async () => {
    const response = await mutateAsync();
    const { message }: { message: any } = await response.json();
    console.log(message);
    if (message === "Patient created") {
      // toast.success is just a toast imported from sonner library
      toast.success(
        `Patient ${formData.firstName} ${formData.lastName} has been created`,
      );
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        DOB: "",
        status: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        other: {},
      });
      setOpen(false);
    } else if (message === "Patient creation failed") {
      toast.error(
        `Failed to create patient ${formData.firstName} ${formData.lastName}`,
      );
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
        <Box className="absolute left-[50%] top-[50%] flex h-[40rem] w-[60rem] translate-x-[-50%] translate-y-[-50%] flex-col gap-6 rounded bg-slate-50 p-8">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a new patient
          </Typography>
          <div id="NameContainer" className="flex gap-3">
            <TextField
              name="firstName"
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              required
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
            <TextField
              name="middleName"
              id="outlined-basic"
              label="Middle Name"
              variant="outlined"
              onChange={(e) =>
                setFormData({ ...formData, middleName: e.target.value })
              }
            />
            <TextField
              name="lastName"
              id="outlined-basic"
              label="Last Name"
              variant="outlined"
              required
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                label="Date of birth"
                name="DOB"
                required
                format="MM-DD-YYYY"
                onChange={(e: unknown) => {
                  //@ts-ignore there is no type for this event for the datefield component
                  const data = e.$d.toString();
                  let month = `${data[4]}${data[5]}${data[6]}`;
                  month;
                  //@ts-ignore
                  let day = e.$D.toString();
                  if (day.length === 1) {
                    day = "0" + day;
                  }
                  console.log(day);
                  //@ts-ignore
                  const year = e.$y.toString();
                  const DOB = `${year}-${dateKey[month]}-${day}`;
                  console.log(DOB);
                  setFormData({ ...formData, DOB });
                }}
              />
            </LocalizationProvider>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label" required>
                  Status
                </InputLabel>
                <Select
                  name="status"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={(e: SelectChangeEvent) => {
                    setStatus(e.target.value);
                    setFormData({ ...formData, status: e.target.value });
                  }}
                >
                  <MenuItem value={"Inquiry"}>Inquiry</MenuItem>
                  <MenuItem value={"Onboarding"}>Onboarding</MenuItem>
                  <MenuItem value={"Active"}>Active</MenuItem>
                  <MenuItem value={"Churned"}>Churned</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <TextField
            name="address"
            id="outlined-basic"
            label="Address"
            variant="outlined"
            required
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
          />
          <TextField
            name="address2"
            id="outlined-basic"
            label="Address2"
            variant="outlined"
            required
            onChange={(e) =>
              setFormData({ ...formData, address2: e.target.value })
            }
          />
          <div className="flex gap-2">
            <TextField
              name="city"
              id="outlined-basic"
              label="City"
              variant="outlined"
              required
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
            />
            <TextField
              name="state"
              id="outlined-basic"
              label="State"
              variant="outlined"
              required
              onChange={(e) =>
                setFormData({ ...formData, state: e.target.value })
              }
            />
            <TextField
              name="zipCode"
              id="outlined-basic"
              label="Zip Code"
              variant="outlined"
              required
              type="number"
              onChange={(e) =>
                setFormData({ ...formData, zipCode: e.target.value })
              }
            />
          </div>
          <Button
            variant="contained"
            className="bg-orange hover:bg-purple"
            onClick={handleSubmit}
          >
            Create Patient
          </Button>
        </Box>
      </Modal>
      <Toaster richColors />
    </div>
  );
};
