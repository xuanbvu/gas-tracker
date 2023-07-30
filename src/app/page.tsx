import { prisma } from "@/db";
import { cookies } from "next/headers";
import { redirect } from 'next/navigation'
import SignIn from "@/components/SignIn";
import User from "@/components/User";

async function getUser(username: string) {
  "use server"
  return prisma.user.findUnique({  where: { username } })
}

async function setCookies(username: string) {
  "use server"
  cookies().set('gas-tracker-sign-in', username)
}

export default function Home() {
  const signedIn = cookies().get('gas-tracker-sign-in')

  if (signedIn) {
    return (
      <User username={signedIn.value} />
    )
  }

  return (
    <>
      <SignIn getUser={getUser} setCookies={setCookies} />
    </>
  )
}
