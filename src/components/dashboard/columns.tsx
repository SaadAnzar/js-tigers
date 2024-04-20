"use client";

import { ColumnDef } from "@tanstack/react-table";
import { QueryResultRow } from "@vercel/postgres";

import RowActions from "@/components/dashboard/row-actions";

export const columns: ColumnDef<QueryResultRow>[] = [
  {
    accessorKey: "vendorname",
    header: "Vendor Name",
    cell: ({ row }) => <div>{row.getValue("vendorname")}</div>,
  },
  {
    accessorKey: "bankaccountno",
    header: "Bank Account Number",
    cell: ({ row }) => <div>{row.getValue("bankaccountno")}</div>,
  },
  {
    accessorKey: "bankname",
    header: "Bank Name",
    cell: ({ row }) => <div>{row.getValue("bankname")}</div>,
  },
  {
    accessorKey: "id",
    header: "",
    cell: ({ row }) => <RowActions id={row.getValue("id")} />,
  },
];
