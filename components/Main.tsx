'use client';

import React from "react";
import { LinkItem } from "@/app/generated/prisma/client";
import AdvancedSpinner from "@/components/AdvancedSpinner";
import ShowResult from "@/components/ShowResult";
import CreatedListLinks from "@/components/CreatedListLinks";
import LinkMaker from "./LinkMaker";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
console.log(domain);

export default function Main({ data }: { data: LinkItem[] }) {
    const [load, setLoad] = React.useState<boolean>(false);
    const [generatedCode, setGeneratedCode] = React.useState<string>("");
    return (
        <div className="md:flex md:items-start md:justify-center md:gap-18 min-h-screen bg-gray-100 p-2">
            {
                load ? <AdvancedSpinner text="صبر کنید" /> :
                    <div>
                        {generatedCode ?
                            <ShowResult text={`${domain}/s/${generatedCode}`} />
                            :
                            <>
                                <LinkMaker data={data} setLoad={setLoad} setGeneratedCode={setGeneratedCode} />
                                <CreatedListLinks data={data} />
                            </>
                        }
                    </div>
            }
        </div>
    );
}