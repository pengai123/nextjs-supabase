// import { PrismaClient } from '@prisma/client'
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  // const order = await prisma.order.create({
  //   data:
  //   {
  //     PaidInCents: 39900,
  //     userId: "e1d25529-db5c-44ff-aadd-3656b06f3f3e"
  //   }
  // })
  // console.log(order)
  const users = await prisma.profile.findMany()

  console.log(users)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })