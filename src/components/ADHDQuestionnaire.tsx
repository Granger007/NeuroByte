import React, { useState } from "react";

const options = ["Never", "Rarely", "Sometimes", "Often", "Very Often"];

const questions = {
  "Inattention": [
    "Do you often struggle to focus on tasks or activities, even those that interest you?",
    "Do you frequently make careless mistakes in work, school, or daily activities?",
    "Do you often have trouble organizing tasks and activities?",
    "Do you frequently lose important items such as keys, wallets, or school/work materials?",
    "Do you find yourself easily distracted by external stimuli or random thoughts?",
    "Do you frequently forget to complete daily activities or appointments?",
  ],
  "Hyperactivity & Impulsivity": [
    "Do you often feel the need to move around in situations where you are expected to stay seated?",
    "Do you frequently fidget, tap your hands or feet, or have difficulty staying still?",
    "Do you often blurt out answers or interrupt conversations before the other person finishes speaking?",
    "Do you have difficulty waiting for your turn in conversations or activities?",
    "Do you feel restless, as if driven by a motor, or have difficulty engaging in leisure activities quietly?",
  ],
  "Emotional Regulation & Social Interactions": [
    "Do you often feel overwhelmed by emotions, such as frustration or anger, and struggle to control them?",
    "Do you frequently experience mood swings or sudden emotional changes?",
    "Do you find it challenging to maintain friendships or social relationships due to impulsive behavior?",
    "Do you often feel mentally exhausted due to overthinking or difficulty in processing information?",
  ],
  "Lifestyle & Daily Functioning": [
    "Do you struggle with time management, often running late or missing deadlines?",
    "Do you frequently procrastinate or find it difficult to start tasks?",
    "Do you experience difficulty in completing long-term projects due to lack of focus or motivation?",
    "Do you find it difficult to follow instructions or stay on track when performing complex tasks?",
    "How much do these symptoms affect your daily life, including work, school, or relationships?",
  ],
};

const ADHDQuestionnaire = () => {
  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans bg-black text-white min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">ADHD Questionnaire</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg shadow-lg">
        {Object.entries(questions).map(([section, qs]) => (
          <fieldset key={section} className="border border-gray-700 p-4 rounded-lg">
            <legend className="text-lg font-semibold text-blue-300">{section}</legend>
            {qs.map((q, idx) => (
              <div key={idx} className="mt-4">
                <label className="block font-medium text-gray-300">{q}</label>
                <div className="flex gap-4 mt-2">
                  {options.map((option) => (
                    <label key={option} className="flex items-center gap-2">
                      <input type="radio" name={q} value={option} onChange={handleChange} className="accent-blue-400" />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </fieldset>
        ))}

        <fieldset className="border border-gray-700 p-4 rounded-lg">
          <legend className="text-lg font-semibold text-blue-300">Additional Information</legend>
          <label className="block font-medium text-gray-300 mt-4">Do you have a formal ADHD diagnosis?</label>
          <div className="flex gap-4 mt-2">
            {["Yes", "No", "Not Sure"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input type="radio" name="adhdDiagnosis" value={option} onChange={handleChange} className="accent-blue-400" />
                {option}
              </label>
            ))}
          </div>

          <label className="block font-medium text-gray-300 mt-4">Do you have any other diagnosed conditions?</label>
          <div className="flex gap-4 mt-2">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input type="radio" name="otherConditions" value={option} onChange={handleChange} className="accent-blue-400" />
                {option}
              </label>
            ))}
          </div>

          <label className="block font-medium text-gray-300 mt-4">If yes, please specify:</label>
          <input type="text" name="conditionsDetails" onChange={handleChange} className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white" />

          <label className="block font-medium text-gray-300 mt-4">What strategies or treatments have you tried?</label>
          <textarea name="strategies" onChange={handleChange} className="w-full h-24 p-2 border border-gray-700 rounded-md bg-gray-800 text-white"></textarea>

          <label className="block font-medium text-gray-300 mt-4">Any other symptoms or concerns?</label>
          <textarea name="otherConcerns" onChange={handleChange} className="w-full h-24 p-2 border border-gray-700 rounded-md bg-gray-800 text-white"></textarea>
        </fieldset>

        <button type="submit" className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition">Submit</button>
      </form>
    </div>
  );
};

export default ADHDQuestionnaire;