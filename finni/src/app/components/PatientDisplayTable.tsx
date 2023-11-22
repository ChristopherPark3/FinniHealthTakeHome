"use client"

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
} from '@chakra-ui/react'

export default function PatientDisplayTable() {
  return (
    <TableContainer width="100%">
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Middle Name</Th>
            <Th>Last Name</Th>
            <Th>Date of birth</Th>
            <Th>Status</Th>
            <Th>Address (City, State)</Th>
            
          </Tr>
        </Thead>
        <Tbody>

        </Tbody>
      </Table>
    </TableContainer>
  );
}
