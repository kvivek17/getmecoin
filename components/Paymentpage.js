"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchuser, fetchpayment, initiate } from '@/app/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { useSession } from 'next-auth/react'
 import { ToastContainer, toast ,Bounce} from 'react-toastify';
import { useRouter } from 'next/navigation'

const Paymentpage = ({ username }) => {


  const { data: session } = useSession()
const router = useRouter()
  const [paymentfrom, setpaymentfrom] = useState({
    name: '',
    message: '',
    amount: ''
  });

  const [currentuser, setcurrentuser] = useState({})
  const [payments, setpayments] = useState([])
  const searchParams = useSearchParams();


  const handlechange = (e) => {
    setpaymentfrom({ ...paymentfrom, [e.target.name]: e.target.value })
    console.log(paymentfrom);
  }

  const getdata = async (params) => {



    let u = await fetchuser(username)
 console.log("Fetched User:", u); // 👈 yeh karlo
    setcurrentuser(u)
    let dbpayment = await fetchpayment(username)
    setpayments(dbpayment)
    console.log(dbpayment);


  }

  useEffect(() => {
    getdata();
  }, [])

  useEffect(() => {
    if(searchParams.get("payment")=== "true"){
      toast('payment DONE', {
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
router.push(`/${username}`) // Redirect to the user's page after payment
    }
  
   
  }, [])
  

  const pay = async (amount) => {
    let x = await initiate(amount, username, paymentfrom);
    let orderId = x.id
    var options = {
      "key":currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
      "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Buy me a coin",
      "description": "Buy Gaming coin",
      "order_id": orderId,
      "image": "https://example.com/your_logo",
      "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "919000090000",
      },
      "notes": {
        "address": "Hello World"
      },
      "theme": {
        "color": "#3399cc"
      }
    }
    var rzp = new Razorpay(options);

    rzp.open();
  }


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
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

      <div className='cover w-full relative' >

        <img src="./cover.jpg" className='object-cover w-full h-[46vh]' alt="" />
        <div className='absolute -bottom-10 left-150  '>
          <img src={currentuser.profilepic} width={80} className='rounded-xl' alt="" />
        </div>

      </div>
      <div className='flex justify-center items-center flex-col my-10  '>
        <h3 className='font-bold'> @{username}</h3>
        <div>
         {payments.length} payments received.
        </div>
        <div className='mb-5'>
          King of the Pirates
        </div>
        <div className="payment flex  gap-3 w-[80%] ">

          <div className='support w-1/2 bg-slate-800 rounded-2xl p-7 mb-5 '>
            <h1 className='font-bold text-lg text-center'>SUPPORTERS</h1>
            <ul>
              {payments.length === 0 && <div className='text-center'>No payments yet</div>}
              {payments.map((p, i) => {
                return <li key={i} className='flex gap-2 my-2 items-center'>
                  <img className='rounded-full' src="./user.png" alt="" width={30} />

                  <span > {p.name} donate the <span className='font-bold'>{p.amount}</span> dollor
                  </span> {p.message}</li>
              })}
            </ul>
          </div>



          <div className="makepayment w-1/2 bg-slate-800 rounded-2xl p-7 mb-5">

            <h2 className='font-bold text-2xl my-5 '>make a payment</h2>
            <div className="flex gap-2 flex-col" >
              <input type="text" className='w-full p-2 my-2 rounded-lg bg-slate-500 ' value={paymentfrom.name} name='name' onChange={handlechange} placeholder='NAME' />
              <input type="text" className='w-full p-2 my-2 rounded-lg bg-slate-500 ' value={paymentfrom.message} name='message' onChange={handlechange} placeholder='message' />
              <input type="number" className='w-full p-2 my-2 rounded-lg bg-slate-500  ' value={paymentfrom.amount} name='amount' onChange={handlechange} placeholder='enter amount' />
              <button type="button" onClick={() => { pay(Number.parseInt(paymentfrom.amount * 100) )}} className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">PAY</button>
            </div>
            <div className='flex gap-2 mt-5'>
              <button className="bg-slate-900 p-3  rounded-lg" onClick={() => { pay(1000) }}>PAY 10</button>
              <button className="bg-slate-900 p-3  rounded-lg" onClick={() => { pay(2000) }}>PAY 50</button>
              <button className="bg-slate-900 p-3  rounded-lg" onClick={() => { pay(3000) }}>PAY 100</button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Paymentpage