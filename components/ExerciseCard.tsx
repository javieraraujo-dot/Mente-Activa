
import React from 'react';
import { Exercise, CategoryType } from '../types';
import { CategoryConfig } from '../constants';
import { CheckCircle2 } from 'lucide-react';

interface ExerciseCardProps {
  exercise: Exercise;
  isCompleted: boolean;
  onClick: (id: string) => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, isCompleted, onClick }) => {
  const config = CategoryConfig[exercise.category];

  return (
    <button
      onClick={() => onClick(exercise.id)}
      className={`relative flex flex-col p-4 w-full bg-white rounded-2xl border-2 transition-all duration-200 text-left hover:shadow-lg active:scale-[0.98] ${
        isCompleted ? 'border-green-200' : config.borderColor
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-xl ${config.lightColor} ${config.textColor}`}>
          {config.icon}
        </div>
        {isCompleted && (
          <CheckCircle2 className="w-6 h-6 text-green-500" />
        )}
      </div>
      
      <h3 className="font-bold text-lg text-slate-800 leading-tight mb-1">
        {exercise.title}
      </h3>
      <p className="text-sm text-slate-500 line-clamp-2">
        {exercise.category} • {exercise.description}
      </p>

      {isCompleted && (
        <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
          Completado
        </div>
      )}
    </button>
  );
};

export default ExerciseCard;
