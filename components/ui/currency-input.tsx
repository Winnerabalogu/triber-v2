"use client"

import React, { useState, useEffect } from 'react';
import { Input } from './input'; 
interface CurrencyInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function CurrencyInput({ value, onChange, placeholder }: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (value) {
      const formatted = Number(value).toLocaleString('en-US');
      setDisplayValue(formatted);
    } else {
      setDisplayValue('');
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numericValue = rawValue.replace(/[^\d]/g, '');

    
    onChange(numericValue);
    
    if (numericValue === '') {
      setDisplayValue('');
    } else {
      const formatted = Number(numericValue).toLocaleString('en-US');
      setDisplayValue(formatted);
    }
  };

  return (
    <Input
      type="text"
      inputMode="numeric" 
      placeholder={placeholder}
      value={displayValue}
      onChange={handleChange}
    />
  );
}