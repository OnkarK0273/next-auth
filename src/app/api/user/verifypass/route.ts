import { connectDB } from "@/DB/dbConnection";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";

connectDB()

export async function POST(req:NextRequest){
    try {
        const {email} = await req.json()

        const isUser = await User.findOne({email})

        if(!isUser){
            return NextResponse.json({error: "Invalid email"}, {status: 400})
        }

        console.log("isuser",isUser)
        
        await sendEmail({email:email, emailType:"RESET",userId:isUser._id})

        return NextResponse.json({
            message: "Email recivied successfully",
            success: true
        })
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}