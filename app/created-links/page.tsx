import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import CreatedListLinks from "@/components/CreatedListLinks";

export default async function CreatedLinks() {
    const session = await auth();
    if (!session?.user) redirect("/auth");
    const links = await prisma.linkItem.findMany({
        where: {
            creatorId: session?.user?.id
        },
        include: {
            clicks: true
        }
    });
    console.log(links);
    return (
        <div className="md:flex md:items-start md:justify-center p-6">
            <CreatedListLinks initialData={links} />
        </div>
    );
}