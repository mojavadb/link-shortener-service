/*
اگر بخواهیم از مسیریابی پویا در فرانت اند استفاده کنیم:
const slug = useParams().slug;
*/
import { linksTable } from '@/lib/db/links';
import { redirect } from 'next/navigation'

interface LinkItem {
  id: string;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt: number;
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const data : LinkItem[] = linksTable.all();
    const finalLink = data.find(link => link.finalCode === slug);
    console.log(finalLink);

    if (finalLink){
        if (finalLink.expiresAt === -1){
            redirect(finalLink.mainUrl);
        } else{
            if (finalLink.expiresAt - Date.now() > 0 ){
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