'use client';

import React from "react";
import { LinkItem } from "@/app/generated/prisma/client";
import AdvancedSpinner from "@/components/AdvancedSpinner";
import ShowResult from "@/components/ShowResult";
import LinkMaker from "./LinkMaker";

const domain = process.env.NEXT_PUBLIC_DOMAIN || "http://localhost:3000";
console.log(domain);

export default function Main({ data }: { data: LinkItem[] }) {
    const [load, setLoad] = React.useState<boolean>(false);
    const [generatedCode, setGeneratedCode] = React.useState<string>("");
    const [errors, setErrors] = React.useState<string[]>([]);
    
    if (load === true) return <AdvancedSpinner text="در حال پردازش" fullScreen={true} />;
    return (
        <main className="flex items-start justify-center p-6">
            <div>
                {generatedCode ?
                    <ShowResult text={`${domain}/s/${generatedCode}`} />
                    :        
                    <LinkMaker errors={errors} setErrors={setErrors}
                    data={data} setLoad={setLoad} setGeneratedCode={setGeneratedCode} />
                }
            </div>
        </main>
    );
}