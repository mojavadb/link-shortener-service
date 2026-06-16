import Main from "@/components/Main";
import prisma from "@/lib/prisma";
import { LinkItem, User } from "./generated/prisma/client";

async function Home() {
  // چون اینجا سرور کامپوننته میتونیم داده رو مستقیما از پایگاه داده بیاریم
  // نیازی به بک اند نیست
  const links : LinkItem[] = await prisma.linkItem.findMany();
  const users : User[] = await prisma.user.findMany();
  console.log(users);
  return(
    <Main data={links} />
  );
}

export default Home;