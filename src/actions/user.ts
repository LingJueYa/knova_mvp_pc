"use server";

import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export async function getCurrentUserEmail() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error('未认证的用户');
  }
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) {
    throw new Error('未找到用户邮箱');
  }
  return email;
}