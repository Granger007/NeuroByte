import React from "react";
import { Brain, Activity, AlertTriangle } from "lucide-react";

const symptomsData = [
  {
    title: "ADHD Symptoms",
    icon: Activity,
    image: "/random1.jpg", // Replace with actual image path
    color: "bg-yellow-900/30 border-yellow-500 text-yellow-300",
    description: "Children with ADHD often struggle with focus, impulsivity, and hyperactivity.",
    symptoms: [
      "Difficulty paying attention",
      "Impulsiveness",
      "Excessive talking or fidgeting",
      "Easily distracted",
      "Struggles with organization",
    ],
  },
  {
    title: "Autism Symptoms",
    icon: Brain,
    image: "/random2.png", // Replace with actual image path
    color: "bg-blue-900/30 border-blue-500 text-blue-300",
    description: "Autism affects social interactions, communication, and behavior patterns.",
    symptoms: [
      "Delayed speech or communication",
      "Repetitive behaviors",
      "Difficulty with social interactions",
      "Strong adherence to routines",
      "Sensory sensitivities (light, sound, textures)",
    ],
  },
  {
    title: "When to Seek Help?",
    icon: AlertTriangle,
    image: "/random3.png", // Replace with actual image path
    color: "bg-red-900/30 border-red-500 text-red-300",
    description: "If symptoms interfere with daily life, professional guidance is recommended.",
    symptoms: [
      "Symptoms interfere with daily life",
      "Challenges in school or social settings",
      "Unusual emotional reactions",
      "Limited or no eye contact",
      "Extreme difficulty adapting to change",
    ],
  },
];

const Symptom = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-100">
        Understanding ADHD & Autism Symptoms in Children
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {symptomsData.map((category, index) => (
          <div key={index} className={`border-l-4 p-4 rounded-lg shadow-lg ${category.color}`}>
            <img src={category.image} alt={category.title} className="w-full h-40 object-cover rounded-md mb-4" />
            <div className="flex items-center space-x-3 mb-3">
              {React.createElement(category.icon, { className: "w-6 h-6 text-gray-200" })}
              <h2 className="text-lg font-semibold">{category.title}</h2>
            </div>
            <p className="text-sm text-gray-300 mb-2">{category.description}</p>
            <ul className="list-disc pl-5 text-sm text-gray-300">
              {category.symptoms.map((symptom, i) => (
                <li key={i}>{symptom}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Symptom;