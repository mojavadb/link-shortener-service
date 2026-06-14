import { LinkItem } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const link : LinkItem | null = await prisma.linkItem.findUnique({
        where: { finalCode: slug },
    });
    if (!link) {
        return <div>لینک وجود ندارد.</div>
    }
    await prisma.linkItem.update({
        where: {finalCode: slug},
        data: {
            clicks: {increment: 1}
        }
    });
    redirect(link.mainUrl)
}