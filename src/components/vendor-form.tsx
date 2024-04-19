"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  createVendorsTable,
  getVendorDetails,
  insertIntoVendors,
  updateVendorDetails,
} from "@/lib/query";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const vendorFormSchema = z.object({
  vendorname: z
    .string()
    .min(1, { message: "The name of the vendor is required." }),
  bankaccountno: z
    .number({
      coerce: true,
    })
    .nonnegative()
    .min(1, { message: "The account number of the bank is required." }),
  bankname: z.string().min(1, { message: "The name of the bank is required." }),
  addressline1: z.string().min(1, { message: "The address is required." }),
  addressline2: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipcode: z
    .number({
      coerce: true,
    })
    .nonnegative()
    .optional(),
});

export type VendorFormValues = z.infer<typeof vendorFormSchema>;

let defaultValues: Partial<VendorFormValues> = {};

interface VenderFormProps {
  id?: string;
}

export async function VendorForm({ id }: VenderFormProps) {
  const pathname = usePathname();

  if (pathname === "/create-vendor") {
    defaultValues = {
      vendorname: "Unique Bakery",
      bankaccountno: 12345678890,
      bankname: "Yes Bank",
      addressline1: "Zakir Nagar",
      addressline2: "Okhla",
      city: "New Delhi",
      country: "India",
      zipcode: 110025,
    };
  } else {
    const { rows: vendor } = (await getVendorDetails(id as string)) as any;

    console.log({ vendor });

    defaultValues = {
      vendorname: `${vendor.vendorname}`,
      bankaccountno: vendor.bankaccountno as number,
      bankname: `${vendor.bankname}`,
      addressline1: `${vendor.addressline1}`,
      addressline2: `${vendor.addressline2}`,
      city: `${vendor.city}`,
      country: `${vendor.country}`,
      zipcode: vendor.zipcode as number,
    };
  }

  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: VendorFormValues) {
    await createVendorsTable();
    if (pathname === "/create-vendor") {
      await insertIntoVendors(data);

      toast("The vendor is created successfully!", {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    } else {
      await updateVendorDetails(data, id as string);

      toast("The vendor is edited successfully!", {
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }
    console.log({ data });
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
        <h1 className="mx-auto text-xl font-bold">
          {pathname === "/create-vendor" ? "Create" : "Edit"} Vendor
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 rounded-lg border p-3 drop-shadow-sm"
        >
          <FormField
            control={form.control}
            name="vendorname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vendor Name*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankaccountno"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Account Number*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressline1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressline2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipcode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">
            {pathname === "/create-vendor" ? "Create" : "Edit"} Vendor
          </Button>
        </form>
      </Form>
    </div>
  );
}
