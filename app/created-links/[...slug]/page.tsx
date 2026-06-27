import { LinkItem } from "@/app/generated/prisma/client";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import LinkEditor from "@/components/LinkEditor"
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const session = await auth();
    if (!session?.user) redirect("/auth");

    const link : LinkItem | null = await prisma.linkItem.findUnique({
        where: {
            finalCode: slug[0],
            creatorId: session?.user?.id
        }
    });
    return (
        <div className="flex items-start justify-center p-6">
            <LinkEditor link={link} />
        </div>
    );
}