"use client";

import React from "react";
import { validateUrl } from "@/utils/urlValidator";
import AdvancedSpinner from "@/components/AdvancedSpinner";
import ShowResult from "@/components/ShowResult";
import Link from "next/link";

const DOMAIN = "http://localhost:3000";

interface LinkItem {
  id: number;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt?: number;
}

function Home() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fakeCode, setFakeCode] = React.useState<string>("");
  const [existingLinks, setExistingLinks] = React.useState<LinkItem[]>([]);
  const [searchLink, setSearchLink] = React.useState<string>("");
  const [filterLinks, setFilterLinks] = React.useState<LinkItem[]>([]);
  const [timeQuantityDay, setTimeQuantityDay] = React.useState<number>(0);
  const [timeQuantityHour, setTimeQuantityHour] = React.useState<number>(0);
  const [timeQuantityMinute, setTimeQuantityMinute] = React.useState<number>(0);

  React.useEffect(() => {
    const savedLinks = JSON.parse(localStorage.getItem("links") || "[]");
    setExistingLinks(savedLinks);
    return;
  }, []);

  React.useEffect(() => {
    if (searchLink.trim() === "") {
      setFilterLinks(existingLinks);
    } else {
      const filtered = existingLinks.filter(link =>
        link.mainUrl.toLowerCase().includes(searchLink.toLowerCase()) ||
        link.finalCode.toLowerCase().includes(searchLink.toLowerCase())
      );
      setFilterLinks(filtered);
    }

  }, [searchLink, existingLinks]);

  React.useEffect(() => {
    const checkExpired = () => {
      const now = Date.now();
      const validLinks = existingLinks.filter(link =>
        !link.expiresAt || link.expiresAt > now
      );
      if (validLinks.length !== existingLinks.length) {
        setExistingLinks(validLinks);
        localStorage.setItem("links", JSON.stringify(validLinks));
      }
    };
    checkExpired();
    const interval = setInterval(checkExpired, 30000);
    return () => clearInterval(interval);
  }, [existingLinks]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    let newGeneratedCode: string;

    const url = inputValue.trim();
    const validation = validateUrl(inputValue);

    if (url) {
      if (!validation.isValid) {
        setError(validation.error || "این لینک نامعتبر است");
        setIsLoading(false);
        return;
      }

      const duplicateLink = existingLinks.find(link => link.mainUrl === url);
      if (duplicateLink) {
        setTimeout(() => {
          setFakeCode(duplicateLink.finalCode);
          setIsLoading(false);
          setInputValue("");
        }, 2000);
      } else {
        while (true) {
          newGeneratedCode = Math.random().toString(36).substring(2, 8);
          if (!existingLinks.some(link => link.finalCode === newGeneratedCode)) break;
        }

        const delay = ((timeQuantityHour * 60 * 60 + timeQuantityMinute * 60 + timeQuantityDay) * 1000)

        const expirationTime = delay === 0 ? undefined : Date.now() + delay;

        const newLink = {
          id: Date.now(),
          mainUrl: inputValue,
          finalCode: newGeneratedCode,
          createdAt: Date.now(),
          expiresAt: expirationTime
        };
        const updatedLinks = [...existingLinks, newLink];
        setExistingLinks(updatedLinks);

        setTimeout(() => {
          setFakeCode(newGeneratedCode);
          localStorage.setItem("links", JSON.stringify(updatedLinks));
          setIsLoading(false);
          setInputValue("");
        }, 2000);
      }
    } else {
      setError("لینک ارسالی نباید خالی باشد.");
      setIsLoading(false);
    }
  };

  function handleDeleteItem(itemId: number) {
    const deletedLinks = existingLinks.filter(link => link.id !== itemId);
    setExistingLinks(deletedLinks);
    localStorage.setItem("links", JSON.stringify(deletedLinks));
  }

  return (
    <div className="md:flex md:items-start md:justify-center md:gap-18 min-h-screen bg-gray-100 p-2">
      <div className="px-6 py-4 mb-6 md:px-18 md:py-12 bg-white flex items-center justify-center rounded-4 border-gray-200">
        {isLoading ? <AdvancedSpinner size={28} text="لطفا چند لحظه صبر کنید" fullScreen={true} /> :
          <div>
            {fakeCode ?
              <ShowResult text={`${DOMAIN}/${fakeCode}`} />
              :
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <h2 className="text-center mb-3 text-red-600 font-bold text-3xl">سرویس کوتاه کننده لینک</h2>
                <div>
                  <label className="text-yellow-800 text-sm" htmlFor="primaryLink">نام آدرس:</label>
                  <input
                    type="text"
                    id="primaryLink"
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputValue(e.target.value)
                    }
                    dir="ltr"
                    className="p-2 my-2 w-full text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
                    placeholder="ex: https://github.com/mojavadb/link-shortener-service"
                  />
                  <span className="block h-4 w-full text-sm font-semibold text-red-600">{error}</span>
                </div>
                <div>
                  <label className="block mb-4 text-yellow-800 text-sm" htmlFor="primaryLink">انقضا لینک: (خالی یعنی از بین نمیرود)</label>
                  <div dir="ltr" className="flex flex-row align-center justify-center">
                    <input
                      type="number"
                      min={0}
                      max={364}
                      id="timeRemained"
                      value={timeQuantityDay}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const value = +e.target.value;
                        setTimeQuantityDay(isNaN(value) ? 0 : (value > 364 ? 364 : (value < 0 ? 0 : value)))
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
                      value={timeQuantityHour}
                      onChange={(e) => {
                        const value = +e.target.value;
                        setTimeQuantityHour(isNaN(value) ? 0 : (value > 23 ? 23 : (value < 0 ? 0 : value)));
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
                      value={timeQuantityMinute}
                      onChange={(e) => {
                        const value = +e.target.value;
                        setTimeQuantityMinute(isNaN(value) ? 0 : (value > 59 ? 59 : (value < 0 ? 0 : value)));
                      }}
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
                    className="px-6 md:px-9 py-2 rounded-2xl text-white bg-pink-800 cursor-pointer hover:bg-pink-700 transition-all duration-300"
                  >
                    ساخت لینک کوتاه
                  </button>
                </div>
              </form>}
          </div>
        }

      </div>
      {!fakeCode && !isLoading &&
        <div className="px-3 py-2 md:px-9 md:py-6 bg-white flex flex-col gap-3 rounded-4 border-gray-200">
          <h2 className="text-center mb-3 text-red-600 font-bold text-3xl">لیست لینک های کوتاه شده</h2>
          <form>
            <label htmlFor="search" className="block w-full text-sm font-semibold text-yellow-800 mb-2">
              بر اساس نام سایت اولیه یا کد نهایی:
            </label>
            <input
              type="text"
              id="search"
              value={searchLink}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchLink(e.target.value)
              }
              dir="ltr"
              className="p-2 mb-2 w-full text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
              placeholder="search"
            />

          </form>
          <ul className="w-full">
            {filterLinks.map(item =>
              <li key={item.id} className="border border-gray-200 mb-5 px-3 py-2 flex align-center justify-between gap-6">
                <div className="flex flex-col gap-2 text-sm" dir="ltr">
                  <Link href={`${DOMAIN}/${item.finalCode}`} className="text-sm text-red-800">{DOMAIN.substring(7)}/{item.finalCode}</Link>
                  <Link href={item.mainUrl} className="text-xs text-gray-600">{item.mainUrl.slice(8, 40)}...</Link>
                </div>
                <button type="button"
                  className="px-2 md:px-3 rounded-xl text-white bg-pink-800 cursor-pointer hover:bg-pink-700 transition-all duration-300"
                  onClick={() => handleDeleteItem(item.id)}
                >حذف</button>
              </li>
            )}
          </ul>
        </div>
      }
    </div>
  );
}

export default Home;