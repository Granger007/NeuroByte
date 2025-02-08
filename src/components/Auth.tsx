import React, { useState } from 'react';
import { useAuthStore } from '../store/auth';
import { Brain } from 'lucide-react';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'patient' | 'doctor' | 'parent'>('patient');
  const [relatedPerson, setRelatedPerson] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    setUser({
      id: '1',
      email: 'user@example.com',
      role,
      relatedPerson: relatedPerson || null,
    });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="bg-card p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Brain className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 bg-background border border-muted rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 bg-background border border-muted rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => {
                const selectedRole = e.target.value as 'patient' | 'doctor' | 'parent';
                setRole(selectedRole);
                setRelatedPerson(''); // Reset related person field when changing role
              }}
              className="w-full px-3 py-2 bg-background border border-muted rounded-md"
            >
              <option value="patient">Patient</option>
              <option value="parent">Parent</option>
              <option value="doctor">Doctor</option>
            </select>

          </div>

          {/* Additional fields based on role selection */}
          {role === 'patient' && (
            <div>
              <label className="block text-sm font-medium mb-1">Parent's Name</label>
              <input
                type="text" required
                placeholder="Enter parent's name"
                value={relatedPerson}
                onChange={(e) => setRelatedPerson(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-muted rounded-md"
              />
            </div>
          )}

          {role === 'parent' && (
            <div>
              <label className="block text-sm font-medium mb-1">Child's Name</label>
              <input
                type="text" 
                placeholder="Enter child's name"
                value={relatedPerson}
                onChange={(e) => setRelatedPerson(e.target.value)}
                required
                className="w-full px-3 py-2 bg-background border border-muted rounded-md"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 rounded-md transition-colors"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:text-primary-hover"
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
