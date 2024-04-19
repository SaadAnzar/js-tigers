"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { sql } from "@vercel/postgres";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const vendorFormSchema = z.object({
  vendorName: z.string({
    required_error: "Please enter the name of the vendor.",
  }),
  bankAccountNumber: z
    .number({
      coerce: true,
      required_error: "Please enter the account number of the bank.",
    })
    .nonnegative(),
  bankName: z.string({
    required_error: "Please enter the name of the bank.",
  }),
  addressLine1: z.string({
    required_error: "Please enter the address.",
  }),
  addressLine2: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  zipCode: z
    .number({
      coerce: true,
    })
    .nonnegative()
    .optional(),
});

type VendorFormValues = z.infer<typeof vendorFormSchema>;

let defaultValues: Partial<VendorFormValues> = {};

export function VendorForm() {
  const pathname = usePathname();

  if (pathname === "/create-vendor") {
    defaultValues = {
      vendorName: "Real Madrid",
      bankAccountNumber: 12345678890,
      bankName: "Yes Bank",
      addressLine1: "Madrid",
      addressLine2: "Okhla",
      city: "New Delhi",
      country: "India",
      zipCode: 110020,
    };
  } else {
    defaultValues = {
      vendorName: "Bayern Munich",
      bankAccountNumber: 12345678890,
      bankName: "Yes Bank",
      addressLine1: "Munich",
      addressLine2: "Okhla",
      city: "New Delhi",
      country: "India",
      zipCode: 110020,
    };
  }

  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: VendorFormValues) {
    if (pathname === "/create-vendor") {
      await sql`
          CREATE TABLE IF NOT EXISTS vendors (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            vendorName VARCHAR(255) NOT NULL,
            bankAccountNumber INTEGER NOT NULL,
            bankName VARCHAR(255) NOT NULL,
            addressLine1 VARCHAR(255) NOT NULL,
            addressLine2 VARCHAR(255),
            city VARCHAR(255),
            country VARCHAR(255),
            zipCode INTEGER,
            "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          `;

      await sql`
          INSERT INTO vendors (vendorName, bankAccountNumber, bankName, addressLine1, addressLine2, city, country, zipCode)
          VALUES (${data.vendorName}, ${data.bankAccountNumber}, ${data.bankName}, ${data.addressLine1}, ${data?.addressLine2}, ${data?.city}, ${data?.country}, ${data?.zipCode})
          `;

      toast("The vendor is created successfully!");
    } else {
      toast("The vendor is edited successfully!");
    }
    console.log({ data });
  }

  return (
    <div className="flex flex-col md:container px-3 pb-3">
      <div className="h-16 flex justify-between items-center">
        <Link
          className={cn(
            buttonVariants({ size: "sm", variant: "outline" }),
            "relative top-0 right-0 px-2"
          )}
          href="/dashboard"
        >
          <ChevronLeft className="size-4" />
        </Link>
        <h1 className="font-bold text-xl mx-auto">
          {pathname === "/create-vendor" ? "Create" : "Edit"} Vendor
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border p-3 rounded-lg drop-shadow-sm"
        >
          <FormField
            control={form.control}
            name="vendorName"
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
            name="bankAccountNumber"
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
            name="bankName"
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
            name="addressLine1"
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
            name="addressLine2"
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
            name="zipCode"
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
