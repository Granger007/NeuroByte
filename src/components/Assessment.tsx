import React, { useState, useEffect } from 'react';
import { Brain, ChevronLeft, ChevronRight } from 'lucide-react';

const successStories = [
  {
    name: "Elon Musk",
    description: "CEO of Tesla and SpaceX, Elon Musk has spoken about having Asperger's, a form of autism, and how it shaped his innovative thinking.",
    image: "https://image.cnbcfm.com/api/v1/image/105318483-1531153006021gettyimages-872508684.jpg?v=1562101726",
  },
  {
    name: "Bill Gates",
    description: "Co-founder of Microsoft, Bill Gates has been speculated to have traits of autism, demonstrating deep focus and problem-solving skills.",
    image: "https://www.cnet.com/a/img/resize/a6c9095f1802fc18a9a859c92b85bc05db3d2eb4/hub/2017/03/03/490ea9b8-6990-418e-bb53-5006486b4b15/475777424.jpg?auto=webp&fit=crop&height=675&width=1200",
  },
  {
    name: "Michael Phelps",
    description: "Olympic swimmer Michael Phelps was diagnosed with ADHD as a child and turned his hyperactivity into record-breaking athletic performance.",
    image: "https://img.olympics.com/images/image/private/t_16-9_760/f_auto/primary/pclp6xjzott0voxzaxra",
  },
];

const misconceptionsADHD = [
  {
    myth: "Only Children Have ADHD",
    fact: "ADHD often persists into adulthood, affecting work, relationships, and daily life.",
  },
  {
    myth: "People with ADHD Are Lazy or Unintelligent",
    fact: "ADHD affects executive function, not intelligence. Many individuals with ADHD are highly intelligent but may struggle with organization, deadlines, and focus.",
  },
  {
    myth: "People with ADHD Just Need to Try Harder",
    fact: "ADHD is a neurological condition, not about willpower. Telling someone to 'just focus' is like telling a nearsighted person to 'just see better' without glasses.",
  },
];

const misconceptionsAutism = [
  {
    myth: "Autism Is Just a Lack of Social Skills",
    fact: "Autism is a complex neurodevelopmental condition that affects various aspects of life, including communication, sensory processing, and behavior. Social challenges are just one part of the spectrum.",
  },
  {
    myth: "People with Autism Can’t Lead Successful Lives",
    fact: "Many people with autism are capable of living independent, fulfilling lives, excelling in education, careers, and personal interests. Early intervention and support can help maximize their potential.",
  },
  {
    myth: "People with Autism Don’t Have Emotions",
    fact: "People with autism experience a wide range of emotions but may express them differently. Social communication differences can make it harder for them to express or recognize emotions.",
  },
];

function Assessment() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === successStories.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? successStories.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === successStories.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-8">
        <Brain className="w-12 h-12 text-primary mr-4" />
        <h1 className="text-3xl font-bold">Welcome to NeuroByte</h1>
      </div>
      <div className="mt-8 bg-card rounded-lg p-6 shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Success Stories</h2>
        <img src={successStories[currentIndex].image} alt={successStories[currentIndex].name} className="w-86 h-64 mx-auto rounded-none mb-8" />
        <p className="text-lg mb-4">{successStories[currentIndex].description}</p>
        <p className="font-semibold">- {successStories[currentIndex].name}</p>
        <div className="flex justify-center mt-4 space-x-4">
          <button onClick={prevSlide} className="p-2 bg-primary text-white rounded-full">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="p-2 bg-primary text-white rounded-full">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      

      <div className="mt-8 bg-card rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Common Stigma & Misconceptions About ADHD</h2>
        <div className="space-y-6">
          {misconceptionsADHD.map((item, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
              <p className="text-xl font-semibold text-red-500">🚫 Myth: {item.myth}</p>
              <p className="text-lg text-green-400">✅ Fact: {item.fact}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-card rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Common Stigma & Misconceptions About Autism</h2>
        <div className="space-y-6">
          {misconceptionsAutism.map((item, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
              <p className="text-xl font-semibold text-red-500">🚫 Myth: {item.myth}</p>
              <p className="text-lg text-green-400">✅ Fact: {item.fact}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Assessment;