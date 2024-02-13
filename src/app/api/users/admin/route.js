import User from "@/models/userModel";
import { NextResponse } from "next/server";

const { default: dbConnect } = require("@/dbConfig/dbConfig");
const { getDataFromToken } = require("@/helpers/getDataFromToken");

// get information in middleware token

dbConnect();

export async function GET(request) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findOne({_id: userId}).select("-password -isAdmin");
        return NextResponse.json({message: "User Found", data: user});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 400});
    }
}