'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { Click, LinkItem } from "@/app/generated/prisma/client";
import { ArrowLeft } from "lucide-react";
import useSWR from "swr";
import AdvancedSpinner from "./AdvancedSpinner";
import LinkCard from "./LinkCard";

const fetcher = (url: string) => fetch(url).then(r => r.json());

type LinkItemWithClicks = LinkItem & { clicks: Click[] };
type SortedStates =
    | "expiration"
    | "click"
    | "createtime";

const sortOptions = [
    { value: "expiration", label: "تاریخ انقضا" },
    { value: "click", label: "تعداد کلیک" },
    { value: "createtime", label: "زمان ساخت" },
] as const;

export default function CreatedListLinks({ initialData }: { initialData: LinkItemWithClicks[] }) {
    const [sortedBy, setSortedBy] = React.useState<SortedStates>("click");
    const [searchL, setSearchL] = React.useState<string>("");

    const { data = [], isLoading, error, mutate } = useSWR<LinkItemWithClicks[]>("/api/short-links", fetcher, {
        fallbackData: initialData,
        revalidateOnFocus: true,
        revalidateOnReconnect: true,
        refreshInterval: 20000,
    });

    const sortedLinks = [...data].sort((a, b) => {
        switch (sortedBy) {
            case "click":
                return (
                    b.clicks.length - a.clicks.length
                );
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

    if (isLoading) return <AdvancedSpinner text="در حال بارگزاری" fullScreen={true} />

    return (
        <div className="relative px-3 py-2 md:px-9 md:py-6 flex flex-col gap-3 rounded-4 border-gray-200">
            <div className="flex flex-row items-center justify-between mb-3">
                <h2 className="text-center text-gray-600 font-bold text-xl md:text-3xl">لیست لینک های کوتاه شده:</h2>
                <ArrowLeft size={24} color="gray"
                    className="cursor-pointer p-0.5"
                    onClick={() => {
                        router.replace("/");
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
            <LinkCard showedL={showedL} mutate={mutate} />
        </div>
    );
}