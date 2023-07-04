import { UserButton, auth } from "@clerk/nextjs";

import { MainNav } from "@/components/main-nav";
import AppSwitcher from "@/components/app-switcher";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import { ThemeSwitcher } from "@/components/theme-switcher";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.application.findMany();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <AppSwitcher items={stores}/>
        <MainNav className="mx-6"/>
        <div className="ml-auto flex itesm-center space-x-4">
          <ThemeSwitcher />
          <UserButton afterSignOutUrl="/"/>
        </div>
      </div>
    </div>
  );
}

export default Navbar;