'use client';

import React from "react";
import { CaseLower, Link, ShieldOff } from "lucide-react";

async function createNewLink(url: string, code: string, expiredLeft: number) {
    try {
        const response = await fetch("/api/short-links", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                inputV: url,
                customCode: code,
                expiredLeft,
            }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export default function LinkMaker({
    setLoad,
    setGeneratedCode,
    errors,
    setErrors,
}: {
    setGeneratedCode: any;
    setLoad: any;
    errors: string[];
    setErrors: any;
}) {
    // V = Value // L = Link
    const [inputV, setInputV] = React.useState<string>("");
    const [customCodeV, setCustomCodeV] = React.useState<string>("");

    const [dayV, setDayV] = React.useState<string>("");
    const [hourV, setHourV] = React.useState<string>("");
    const [minuteV, setMinuteV] = React.useState<string>("");

    async function handleSubmit(e: any) {
        e.preventDefault();
        setLoad(true);

        const day = Math.min(364, Math.max(0, Number(dayV || 0)));
        const hour = Math.min(23, Math.max(0, Number(hourV || 0)));
        const minute = Math.min(59, Math.max(0, Number(minuteV || 0)));

        const expiredLeft =
            (day * 24 * 60 * 60 +
                hour * 60 * 60 +
                minute * 60) * 1000;

        const res = await createNewLink(
            inputV,
            customCodeV,
            expiredLeft
        );

        if (res.code) {
            setGeneratedCode(res.code);
        }

        if (res.message) {
            setErrors(res.message);
            console.log(res.message);
        }

        setLoad(false);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
            <h2 className="text-center mb-3 mt-6 text-pink-700 font-bold text-3xl">
                سرویس کوتاه کننده لینک
            </h2>

            <div>
                <label
                    className="text-yellow-800 text-sm flex items-center justify-start gap-1"
                    htmlFor="address"
                >
                    <Link size={14} />
                    آدرس:
                </label>

                <input
                    type="text"
                    id="address"
                    value={inputV}
                    onChange={(e) => setInputV(e.target.value)}
                    dir="ltr"
                    className="p-2 my-2 w-full text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all
                    duration-200 peer"
                    placeholder="ex: https://github.com/mojavadb/link-shortener-service"
                />
            </div>

            <div>
                <label
                    className="text-yellow-800 text-sm flex items-center justify-start gap-1"
                    htmlFor="finalcode"
                >
                    <CaseLower size={14} />
                    کد دلخواه:
                </label>

                <input
                    type="text"
                    id="finalcode"
                    value={customCodeV}
                    onChange={(e) => setCustomCodeV(e.target.value)}
                    dir="ltr"
                    className="p-2 my-2 w-full text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl
                    focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all
                    duration-200 peer"
                    placeholder="ex: ev23cw"
                />
            </div>

            <div>
                <label
                    className="mb-4 text-yellow-800 text-sm flex items-center justify-start gap-1"
                    htmlFor="timeremaind"
                >
                    <ShieldOff size={14} />
                    تاریخ انقضا:
                </label>

                <div dir="ltr" className="flex flex-row align-center justify-center">

                    <input
                        type="number"
                        min={0}
                        max={364}
                        value={dayV}
                        onChange={(e) => setDayV(e.target.value)}
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
                        value={hourV}
                        onChange={(e) => setHourV(e.target.value)}
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
                        value={minuteV}
                        onChange={(e) => setMinuteV(e.target.value)}
                        dir="ltr"
                        className="p-1 text-center text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-full
                        focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all
                        duration-200 peer"
                    />
                    <span className="py-1">m</span>

                </div>
            </div>

            <div className="px-8 flex justify-center items-center">
                <button
                    type="submit"
                    className="px-6 md:px-9 py-2 text-sm rounded-2xl text-white bg-pink-800 cursor-pointer hover:bg-pink-700 transition-all duration-300"
                >
                    ساخت لینک کوتاه
                </button>
            </div>

            <div className="text-center">
                {errors?.map((err) => (
                    <p
                        key={err}
                        className="block h-4 w-full text-sm font-semibold text-red-600"
                    >
                        {err}
                    </p>
                ))}
            </div>
        </form>
    );
}