import React from 'react';
import { Link } from 'react-router-dom';

const EarlyDiagnosis = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold text-center mb-8">Early Diagnosis of ADHD and Autism</h1>
      
      <div className="flex space-x-6">
        <Link to="/adhdquestionnaire" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300">
          ADHD
        </Link>
        
        <Link to="/autismquestionnaire" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300">
          Autism
        </Link>
      </div>
    </div>
  );
};

export default EarlyDiagnosis;
