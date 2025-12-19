import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Hardcoded admin credentials
const ADMIN_USERNAME = '3028976913';
const ADMIN_PASSWORD = 'Kuttyma.17';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (
                    credentials?.username === ADMIN_USERNAME &&
                    credentials?.password === ADMIN_PASSWORD
                ) {
                    return {
                        id: '1',
                        name: 'Admin',
                        email: 'admin@tnplots.com',
                        role: 'admin',
                    };
                }
                return null;
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                (session.user as any).role = token.role;
            }
            return session;
        },
    },
    pages: {
        signIn: '/admin/login',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET || 'your-secret-key-change-in-production',
});

export { handler as GET, handler as POST };
