"use client"

import { signIn, signOut } from 'next-auth/react'

type StyleProps = {
  style?: string
}

export function LoginButton() {
  return (
    <button onClick={() => signIn()}>
      Sign in
    </button>
  )
}

export function LogoutButton({ style } : StyleProps) {
  return (
    <button onClick={() => signOut()} className={style}>
      Sign out
    </button>
  )
}