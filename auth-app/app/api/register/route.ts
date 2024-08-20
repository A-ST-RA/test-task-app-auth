import {NextResponse} from "next/server";
import {connectMongoDB} from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
    try {
      const {name, email, password} = await req.json();
      const hashedPassword = await bcrypt.hash(password, 12);

      await connectMongoDB()
      await User.create({name, email, password: hashedPassword})

      return NextResponse.json("User Registered", {status: 201});
    } catch (error) {
        return NextResponse.json("Something went wrong", {status: 500});
    }
}