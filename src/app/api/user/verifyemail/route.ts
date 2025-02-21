import { connectDB } from "@/DB/dbConnection";
import User from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(req:NextRequest){

    try {
        const {token} = await req.json()

        console.log("token",token)

        const verifyedUser = await User.findOne({varifyToken : token, varifyTokenExpiry :{$gt: Date.now()}})

        if(!verifyedUser){
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        verifyedUser.isVarified = true;
        verifyedUser.varifyToken = undefined;
        verifyedUser.varifyTokenExpiry = undefined;
        
        await verifyedUser.save()

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        })


        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}