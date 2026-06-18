'use client';

import React from "react";
import { useRouter } from "next/navigation";
import { LinkItem } from "@/app/generated/prisma/client";
import AdvancedSpinner from "@/components/AdvancedSpinner";
import ShowResult from "@/components/ShowResult";
import CreatedListLinks from "@/components/CreatedListLinks";


const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
console.log(domain);


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


    const [dayV, setDayV] = React.useState<number>(0);
    const [hourV, setHourV] = React.useState<number>(0);
    const [minuteV, setMinuteV] = React.useState<number>(0);


    
    const router = useRouter();

    

    const checkExpired = React.useCallback(async () => {
        const now = Date.now();

        const expiredLinks = data.filter(link => {
            if (!link.expiresAt) return false;
            return new Date(link.expiresAt).getTime() <= now;
        });

        if (expiredLinks.length === 0) return;

        try {
            await Promise.all(
                expiredLinks.map(link =>
                    fetch(`/api/short-links?id=${link.id}`, {
                        method: "DELETE",
                    })
                )
            );

            router.refresh();
        } catch (err) {
            console.error("Auto delete failed:", err);
        }
    }, [data, router]);
    React.useEffect(() => {
        checkExpired();

        const interval = setInterval(checkExpired, 1000);

        return () => clearInterval(interval);
    }, [checkExpired]);

    async function handleSubmit(e: any) {
        e.preventDefault();
        setLoad(true);
        const expiredLeft: number = (dayV * 24 * 60 * 60 + hourV * 60 * 60 + minuteV * 60) * 1000;
        const res = await createNewLink(inputV, customCodeV, expiredLeft);
        setLoad(false)
        if (res.code) {
            setGeneratedCode(res.code);
        }
        if (res.message) {
            setError(res.message);
            console.log(res.message);
        }
    }
    
    return (
        <div className="md:flex md:items-start md:justify-center md:gap-18 min-h-screen bg-gray-100 p-2">
            {
                load ? <AdvancedSpinner text="صبر کنید" /> :
                    <div>
                        {generatedCode ?
                            <ShowResult text={`${domain}/s/${generatedCode}`} />
                            :
                            <>
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
                                </form>
                                <CreatedListLinks data={data} />
                            </>
                        }
                    </div>
            }
        </div>
    );
}