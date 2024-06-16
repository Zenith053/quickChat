import mongoose,{Schema,Document} from "mongoose";
// const Schema = mongoose

export interface Message extends Document{
    Text: string;
    CreatedAt: Date;
}

const messageSchema: Schema<Message>  = new Schema({
    Text:{
        type: String,
        required: true
        
    },
    CreatedAt:{
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string,
    email: string,
    password: string,
    verifyCode: string,
    verifyDate: Date,
    isVerified: boolean,
    isAcceptingMessage: boolean,
    message: Message[]
}

const userSchema :Schema<User> = new Schema({
    username:{
        type: String,
        required: [true,"Username is required"],
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: [true,"Username is required"],
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],

    },
    password:{
        type: String,
        required: [true,"password is required"],
         
    },
    verifyCode:{
        type: String,
        required: [true,"verifyCode is required"],
    },

    verifyDate:{
        type: Date,
        require: true
    },
    isAcceptingMessage:{
        type: Boolean,
        require:true,
    },
    isVerified:{
        type: Boolean,
        required: true,
        default: false,
    },
    message: [messageSchema],
})

export const userModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema);