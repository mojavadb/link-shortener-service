"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react"
import UserDropdown from "./UserDropdown";
import { Link2, Menu, Plus, X } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div></div>;
    }

    return (
        <header className="bg-white">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="text-md font-bold"
                    onClick={() => setIsMenuOpen(false)}>
                    Link Sortener
                </Link>

                <nav className="hidden sm:flex items-center">
                    {session?.user ?
                        <div className="text-sm flex gap-6 items-center justify-between">
                            <Link href={"/created-links"} 
                                className="hover:text-blue-600 flex items-center justify-start gap-1">
                                <Link2 size={14} />
                                لینک ها
                            </Link>
                            <Link href={"/"} 
                                className="hover:text-blue-600 flex items-center justify-start gap-1">
                                <Plus size={14} />
                                 لینک جدید
                            </Link>
                            <UserDropdown isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                        </div>
                        :
                        <Link href={"/auth"}
                            className="p-2 text-white hover:text-blue-300 rounded-lg transition-all duration-200  bg-pink-700 hover:bg-pink-800 cursor-pointer text-sm">
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
                                    className="hover:text-blue-600 flex items-center justify-start gap-1">
                                     <Link2 size={14} />
                                     لینک ها
                                </Link>
                                <Link href={"/"} onClick={() => {
                                    setIsMenuOpen(false)
                                }}
                                    className="hover:text-blue-600 flex items-center justify-start gap-1">
                                        <Plus size={14} />
                                     لینک جدید
                                </Link>
                                <UserDropdown isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                            </div>
                            :
                            <Link href={"/auth"} onClick={() => setIsMenuOpen(false)}
                                className="p-2 text-white hover:text-blue-300 rounded-lg transition-all duration-200  bg-pink-700 hover:bg-pink-800 cursor-pointer text-sm">
                                ورود | ثبت نام
                            </Link>
                        }
                    </div>
                </nav>
            )}
        </header>
    );
}