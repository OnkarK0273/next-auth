import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:[true,"please provide username"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"please provide email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide password"],
    },
    isVarified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgetPasswodToken:String,

    forgetPasswodTokenExpiry:Date,

    varifyToken:String,

    varifyTokenExpiry:Date

})


/*

Why Is This Needed?
In a Node.js environment, especially when using tools like Next.js or serverless functions, the application might run this code multiple times. If we call mongoose.model("users", userSchema) every time, MongoDB will throw an error because the same model cannot be registered twice.

To avoid this, the code first checks if a model named "users" already exists in mongoose.models.

If it exists, it reuses the existing model (mongoose.models.users).
If it doesn't exist, it creates a new model using mongoose.model("users", userSchema).

*/

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User