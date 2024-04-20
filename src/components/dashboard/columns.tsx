"use client";

import { useState } from "react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { QueryResultRow } from "@vercel/postgres";
import { EllipsisVertical, Loader2, Pencil, Trash } from "lucide-react";

import { clearCache, deleteVendor } from "@/lib/query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState<boolean>(false);
      const [loading, setLoading] = useState<boolean>(false);

      async function handleDelete(id: string) {
        setLoading(true);
        await deleteVendor(id);
        setLoading(false);
        clearCache("/dashboard");
        setIsOpen(false);
      }

      return (
        <>
          <AlertDialog open={isOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your vendor.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setIsOpen(false)}>
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(row.getValue("id"))}
                  className="hover:bg-destructive"
                >
                  {loading ? (
                    <>
                      <Loader2 className="size-4 animate-spin mr-2" /> Delete
                    </>
                  ) : (
                    "Delete"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
              >
                <EllipsisVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link href={`/edit-vendor/${row.getValue("id")}`}>
                  Edit
                  <DropdownMenuShortcut>
                    <Pencil className="size-4" />
                  </DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                Delete
                <DropdownMenuShortcut>
                  <Trash className="size-4" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
