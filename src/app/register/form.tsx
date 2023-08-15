"use client"

import { useRouter } from 'next/navigation'
import { useState } from "react"
import Link from "next/link"

type RegisterFormProps = {
  createUser: (username: string, password: string) => any
}

export default function RegisterForm({ createUser }: RegisterFormProps) {
  const router = useRouter()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const inputStyle = 'bg-gray-200 text-gray-500 px-4 py-2 rounded focus:outline-none'
  
  async function register() {
    try {
      const res = await createUser(username, password)

      if(res) setError(res)
      else router.push('/login')
    }
    catch(err: any) {
      setError(err)
    }
  }

  return (
    <form
      onSubmit={register}
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
        REGISTER
      </button>
      <p>
        Already have an account? {' '}
        <Link
          href={'/login'}
          className='text-gray-400 hover:text-gray-600'
        >
          Sign in.
        </Link>
      </p>
    </form>
  )
}