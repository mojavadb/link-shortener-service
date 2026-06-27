"use server";

import { auth, signOut } from "@/auth";
import { prisma } from "@/prisma";

export async function deleteAccount() {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.user.delete({
    where: {
      id: session.user.id,
    },
  });

  await signOut({
    redirectTo: "/auth",
  });
}