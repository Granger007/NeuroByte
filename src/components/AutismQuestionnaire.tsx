import React, { useState } from "react";

const options = ["Never", "Rarely", "Sometimes", "Often", "Very Often"];

const questions = {
  "Social Communication & Interaction": [
    "Do you find it difficult to start or maintain conversations with others?",
    "Do you struggle to understand non-verbal cues like facial expressions, gestures, or tone of voice?",
    "Do you find it challenging to maintain eye contact during conversations?",
    "Do you often take things literally and find it difficult to understand jokes, sarcasm, or figurative speech?",
    "Do you feel uncomfortable in social situations or prefer to be alone?",
    "Do you struggle with understanding personal space and boundaries?",
  ],
  "Repetitive Behaviors & Routines": [
    "Do you engage in repetitive body movements (e.g., hand-flapping, rocking, spinning)?",
    "Do you have a strong need for routines and get upset when they are disrupted?",
    "Do you intensely focus on specific topics or interests for long periods?",
    "Do you repeat words, phrases, or questions frequently (echolalia)?",
    "Do you prefer engaging in the same activities repeatedly rather than trying new things?",
  ],
  "Sensory Sensitivities": [
    "Are you highly sensitive to certain sounds, lights, or textures?",
    "Do you find certain clothing, tags, or fabrics extremely uncomfortable?",
    "Do you experience strong reactions to specific smells or tastes?",
    "Do you dislike being touched or hugged unless you initiate it?",
    "Do you seek out sensory stimulation, such as touching different textures, smelling objects, or staring at lights?",
  ],
  "Emotional Regulation & Daily Functioning": [
    "Do you struggle with managing emotions and experience frequent meltdowns or shutdowns?",
    "Do you find changes in routine or unexpected events extremely distressing?",
    "Do you have difficulty making decisions or feel overwhelmed by too many choices?",
    "Do you find it hard to express your emotions or understand the emotions of others?",
  ],
};

const AutismQuestionnaire = () => {
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
      <h1 className="text-3xl font-bold text-center text-blue-400 mb-6">Autism Questionnaire</h1>
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
          <label className="block font-medium text-gray-300 mt-4">Do you have a formal autism diagnosis?</label>
          <div className="flex gap-4 mt-2">
            {["Yes", "No", "Not Sure"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input type="radio" name="autismDiagnosis" value={option} onChange={handleChange} className="accent-blue-400" />
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

export default AutismQuestionnaire;