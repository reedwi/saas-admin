import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { applicationId: string }
}) {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const application = await prismadb.application.findFirst({
    where: {
      id: params.applicationId,
    }
  });

  if (!application) {
    redirect('/');
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}