
import prisma from '../lib/prisma';
import HomeLayout from './components/HomeLayout';

export default function Home() {

  // async function createUser (userEmail) {
  //   "use server"
  //   await prisma.user.create({
  //     data:{
  //       email: userEmail
  //     }
  //   })
  // }

  return (
    <HomeLayout/>
  )
}
