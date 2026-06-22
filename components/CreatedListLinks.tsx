'use client';

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LinkItem } from "@/app/generated/prisma/client";
import { ArrowLeft, Check, Clock, Copy, Edit, Eye, Trash, X } from "lucide-react";
import QRCode from "react-qr-code";
import useSWR from "swr";
import AdvancedSpinner from "./AdvancedSpinner";

const fetcher = (url: string) => fetch(url).then(r => r.json());
const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

type SortedStates =
    | "expiration"
    | "click"
    | "createtime";

const sortOptions = [
    { value: "expiration", label: "تاریخ انقضا" },
    { value: "click", label: "تعداد کلیک" },
    { value: "createtime", label: "زمان ساخت" },
] as const;

export default function CreatedListLinks({ initialData }: { initialData: LinkItem[] }) {
    const [deletedL, setDeletedL] = React.useState<LinkItem | null>(null);
    const [undoTimeout, setUndoTimeout] = React.useState<NodeJS.Timeout | null>(null);
    const [deletedAt, setDeletedAt] = React.useState<number | null>(null);

    const [now, setNow] = React.useState<number>(Date.now());

    const [sortedBy, setSortedBy] = React.useState<SortedStates>("click");
    const [searchL, setSearchL] = React.useState<string>("");

    const [copiedId, setCopiedId] = React.useState<number | null>(null);

    const { data = [], isLoading, error, mutate } = useSWR<LinkItem[]>("/api/short-links", fetcher, {
        fallbackData: initialData,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 12000,
    }); 

    const sortedLinks = [...data].sort((a, b) => {
        switch (sortedBy) {
            case "click":
                return b.clicks - a.clicks;
            case "expiration":
                return (
                    new Date(b.expiresAt ?? 0).getTime() -
                    new Date(a.expiresAt ?? 0).getTime()
                );
            case "createtime":
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            default:
                return 0;
        }
    });

    const showedL = sortedLinks.filter(link =>
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
            return "چند لحظه دیگر"
        }

        return `${parts.join(" و ")}`;
    }

    const handleCopy = async (id: number, url: string) => {
        try {
            await navigator.clipboard.writeText(url);

            setCopiedId(id);

            setTimeout(() => {
                setCopiedId(null);
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    };

    async function handleDelete(e: any, id: number) {
        e.preventDefault();
        const item = data.find(l => l.id === id);
        if (!item) return;

        setDeletedL(item);
        setDeletedAt(Date.now());

        const timeout = setTimeout(async () => {
            // هدف دقت بالا در نمایش UI است پس revalidate میکنیم.
            mutate((prev = []) => prev.filter(item => item.id !== id), true);
            await fetch(`/api/short-links?id=${id}`, {
                method: "DELETE",
            });
            mutate();
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

    if (isLoading) return <AdvancedSpinner text="در حال بارگزاری" fullScreen={true} />

    return (
        <div className="relative px-3 py-2 md:px-9 md:py-6 flex flex-col gap-3 rounded-4 border-gray-200">
            <div className="flex flex-row items-center justify-between mb-3">
                <h2 className="text-center text-gray-600 font-bold text-xl md:text-3xl">لیست لینک های کوتاه شده:</h2>
                <ArrowLeft size={24} color="gray"
                    className="cursor-pointer p-0.5"
                    onClick={() => {
                        router.back();
                    }} />
            </div>
            <form className="flex flex-col items-center justify-center">
                <label htmlFor="search" className="block w-full sm:w-96 text-sm font-semibold text-gray-600 mb-2">
                    جستجو:
                </label>
                <input
                    type="text"
                    id="search"
                    value={searchL}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearchL(e.target.value)
                    }
                    dir="ltr"
                    className="p-2 mb-2 w-full sm:w-96 text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
                    placeholder="search"
                />
            </form>
            <div className="flex flex-row items-center justify-center my-5">
                {
                    sortOptions.map(item => (
                        <div key={item.label}
                            className={sortedBy === item.value ?
                                "bg-gray-700 text-white shadow-lg shadow-gray-300 duration-200 -translate-z-18 -translate-y-1 rounded-full" :
                                ""}>
                            <label htmlFor={item.value} className="block text-xs px-5 py-2">{item.label}</label>
                            <input
                                id={item.value} className="hidden"
                                checked={sortedBy === item.value ? true : false}
                                onChange={() => setSortedBy(item.value)}
                                type="radio" name={item.value} />
                        </div>
                    ))
                }
            </div>
            <ul className="w-full flex flex-col items-center lg:grid lg:grid-cols-2 xl:grid-cols-3 lg:gap-6">
                {showedL.map((item) =>
                    <li key={item.id} className="border mb-5 md:mb-0 w-full sm:w-96 md:min-w-96 border-gray-200 shadow-md p-3 relative">
                        <div className="flex flex-2 flex-col sm:flex-row align-center justify-start gap-6 mb-4">
                            <div className="flex flex-col items-center gap-1 text-sm" dir="ltr">
                                <a target="_blank" href={`/s/${item.finalCode}`} className="text-lg font-semibold text-slate-800 hover:text-red-500">{domain?.substring(7)}/s/{item.finalCode}</a>
                                <a target="_blank"
                                    rel="noopener noreferrer" href={item.mainUrl}
                                    className="text-xs mb-2 text-gray-600">{item.mainUrl.slice(8, 40)}...</a>
                                <QRCode
                                    value={`${domain}/s/${item.finalCode}`}
                                    size={64}
                                    bgColor="#FFFFFF"
                                    fgColor="#000000"
                                />
                            </div>
                            <div className="flex flex-1 sm:flex-col justify-between gap-2 text-sm">
                                <div className="text-gray-500">
                                    <div className="text-rose-600 text-xs flex items-center gap-1 mb-1">
                                        <Eye size={12} />
                                        {item.clicks}
                                        <span>بازدید</span>
                                    </div>
                                    <div className="flex flex-row gap-1 items-center">
                                        <Clock size={12} />
                                        <span className="text-xs">{timeLeft(item.expiresAt)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3">
                                    <button type="button" className="cursor-pointer"
                                        onClick={() => handleCopy(item?.id, `${domain}/s/${item.finalCode}`)}
                                    >
                                        {copiedId === item?.id ? <Check size={16} /> : <Copy size={16} />}
                                    </button>
                                    <Link
                                        className="text-emerald-700 cursor-pointer"
                                        href={`/created-links/${item.finalCode}`}
                                    >
                                        <Edit size={16} />                                    </Link>
                                    <button type="button"
                                        disabled={deletedL ? true : false}
                                        className="text-red-600 cursor-pointer p-1"
                                        onClick={(e) => handleDelete(e, item.id)}
                                    >
                                        <Trash size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>

                    </li>
                )}
            </ul>
            {deletedL && (() => {
                const elapsed = now - (deletedAt || 0);
                const remaining = Math.floor(3.49 - (elapsed / 1000));

                return (
                    <div className="text-center sticky left-auto right-auto bottom-2">
                        <button type="button"
                            className="md:w-64 px-12 text-sm h-10 md:px-3 rounded-xl text-white bg-pink-800 cursor-pointer hover:bg-pink-700 transition-all duration-300"
                            onClick={(e) => handleUndoDelete(e)}
                        >
                            لغو ({remaining})
                        </button>
                    </div>
                );
            })()}
        </div>
    );
}