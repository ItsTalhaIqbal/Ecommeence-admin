import NextAuth, { getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

const adminEmails = ['dawid.paszko@gmail.com', 'ti709888@gmail.com'];

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
   secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async session({ session, token, user }) {
      // Check if the user's email is in the adminEmails array
      if (session?.user?.email) {
        return session;
      } else {
        // Return null or an empty session to indicate unauthorized access
        return null;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession(req, res, authOptions);
  
  if (!session || !session?.user?.email) {
    res.status(401).end(); // Properly end the response with a 401 status
    return;
  }

  // Optionally return the session if needed
  return session;
}
