"use client"

import { deleteCookies } from "@/lib/cookies"
import { useRouter } from "next/navigation"

export default function SignOutForm() {
  const router = useRouter()

  return (
    <button
      onClick={() => {
        deleteCookies('gas-tracker-sign-in')
        router.push('/sign-in')
      }}
    >
      Sign out
    </button>
  )
}