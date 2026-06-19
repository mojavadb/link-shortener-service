"use client";

import { LinkItem } from "@/app/generated/prisma/client";
import { CaseLower, Link, ShieldOff } from "lucide-react";
import React, { useState } from "react";

export default function LinkEditor({ link }: { link: LinkItem | null }) {
    const [inputV, setInputV] = React.useState<string>(link?.mainUrl || "");
    const [customCodeV, setCustomCodeV] = React.useState<string>(link?.finalCode || "");
    const [hasExpried, setHasExpried] = useState<boolean>(
        link?.expiresAt ? true : false
    );
    function handleSubmit(e: any) {

    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-5">
            <h2 className="text-center mb-3 text-emerald-600 font-bold text-3xl">ویرایش لینک</h2>
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
                    className="sm:min-w-96 p-2 my-2 w-full text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl 
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
            <div>
                {link?.expiresAt &&
                    <>
                        <label className="mb-4 text-yellow-800 text-sm flex items-center justify-start gap-1" htmlFor="hasexpired">
                            <ShieldOff size={14} />
                            تاریخ انقضا:
                        </label>
                        <div className="flex text-sm flex-row text-shadow-mauve-50 align-center justify-center gap-1">
                            تاریخ انقضا نداشته باشد:
                            <input type="checkbox" name="hasexpired"
                                checked={!hasExpried} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHasExpried(x => !x)} />
                        </div>
                    </>}
            </div>
            <div className="px-8 flex justify-center items-center">
                <button
                    type="submit"
                    className="px-6 md:px-9 py-2 text-sm rounded-2xl text-white bg-emerald-800 cursor-pointer hover:bg-emerald-700 transition-all duration-300"
                >
                    ثبت تغییرات
                </button>
            </div>
            {/* <div className="text-center">
                {errors?.map(err =>
                    <p key={err}
                        className="block h-4 w-full text-sm font-semibold text-red-600">
                        {err} 
                    </p>
                )}
            </div> */}
        </form>
    );
}