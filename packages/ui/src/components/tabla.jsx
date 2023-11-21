import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

export function Tabla({ data }) {
  const columns = Object.keys(data[0]).map((key) => ({key, label: key}));
  const rows = data.map((row, index) => ({...row, key: index}));
  return (
    <Table
      aria-label="Lista de resultados"
      classNames={{
        base: "max-h-[800px] overflow-scroll  mt-5",
        table: "min-h-[420px]",
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
