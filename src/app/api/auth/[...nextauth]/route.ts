import NextAuth from "next-auth"
import { prisma } from "~/lib/prisma"
import { CardanoWalletProvider } from "~/lib/cardano-auth-provider"

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CardanoWalletProvider(),
  ],
  pages: {
    signIn: "/",
    signOut: "/",
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl
    },
    async jwt({ token, user, account }) {
      if (user && account?.provider === "cardano-wallet") {
        token.address = user.address;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.address) {
        session.user.address = token.address;
      }
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "cardano-wallet") {
        try {
          let dbUser = await prisma.user.findUnique({
            where: { wallet: user.address },
            include: { role: true }
          });

          if (!dbUser) {
            const userRole = await prisma.role.findFirst({ 
              where: { name: "USER" } 
            });
            
            if (!userRole) {
              throw new Error("Role USER không tồn tại");
            }

            dbUser = await prisma.user.create({
              data: {
                wallet: user.address,
                name: user.name || null,
                image: user.image || null,
                roleId: userRole.id,
              },
              include: { role: true }
            });
            
            console.log("[NextAuth] New Cardano Wallet user created:", dbUser.wallet);
          } else {
            console.log("[NextAuth] Existing Cardano Wallet user signed in:", dbUser.wallet);
          }

          const existingSession = await prisma.session.findFirst({
            where: { userId: dbUser.id }
          });

          if (existingSession) {
            await prisma.session.update({
              where: { id: existingSession.id },
              data: { lastAccess: new Date() }
            });
            console.log("[NextAuth] Session lastAccess updated for user:", dbUser.wallet);
          } else {
            await prisma.session.create({
              data: {
                userId: dbUser.id,
                accessTime: new Date(),
                lastAccess: new Date(),
              }
            });
            console.log("[NextAuth] New session created for user:", dbUser.wallet);
          }
          
          return true;
        } catch (error) {
          console.error("[NextAuth] Error in Cardano Wallet signIn callback:", error);
          throw new Error("Lỗi xác thực ví Cardano, vui lòng thử lại.");
        }
      }
      return false;
    },
    async signOut({ token }) {
      try {
        if (token?.address) {
          const user = await prisma.user.findUnique({
            where: { wallet: token.address as string }
          });
          
          if (user) {
            await prisma.session.deleteMany({
              where: { userId: user.id }
            });
            console.log("[NextAuth] Sessions deleted from database for user:", user.wallet);
          }
        }
      } catch (error) {
        console.error("[NextAuth] Error in signOut callback:", error);
      }
    },
  },
})

export { handler as GET, handler as POST } 