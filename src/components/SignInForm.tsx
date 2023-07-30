"use client"

import { useState } from "react"
import { getUser, setCookies } from "@/lib/cookies"
import { redirect } from "next/navigation"
import { useRouter } from "next/navigation"

export default function SignInForm() {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [valid, setValid] = useState(true)

  async function signIn() {
    await getUser(username)
      .then((user) => {
        if (user) {
          setCookies('gas-tracker-sign-in', username)
          router.push('/')
        }
        else setValid(false)
      })
  }

  return (
    <>
      <input
        type="text"
        className="outline"
        onChange={e => {setUsername(e.target.value)}}
      />
      <button
        onClick={() => {
          signIn()
          if (valid) console.log('hello')
        }}
      >
        Sign in
      </button>
      {valid ? null : <p>Username not found</p>}
    </>
  )
}