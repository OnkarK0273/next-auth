import { connectDB } from "@/DB/dbConnection";
import { sendEmail } from "@/helpers/mailer";
import User from "@/models/UserModels";
import bcrypt from "bcryptjs";
import { NextRequest,NextResponse } from "next/server";

connectDB()

export async function POST (req:NextRequest){

    try {

        const {username, email, password} = await req.json()

        console.log("body",username, email, password)
    
        // check if user exist---------
    
        const user = await User.findOne({
            $or: [{ username }, { email }]
        })
    
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
    
        // hash paaword--------------
    
        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)
    
        // create user-------------------
    
        const newUser = new User({
            username,
            email,
            password:hashPass
        })
    
        const saveUser = await newUser.save()
    
        console.log("saveduser",saveUser)

        await sendEmail({email:email, emailType:"VERIFY",userId:saveUser._id})

        // send response----------------
    
        return NextResponse.json({
            message: "User created successfully",
            success: true,
            saveUser
        })
        
    } catch (error:any) {

        return NextResponse.json({error: error.message}, {status: 500})
        
    }


}