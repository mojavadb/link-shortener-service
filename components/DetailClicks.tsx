import { Click, LinkItem } from "@/app/generated/prisma/client";
import { X } from "lucide-react";
import React from "react";

type LinkItemWithClicks = LinkItem & { clicks: Click[] };

export default function DetailClicks({item} : {item : LinkItemWithClicks}) {
    const [isDetailOpen, setIsDetailOpen] = React.useState<number>(-1);
    
    return (
        <>
            <button type="button" className="underline decoration-1 decoration-rose-600 cursor-pointer italic"
                onClick={() => setIsDetailOpen(isDetailOpen => (isDetailOpen === item.id ? -1 : item.id))}>
                جزئیات
            </button>
            {isDetailOpen === item.id ?
                <div className={`bg-gray-100 text-stone-900 absolute right-0 top-0 w-full min-h-full duration-200 opacity-100`}>
                    <button onClick={() => setIsDetailOpen(-1)}
                        className="absolute left-5 top-5 cursor-pointer">
                        <X size={16} />
                    </button>
                    <div className="flex flex-col p-6 gap-2 items-center">
                        <p className="font-bold">{`تعداد کل کلیک ها: ${item.clicks.length}`}</p>
                        <p>{`کلیک ها طی یک ساعت اخیر: 
                                                        ${item.clicks.filter(cl => new Date(cl.createdAt) >= new Date(Date.now() - 1000 * 60 * 60)).length}`}
                        </p>
                        <p>{`کلیک ها طی یک روز اخیر: 
                                                        ${item.clicks.filter(cl => new Date(cl.createdAt) >= new Date(Date.now() - 1000 * 60 * 60 * 24)).length}`}
                        </p>
                        <p>{`کلیک ها طی یک هفته اخیر: 
                                                    ${item.clicks.filter(cl => new Date(cl.createdAt) >= new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)).length}`}</p>
                    </div>
                </div>
                : ""}
        </>
    );
}