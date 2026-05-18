'use client';

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepItemProps {
  number: number;
  text: string;
  active?: boolean;
}

export function StepItem({ number, text, active = false }: StepItemProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-xl border transition-all',
        active
          ? 'bg-white text-black border-white'
          : 'bg-brandGray text-white border-none'
      )}
    >
      <div
        className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center text-sm font-semibold',
          active ? 'bg-black text-white' : 'bg-white/10 text-white/40'
        )}
      >
        {number}
      </div>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

export function SocialButton({ icon, label, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center gap-3 bg-black border border-white/10 rounded-xl hover:bg-white/5 transition-all text-white px-4 py-3"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

interface InputGroupProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  helperText?: string;
  required?: boolean;
  name?: string;
}

export function InputGroup({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  showPasswordToggle = false,
  showPassword = false,
  onTogglePassword,
  helperText,
  required = false,
  name,
}: InputGroupProps) {
  const inputType = showPasswordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-white">
        {label} {required && <span className="text-white/40">*</span>}
      </label>
      <div className="relative">
        <input
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="w-full bg-brandGray border-none rounded-xl h-11 px-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 focus:outline-none transition-all"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {helperText && (
        <p className="text-xs text-white/40">{helperText}</p>
      )}
    </div>
  );
}