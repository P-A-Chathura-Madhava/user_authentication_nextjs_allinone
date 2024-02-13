import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const { default: dbConnect } = require("@/dbConfig/dbConfig");

dbConnect();

export async function POST(request) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);

        // check if user exists
        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json({error: "User does not exists"}, {status: 400});
        }

        // check if the password is correct
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({error: "Invalid Password"}, {status: 400});
        }

        // after the user and password is verified sending the cookie
        // create token data
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email   // You can skip fields if you want
        }

        // create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"});

        const response = NextResponse.json({
            message: "Login Successfull",
            success: true
        });
        response.cookies.set("token", token, {
            httpOnly: true
        });
        return response;
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}