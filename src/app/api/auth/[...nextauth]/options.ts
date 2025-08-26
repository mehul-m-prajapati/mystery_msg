import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import UserModel, {User} from '@/model/User'
import dbConnect from '@/lib/dbConnect'


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: any, req): Promise<any> {

                await dbConnect();

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            {
                                email: credentials.identifier.email
                            },
                            {
                                username: credentials.identifier.username
                            }
                        ]
                    });

                    if (!user) {
                        throw new Error('No user found from given enail or username');
                    }

                    if (!user.isVerified) {
                        throw new Error('Please verify your account.');
                    }

                    const isPasswdCorrect = await bcrypt.compare(credentials.password, user.password);

                    if (isPasswdCorrect) {
                        return user;
                    }
                    else {
                        throw new Error('Invalid password enterted.');
                    }
                } catch (error: any) {
                    throw new Error(error);
                }
            },

        })
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                // Convert ObjectId to string
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessages = user.isAcceptingMessages;
                token.username = user.username;
            }
            return token;
        },
        async session({ session, token }) {

            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessages = token.isAcceptingMessages;
                session.user.username = token.username;
            }

            return session;
        },
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/sign-in',
    },
};
