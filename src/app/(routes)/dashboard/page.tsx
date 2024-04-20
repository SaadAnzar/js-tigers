import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { getAllVendors } from "@/lib/query";
import { DataTable } from "@/components/dashboard/data-table";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) redirect("/");

  const data = await getAllVendors();

  const { rows: vendors } = data;

  return <DataTable data={vendors} />;
}
