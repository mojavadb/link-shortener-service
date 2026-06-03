/*
اگر بخواهیم از مسیریابی پویا در فرانت اند استفاده کنیم:
const slug = useParams().slug;
*/
const DOMAIN = "http://localhost:3000";
import { redirect } from 'next/navigation'

interface LinkItem {
  id: number;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt?: number;
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
        redirect(finalLink.mainUrl);
    } else {
        return <div>لینک نامعتبر</div>
    }
}