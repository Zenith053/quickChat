import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"// Ensure this import is correct

import { userModel } from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import bcryptjs from "bcryptjs"

// export const user = async ()=>{
    
// }

// export type credentials = {
//     username: string;
//     password: string;
//   };

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: 'Credentials',
            credentials : {
                username: { label: "email", type: "text" },
                password: { label: "Password", type: "pass" }
            },
            async authorize(credentials:any ):Promise<any>{
                await dbConnect();
                try {
                    const user = await userModel.findOne({
                        $or: [
                            {email: credentials.identifier.username},
                            {username: credentials.username}
                        ]
                    })
                    if(!user){
                        throw new Error('no username found with this email');
                    }
                    if(!user.isVerified){
                        throw new Error('Please verify your account before login');
                    }
                    const isPasswordCorrect = await bcryptjs.compare(credentials.password,user.password) 
                    if(isPasswordCorrect){
                        return user
                    }
                    else{
                        throw new Error('incorrect password')
                    }

                } catch (err: any) {
                    throw new Error(err);
                    //if you return null then it will print all the errors 
                }

            }
        })
    ]
}
