"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { sql } from "@vercel/postgres";

import { VendorFormValues } from "@/components/form-component";

export async function createUsersTable() {
  await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        imageurl VARCHAR(255),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      `;
}

export async function createVendorsTable() {
  await sql`
      CREATE TABLE IF NOT EXISTS vendors (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        vendorname VARCHAR(255) NOT NULL,
        bankaccountno BIGINT NOT NULL,
        bankname VARCHAR(255) NOT NULL,
        addressline1 VARCHAR(255) NOT NULL,
        addressline2 VARCHAR(255),
        city VARCHAR(255),
        country VARCHAR(255),
        zipcode BIGINT, 
        createdby VARCHAR(255) REFERENCES users(email),
        "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
      `;
}

export async function insertIntoVendors(data: VendorFormValues) {
  const session = await auth();
  return await sql`
      INSERT INTO vendors (vendorname, bankaccountno, bankname, addressline1, addressline2, city, country, zipcode, createdby)
      VALUES (${data.vendorname}, ${data.bankaccountno}, ${data.bankname}, ${data.addressline1}, ${data?.addressline2}, ${data?.city}, ${data?.country}, ${data?.zipcode}, ${session?.user?.email})
      `;
}

export async function getAllVendors() {
  const session = await auth();

  return await sql`
      SELECT *
      FROM vendors
      WHERE createdby = ${session?.user?.email}
      `;
}

export async function getVendorDetailsById(id: string) {
  return await sql`
      SELECT *
      FROM vendors
      WHERE id = ${id}
      LIMIT 1
      `;
}

export async function updateVendorDetails(
  updatedData: VendorFormValues,
  id: string
) {
  return await sql`
      UPDATE vendors
      SET vendorname = ${updatedData.vendorname}, bankaccountno = ${updatedData.bankaccountno}, bankname = ${updatedData.bankname}, addressline1 = ${updatedData.addressline1}, addressline2 = ${updatedData?.addressline2}, city = ${updatedData?.city}, country = ${updatedData?.country}, zipcode = ${updatedData?.zipcode}
      WHERE id = ${id};
      `;
}

export async function deleteVendor(id: string) {
  return await sql`
      DELETE FROM vendors
      WHERE id = ${id}
      `;
}

export async function clearCache(path: string) {
  revalidatePath(path);
}
