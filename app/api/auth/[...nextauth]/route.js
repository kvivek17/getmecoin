import NextAuth from 'next-auth'

import GithubProvider from "next-auth/providers/github"

import User from '@/app/models/User'
import Payment from '@/app/models/payment'
import { connectDB } from '@/app/mongodb'
import { use } from 'react'


export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
   
  ],
   callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider =="github"){
        await connectDB()
const currentuser =await User.findOne({email:profile.email })
if(!currentuser){
  const NewUser = new User({
email:profile.email,
username:profile.email.split('@')[0],
  })
  await NewUser.save();
  user.name=NewUser.username
}
else{
  user.name = currentuser.username
}
console.log(user);

return true;
   }

    },
      async session({session,user,token}){
        const dbuser = await User.findOne({email:session.user.email})
        session.user.name = dbuser.username
        
        
        return session
      }
  },

 
})

export {authoptions as GET,authoptions as POST} 