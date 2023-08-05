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

  if(user) return 'Username already exists. Please try another one.'
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
    <div className="flex h-screen">
      <RegisterForm createUser={createUser} />
    </div>
  )
}