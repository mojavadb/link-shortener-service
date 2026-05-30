import React from "react";

function ShowResult(text: { text: string }) {
    const [copied, setCopied] = React.useState<boolean>(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text.text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("خطا در کپی کردن:", err);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={text.text}
                    readOnly
                    className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:border-indigo-500"
                    dir="ltr"
                />
                <button
                    onClick={handleCopy}
                    className={`px-3 rounded-lg transition-all duration-200 flex items-center gap-2
            ${copied
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-indigo-700 hover:bg-indigo-800"
                        } text-white`}
                >
                    {copied ? (<span>کپی شد</span>) : (<span>کپی</span>)}
                </button>
            </div>
            <button
                onClick={() => window.location.reload()}
                className="px-6 md:px-9 mx-18 my-3 py-2 rounded-2xl text-white bg-pink-800 cursor-pointer hover:bg-pink-700 transition-all duration-300"
            >
                ساخت لینک جدید
            </button>
        </div>
    );
};

export default ShowResult;