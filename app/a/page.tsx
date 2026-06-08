import Test from "@/components/Test";
const DOMAIN = "http://localhost:3000";
interface LinkItem {
  id: string;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt?: number;
}
export default async function A(){
    const response = await fetch(`${DOMAIN}/api/short-links`);
    const data : LinkItem[] = await response.json();
    console.log(data);
    return(
        <div>
            <Test data={data} />
        </div>
    );
}