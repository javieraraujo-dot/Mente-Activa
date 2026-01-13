
import React from 'react';
import { Brain, MessageCircle, Calculator, Eye, Lightbulb, Compass } from 'lucide-react';
import { CategoryType } from './types';

export const CategoryConfig = {
  [CategoryType.MEMORY]: {
    icon: <Brain className="w-6 h-6" />,
    color: 'bg-purple-500',
    lightColor: 'bg-purple-100',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200'
  },
  [CategoryType.LANGUAGE]: {
    icon: <MessageCircle className="w-6 h-6" />,
    color: 'bg-blue-500',
    lightColor: 'bg-blue-100',
    textColor: 'text-blue-700',
    borderColor: 'border-blue-200'
  },
  [CategoryType.CALCULATION]: {
    icon: <Calculator className="w-6 h-6" />,
    color: 'bg-green-500',
    lightColor: 'bg-green-100',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  },
  [CategoryType.ATTENTION]: {
    icon: <Eye className="w-6 h-6" />,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-100',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200'
  },
  [CategoryType.LOGIC]: {
    icon: <Lightbulb className="w-6 h-6" />,
    color: 'bg-red-500',
    lightColor: 'bg-red-100',
    textColor: 'text-red-700',
    borderColor: 'border-red-200'
  },
  [CategoryType.PERCEPTION]: {
    icon: <Compass className="w-6 h-6" />,
    color: 'bg-teal-500',
    lightColor: 'bg-teal-100',
    textColor: 'text-teal-700',
    borderColor: 'border-teal-200'
  }
};
