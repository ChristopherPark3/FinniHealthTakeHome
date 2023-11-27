/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import { useQueryClient, useQuery } from "@tanstack/react-query";
import StatusField from "./StatusField";
import {
  Fragment,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import { getPatients } from "~/(apiFuncs)/Patients";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import {
  ActiveFieldsContext,
  PatientFilterContext,
} from "./PatientDisplayContainer";

export default function PatientDisplayTable() {
  const [patientData, setPatientData] = useState([]);
  const [activeFields, setActiveFields] = useContext(ActiveFieldsContext);
  const [filterParam, setFilterParam] = useContext(PatientFilterContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPatient, setCurrentPatient] = useState({
    id: null,
    firstName: null,
    middleName: null,
    lastName: null,
    status: null,
    DOB: null,
    address: null,
    city: null,
    state: null,
    zip: null,
    other: null,
  });

  // Access the client
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });
  if (isPending) {
    return <Spinner size="xl" />;
  }
  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  console.log(data);
  const handleFullData = (idx: number) => {
    setCurrentPatient({ ...data[idx] });
    onOpen();
  };

  // Conditionally render based on search filter params
  const patientsToRender: JSX.Element[] = [];
  if (filterParam === "") {
    data.forEach((current, idx) => {
      // console.log(idx, current.firstName);
      patientsToRender.push(
        <Tr key={idx} id={current._id}>
          <Td>{activeFields["First Name"] ? current.firstName : null}</Td>
          <Td>{activeFields["Middle Name"] ? current.middleName : null}</Td>
          <Td>{activeFields["Last Name"] ? current.lastName : null}</Td>
          <Td>{activeFields["Date of birth"] ? current.DOB : null}</Td>
          <Td>
            {activeFields["Status"] ? (
              <StatusField currentStatus={current.status} id={current._id}>
                {current.status}
              </StatusField>
            ) : null}
          </Td>
          <Td>
            {activeFields["Address"]
              ? `${current.city}, ${current.state}`
              : null}
          </Td>
          <Td>
            <Button bgColor="gray" onClick={() => handleFullData(idx)}>
              Full Data
            </Button>
          </Td>
        </Tr>,
      );
    });
  } else {
    // Caveat to iterating through this is when the database has tons of data
    // If I were to do it again, I would probably try to make the firstName value a set for constant look up time
    data.forEach((current, idx) => {
      if (
        current.firstName.toUpperCase().includes(filterParam?.toUpperCase()) ||
        current.lastName.toUpperCase().includes(filterParam?.toUpperCase())
      ) {
        patientsToRender.push(
          <Fragment>
            <Tr key={idx} id={current._id}>
              <Td>{activeFields["First Name"] ? current.firstName : null}</Td>
              <Td>{activeFields["Middle Name"] ? current.middleName : null}</Td>
              <Td>{activeFields["Last Name"] ? current.lastName : null}</Td>
              <Td>{activeFields["Date of birth"] ? current.DOB : null}</Td>
              <Td>
                {activeFields["Status"] ? (
                  <StatusField currentStatus={current.status} id={current._id}>
                    {current.status}
                  </StatusField>
                ) : null}
              </Td>
              <Td>
                {activeFields["Address"]
                  ? `${current.city}, ${current.state}`
                  : null}
              </Td>
              <Td>
                <Button bgColor="gray" onClick={() => handleFullData(idx)}>
                  Full Data
                </Button>
              </Td>
            </Tr>
          </Fragment>,
        );
      }
    });
  }

  return (
    <TableContainer width="100%">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            {/* rendering based on if the column (field) is active or not. Bug where when a box is checked, it dissappears as opposed to checking it and having it appear */}
            <Th>{activeFields["First Name"] ? "First Name" : null}</Th>
            <Th>{activeFields["Middle Name"] ? "Middle Name" : null}</Th>
            <Th>{activeFields["Last Name"] ? "Last Name" : null}</Th>
            <Th>{activeFields["Date of birth"] ? "Date of birth" : null}</Th>
            <Th>{activeFields["Status"] ? "Status" : null}</Th>
            <Th>{activeFields["Address"] ? "Address (city, state)" : null}</Th>
            <Th>More Data</Th>
          </Tr>
        </Thead>
        <Tbody>{patientsToRender}</Tbody>
      </Table>
      <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            {currentPatient.firstName + " " + currentPatient.lastName}
          </DrawerHeader>
          <DrawerBody>
            <p>Date of birth: {currentPatient.DOB}</p>
            <p>Status: {currentPatient.status}</p>
            <p>
              Address:{" "}
              {`${currentPatient.address}, ${currentPatient.city}, ${currentPatient.state} ${currentPatient.zipCode}`}
            </p>
            <p>Additional fields: </p>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </TableContainer>
  );
}
