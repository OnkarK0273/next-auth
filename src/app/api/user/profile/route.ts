import { connectDB } from "@/DB/dbConnection";
import { getDataFromToken } from "@/helpers/getDataFromToken ";
import User from "@/models/UserModels";
import { NextRequest, NextResponse } from "next/server";


connectDB()
export async function GET (req:NextRequest){
   

    try {

        // get the id

        const userId = await getDataFromToken(req)

        // get the user by id

        const user = await User.findById({_id:userId}).select("-password")

        return NextResponse.json({
            message :"user found",
            user :user
        })
        
    } catch (error:any) {

        return NextResponse.json({error: error.message}, {status: 400});

    }
}