import Test from "@/components/Test";
import { LinkItem } from "../generated/prisma/client";
import prisma from "@/lib/prisma";
export default async function A(){
    const data : LinkItem[] = await prisma.linkItem.findMany();
    console.log(data);
    return(
        <div>
            <Test data={data} />
        </div>
    );
}