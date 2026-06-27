"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react"
import UserDropdown from "./UserDropdown";
import { Link2, Menu, Plus, Scissors, UserCircle2Icon, X } from "lucide-react";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto md:px-24 flex items-center justify-between px-4 py-4">
                <Link href="/"
                className={`${dancingScript.className} text-lg font-bold flex items-center gap-1 text-indigo-800`}
                    onClick={() => setIsMenuOpen(false)}>
                    Link Sortener
                    <Scissors size={20} className="rotate-90" fontWeight={"bold"} strokeWidth={2} color="indigo" />
                </Link>

                <nav className="hidden sm:flex items-center"> 
                    <div className="text-sm flex gap-6 items-center justify-between">
                        <Link href={"/created-links"} 
                            className="hover:text-blue-600 flex items-center justify-start gap-1 font-bold text-md">
                            <Link2 size={18} />
                            لینک ها
                        </Link>
                        <Link href={"/"} 
                            className="text-blue-600 flex items-center justify-start gap-0.5 font-bold text-md">
                            <Plus size={18} />
                             لینک جدید
                        </Link>
                        <UserCircle2Icon />
                    </div>    
                </nav>

                <button
                    className="sm:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                > {isMenuOpen ? <X size={18} /> : <Menu size={18} />} </button>
            </div>

            {isMenuOpen && (
                <nav className="border-t sm:hidden">
                    <div className="p-4">
                        <div className="text-sm flex gap-2 items-center justify-between">
                            <Link href={"/created-links"} onClick={() => {
                                setIsMenuOpen(false)
                            }}
                                className="hover:text-blue-600 font-bold flex text-md items-center justify-start gap-1">
                                 <Link2 size={16} />
                                 لینک ها
                            </Link>
                            <Link href={"/"} onClick={() => {
                                setIsMenuOpen(false)
                            }}
                                className="text-blue-600 text-md font-bold flex items-center justify-start gap-1">
                                    <Plus size={16} />
                                 لینک جدید
                            </Link>
                            <UserCircle2Icon />
                        </div>        
                        
                    </div>
                </nav>
            )}
        </header>
        );
    }

    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto md:px-24 flex items-center justify-between px-4 py-4">
                <Link href="/"
                className={`${dancingScript.className} text-lg font-bold flex items-center gap-1 text-indigo-800`}
                    onClick={() => setIsMenuOpen(false)}>
                    Link Sortener
                    <Scissors size={20} className="rotate-90" fontWeight={"bold"} strokeWidth={2} color="indigo" />
                </Link>

                <nav className="hidden sm:flex items-center">
                    {session?.user ?
                        <div className="text-sm flex gap-6 items-center justify-between">
                            <Link href={"/created-links"} 
                                className="hover:text-blue-600 flex items-center justify-start gap-1 font-bold text-md">
                                <Link2 size={18} />
                                لینک ها
                            </Link>
                            <Link href={"/"} 
                                className="text-blue-600 flex items-center justify-start gap-0.5 font-bold text-md">
                                <Plus size={18} />
                                 لینک جدید
                            </Link>
                            <UserDropdown isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                        </div>
                        :
                        <Link href={"/auth"}
                            className="p-2 text-white rounded-lg transition-all duration-200  bg-pink-700 hover:bg-pink-800 cursor-pointer text-sm">
                            ورود | ثبت نام
                        </Link>
                    }
                </nav>

                <button
                    className="sm:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                > {isMenuOpen ? <X size={18} /> : <Menu size={18} />} </button>
            </div>

            {isMenuOpen && (
                <nav className="border-t sm:hidden">
                    <div className="p-4">
                        {session?.user ?
                            <div className="text-sm flex gap-2 items-center justify-between">
                                <Link href={"/created-links"} onClick={() => {
                                    setIsMenuOpen(false)
                                }}
                                    className="hover:text-blue-600 font-bold flex text-md items-center justify-start gap-1">
                                     <Link2 size={16} />
                                     لینک ها
                                </Link>
                                <Link href={"/"} onClick={() => {
                                    setIsMenuOpen(false)
                                }}
                                    className="text-blue-600 text-md font-bold flex items-center justify-start gap-1">
                                        <Plus size={16} />
                                     لینک جدید
                                </Link>
                                <UserDropdown isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                            </div>
                            :
                            <Link href={"/auth"} onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-white rounded-lg transition-all duration-200  bg-pink-700 hover:bg-pink-800 cursor-pointer text-sm">
                                ورود | ثبت نام
                            </Link>
                        }
                    </div>
                </nav>
            )}
        </header>
    );
}