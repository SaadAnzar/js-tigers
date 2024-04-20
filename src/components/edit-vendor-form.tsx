"use client";

import { useState } from "react";
import Link from "next/link";
import { QueryResult, QueryResultRow } from "@vercel/postgres";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import {
  clearCache,
  createVendorsTable,
  updateVendorDetails,
} from "@/lib/query";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FormComponent, VendorFormValues } from "@/components/form-component";

interface EditVendorFormProps {
  id: string;
  vendor: QueryResultRow[];
}

export function EditVendorForm({ id, vendor }: EditVendorFormProps) {
  const [loading, setLoading] = useState<boolean>(false);

  const defaultValues: Partial<VendorFormValues> = {
    vendorname: `${vendor[0]?.vendorname}`,
    bankaccountno: vendor[0]?.bankaccountno as number,
    bankname: `${vendor[0]?.bankname}`,
    addressline1: `${vendor[0]?.addressline1}`,
    addressline2: `${vendor[0]?.addressline2}`,
    city: `${vendor[0]?.city}`,
    country: `${vendor[0]?.country}`,
    zipcode: vendor[0]?.zipcode as number,
  };

  async function onSubmit(data: VendorFormValues) {
    setLoading(true);

    await createVendorsTable();

    await updateVendorDetails(data, id as string);

    setLoading(false);

    toast("The vendor is edited successfully!");

    clearCache("/dashboard");
  }

  return (
    <div className="flex flex-col px-3 pb-3 md:container">
      <div className="flex h-16 items-center justify-between">
        <Link
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "relative right-0 top-0 px-2"
          )}
          href="/dashboard"
        >
          <ChevronLeft className="size-4" />
        </Link>
        <h1 className="mx-auto text-xl font-bold">Edit Vendor</h1>
      </div>
      <FormComponent
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        loading={loading}
        buttonText="Edit Vendor"
      />
    </div>
  );
}
