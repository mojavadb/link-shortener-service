import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await auth();
    if (session?.user) {
        redirect("/")
    }
    return (
        <div className="absolute top-0 right-0 flex justify-center items-center 
        w-full min-h-screen z-50 bg-white">
            <div>
                <h3 className="text-center mb-8 text-3xl font-bold">
                    ورود به حساب کاربری
                </h3>
                <button onClick={async () => {
                    "use server"
                    await signIn()
                }}
                    className="bg-orange-100 hover:bg-orange-200 cursor-pointer
                    py-2 px-16 rounded-2xl flex row gap-2 items-center justify-center">
                    <span className="text-gray-600 text-sm">حساب گوگل</span>
                    <svg width="24" height="24" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
                        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.3 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
                        <path fill="#4CAF50" d="M24 44c5.2 0 10-2 13.6-5.3l-6.3-5.2C29.3 35.1 26.8 36 24 36c-5.3 0-9.7-3.3-11.3-8l-6.6 5.1C9.4 39.6 16.1 44 24 44z" />
                        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.5-6.3 7.1l6.3 5.2C39.8 36.2 44 30.7 44 24c0-1.3-.1-2.4-.4-3.5z" />
                    </svg>
                </button>
            </div>
        </div>
    );
}