'use client';

import { useState, useEffect } from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const [strength, setStrength] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  useEffect(() => {
    if (!password) {
      setStrength(0);
      setFeedback([]);
      return;
    }

    let score = 0;
    const newFeedback: string[] = [];

    // Length check
    if (password.length >= 8) {
      score += 1;
    } else {
      newFeedback.push('Mínimo 8 caracteres');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      newFeedback.push('Una mayúscula');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      newFeedback.push('Una minúscula');
    }

    // Number check
    if (/\d/.test(password)) {
      score += 1;
    } else {
      newFeedback.push('Un número');
    }

    // Special character check
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      score += 1;
    } else {
      newFeedback.push('Un carácter especial');
    }

    setStrength(score);
    setFeedback(newFeedback);
  }, [password]);

  const getStrengthColor = () => {
    if (strength <= 1) return 'bg-red-500';
    if (strength === 2) return 'bg-orange-500';
    if (strength === 3) return 'bg-yellow-500';
    if (strength === 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getStrengthLabel = () => {
    if (strength === 0) return '';
    if (strength <= 1) return 'Muy débil';
    if (strength === 2) return 'Débil';
    if (strength === 3) return 'Regular';
    if (strength === 4) return 'Fuerte';
    return 'Muy fuerte';
  };

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-600">Fortaleza de contraseña</span>
        <span className="text-xs font-medium text-slate-700">{getStrengthLabel()}</span>
      </div>
      <div className="flex gap-1 h-1.5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`flex-1 rounded-full transition-all duration-300 ${
              i < strength ? getStrengthColor() : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      {feedback.length > 0 && feedback.length !== 5 && (
        <ul className="mt-2 text-xs text-slate-500 space-y-1">
          {feedback.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
