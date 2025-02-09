import React, { useState } from "react";

const options = ["Never", "Rarely", "Sometimes", "Often", "Very Often"];

const optionValues = {
  "Never": 1,
  "Rarely": 2,
  "Sometimes": 3,
  "Often": 4,
  "Very Often": 5
};

const questions = {
  "Social Communication & Interaction": [
    "Does your ward find it difficult to start or maintain conversations with others?",
    "Does your ward struggle to understand non-verbal cues like facial expressions, gestures, or tone of voice?",
    "Does your ward find it challenging to maintain eye contact during conversations?",
    "Does your ward often take things literally and find it difficult to understand jokes, sarcasm, or figurative speech?",
    "Does your ward feel uncomfortable in social situations or prefer to be alone?",
    "Does your ward struggle with understanding personal space and boundaries?",
  ],
  "Repetitive Behaviors & Routines": [
    "Does your ward engage in repetitive body movements (e.g., hand-flapping, rocking, spinning)?",
    "Does your ward have a strong need for routines and get upset when they are disrupted?",
    "Does your ward intensely focus on specific topics or interests for long periods?",
    "Does your ward frequently repeat words, phrases, or questions (echolalia)?",
    "Does your ward prefer engaging in the same activities repeatedly rather than trying new things?",
  ],
  "Sensory Sensitivities": [
    "Is your ward highly sensitive to certain sounds, lights, or textures?",
    "Does your ward find certain clothing, tags, or fabrics extremely uncomfortable?",
    "Does your ward experience strong reactions to specific smells or tastes?",
    "Does your ward dislike being touched or hugged unless they initiate it?",
    "Does your ward seek out sensory stimulation, such as touching different textures, smelling objects, or staring at lights?",
  ],
  "Emotional Regulation & Daily Functioning": [
    "Does your ward struggle with managing emotions and experience frequent meltdowns or shutdowns?",
    "Does your ward find changes in routine or unexpected events extremely distressing?",
    "Does your ward have difficulty making decisions or feel overwhelmed by too many choices?",
    "Does your ward find it hard to express emotions or understand the emotions of others?",
  ],
};


const AutismQuestionnaire = () => {
  const [formData, setFormData] = useState({});
  const [totalScore, setTotalScore] = useState(0);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Calculate total score
    let score = 0;
    Object.values(formData).forEach((response) => {
      if (optionValues[response]) {
        score += optionValues[response];
      }
    });

    setTotalScore(score);
    console.log("Total Score:", score);
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

      {totalScore > 0 && (
        <div className="mt-6 text-center text-xl text-blue-300">
          <h2>Total Score: {totalScore}</h2>
        </div>
      )}
    </div>
  );
};

export default AutismQuestionnaire;