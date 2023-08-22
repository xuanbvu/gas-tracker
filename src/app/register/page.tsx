import { prisma } from "@/db";
import RegisterForm from "./form";
import { hash } from "bcrypt";

async function createUser(username: string, password: string) {
  "use server"
  
  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (user) return 'Username already exists. Please try another one.'
  else {
    const hashed = await hash(password, 12)
    await prisma.user.create({
      data: {
        username,
        password: hashed
      }
    })
  }
}

export default function Register() {
  return (
    <div className="flex flex-col justify-center h-screen w-1/3 m-auto">
      <h1 className="font-bold text-2xl mb-5">Register</h1>
      <RegisterForm createUser={createUser} />
    </div>
  )
}