import User from "@/models/UserModels";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer'


export async function sendEmail({email,emailType,userId}:any){

    try {
        // create hash token from userId
        const hashToken = await bcrypt.hash(userId.toString(),10)

        if(emailType === "VERIFY"){

            const user = await User.findByIdAndUpdate(userId,{
                varifyToken: hashToken,
                varifyTokenExpiry : Date.now() + 3600000
            })

            


        }else if(emailType === "RESET"){

            await User.findByIdAndUpdate(userId,{
                forgetPasswodToken: hashToken,
                forgetPasswodTokenExpiry : Date.now() + 3600000
            })
        }
        
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
            }
        });

        // const mailOptions = {
        //     from: 'onkark@gmail.com',
        //     to: email,
        //     subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        //     html: `<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY"?"verifyemail":"resetpass"}?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        //     or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY"?"verifyemail":"resetpass"}?token=${hashToken}
        //     </p>`
        // }

        const mailOptions = {
            from: process.env.EMAIL_FROM || 'onkark@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
            html: `
                <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>${emailType === "VERIFY" ? "Email Verification" : "Password Reset"}</h2>
                    <p>Click the button below to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}</p>
                    <a href="${process.env.DOMAIN}/${emailType === "VERIFY"?"verifyemail":"resetpass"}?token=${hashToken}" 
                       style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">
                       ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                    </a>
                    <p style="margin-top: 20px;">Or copy and paste this link in your browser:</p>
                    <p style="word-break: break-all;">${process.env.DOMAIN}/${emailType === "VERIFY"?"verifyemail":"resetpass"}?token=${hashToken}</p>
                </div>
            `
        }

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse;
        
    } catch (error:any) {

        throw new Error(error.message);
        
    }



}