import { prisma } from '../src/db'
import { hash } from 'bcrypt'

async function main() {
  const password = await hash('test', 12)
  const user = await prisma.user.upsert({
    where: { username: 'vux' },
    update: {},
    create: {
      username: 'vux',
      password
    }
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })