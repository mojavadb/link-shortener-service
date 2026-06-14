/*
اگر بخواهیم از مسیریابی پویا در فرانت اند استفاده کنیم:
const slug = useParams().slug;
*/
import { redirect } from 'next/navigation'
import { LinkItem } from '../generated/prisma/client';
import prisma from '@/lib/prisma';

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const finalLink : LinkItem | null = await prisma.linkItem.findUnique({
        where: {
            finalCode: slug
        }
    });
    console.log(finalLink);

    if (finalLink){
        if (finalLink.expiresAt === null || finalLink.expiresAt === undefined){
            redirect(finalLink.mainUrl);
        } else{
            if (finalLink.expiresAt > new Date()){
                redirect(finalLink.mainUrl);
            }
            else{
                return <div>لینک منقضی شده است</div>
            }
        }
    } else {
        return <div>لینک وجود ندارد</div>
    }
}