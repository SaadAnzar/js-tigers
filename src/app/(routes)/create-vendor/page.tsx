import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { CreateVendorForm } from "@/components/create-vendor-form";

export default async function CreateVendor() {
  const session = await auth();

  if (!session?.user) redirect("/");

  return <CreateVendorForm />;
}
