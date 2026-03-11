"use client"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from '@/constants'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import React, { useState } from 'react'
import { Menu, User } from 'lucide-react'

// const CustomLink = React.forwardRef((ref, {children}: any) => (
//   <a href={ref}>{children}</a>
// ));
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="w-full bg-black/80 mb-0 z-10">
        <div className="mx-auto my-0 max-w-7xl px-6 py-4 flex items-center justify-between rounded-2xl">
          {/* Left: Logo */}
          <div className="text-white font-bold tracking-wide cursor-pointer">
            <Link href="/">
              MYPLATE
            </Link>
            
          </div>

          {/* Center: Nav links */}
          <SignedIn>
            <ul className="hidden md:flex items-center gap-12 text-sm text-white/80">
              {navLinks.slice(0, 6).map((link) => {
                const isActive = link.route === pathname

                return (
                  <li key={link.route} className={`hover:text-white cursor-pointer ${
                    isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                  }`}>
                    <Link href={link.route}>
                      <Image 
                        src={link.icon}
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${isActive && 'brightness-200'}, m-auto`}
                      />
                      <p className="hover:text-white cursor-pointer">{link.label}</p>
                    </Link>
                  </li>

                 )
               })
              }
              <li className="flex-center cursor-pointer hover:text">
                <UserButton 
                    showName 
                    appearance={{
                    variables: {
                      colorPrimary: '#ff0000', // Change primary color to red
                      colorText: 'gray',     // Change text color to green
                    },
                  }} 
                />
              </li>
            </ul>

            
            {/* Right: Language + Button */}
            <div className="md:hidden flex items-center gap-4">
              <button className="text-sm text-white/80 hover:text-white cursor-pointer">
                EN
              </button>

              <Sheet>
                <SheetTrigger asChild>
                  <button className="rounded-md border border-white/60 px-4 py-2 text-sm text-white hover:bg-white hover:text-black transition cursor-pointer">
                    <Menu />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  className="w-72 bg-black"
                >
                  <SheetTitle>
                    <div className="pt-10 ml-auto border-b">
                      <UserButton 
                          showName 
                          appearance={{
                          variables: {
                            colorPrimary: '#ff0000', // Change primary color to red
                            colorText: 'gray',     // Change text color to green
                          },
                        }} 
                      />
                    </div>
                  </SheetTitle>
                  <div className="flex flex-col gap-6 mt-10">
                    {navLinks.slice(0, 6).map((link) => {
                      const isActive = link.route === pathname;

                      return (
                        <SheetClose key={link.route}>
                          <Link
                            href={link.route}
                            className={`text-base ${
                              isActive ? "font-semibold" : ""
                            }`}
                          >
                            {link.label}
                          </Link>
                        </SheetClose>
                      );
                    })}
                </div>
              </SheetContent>
            </Sheet>    
              
            </div>
          </SignedIn>
          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover text-white">
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>
            <Button asChild className="button bg-purple-gradient bg-cover text-white">
              <Link href="/sign-up">
                Sign Up
              </Link>
            </Button>
          </SignedOut>  
        </div>
      </nav>
    </>
  );
}
