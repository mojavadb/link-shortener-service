"use client";

import { Click, LinkItem } from "@/app/generated/prisma/client";
import { Check, Clock, Copy, Edit, Eye, Send, Trash } from "lucide-react";
import QRCode from "react-qr-code";
import Link from "next/link";
import React from "react";
import { KeyedMutator } from "swr";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";

type LinkItemWithClicks = LinkItem & { clicks: Click[] };

export default function LinkCard({ showedL, mutate }: { showedL: LinkItemWithClicks[], mutate: KeyedMutator<LinkItemWithClicks[]> }) {
    const [deletedL, setDeletedL] = React.useState<LinkItem | null>(null);
    const [undoTimeout, setUndoTimeout] = React.useState<NodeJS.Timeout | null>(null);
    const [deletedAt, setDeletedAt] = React.useState<number | null>(null);
    
    const [copiedId, setCopiedId] = React.useState<number | null>(null);
    
    const [now, setNow] = React.useState<number>(Date.now());
    React.useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    async function handleDelete(e: React.MouseEvent<HTMLButtonElement>, id: number) {
        e.preventDefault();
        const item = showedL.find(l => l.id === id);
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

    async function handleShareLink(id: number, finalCode: string) {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'لینک اشتراک‌گذاری',
                    text: 'این لینک رو ببینید:',
                    url: finalCode,
                });
            } catch (err) {
                console.error("Error sharing:", err);
                if ((err as Error).name !== 'AbortError') {
                    console.log(err);
                }
            }
        } else {
            await handleCopy(id, `${domain}/s/${finalCode}`);
        }
    };

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

    function timeLeft(expiresAt: Date | null) {
        if (!expiresAt) return "بدون انقضا";

        const remaining = new Date(expiresAt).getTime() - now;

        const days = Math.floor(remaining / 86400000);
        const hours = Math.floor((remaining % 86400000) / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        const parts = [];

        if (days > 0) parts.push(`${days} روز`);
        if (hours > 0) parts.push(`${hours} ساعت`);
        if (minutes > 0) parts.push(`${minutes} دقیقه`);

        if ((days === 0 && hours === 0 && minutes === 0 && seconds > 0) || (remaining < 0)) {
            return "چند لحظه دیگر"
        }

        return `${parts.join(" و ")}`;
    }
    
    return (
        <>
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
                                        {item.clicks.length}
                                        <span>بازدید</span>
                                    </div>
                                    <div className="flex flex-row gap-1 items-center">
                                        <Clock size={12} />
                                        <span className="text-xs">{timeLeft(item.expiresAt)}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-3">
                                    <button type="button" className="cursor-pointer"
                                        onClick={() => handleShareLink(item?.id, item.finalCode)}
                                    >
                                        <Send size={16} />
                                    </button>
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
                                        className="text-red-600 cursor-pointer"
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
        </>
    );
}