import React, { useState } from 'react';
import { Activity, Upload } from 'lucide-react';
import { useAuthStore } from '../store/auth';

function Diagnosis() {

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-center mb-8">
        <Activity className="w-12 h-12 text-primary mr-4" />
        <h1 className="text-3xl font-bold">AI-Powered Diagnosis</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">ADHD Analysis</h2>
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-foreground/60">Upload MRI or NIfTI (.nii) data for ADHD analysis</p>
            <input type="file" accept=".nii" className="mt-4" />
          </div>
        </div>
        <div className="bg-card rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Autism Analysis</h2>
          <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-muted mx-auto mb-4" />
            <p className="text-foreground/60">Upload MRI or NIfTI (.nii) data for Autism analysis</p>
            <input type="file" accept=".nii" className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Diagnosis
