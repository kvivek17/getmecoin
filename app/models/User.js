
import {Schema,model ,models} from "mongoose";
import { StrictMode } from "react";


const userscheme = new Schema({
email:{type:String,required:true},
name:{type:String},
username:{type:String,required:true},
profilepic:{type:String},
coverpic:{type:String},
razorpayid:{type:String},
razorpaysecret:{type:String},
createdAt:{type:Date,default:Date.now},
updatedAt:{type:Date,default:Date.now},
})

const User = models.User || model("User",userscheme);
export default  User;