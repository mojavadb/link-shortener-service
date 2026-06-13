import Main from "@/components/Main";
import prisma from "@/lib/prisma";
import { LinkItem } from "./generated/prisma/client";

async function Home() {
  // چون اینجا سرور کامپوننته میتونیم داده رو مستقیما از پایگاه داده بیاریم
  // نیازی به بک اند نیست
  const links : LinkItem[] = await prisma.linkItem.findMany();
  console.log(links.length);
  return(
    <Main data={links} />
  );
}

export default Home;