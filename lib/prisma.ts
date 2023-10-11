import { PrismaClient } from '@prisma/client'

let prisma = new PrismaClient();;

// if (process.env.NODE_ENV === 'production') {
//     prisma = new PrismaClient();
// } else {
//     if (!tags.prisma) {
//         tags.prisma = new PrismaClient();
//     }
//     prisma = tags.prisma;
// }

export default prisma;