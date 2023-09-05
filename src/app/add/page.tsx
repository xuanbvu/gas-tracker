
import { getServerSession } from "next-auth"
import { AddForm } from "./form"
import { postStats } from "@/functions/prisma/stats"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Add() {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id || ''

  async function submitStats(data: FormData) {
    "use server"
    await postStats(userId, data)
  }

  return (
    <>
      <h1 className="font-bold text-2xl">Add Entry</h1>
      <AddForm submitStats={submitStats} />
    </>
  )
}