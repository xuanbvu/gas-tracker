"use client"

import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const inputStyle = 'bg-gray-200 text-gray-500 px-4 py-2 rounded focus:outline-none'

  async function login() {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        username,
        password,
        callbackUrl
      })

      if(!res?.error) router.push(callbackUrl)
      else {
        setError('Incorrect username or password.')
        setUsername('')
        setPassword('')
      }
    }
    catch(err: any) {
      setError(err)
    }
  }

  return (
    <form
      onSubmit={login}
      method='post'
      className='grid gap-4 w-1/2 m-auto'
    >
      { error && <p className='text-red-500'>{error}</p>}
      <input
        required
        type='text'
        name='username'
        value={username}
        placeholder='Username'
        onChange={(e) => setUsername(e.target.value)}
        className={inputStyle}
      />
      <input
        required
        type='password'
        name='password'
        value={password}
        placeholder='********'
        onChange={(e) => setPassword(e.target.value)}
        className={inputStyle}
      />
      <button
        type='submit'
        className='bg-gray-900 py-4 text-white rounded hover:bg-gray-600'
      >
        LOGIN
      </button>
      <p>
        Don't have an account? {' '}
        <Link
          href={'/register'}
          className='text-gray-400 hover:text-gray-600'
        >
          Create one.
        </Link>
      </p>
    </form>
  )
}