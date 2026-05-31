"use client";

import React from "react";
import { validateUrl } from "@/utils/urlValidator";
import AdvancedSpinner from "@/components/AdvancedSpinner";
import ShowResult from "@/components/ShowResult";

const DOMAIN = "http://localhost:3000";

function Home() {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [fakeCode, setFakeCode] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);


    const url = inputValue.trim();
    const validation = validateUrl(inputValue);

    if (url) {
      if (!validation.isValid) {
        setError(validation.error || "این لینک نامعتبر است");
        setIsLoading(false);
        return;
      }

      setTimeout(() => {
        setFakeCode("124dki");
        setIsLoading(false);
        setInputValue("");
      }, 2000);

    } else {
      setError("لینک ارسالی نباید خالی باشد.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-6 py-4 md:px-18 md:py-12 bg-white flex items-center justify-center rounded-4 border-gray-200">
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
    </div>
  );
}

export default Home;