"use client"
import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {fetchuser, updateuser } from '@/app/actions/useractions'
 import { ToastContainer, toast ,Bounce} from 'react-toastify';

const Dashboard = () => {

    const { data: session,update } = useSession()
    const router = useRouter()
    useEffect(()=>{
     
    if(!session){
      router.push("/login")
    }
    else{
       getdata()
    }
    console.log(session);
    
    },[session])

const [form, setform] = useState({})

const handlechange = (e)=>{
    setform({...form,[e.target.name]:e.target.value} )
}
const getdata = async()=>{
   
let u  = await fetchuser(session.user.name)
  setform(u)
}
const handleprofile = async (data) => {
console.log(data);

  update();
  let a = await updateuser(data,session.user.name);
    toast('profile updated', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition:Bounce,

});
};

  return (
    <>
     <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"

/>
    <form className='mt-5 flex flex-col justify-center   items-center '  action={handleprofile}>

        <div>
            <h1 className='text-4xl font-bold'>Welcome to Dashbaord</h1>
        </div>
<div className=' w-[50vw]  '>
    


  <div className="mb-5 ">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
    <  input value={form.name || ""} name='name' onChange={(e)=>{handlechange(e)}} type="text" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  <div className="mb-5">
    <label htmlFor="Email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
    <  input value={form.email || ""} name='email' onChange={(e)=>{handlechange(e)}} type="mail" id="mail" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
   <div className="mb-5">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
    <  input value={form.username || ""} name='username' onChange={(e)=>{handlechange(e)}} type="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
 
  <div className="mb-5">
    <label htmlFor="profile picture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">profile picture</label>
    <  input value={form.profilepic || ""} name='profilepic' onChange={(e)=>{handlechange(e)}} type="text" id="profile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
   <div className="mb-5">
    <label htmlFor="cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">cover picture</label>
    <  input value={form.coverpic || ""} name='coverpic' onChange={(e)=>{handlechange(e)}} type="text" id="cover" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
   <div className="mb-5">
    <label htmlFor="razorpay" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay id</label>
    <  input value={form.razorpayid || ""} name='razorpayid' onChange={(e)=>{handlechange(e)}} type="text" id="razorpay" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
   <div className="mb-5">
    <label htmlFor="razorpay" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay secret</label>
    <  input value={form.razorpaysecret || ""} name='razorpaysecret' onChange={(e)=>{handlechange(e)}} type="text" id="razorpay" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full block  p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
  </div>
  
<button className='bg-blue-500 w-full p-2 rounded-lg mb-5'>SAVE</button>
</div>
    </form>
    </>
)
}

export default Dashboard