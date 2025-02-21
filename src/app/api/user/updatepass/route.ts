import { connectDB } from "@/DB/dbConnection";
import User from "@/models/UserModels";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(req:NextRequest){

    try {
        const {token,password} = await req.json()

        console.log("token",token)
        // verify user--------------

        const verifyedUser = await User.findOne({forgetPasswodToken : token, forgetPasswodTokenExpiry :{$gt: Date.now()}})

        if(!verifyedUser){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        // hash paaword--------------
           
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)

        verifyedUser.password = hashPass;
        verifyedUser.forgetPasswodToken = undefined;
        verifyedUser.forgetPasswodTokenExpiry = undefined;
        
        await verifyedUser.save()

        return NextResponse.json({
            message: "Pssword reset successfully",
            success: true
        })


        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}