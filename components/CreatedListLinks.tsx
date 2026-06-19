'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LinkItem } from "@/app/generated/prisma/client";
import { Edit, Eye, X } from "lucide-react";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";


export default function CreatedListLinks({ data }: { data: LinkItem[] }) {
    const [deletedL, setDeletedL] = React.useState<LinkItem | null>(null);
    const [undoTimeout, setUndoTimeout] = React.useState<NodeJS.Timeout | null>(null);
    const [deletedAt, setDeletedAt] = React.useState<number | null>(null);

    const [now, setNow] = React.useState<number>(Date.now());

    const [searchL, setSearchL] = React.useState<string>("");

    const showedL = data.filter(link =>
        link.mainUrl.toLowerCase().includes(searchL.toLowerCase()) ||
        link.finalCode.toLowerCase().includes(searchL.toLowerCase())
    );

    const router = useRouter();
    React.useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    function timeLeft(expiresAt: Date | null) {
        if (!expiresAt) return "بدون انقضا";

        const remaining = new Date(expiresAt).getTime() - now;

        if (remaining <= 0) {
            return "منقضی شده";
        };

        const days = Math.floor(remaining / 86400000);
        const hours = Math.floor((remaining % 86400000) / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        const parts = [];

        if (days > 0) parts.push(`${days} روز`);
        if (hours > 0) parts.push(`${hours} ساعت`);
        if (minutes > 0) parts.push(`${minutes} دقیقه`);

        if (days === 0 && hours === 0 && minutes === 0 && seconds > 0) {
            return "چند لحظه دیگر منقضی میشود"
        }

        return `${parts.join(" و ")} دیگر منقضی میشود`;
    }


    async function handleDelete(e: any, id: number) {
        e.preventDefault();
        const item = data.find(l => l.id === id);
        if (!item) return;

        setDeletedL(item);
        setDeletedAt(Date.now());

        const timeout = setTimeout(async () => {
            await fetch(`/api/short-links?id=${id}`, {
                method: "DELETE",
            });
            router.refresh();
            setDeletedL(null);
        }, 3000);

        setUndoTimeout(timeout);
    }
    async function handleUndoDelete(e: any) {
        e.preventDefault();
        if (!deletedL) return;

        if (undoTimeout) clearTimeout(undoTimeout);

        setDeletedL(null);
        setDeletedAt(null);
    }

    return (
        <div className="px-3 py-2 md:px-9 md:py-6 flex flex-col gap-3 rounded-4 border-gray-200">
            <h2 className="text-center mb-3 text-red-600 font-bold text-3xl">لیست لینک های کوتاه شده</h2>
            <form>
                <label htmlFor="search" className="block w-full text-sm font-semibold text-yellow-800 mb-2">
                    بر اساس نام سایت اولیه یا کد نهایی:
                </label>
                <input
                    type="text"
                    id="search"
                    value={searchL}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchL(e.target.value)
                    }
                    dir="ltr"
                    className="p-2 mb-2 w-full text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
                    placeholder="search"
                />

            </form>
            <ul className="w-full">
                {showedL.map(item =>
                    <li key={item.id} className="border border-gray-200 mb-5 px-3 py-2">
                        <div className="flex align-center justify-between gap-6 mb-4">
                            <div className="flex flex-col gap-2 text-sm" dir="ltr">
                                <Link href={`/s/${item.finalCode}`} className="text-sm text-red-800">{domain?.substring(7)}/s/{item.finalCode}</Link>
                                <a target="_blank"
                                    rel="noopener noreferrer" href={item.mainUrl} className="text-xs text-gray-600">{item.mainUrl.slice(8, 40)}...</a>
                            </div>
                            <div className="flex flex-col gap-2 text-sm">
                                <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                                    {item.clicks} <Eye size={12} />
                                </div>
                                <span className="text-xs text-gray-400">{timeLeft(item.expiresAt)}</span>
                            </div>
                        </div>
                        <div className="flex align-center justify-between gap-6">
                            <button type="button"
                                disabled={deletedL ? true : false}
                                className="flex items-center justify-center gap-1 px-2 md:px-3 rounded-xl 
                                text-white bg-green-800 cursor-pointer hover:bg-green-700 
                                transition-all duration-300 text-sm flex-1"
                                onClick={(e) => handleDelete(e, item.id)}
                            >
                                <Edit size={14} />
                                ویرایش
                            </button>
                            <button type="button"
                                disabled={deletedL ? true : false}
                                className="flex items-center justify-start gap-1 px-2 md:px-3 rounded-sm 
                                text-white bg-pink-800 cursor-pointer hover:bg-pink-700 
                                transition-all duration-300 text-sm py-1" 
                                onClick={(e) => handleDelete(e, item.id)}
                            >
                                <X size={14} />
                                حذف
                            </button>
                        </div>
                    </li>
                )}
            </ul>
            {deletedL && (() => {
                const elapsed = now - (deletedAt || 0);
                const remaining = Math.floor(3.49 - (elapsed / 1000));

                return (
                    <button type="button"
                        className="px-2 h-10 md:px-3 rounded-xl text-white bg-pink-800 cursor-pointer hover:bg-pink-700 transition-all duration-300"
                        onClick={(e) => handleUndoDelete(e)}
                    >
                        لغو ({remaining})
                    </button>
                );
            })()}
        </div>
    );
}