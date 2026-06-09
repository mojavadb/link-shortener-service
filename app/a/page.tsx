import Test from "@/components/Test";
import { linksTable } from "@/lib/db/links";
interface LinkItem {
  id: string;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt: number;
}
export default function A(){
    const data : LinkItem[] = linksTable.all();
    console.log(data);
    return(
        <div>
            <Test data={data} />
        </div>
    );
}