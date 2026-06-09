import Main from "@/components/Main";
import { linksTable } from "@/lib/db/links";

interface LinkItem {
  id: string;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt: number;
}

function Home() {
  // چون اینجا سرور کامپوننته میتونیم داده رو مستقیما از پایگاه داده بیاریم
  // نیازی به بک اند نیست
  const data : LinkItem[] = linksTable.all();
  return(
    <Main data={data} />
  );
}

export default Home;