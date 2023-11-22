/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { type NewPatientInterface } from "~/(types)/types";
import { useContext, useEffect, useState } from "react";
import { POSTHelper } from "~/(hooks/helpers)/POSTHelper";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { ActiveFieldsContext } from "./PatientDisplayContainer";

export default function PatientDisplayTable() {
  const [patientData, setPatientData] = useState([]);
  const [activeFields, setActiveFields] = useContext(ActiveFieldsContext);

  useEffect(() => {
    POSTHelper("GET-AllPatients")
      .then((res) => setPatientData([...res]))
      .catch((err) =>
        console.log({ message: "error in fetch", error: err.message }),
      );
  }, []);

  // useEffect(() => {

  // }, [activeFields])

  return (
    <TableContainer width="100%">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>{activeFields["First Name"] ? "First Name" : null}</Th>
            <Th>{activeFields["Middle Name"] ? "Middle Name" : null}</Th>
            <Th>{activeFields["Last Name"] ? "Last Name" : null}</Th>
            <Th>{activeFields["Date of birth"] ? "Date of birth" : null}</Th>
            <Th>{activeFields["Status"] ? "Status" : null}</Th>
            <Th>{activeFields["Address"] ? "Address (city, state)" : null}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {patientData.map((current: NewPatientInterface, idx) => {
            return (
              <Tr key={idx}>
                <Td>{activeFields["First Name"] ? current.firstName : null}</Td>
                <Td>
                  {activeFields["Middle Name"] ? current.middleName : null}
                </Td>
                <Td>{activeFields["Last Name"] ? current.lastName : null}</Td>
                <Td>{activeFields["Date of birth"] ? current.DOB : null}</Td>
                <Td>{activeFields["Status"] ? current.status : null}</Td>
                <Td>
                  {activeFields["Address"]
                    ? `${current.city}, ${current.state}`
                    : null}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
