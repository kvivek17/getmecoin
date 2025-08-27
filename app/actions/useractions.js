"use server"
import Razorpay from "razorpay"
import Payment from "../models/payment"
import { connectDB } from "../mongodb"
import User from "../models/User"

export const initiate = async (amount,to_username,paymentfrom)=>{
    await connectDB()
    let user =await User.findOne({username:to_username})
    const secret = user.razorpaysecret;
    var  instance = new Razorpay ({ key_id:user.razorpayid,key_secret:secret,})

    let options = {
        amount:Number.parseInt(amount),
        currency:"INR",
    }
    let x = await instance.orders.create(options)
    await Payment.create({oid:x.id,amount:amount / 100,to_user:to_username,name:paymentfrom.name,message:paymentfrom.message})
    return x
}
export const fetchuser = async(username)=>{
    console.log(username);
    
await connectDB();
let u = await User.findOne({username:username})
 if (!u) {
    console.error("User not found for username:", username);
    return null; // or throw new Error("User not found")
  }

let user = u.toObject({flattenObjectIds:true})
return user;
}

export const fetchpayment = async(username)=>{
    await connectDB();
    let p = await Payment.find({to_user:username,done: true,}).sort({amount:-1}).lean()
   
    console.log(p);
    
    return p;
}

export const updateuser = async(data,oldusername)=>{
await connectDB();
let ndata = Object.fromEntries(data)
if(oldusername !== ndata.username){
let u = await User.findOne({username:ndata.username}) 
if(u){
    return {error:"usernaem exist already"}
}


await User.updateOne({email:ndata.email},ndata)
await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
    return { success: true };
}

  


}