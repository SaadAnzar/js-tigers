"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

import { clearCache, createVendorsTable, insertIntoVendors } from "@/lib/query";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { FormComponent, VendorFormValues } from "@/components/form-component";

const defaultValues: Partial<VendorFormValues> = {
  vendorname: "",
  bankaccountno: "",
  bankname: "",
  addressline1: "",
  addressline2: "",
  city: "",
  country: "",
  zipcode: "",
};

export function CreateVendorForm() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  async function onSubmit(data: VendorFormValues) {
    setLoading(true);

    await createVendorsTable();

    await insertIntoVendors(data);

    setLoading(false);

    toast("The vendor is created successfully!");

    clearCache("/dashboard");

    router.push("/dashboard");
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
        <h1 className="mx-auto text-xl font-bold">Create Vendor</h1>
      </div>
      <FormComponent
        defaultValues={defaultValues}
        onSubmit={onSubmit}
        loading={loading}
        buttonText="Create Vendor"
      />
    </div>
  );
}
