import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

export default async function SetupLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if(!userId) {
    redirect('/sign-in');
  }

  const application = await prismadb.application.findFirst();

  if (application) {
    redirect(`/${application.id}`);
  }

  return (
    <>
      {children}
    </>
  );
}