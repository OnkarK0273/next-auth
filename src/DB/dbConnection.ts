import mongoose from "mongoose";

export async function connectDB(){
    try {

        mongoose.connect(`${process.env.MONGODB_URL!}`)

        const connection = mongoose.connection

        connection.on('connected',()=>{
            console.log("mongoDB connected")
        })

        connection.on('error',(err)=>{
            console.log("mongoDB connection error. plese make sure mongoDB is running",err)
            process.exit()
        })
        
    } catch (error) {

        console.log("failed to connect DB")
        console.log("error",error)
        
    }
}