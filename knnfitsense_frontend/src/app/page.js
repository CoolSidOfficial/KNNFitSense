"use client"
import Link from "next/link"

import Image from "next/image";
import axios from "axios";
import { useState } from "react";
export default function Home() {
  const [prediction, setPrediction] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      workout_days: form.workout_days.value,
      sleep_hours: form.sleep_hours.value,
      steps_per_day: form.steps_per_day.value,
      bmi: form.bmi.value,
      age: form.age.value,
      resting_hr: form.resting_hr.value
    };
  
    try {
      const res = await axios.post("https://api.20.120.176.155.nip.io/predict",data);
      setPrediction( res.data.predicted_fitness_level); 
      console.log( res.data.predicted_fitness_level)
      form.reset(); 
    } catch (err) {
      console.error("Error:", err);
    }
  };


  return (
    <>
    
   <div className="flex items-center justify-center h-screen">
    
   <div className=" flex  flex-col border-2 border-solid border-white justify-center items-center p-5 text-3 w-96 h-auto  font-mono">
    <div className="p-2 font-mono">KNNFitSSense</div>
    <div>Enter your health metrics to predict<br/> your fitness level using machine learning</div>
     <form className="flex flex-col gap-3.5" onSubmit={handleSubmit}>
      <label>Age</label>
      <input className="border-white border-solid border-2"  type="text" name="age" required></input>
      <label>bmi</label>
      <input  className="border-white border-solid border-2" type="text" name="bmi" required></input>
       <div>Body Mass index(weight kg/height<sup>2</sup>)</div>)
       <label>Steps Per Day</label>
       <input  className="border-white border-solid border-2" type="text" name="steps_per_day" required></input>
       <label>Sleep Hours</label>
       <input className="border-white border-solid border-2" name="sleep_hours" required></input>
       <label>Workout Days Per week</label>
       <div className="flex justify-between text-sm text-white px-[2px]">
        {Array.from({ length: 7 }, (_, i) => (
          <span key={i}>{i + 1}</span>
        ))}</div>
       <input type="range" min="0" max="7" className="white-slider" name="workout_days" required></input>
       <label>Resting Heart Rate</label>
       <input  className="border-white border-solid border-2" type="text" name="resting_hr" required></input>
       <span>Beats per minute</span>
       <button type="submit" className="bg-white text-black cursor-pointer" required>Predict</button>
       {prediction && (
        <p className="mt-4 text-green-300"> You are Predicted to be  : {prediction}</p>
      )}
     </form>
   </div>
   </div>
    <div>Made by CoolSidofficial Aka Siddhant Jain</div>
    </>
  );
}
