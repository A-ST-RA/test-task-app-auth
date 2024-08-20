import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import {connectMongoDB} from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},

            async authorize(credentials): Promise<any> {
                const {email, password} = credentials;

                try {
                    await connectMongoDB()
                    const user = await User.findOne({email})

                    if(!user) return null

                    const passwordsCheck = await bcrypt.compare(password, user.password)
                    if(!passwordsCheck) return null

                    return user
                } catch (error) {
                    console.log("error", error);
                }
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/'
    }
}

// @ts-ignore
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
