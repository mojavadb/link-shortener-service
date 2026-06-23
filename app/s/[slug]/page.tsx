import { LinkItem } from "@/app/generated/prisma/client";
import prisma from "@/lib/prisma";
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const link: LinkItem | null = await prisma.linkItem.findUnique({
        where: { finalCode: slug },
    });
    if (!link) {
        return <div className="flex items-center justify-center py-12">لینک وجود ندارد</div>
    }
    if (link.expiresAt && link.expiresAt <= new Date()) {
        await prisma.linkItem.delete({
            where: {
                finalCode: slug,
            },
        });
        return <div className="flex items-center justify-center py-12">این لینک منقضی شده است</div>
    }
    await prisma.linkItem.update({
        where: { finalCode: slug },
        data: {
            clicks: { increment: 1 }
        }
    });
    redirect(link.mainUrl)
}