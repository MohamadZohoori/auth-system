"use client"

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { validateIranianPhoneNumber } from '@/lib/utils/validation';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onValidityChange: (isValid: boolean) => void;
}

export function PhoneInput({ value, onChange, onValidityChange }: PhoneInputProps) {
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    
    if (newValue.trim() === '') {
      setError(null);
      onValidityChange(false);
      return;
    }
    
    const isValid = validateIranianPhoneNumber(newValue);
    
    if (!isValid) {
      setError('Please enter a valid Iranian phone number');
      onValidityChange(false);
    } else {
      setError(null);
      onValidityChange(true);
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="phone" className="text-sm font-medium">
        Phone Number
      </Label>
      <Input
        id="phone"
        type="tel"
        placeholder="Enter your Iranian phone number"
        value={value}
        onChange={handleChange}
        className={`w-full max-md:text-sm ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? "phone-error" : undefined}
      />
      {error && (
        <p id="phone-error" className="text-sm text-red-500">
          {error}
        </p>
      )}
      <p className="text-xs text-gray-500">
        Valid formats: 09xxxxxxxxx, +989xxxxxxxxx, 00989xxxxxxxxx
      </p>
    </div>
  );
}