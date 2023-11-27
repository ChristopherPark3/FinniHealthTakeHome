"use client";

import * as React from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { getPatients } from "../../(apiFuncs)/patient";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { NewPatientInterface } from "../../(types)/types";

export default function PatientDisplayTable() {
  const queryClient = useQueryClient();
  const { isPending, isError, data, error } = useQuery({
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
  const rows: NewPatientInterface[] = data;
  rows.forEach((current, idx) => {
    current.id = idx + 1;
    if (current.address2) {
      columns.push({field: `${current}`, headerName: 'Address2', width: 130})
    }
    if (current.other && Object.keys(current.other).length > 0) {
      Object.keys(current.other).forEach((curr) => {
        columns.push({ field: `${curr}`, headerName: curr, width: 130 });
      });
    }
  });
  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 70 },
    { field: "firstName", headerName: "First Name", width: 130 },
    { field: "middleName", headerName: "Middle Name", width: 130 },
    { field: "lastName", headerName: "Last Name", width: 130 },
    { field: "DOB", headerName: "Date of Birth", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
    { field: "address", headerName: "Street", width: 160 },
    { field: "city", headerName: "City", width: 130 },
    { field: "state", headerName: "State", width: 130 },
    { field: "zipCode", headerName: "Zip Code", width: 130 },
  ];
  console.log(data);
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
    </div>
  );
}
