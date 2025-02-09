import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain, Activity, GamepadIcon, LogOut,Stethoscope,HeartPulse,MessageCircleQuestionIcon } from 'lucide-react';
import { useAuthStore } from '../store/auth';
import { cn } from '../lib/utils';

function Navbar() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const handleLogout = () => {
    setUser(null);
  };

  const navItems = [
    {
      name: 'Home',
      path: '/',
      icon: Brain,
    },
    ...(user?.role === 'doctor'
      ? [
          {
            name: 'Diagnosis',
            path: '/diagnosis',
            icon: Activity,
          },
        ]
      : []),
      ...(user?.role === 'patient'
        ? [
            {
              name: 'Games',
              path: '/games',
              icon: GamepadIcon,
            },
            {
              name: 'Mindfulness',
              path: '/mindfulness',
              icon: HeartPulse,
            },
          ]
        : []),
        ...(user?.role === 'parent'
          ? [
            {
              name: 'Games',
              path: '/games',
              icon: GamepadIcon,
            },
            {
              name: 'Early Diagnosis of ADHD and Autism',
              path: '/earlydiagnosis',
              icon: MessageCircleQuestionIcon,
            },
            {
              name: 'Symptoms',
              path: '/symptom',
              icon: Stethoscope,
            },
            ]
          : []),
  ];

  return (
    <nav className="bg-card shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center space-x-2 text-sm font-medium transition-colors',
                  location.pathname === item.path
                    ? 'text-primary'
                    : 'text-foreground/60 hover:text-foreground'
                )}
              >
            {React.createElement(item.icon, { className: "w-4 h-4" })}
            <span>{item.name}</span>
              </Link>
            ))}
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar