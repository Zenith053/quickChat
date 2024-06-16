import dbConnect from "@/lib/dbConnect";
import { userModel } from "@/model/User";
import bcrypt from "bcryptjs";

import {verificationEmail} from "@/resend/sendVerifiation"

export async function POST(request:Request) {
    await dbConnect();

    try {
        // take input filled by user from username email and password
        const {username,email,password} = await request.json();
        const existingUserVerifiedByUsername = await userModel.findOne(
        {
            username,
            isVerified:true
            
        })
        if(existingUserVerifiedByUsername){
            console.log("Username already exist");
            return Response.json({
                success: false,
                Error: "Username already exist",
            },{status: 400});
        }
        const existingUserVerifiedByEmail = await userModel.findOne({
            email,
            // isVerified: true
        })
        if(existingUserVerifiedByEmail){
            console.log("This email is already registered");
            return Response.json ({
                success: false,
                Error: "email already registered",
            },{status: 400});
        }else{

            //do something
        }
        
        const hashedPassoword = await bcrypt.hash(password,10);
        const verificationcode = Math.floor(100000 + Math.random()*900000);
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const newUser = new userModel({
            username,
            email,
            password: hashedPassoword,
            verifyCode: verificationcode,
            verifyDate: expiryDate,
            isVerified: false,
            isAcceptingMessage:true,
            })
            
            await newUser.save(); 
            console.log("sign-up succesfully");
            const sendEmailResponse = await verificationEmail(username,email,verificationcode.toString());
            
            
            } catch (error) {
                
        console.log("Error Registering User",error);
        return Response.json({
            success: false,
            Error: "Error Registering user",
        },
        {
            status: 500,
        })
    }
}