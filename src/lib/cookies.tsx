"use server"

import { prisma } from "@/db";
import { cookies } from "next/headers";

export async function getUser(username: string) {
  return prisma.user.findUnique({  where: { username } })
}

export async function getCookies(key: string) {
  return cookies().get(key)
}

export async function setCookies(key: string, value: string) {
  cookies().set(key, value)
}

export async function deleteCookies(key: string) {
  cookies().set({
    name: key,
    value: '',
    expires: Date.now(),
    path: '/', // For all paths
  })
}