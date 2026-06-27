"use client";

import { Click, LinkItem } from "@/app/generated/prisma/client";
import { X } from "lucide-react";
import React from "react";

type LinkItemWithClicks = LinkItem & { clicks: Click[] };

export default function DetailClicks({ item }: { item: LinkItemWithClicks }) {
  const [isDetailOpen, setIsDetailOpen] = React.useState<number>(-1);

  const now = React.useMemo(() => Date.now(), []);

  const oneHour = 1000 * 60 * 60;
  const oneDay = oneHour * 24;
  const oneWeek = oneDay * 7;

  const clicksLastHour = item.clicks.filter(
    (cl) => new Date(cl.createdAt).getTime() >= now - oneHour
  ).length;

  const clicksLastDay = item.clicks.filter(
    (cl) => new Date(cl.createdAt).getTime() >= now - oneDay
  ).length;

  const clicksLastWeek = item.clicks.filter(
    (cl) => new Date(cl.createdAt).getTime() >= now - oneWeek
  ).length;

  return (
    <>
      <button
        type="button"
        className="underline decoration-1 decoration-rose-600 cursor-pointer italic"
        onClick={() =>
          setIsDetailOpen((prev) => (prev === item.id ? -1 : item.id))
        }
      >
        جزئیات
      </button>

      {isDetailOpen === item.id && (
        <div className="bg-gray-100 text-stone-900 absolute right-0 top-0 w-full min-h-full duration-200 opacity-100">
          <button
            onClick={() => setIsDetailOpen(-1)}
            className="absolute left-5 top-5 cursor-pointer"
          >
            <X size={16} />
          </button>

          <div className="flex flex-col p-6 gap-2 items-center">
            <p className="font-bold">
              تعداد کل کلیک ها: {item.clicks.length}
            </p>

            <p>کلیک ها طی یک ساعت اخیر: {clicksLastHour}</p>
            <p>کلیک ها طی یک روز اخیر: {clicksLastDay}</p>
            <p>کلیک ها طی یک هفته اخیر: {clicksLastWeek}</p>
          </div>
        </div>
      )}
    </>
  );
}