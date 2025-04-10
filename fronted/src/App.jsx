import React, { useState } from 'react'
import { BsFillEmojiSunglassesFill } from "react-icons/bs";
// import EmojiPicker from 'emoji-picker-react';
import { LuMenu } from "react-icons/lu";
import { BiSolidUser } from "react-icons/bi";
import img from './assets/image.jpg';
import { BsLightningChargeFill } from "react-icons/bs";


function App() {
  const [isfeedback, setfeedback] = useState(false);
  // const [isreset, setreset] = useState(true);
 
  
  return (
    <div className="min-h-screen w-full px-4">
      {/* Header */}
      <div className='flex flex-col md:flex-row w-full md:h-24 py-4 mb-16 justify-between items-center shadow-lg'>
        <div className='flex gap-4 items-center'>
          <div className="text-4xl text-yellow-400"><BsFillEmojiSunglassesFill /></div>
          <div className='font-serif text-3xl md:text-4xl'>Leetcode Battle</div>
        </div>
        <div className='flex gap-4 items-center mt-4 md:mt-0'>
          <div className='text-4xl md:text-5xl'><BiSolidUser /></div>
          <div className="font-serif text-lg md:text-xl px-4 py-2 bg-yellow-400 rounded-lg">wanna some fun</div>
          <div className="text-4xl md:text-5xl">
            <button><LuMenu /></button>
          </div>
        </div>
      </div>

      {/* Avatar VS Section */}
      <div className='flex flex-col md:flex-row justify-center items-center gap-12 md:gap-32 mb-12'>
        <div className='w-52 h-52 md:w-80 md:h-80 rounded-full border-black border-8'></div>
        <div className='bg-black h-12 w-16 text-white text-3xl rounded-lg flex items-center justify-center'>vs</div>
        <div className='w-52 h-52 md:w-80 md:h-80 rounded-full border-black border-8'></div>
      </div>

      {/* Form Section */}
      <form className="flex flex-col md:flex-row gap-8 md:gap-12 justify-center items-center">
        <fieldset className="border border-gray-400 p-4 rounded-lg w-64">
          <legend className="text-xl md:text-2xl font-semibold">Profile:🔥</legend>
          <input type="text" placeholder='only username 😆' className="border-none p-1 outline-none font-mono text-lg md:text-xl w-full" />
        </fieldset>

        <fieldset className="border border-gray-400 p-4 rounded-lg w-64">
          <legend className="text-xl md:text-2xl font-semibold">Profile: 🔥</legend>
          <input type="text" placeholder='only username 😂' className="border-none p-1 outline-none font-mono text-lg md:text-xl w-full" />
        </fieldset>
      </form>

      {/* Buttons */}
      <div className='mt-16 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-10'>
        <button onClick={()=>{
                       setfeedback(false) }}  className='border-2 border-black w-44 h-12 rounded-lg flex justify-center items-center text-xl md:text-2xl'>Reset</button>
        <button onClick={()=>{setfeedback(true)
                   }}className='bg-black text-white font-bold w-44 h-12 rounded-lg flex justify-center items-center text-xl md:text-2xl'>Get feedback</button>
      </div>

      {/* Image Section */}
      <div className='flex justify-center items-center my-20 '>
        <div className=" flex justify-center items-center overflow-hidden rounded-lg">
          {(!isfeedback) && <img src={img} alt="image" className="w-64 h-64 md:w-80 md:h-80 object-cover" />}
          {(isfeedback) && <div className="w-1/2 h-min border-black border-2 font-serif text-2xl rounded-lg p-3">Hello jee jbfhsbfjnjcs bhbsbd  hbbfsfhsja habsdhbhsd hvhbfsdfs hsdjkfsdjfbsd hvhsdjsndj bdsfhsfsn yegfuhewbh c hcbsbcs</div>}
        </div>
      </div>
      <div className='w-full border-[.5px] border-black'></div>
      <div className='flex flex-col justify-center items-center font-serif p-4 text-center'>
        <p>Made by Me</p>
        <p>Github: <span className="text-red-600">@BabuBhaiya</span></p>
      </div>
    </div>
  );
}



export default App;