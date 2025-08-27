import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/payment";
import User from "@/app/models/User";
import Razorpay from "razorpay";
import { connectDB } from "@/app/mongodb";

export const POST = async (req) => {
    await connectDB()
let body   =await req.formData();
body = Object.fromEntries(body);

let  p = await Payment.findOne({oid:body.razorpay_order_id})
let user = await User.findOne({username:p.to_user})
const secret = user.razorpaysecret;
if(!p){
    return NextResponse.json({message: "order id not found"});
}
let x = validatePaymentVerification({"order_id":body.razorpay_order_id,"payment_id":body.razorpay_payment_id},body.razorpay_signature,secret)

if(x){
    const updatepayment= await Payment.findOneAndUpdate({oid:body.razorpay_order_id},{done:"true"},{new:true})
return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatepayment.to_user}?payment=true`);
}
else{
    return NextResponse.error("Payment verification failed");
}
}