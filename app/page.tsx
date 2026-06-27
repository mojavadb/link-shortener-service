import Main from "@/components/Main";
import prisma from "@/lib/prisma";
import type { User, Account, Session, LinkItem } from "@prisma/client"

async function Home() {
  // چون اینجا سرور کامپوننته میتونیم داده رو مستقیما از پایگاه داده بیاریم
  // نیازی به بک اند نیست
  const links: LinkItem[] = await prisma.linkItem.findMany();
  const users: User[] = await prisma.user.findMany();
  const accounts: Account[] = await prisma.account.findMany();
  const sessions: Session[] = await prisma.session.findMany();
  console.log(
    links.length,
    users.length,
    accounts.length,
    sessions.length
  );
  return (
      <Main />
  );
}

export default Home;