"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"
import AdvancedSpinner from "./AdvancedSpinner";
import UserDropdown from "./UserDropdown";

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

                <nav className="hidden md:flex items-center gap-6">
                    {session?.user ?
                        <div className="text-sm flex gap-2 items-center justify-between">
                            <Link href={"/created-links"} 
                                className="hover:text-blue-600">
                                لیست لینک ها
                            </Link>
                            <Link href={"/"} 
                                className="hover:text-blue-600">
                                ساخت لینک جدید
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
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {isMenuOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>

            {isMenuOpen && (
                <nav className="border-t md:hidden">
                    <div className="p-4">
                        {session?.user ?
                            <div className="text-sm flex gap-2 items-center justify-between">
                                <Link href={"/created-links"} onClick={() => {
                                    setIsMenuOpen(false)
                                }}
                                    className="hover:text-blue-600">
                                    لیست لینک ها
                                </Link>
                                <Link href={"/"} onClick={() => {
                                    setIsMenuOpen(false)
                                }}
                                    className="hover:text-blue-600">
                                    ساخت لینک جدید
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