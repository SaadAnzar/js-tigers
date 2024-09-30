"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
    .string()
    .min(1, { message: "The account number of the bank is required." }),
  bankname: z.string().min(1, { message: "The name of the bank is required." }),
  addressline1: z.string().min(1, { message: "The address is required." }),
  addressline2: z.string().optional(),
  city: z.string().min(1, { message: "The name of the city is required." }),
  country: z
    .string()
    .min(1, { message: "The name of the country is required." }),
  zipcode: z.string().min(1, { message: "The zip code is required." }),
});

export type VendorFormValues = z.infer<typeof vendorFormSchema>;

interface FormComponentProps {
  defaultValues: Partial<VendorFormValues>;
  onSubmit: (data: VendorFormValues) => void;
  loading: boolean;
  buttonText: string;
}

export function FormComponent({
  defaultValues,
  onSubmit,
  loading,
  buttonText,
}: FormComponentProps) {
  const form = useForm<VendorFormValues>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues,
    mode: "onChange",
  });

  return (
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
                <Input
                  {...field}
                  placeholder="Enter the name of the vendor here."
                />
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
                <Input
                  {...field}
                  placeholder="Enter the bank account number here."
                />
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
                <Input
                  {...field}
                  placeholder="Enter the name of the bank here."
                />
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
                <Input
                  {...field}
                  placeholder="Enter the address line 1 here."
                />
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
              <FormLabel>Address Line 2 (optional)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter the address line 2 here."
                />
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
              <FormLabel>City*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter the name of the city here."
                />
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
              <FormLabel>Country*</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter the name of the country here."
                />
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
              <FormLabel>Zip Code*</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter the zip code here." />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
          {buttonText}
        </Button>
      </form>
    </Form>
  );
}
