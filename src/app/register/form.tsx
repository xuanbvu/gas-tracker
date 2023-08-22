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

  const inputStyle = 'bg-white border-2 border-gray-300 text-black px-4 py-2 rounded outline-none'
  
  async function register() {
    try {
      const res = await createUser(username, password)

      if (res) setError(res)
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
      className='flex flex-col gap-4'
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
        className='bg-orange-700 py-4 text-white font-semibold rounded hover:bg-orange-800'
      >
        REGISTER
      </button>
      <p>
        Already have an account? {' '}
        <Link
          href={'/login'}
          className='text-gray-500 hover:text-orange-700 font-medium'
        >
          Sign in.
        </Link>
      </p>
    </form>
  )
}