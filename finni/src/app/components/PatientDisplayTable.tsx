/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";

import StatusField from "./StatusField";
import {
  Fragment,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";
import { POSTHelper } from "~/(hooks/helpers)/POSTHelper";
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
  const [currentPatient, setCurrentPatient] = useState({});

  // Effect to fetch all patient data on initial render only
  useEffect(() => {
    POSTHelper("GET-AllPatients")
      .then((res) => setPatientData([...res]))
      .catch((err) =>
        console.log({ message: "error in fetch", error: err.message }),
      );
  }, []);

  const handleFullData = (idx: number) => {
    setCurrentPatient({ ...patientData[idx] });
    onOpen();
  };

  // Conditionally render based on search filter params
  const patientsToRender: JSX.Element[] = [];
  if (filterParam === "") {
    patientData.forEach((current, idx) => {
      console.log(idx, current.firstName);
      patientsToRender.push(
        <Tr key={idx}>
          <Td>{activeFields["First Name"] ? current.firstName : null}</Td>
          <Td>{activeFields["Middle Name"] ? current.middleName : null}</Td>
          <Td>{activeFields["Last Name"] ? current.lastName : null}</Td>
          <Td>{activeFields["Date of birth"] ? current.DOB : null}</Td>
          <Td>
            {activeFields["Status"] ? (
              <StatusField currentStatus={current.status}>
                current.status
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
    patientData.forEach((current, idx) => {
      if (
        current.firstName.toUpperCase().includes(filterParam?.toUpperCase()) ||
        current.lastName.toUpperCase().includes(filterParam?.toUpperCase())
      ) {
        patientsToRender.push(
          <Fragment>
            <Tr key={idx}>
              <Td>{activeFields["First Name"] ? current.firstName : null}</Td>
              <Td>{activeFields["Middle Name"] ? current.middleName : null}</Td>
              <Td>{activeFields["Last Name"] ? current.lastName : null}</Td>
              <Td>{activeFields["Date of birth"] ? current.DOB : null}</Td>
              <Td>{activeFields["Status"] ? current.status : null}</Td>
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
  console.log("From Table: ", filterParam);
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
