import { prisma } from "@/db"
import { hash } from "bcrypt"

export async function createUser(username: string, password: string) {
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