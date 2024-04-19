import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { VendorForm } from "@/components/vendor-form";

export default async function CreateVendor() {
  const session = await auth();

  if (!session?.user) redirect("/");

  return <VendorForm />;
}
