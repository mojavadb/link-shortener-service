import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { LinkItem } from "../generated/prisma/client";
import { prisma } from "@/prisma";
import CreatedListLinks from "@/components/CreatedListLinks";

export default async function CreatedLinks() {
    const session = await auth();
    if (!session?.user) redirect("/auth");
    const links: LinkItem[] = await prisma.linkItem.findMany({
        where: {
            creatorId: session?.user?.id
        }
    });
    console.log(links);
    return (
        <CreatedListLinks data={links} />
    );
}