import Main from "@/components/Main";
import { linksTable } from "@/lib/db/links";
import prisma from "@/lib/prisma";

interface LinkItem {
  id: string;
  mainUrl: string;
  finalCode: string;
  createdAt: number;
  expiresAt: number;
}

async function Home() {
  // چون اینجا سرور کامپوننته میتونیم داده رو مستقیما از پایگاه داده بیاریم
  // نیازی به بک اند نیست
  const data : LinkItem[] = linksTable.all();
  const links = await prisma.link.findMany();
  console.log(links.length);
  return(
    <Main data={data} />
  );
}

export default Home;