'use client';

import React from "react";
import { validateUrl } from "@/utils/urlValidator";
import AdvancedSpinner from "@/components/AdvancedSpinner";
import ShowResult from "@/components/ShowResult";
import Link from "next/link";
import { useRouter } from "next/navigation";


const domain = process.env.NEXT_PUBLIC_DOMAIN;
console.log(domain);

interface LinkItem {
    id: string;
    mainUrl: string;
    finalCode: string;
    createdAt: number;
    expiresAt: number;
}

async function createNewLink(url: string, code: string, expiredLeft: number) {
    try {
        const response = await fetch(
            `/api/short-links`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                inputV: url,
                customCode: code,
                expiredLeft: expiredLeft
            })
        }
        );
        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }

}

export default function Main({ data }: { data: LinkItem[] }) {
    // V = Value // L = Link
    const [inputV, setInputV] = React.useState<string>("");
    const [customCodeV, setCustomCodeV] = React.useState<string>("");
    const [error, setError] = React.useState<string[]>([]);

    const [load, setLoad] = React.useState<boolean>(false);
    const [generatedCode, setGeneratedCode] = React.useState<string>("");


    //   const [existingL, setExistingL] = React.useState<LinkItem[]>([]);
    const [searchL, setSearchL] = React.useState<string>("");
    //   const [filterL, setFilterL] = React.useState<LinkItem[]>([]);
    const [dayV, setDayV] = React.useState<number>(0);
    const [hourV, setHourV] = React.useState<number>(0);
    const [minuteV, setMinuteV] = React.useState<number>(0);


    const [now, setNow] = React.useState<number>(Date.now());
    const [deletedL, setDeletedL] = React.useState<any>(null);
    const [undoTimeout, setUndoTimeout] = React.useState<NodeJS.Timeout | null>(null);
    const [deletedAt, setDeletedAt] = React.useState<number | null>(null);

    const showedL = data.filter(link =>
        link.mainUrl.toLowerCase().includes(searchL.toLowerCase()) ||
        link.finalCode.toLowerCase().includes(searchL.toLowerCase())
    );
    const router = useRouter();

    React.useEffect(() => {
        console.log("MAIN MOUNT");

        return () => {
            console.log("MAIN UNMOUNT");
        };
    }, []);

    async function handleSubmit(e: any) {
        e.preventDefault();
        const expiredLeft: number = (dayV * 24 * 60 * 60 + hourV * 60 * 60 + minuteV * 60) * 1000;
        const res = await createNewLink(inputV, customCodeV, expiredLeft);
        if (res.code) {
            setGeneratedCode(res.code);
        }
        if (res.message) {
            setError(res.message);
            console.log(res.message);
        }
    }

    React.useEffect(() => {
        const timer = setInterval(() => {
            setNow(Date.now());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    const timeLeft = (expiresAt: number) => {
        if (expiresAt === -1) return "بدون انقضا";

        const remaining = expiresAt - now;

        if (remaining <= 0) return "منقضی";

        const days = Math.floor(remaining / 86400000);
        const hours = Math.floor((remaining % 86400000) / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);

        if (days > 0) return `${days} روز ${hours} ساعت`;
        if (hours > 0) return `${hours} ساعت ${minutes} دقیقه`;
        if (minutes > 0) return `${minutes} دقیقه`;
        return "کمتر از 1 دقیقه";
    };

    async function handleDelete(id: string) {
        try {
            const response = await fetch(
                `/api/short-links?id=${id}`, {
                method: "DELETE",
            });
            const data = await response.json();
            router.refresh();
            console.log(data);
        } catch (error) {
            console.error('Error deleting link:', error);
        }
    }
    function undoDelete() {

    }


    return (
        <div className="md:flex md:items-start md:justify-center md:gap-18 min-h-screen bg-gray-100 p-2">
            <div className="px-6 py-4 mb-6 md:px-18 md:py-12 bg-white flex items-center justify-center rounded-4 border-gray-200">
                {load ? <AdvancedSpinner size={28} text="لطفا چند لحظه صبر کنید" fullScreen={true} /> :
                    <div>
                        {generatedCode ?
                            <ShowResult text={`${domain}/${generatedCode}`} />
                            :
                            <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
                                <h2 className="text-center mb-3 text-red-600 font-bold text-3xl">سرویس کوتاه کننده لینک</h2>
                                <div>
                                    <label className="text-yellow-800 text-sm" htmlFor="primaryLink">آدرس:</label>
                                    <input
                                        type="text"
                                        id="primaryLink"
                                        value={inputV}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setInputV(e.target.value)
                                        }
                                        dir="ltr"
                                        className="p-2 my-2 w-full text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
                                        placeholder="ex: https://github.com/mojavadb/link-shortener-service"
                                    />
                                </div>
                                <div>
                                    <label className="text-yellow-800 text-sm" htmlFor="primaryLink">کد نهایی (اختیاری):</label>
                                    <input
                                        type="text"
                                        id="finalcode"
                                        value={customCodeV}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setCustomCodeV(e.target.value)
                                        }
                                        dir="ltr"
                                        className="p-2 my-2 w-full text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
                                        placeholder="ex: ev23cw"
                                    />
                                </div>
                                <div>
                                    <label className="block mb-4 text-yellow-800 text-sm" htmlFor="primaryLink">انقضا لینک: (خالی یعنی از بین نمیرود)</label>
                                    <div dir="ltr" className="flex flex-row align-center justify-center">
                                        <input
                                            type="number"
                                            min={0}
                                            max={364}
                                            id="timeRemained"
                                            value={dayV}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const value = +e.target.value;
                                                setDayV(isNaN(value) ? 0 : (value > 364 ? 364 : (value < 0 ? 0 : value)))
                                            }}
                                            dir="ltr"
                                            className="p-1 text-center text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-full 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
                                        />
                                        <span className="py-1">d</span>
                                        <span className="p-1">:</span>

                                        <input
                                            type="number"
                                            min={0}
                                            max={23}
                                            id="timeRemained"
                                            value={hourV}
                                            onChange={(e) => {
                                                const value = +e.target.value;
                                                setHourV(isNaN(value) ? 0 : (value > 23 ? 23 : (value < 0 ? 0 : value)));
                                            }}
                                            dir="ltr"
                                            className="p-1 text-center text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-full 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
                                        />
                                        <span className="py-1">h</span>
                                        <span className="p-1">:</span>
                                        <input
                                            type="number"
                                            min={0}
                                            max={59}
                                            id="timeRemained"
                                            value={minuteV}
                                            onChange={(e) => {
                                                const value = +e.target.value;
                                                setMinuteV(isNaN(value) ? 0 : (value > 59 ? 59 : (value < 0 ? 0 : value)));
                                            }}
                                            dir="ltr"
                                            className="p-1 text-center text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-full 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
                                        />
                                        <span className="py-1">m</span>

                                    </div>
                                </div>
                                <div>
                                    {error?.map(err =>
                                        <p key={err}
                                            className="block h-4 w-full text-sm font-semibold text-red-600">
                                            {err}
                                        </p>
                                    )}
                                </div>
                                <div className="px-8 flex justify-center items-center">
                                    <button
                                        type="submit"
                                        className="px-6 md:px-9 py-2 rounded-2xl text-white bg-pink-800 cursor-pointer hover:bg-pink-700 transition-all duration-300"
                                    >
                                        ساخت لینک کوتاه
                                    </button>
                                </div>
                            </form>}
                    </div>
                }

            </div>
            {!generatedCode && !load &&
                <div className="px-3 py-2 md:px-9 md:py-6 bg-white flex flex-col gap-3 rounded-4 border-gray-200">
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
                            <li key={item.id} className="border border-gray-200 mb-5 px-3 py-2 flex align-center justify-between gap-6">
                                <div className="flex flex-col gap-2 text-sm" dir="ltr">
                                    <Link href={`/${item.finalCode}`} className="text-sm text-red-800">{domain?.substring(7)}/{item.finalCode}</Link>
                                    <a href={item.mainUrl} className="text-xs text-gray-600">{item.mainUrl.slice(8, 40)}...</a>
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                    {timeLeft(item.expiresAt)}
                                </div>
                                <button type="button"
                                    disabled={deletedL ? true : false}
                                    className="px-2 md:px-3 rounded-xl text-white bg-pink-800 cursor-pointer hover:bg-pink-700 transition-all duration-300"
                                    onClick={() => handleDelete(item.id)}
                                >حذف</button>
                            </li>
                        )}
                    </ul>
                    {deletedL && (() => {
                        const elapsed = now - (deletedAt || 0);
                        const remaining = Math.floor(5.49 - (elapsed / 1000));

                        return (
                            <button type="button"
                                className="px-2 h-10 md:px-3 rounded-xl text-white bg-pink-800 cursor-pointer hover:bg-pink-700 transition-all duration-300"
                                onClick={() => undoDelete()}
                            >
                                بازگردانی ({remaining})
                            </button>
                        );
                    })()}
                </div>
            }
        </div>
    );
}