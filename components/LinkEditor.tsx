"use client";

import type { Prisma } from "@prisma/client";
import { ArrowLeft, CaseLower, Check, Link, MousePointerClick, ShieldOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ApiResponse {
    status: number;
    data: {
        message?: string[];
    };
}

type LinkItem = Prisma.LinkItemGetPayload<{}>;


async function updateLink(
    url: string,
    code: string,
    endexpire: boolean,
    resetClicks: boolean,
    linkId?: number
): Promise<ApiResponse> {
    const response = await fetch("/api/short-links", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            inputV: url,
            customCode: code,
            endexpire,
            id: linkId,
            resetClicks: resetClicks
        }),
    });

    const result = await response.json();

    return {
        status: response.status,
        data: result,
    };
}

export default function LinkEditor({ link }: { link: LinkItem | null }) {
    const [inputV, setInputV] = React.useState<string>(link?.mainUrl || "");
    const [customCodeV, setCustomCodeV] = React.useState<string>(link?.finalCode || "");
    const [hasExpried, setHasExpried] = useState<boolean>(
        link?.expiresAt ? true : false
    );
    const [resetClicks, setResetClicks] = React.useState<boolean>(false);
    const [errors, setErrors] = React.useState<string[]>([]);
    const router = useRouter();

    async function handleSubmit(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        try {
            const res = await updateLink(
                inputV,
                customCodeV,
                hasExpried,
                resetClicks,
                link?.id
            );

            if (res.status === 200) {
                router.replace("/created-links");
                return;
            }

            if (res.data.message) {
                setErrors(res.data.message);
            }
        } catch (err) {
            setErrors(["خطا در ارتباط با سرور"]);
            console.error(err);
        }
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
            <div className="flex flex-row items-start justify-between mb-3 mt-6">
                <h2 className="text-center text-emerald-600 font-bold text-3xl">ویرایش لینک:</h2>
                <ArrowLeft size={24} color="green"
                    className="cursor-pointer p-0.5"
                    onClick={() => {
                        router.back();
                    }} />
            </div>
            <div>
                <label className="text-yellow-800 text-sm flex items-center justify-start gap-1"
                    htmlFor="address">
                    <Link size={14} />
                    آدرس:
                </label>
                <input
                    type="text"
                    id="address"
                    value={inputV}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInputV(e.target.value)
                    }
                    dir="ltr"
                    className="sm:min-w-96 min-w-64 p-2 my-2 w-full text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
                />
            </div>
            <div>
                <label className="text-yellow-800 text-sm flex items-center justify-start gap-1"
                    htmlFor="finalcode">
                    <CaseLower size={14} />
                    کد دلخواه:
                </label>
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
                />
            </div>
            <div className="flex items-center justify-between">
                {link?.expiresAt &&
                    <>
                        <label className="text-yellow-800 text-sm flex items-center justify-start gap-1" htmlFor="hasexpired">
                            {
                                hasExpried ? (
                                    <>
                                        <ShieldOff size={14} />
                                        <span>تاریخ انقضا حذف کن</span>
                                    </>
                                ) : (
                                    <>
                                        <Check size={18} />
                                        <span>ارسال کنید</span>
                                    </>
                                )
                            }
                        </label>
                        <div className="hidden">
                            <input type="checkbox" name="hasexpired" id="hasexpired"
                                checked={!hasExpried} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasExpried(x => !x)} />
                        </div>
                    </>}
                <div className="flex justify-start items-center gap-1">
                    <label className="text-yellow-800 text-sm flex items-center justify-start gap-1" htmlFor="resetclicks">
                        {
                            resetClicks ? (
                                <>
                                    <Check size={18} />
                                    <span>ارسال کنید</span>
                                </>
                            ) : (
                                <>
                                <MousePointerClick size={14} />
                                <span>تعداد کلیک ها را صفر کن</span>
                                </>
                            )
                        }
                    </label>
                    <div className="hidden">
                        <input type="checkbox" name="resetclicks" id="resetclicks"
                            checked={!resetClicks} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResetClicks(x => !x)} />
                    </div>
                </div>
            </div>
            <div className="px-8 flex justify-center items-center">
                <button
                    type="submit"
                    className="px-6 md:px-9 py-2 text-sm rounded-2xl text-white bg-emerald-800 cursor-pointer hover:bg-emerald-700 transition-all duration-300"
                >
                    ثبت تغییرات
                </button>
            </div>
            <div className="text-center">
                {errors?.map(err =>
                    <p key={err}
                        className="block h-4 w-full text-sm font-semibold text-red-600">
                        {err}
                    </p>
                )}
            </div>
        </form>
    );
}