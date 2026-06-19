"use client";
import { UserCircle2Icon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { deleteAccount } from "@/actions/deleteUser";
import React, { useEffect, useRef } from "react";

export default function UserDropdown({ isMenuOpen, setIsMenuOpen }
    : { isMenuOpen: boolean, setIsMenuOpen: any }
) {
        const [isUserAccountInfoOpen, setIsUserAccountInfoOpen] = React.useState<boolean>(false);
    
    const { data: session, status } = useSession();

    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsUserAccountInfoOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        // document.addEventListener("mousedown");

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, [setIsUserAccountInfoOpen]);

    if (status === "loading") {
        return <div></div>;
    }
    return (
        <div className="relative"
        ref={dropdownRef}>
            <button
                onClick={() =>
                    setIsUserAccountInfoOpen(!isUserAccountInfoOpen)
                }
                className="hover:text-blue-600 cursor-pointer mt-1 mx-3"
            >
                <UserCircle2Icon />
            </button>

            {isUserAccountInfoOpen && (
                <div
                className="absolute left-0 top-10 z-50 w-72 rounded-xl border bg-white p-4 shadow-lg"
                >
                    <div className="flex flex-col items-center">
                        <img
                            src={
                                session?.user?.image ??
                                "/default-avatar.png"
                            }
                            alt="avatar"
                            className="h-16 w-16 rounded-full object-cover"
                        />

                        <h3 className="mt-3 font-semibold">
                            {session?.user?.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                            {session?.user?.email}
                        </p>
                    </div>

                    <div className="mt-6 flex justify-between gap-2">
                        <button onClick={() => {
                            signOut();
                            setIsMenuOpen(!isMenuOpen);
                            setIsUserAccountInfoOpen(!isUserAccountInfoOpen)
                        }}
                            className="flex-1 p-2 text-white hover:text-blue-300 rounded-lg transition-all duration-200  bg-pink-700 hover:bg-pink-800 cursor-pointer">
                            خروج
                        </button>

                        <button
                            onClick={async () => {
                                const ok = confirm(
                                    "آیا از حذف حساب کاربری مطمئن هستید؟"
                                );

                                if (!ok) return;

                                await deleteAccount();
                            }}
                            className="px-2 rounded-lg bg-red-500 py-2 text-white"
                        >
                            حذف حساب
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}