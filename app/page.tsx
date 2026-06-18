import Main from "@/components/Main";
import prisma from "@/lib/prisma";
import { Account, LinkItem, User, Session } from "./generated/prisma/client";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

async function Home() {
  // چون اینجا سرور کامپوننته میتونیم داده رو مستقیما از پایگاه داده بیاریم
  // نیازی به بک اند نیست
  const links: LinkItem[] = await prisma.linkItem.findMany();
  const users: User[] = await prisma.user.findMany();
  const accounts: Account[] = await prisma.account.findMany();
  const sessions: Session[] = await prisma.session.findMany();
  console.log(links.length, users.length, accounts.length, sessions.length);
  console.log(sessions);
  const session = await auth();
  // if (!session?.user) redirect("/auth");
  return (
    // <div>
    //   <p>{session?.user?.email}</p>
    //   <button onClick={async () => {
    //     "use server"
    //     await signOut()
    //   }}>
    //     sign out
    //   </button>
    // </div>
    <Main data={links} />
  );
}

export default Home;