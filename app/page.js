

export default function Home() {
  return (

    <>
    <div className=" text-white flex justify-center flex-col items-center min-h-[42vh] gap-4">
      <div className="font-bold text-3xl"> Buy Me a Coin! <span>🪙</span>  </div>
      <p className="font-bold">A crowdfunding platform  for creator .Get funded bu your fans and followers.start now</p>
      <div className="">
       <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">COIN HERE</button>
       <button type="button" className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">read more </button>

      </div>
    </div>
    <div className="bg-white h-1 opacity-5">
    </div>
    <div className="text-white container mx-auto mb-16" >
      <h1 className="text-white  text-2xl text-center font-bold my-14">Your fans  can buy you a Coin</h1>
<div className="flex gap-5 justify-around ">
      <div className="flex flex-col justify-center items-center">
        <img className="rounded-full" width={50} src="/man.jpg" alt="" />
        <p className="font-bold">fund yourself</p>
      </div>
        <div className="flex flex-col justify-center items-center">
        <img className="rounded-full" width={50} src="/man.jpg" alt="" />
        <p className="font-bold">fund yourself</p>
      </div>
        <div className="flex flex-col justify-center items-center">
        <img className="rounded-full" width={50} src="/man.jpg" alt="" />
        <p className="font-bold">fund yourself</p>
      </div>
</div>
    </div>

        <div className="bg-white h-1 opacity-5">
    </div>
        <div className="text-white container mx-auto mb-6" >
      <h1 className="text-white  text-2xl text-center font-bold my-14">Learn more about my self</h1>
      <div className="flex justify-center ">
        <video autoPlay  width={300} src="/coin.mp4"></video>
      </div>

    </div>
    </>
  );
}
