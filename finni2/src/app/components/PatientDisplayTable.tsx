"use client";

import { useState } from "react";
import {
  DataGrid,
  type GridColDef,
} from "@mui/x-data-grid";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getPatients } from "../../(apiFuncs)/patient";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { type NewPatientInterface } from "../../(types)/types";
import Button from "@mui/material/Button";
import { NewFieldModal } from "./NewFieldModal";

export default function PatientDisplayTable() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const queryClient = useQueryClient();
  const { isPending, data, error } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
  if (isPending) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return <span>Error: {error.message}</span>;
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 70 },
    {
      field: "firstName",
      headerName: "First Name",
      width: 130,
      editable: true,
    },
    {
      field: "middleName",
      headerName: "Middle Name",
      width: 130,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 130, editable: true },
    { field: "DOB", headerName: "Date of Birth", width: 130, editable: true },
    { field: "status", headerName: "Status", width: 130, editable: true },
    { field: "address", headerName: "Street", width: 160, editable: true },
    { field: "city", headerName: "City", width: 130, editable: true },
    { field: "state", headerName: "State", width: 130, editable: true },
    { field: "zipCode", headerName: "Zip Code", width: 130, editable: true },
  ];
  const rows: NewPatientInterface[] = data;
  rows.forEach((current, idx) => {
    current.id = idx + 1;
    if (current.address2) {
      columns.push({ field: `${current.address2}`, headerName: "Address2", width: 130 });
    }
    if (current.other && Object.keys(current.other).length > 0) {
      Object.keys(current.other).forEach((curr) => {
        columns.push({
          field: `${curr}`,
          headerName: curr,
          width: 130,
          editable: true,
        });
      });
    }
  });

  return (
    <div style={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 15, 20, 25]}
        checkboxSelection
      />

      <Button
        variant="contained"
        className="bg-[#f4a77b] hover:bg-[#c28764]"
        onClick={handleOpen}
      >
        Add new field
      </Button>
      <NewFieldModal open={open} setOpen={setOpen} />
    </div>
  );
}
