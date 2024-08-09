import { useState } from "react";
import Header from "./Header";
import { useNavigate } from 'react-router-dom'; 
import { useUser } from "./UserContext";
import axios from "axios";
function Start(){
    const navigate = useNavigate();
    const {username} = useUser();
   return (
       <>
       <Header></Header>
       <p className="text-lg mt-5  text-black font-semibold mx-auto my-1 flex justify-center items-center">Username : {username}</p>
       <a
       onClick={()=>{navigate('/getquestions')}} 
       className="  w-1/5 text-white  bg-blue-500 text-xl 
       py-2 px-5 border rounded-md shadow-lg cursor-pointer
       flex items-center justify-center hover:bg-blue-700
        hover:shadow-2xl font-bold  max-w-screen-lg my-10 mx-auto">Start</a>
        <p className="text-lg  text-black font-semibold mx-auto my-1 flex justify-center items-center">Total questions : 10 </p>
        <p className="text-lg text-black font-semibold mx-auto my-1 flex justify-center items-center">Time : 10 min</p>
       </>
   ) 
}
export default Start ;