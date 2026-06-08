/*
اگر بخواهیم از مسیریابی پویا در فرانت اند استفاده کنیم:
const slug = useParams().slug;
*/
const DOMAIN = "http://localhost:3000";
import { redirect } from 'next/navigation'

interface LinkItem {
  id: string;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt: number;
}

async function fetchLinks() {
    const response = await fetch(
        `${DOMAIN}/api/short-links`, {
        method: "Get",
        headers: {
            'Content-Type': 'application/json'
        }
    }
    );
    if (!response.ok) {
        throw new Error("ارتباط با موفقیت صورت نگرفت");
    }
    const data = await response.json();
    return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const data : LinkItem[] = await fetchLinks();
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