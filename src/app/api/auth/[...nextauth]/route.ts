import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { prisma } from "~/lib/prisma"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email! },
            include: { roles: true }
          });

          if (!existingUser) {
            const newUser = await prisma.user.create({
              data: {
                email: user.email!,
                name: user.name || null,
                image: user.image || null,
              },
              include: { roles: true }
            });
            const userRole = await prisma.role.findFirst({ 
              where: { name: "USER" } 
            });

            if (userRole) {
              await prisma.user.update({
                where: { id: newUser.id },
                data: {
                  roles: {
                    connect: { id: userRole.id }
                  }
                }
              });
            }

            console.log("New user created:", newUser.email);
          } else {
            console.log("Existing user signed in:", existingUser.email);
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
        }
      }
      return true;
    },
  },
})

export { handler as GET, handler as POST } 