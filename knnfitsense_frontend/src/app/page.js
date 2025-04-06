"use client"
import Image from "next/image";
import axios from "axios";
import { useState } from "react";
export default function Home() {
  const [prediction, setPrediction] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/predict");
      setPrediction(res.data.result); 
    } catch (err) {
      console.error("Error:", err);
    }
  };


  return (
    
   <div class="flex items-center justify-center h-screen">
   
   <div className=" flex  flex-col border-2 border-solid border-white justify-center items-center p-5 text-3 w-96 h-auto  font-mono">
    <div className="p-2 font-mono">KNNFitSSense</div>
    <div>Enter your health metrics to predict<br/> your fitness level using machine learning</div>
     <form className="flex flex-col gap-2.5" onSubmit={handleSubmit}>
      <label>Age</label>
      <input className="border-white border-solid border-2"  type="text" name="age"></input>
      <label>bmi</label>
      <input  className="border-white border-solid border-2" type="text" name="bmi"></input>
       <div>Body Mass index(weight kg/height<sup>2</sup>)</div>)
       <label>Steps Per Day</label>
       <input  className="border-white border-solid border-2" type="text" name="stepsperpday"></input>
       <label>Sleep Hours</label>
       <input className="border-white border-solid border-2"></input>
       <label>Workout Days Per week</label>
       <div className="flex justify-between text-sm text-white px-[2px]">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}</div>
       <input type="range" min="0" max="7" className="white-slider"></input>
       <label>Resting Heart Rate</label>
       <input  className="border-white border-solid border-2" type="text" name="heartrate"></input>
       <span>Beats per minute</span>
       <button type="submit" className="bg-white text-black cursor-pointer">Predict</button>
       {prediction && (
        <p className="mt-4 text-green-300">Predicted Fitness: {prediction}</p>
      )}
     </form>
   </div>
   </div>
  );
}
