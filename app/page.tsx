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
}

function Home() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [fakeCode, setFakeCode] = React.useState<string>("");
  const [existingLinks, setExistingLinks] = React.useState<LinkItem[]>([]);
  const [searchLink, setSearchLink] = React.useState<string>("");
  const [filterLinks, setFilterLinks] = React.useState<LinkItem[]>([]);

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
        const newLink = {
          id: Date.now(),
          mainUrl: inputValue,
          finalCode: newGeneratedCode
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
                <label className="text-center mb-3 text-red-600 font-bold text-3xl" htmlFor="primaryLink">سرویس کوتاه کننده لینک</label>
                <div>
                  <input
                    type="text"
                    id="primaryLink"
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setInputValue(e.target.value)
                    }
                    dir="ltr"
                    className="p-2 mb-2 w-full text-gray-700 bg-gray-50 border-2 border-gray-200 rounded-xl 
            focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all 
            duration-200 peer"
                    placeholder="ex: https://github.com/mojavadb/link-shortener-service"
                  />
                  <span className="block h-4 w-full text-sm font-semibold text-red-600">{error}</span>
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