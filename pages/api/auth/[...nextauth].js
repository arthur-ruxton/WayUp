import NextAuth from 'next-auth'
import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ]
})

// google provider not currently working -- generate new id and key (shutdown firebase account)?
// ,
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     })