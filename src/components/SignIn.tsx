"use client"
import { GetResult } from "@prisma/client/runtime/library"
import { useState } from "react"

type SignInProps = {
  getUser: (username: string) => Promise<any>
  setCookies: (username: string) => void
}

export default function SignIn({ getUser, setCookies }: SignInProps) {
  const [username, setUsername] = useState('')
  const [valid, setValid] = useState(true)

  async function signIn() {
    await getUser(username)
      .then((user) => {
        if (user) setCookies(username)
        else setValid(false)
      })
  }

  return (
    <>
      <input
        type="text"
        className="text-black"
        onChange={e => {setUsername(e.target.value)}}
      />
      <button
        onClick={signIn}
      >Sign in</button>
      {valid ? null : <p>Username not found</p>}
    </>
  )
}