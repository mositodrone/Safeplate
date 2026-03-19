"use client";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="p-2 md:hidden cursor-pointer">a
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>

      {/* Custom blurred overlay */}
      {/* <SheetOverlay className="bg-black/20 backdrop-blur-sm" /> */}

      <SheetContent
        side="left"
        className="w-72 bg-white
         [&~div]:bg-black/20
           [&~div]:backdrop-blur-sm
        "
      >
        <NavLinks />
      </SheetContent>
    </Sheet> 
  );
}

function NavLinks() {
  return (
    <nav className="flex flex-col gap-6 mt-10">
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/pricing">Pricing</Link>
    </nav>
  );
}

export default Sidebar;