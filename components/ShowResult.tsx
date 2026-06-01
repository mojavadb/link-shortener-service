import React from "react";
import QRCode from "react-qr-code";

function ShowResult(text: { text: string }) {
    const [copied, setCopied] = React.useState<boolean>(false);
    const [showToast, setShowToast] = React.useState<string>("");

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text.text);
            setCopied(true);
            setShowToast("لینک کپی شد");
            setTimeout(() => setCopied(false), 2000);
            setTimeout(() => setShowToast(""), 2000);
        } catch (err) {
            console.error("خطا در کپی کردن:", err);
            setShowToast("خطا در کپی لینک");
            setTimeout(() => setShowToast(""), 2000);
        }
    };

    const shareLink = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'لینک اشتراک‌گذاری',
                    text: 'این لینک رو ببینید:',
                    url: text.text,
                });
                setShowToast("اشتراک‌گذاری با موفقیت انجام شد");
                setTimeout(() => setShowToast(""), 2000);
            } catch (err) {
                console.error("Error sharing:", err);
                if ((err as Error).name !== 'AbortError') {
                    setShowToast("خطا در اشتراک‌گذاری");
                    setTimeout(() => setShowToast(""), 2000);
                }
            }
        } else {
            await handleCopy();
        }
    };

    return (
        <>
            <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={text.text}
                        readOnly
                        className="px-4 flex-1 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 text-sm focus:outline-none focus:border-indigo-500"
                        dir="ltr"
                    />
                    <button
                        onClick={handleCopy}
                        className={`px-2 rounded-lg transition-all duration-200 flex items-center gap-2
                        ${copied
                                ? "bg-green-500 hover:bg-green-600"
                                : "bg-indigo-700 hover:bg-indigo-800"
                            } text-white cursor-pointer text-sm`}
                    >
                        {copied ? "کپی شد" : "کپی"}
                    </button>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={shareLink}
                        className="flex-1 px-3 py-1 rounded-lg bg-green-600 hover:bg-green-700 text-white transition-all duration-200"
                    >
                        اشتراک گذاری
                    </button>
                    
                    <button
                        onClick={() => window.location.reload()}
                        className="flex-1 px-3 py-1 rounded-lg bg-pink-800 hover:bg-pink-700 text-white transition-all duration-200"
                    >
                         لینک جدید
                    </button>
                </div>

                <div className="w-full flex items-center justify-center">
                    <div className="p-4 bg-white inline-block rounded-lg shadow-md">
                        <QRCode
                            value={text.text}
                            size={128}
                            bgColor="#FFFFFF"
                            fgColor="#000000"
                        />
                    </div>
                </div>
            </div>

            {showToast && (
                <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm">
                    {showToast}
                </div>
            )}
        </>
    );
};

export default ShowResult;