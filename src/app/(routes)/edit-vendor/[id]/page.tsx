import { redirect } from "next/navigation";
import { auth } from "@/auth";

import { getVendorDetailsById } from "@/lib/query";
import { EditVendorForm } from "@/components/edit-vendor-form";

export default async function EditVendor({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  if (!session?.user) redirect("/");

  const data = await getVendorDetailsById(params.id);

  const { rows: vendor } = data;

  return <EditVendorForm id={params.id} vendor={vendor} />;
}
