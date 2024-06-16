import { EmailTemplate } from "../../components/emailverification/emailverification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface EmailResponse {
    
    isSuccesful: boolean;
    message?: string;

    
}

export async function verificationEmail(
    username: string,
    email: string,
    verifyCode: string
): Promise<EmailResponse> {
    try {
        console.error("Email sent succesfully");
        const { data, error } = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: email,
            subject: 'Verification Code',
            react: EmailTemplate({ firstName: 'John', code:verifyCode }),
          });
        return {isSuccesful: true,message:"The email is sent succesfully"};
    } catch (error) {
        console.error("Unable to send email",error);
        return {isSuccesful: false};
    }
}
