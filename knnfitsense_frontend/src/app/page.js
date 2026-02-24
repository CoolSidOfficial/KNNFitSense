"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [prediction, setPrediction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const data = {
      workout_days: Number(form.workout_days.value),
      sleep_hours: Number(form.sleep_hours.value),
      steps_per_day: Number(form.steps_per_day.value),
      bmi: Number(form.bmi.value),
      age: Number(form.age.value),
      resting_hr: Number(form.resting_hr.value),
    };

    try {
      setLoading(true);

      // ✅ Hardcoded API URL
      const res = await axios.post(
        "http://20.193.152.44:8080/predict",
        data
      );

      setPrediction(res.data.predicted_fitness_level);
      form.reset();
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white px-4">
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md bg-neutral-900 border border-white/20 rounded-xl p-6 shadow-lg">
          
          <h1 className="text-xl sm:text-2xl font-bold text-center mb-2">
            KNNFitSense
          </h1>

          <p className="text-sm sm:text-base text-center mb-6 text-gray-300">
            Enter your health metrics to predict your fitness level
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

            <Input label="Age" name="age" />
            <Input label="BMI" name="bmi" step="0.1" />
            <Input label="Steps Per Day" name="steps_per_day" />
            <Input label="Sleep Hours" name="sleep_hours" step="0.1" />

            <div>
              <label className="text-sm">Workout Days Per Week</label>
              <input
                type="range"
                min="0"
                max="7"
                name="workout_days"
                className="w-full mt-2"
              />
            </div>

            <Input label="Resting Heart Rate (BPM)" name="resting_hr" />

            <button
              type="submit"
              className="mt-4 bg-white text-black py-2 rounded font-semibold hover:bg-gray-200 transition"
            >
              {loading ? "Predicting..." : "Predict"}
            </button>

            {prediction && (
              <p className="mt-4 text-center text-green-400 font-semibold">
                You are predicted to be: {prediction}
              </p>
            )}

          </form>
        </div>
      </div>

      <footer className="text-center text-xs text-gray-500 py-4">
        Made by CoolSidofficial Aka Siddhant Jain
      </footer>
    </div>
  );
}

function Input({ label, name, step }) {
  return (
    <div>
      <label className="text-sm">{label}</label>
      <input
        type="number"
        name={name}
        step={step}
        required
        className="w-full mt-1 p-2 rounded bg-black border border-white/30 focus:outline-none focus:border-white"
      />
    </div>
  );
}