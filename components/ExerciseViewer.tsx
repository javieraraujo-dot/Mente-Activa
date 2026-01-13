
import React, { useState, useEffect } from 'react';
import { Exercise, CategoryType } from '../types';
import { CategoryConfig } from '../constants';
import { ArrowLeft, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface ExerciseViewerProps {
  exercise: Exercise;
  onClose: () => void;
  onComplete: (id: string) => void;
}

const ExerciseViewer: React.FC<ExerciseViewerProps> = ({ exercise, onClose, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [scrambleInput, setScrambleInput] = useState('');
  const [gridState, setGridState] = useState<number[]>([]);
  const [isShowingGrid, setIsShowingGrid] = useState(false);
  const config = CategoryConfig[exercise.category];

  useEffect(() => {
    if (exercise.type === 'GRID_MEMORY') {
      startGridMemory();
    }
  }, [exercise.id]);

  const startGridMemory = () => {
    const totalCells = exercise.content.size * exercise.content.size;
    const pattern = Array.from({ length: totalCells }, (_, i) => i)
      .sort(() => Math.random() - 0.5)
      .slice(0, exercise.content.count);
    
    setGridState(pattern);
    setIsShowingGrid(true);
    setTimeout(() => setIsShowingGrid(false), 2500);
  };

  const handleChoice = (index: number) => {
    if (feedback) return;
    setSelectedOption(index);
    if (index === exercise.content.correctIndex) {
      setFeedback('correct');
      setTimeout(() => onComplete(exercise.id), 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 1500);
    }
  };

  const handleScrambleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (scrambleInput.toUpperCase() === exercise.content.word.toUpperCase()) {
      setFeedback('correct');
      setTimeout(() => onComplete(exercise.id), 1500);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col p-4 sm:p-8">
      <header className="flex items-center justify-between mb-8 max-w-2xl mx-auto w-full">
        <button 
          onClick={onClose}
          className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-all active:scale-95"
        >
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <div className="flex flex-col items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.lightColor} ${config.textColor}`}>
            {exercise.category}
          </span>
          <h2 className="text-xl font-bold text-slate-800 mt-1">{exercise.title}</h2>
        </div>
        <div className="w-12 h-12" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        <div className="bg-white p-8 rounded-3xl shadow-xl w-full border border-slate-100 mb-8">
          <p className="text-lg text-slate-600 mb-8 text-center leading-relaxed">
            {exercise.description}
          </p>

          {/* Render content based on type */}
          {exercise.type === 'MULTIPLE_CHOICE' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {exercise.content.options.map((opt: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => handleChoice(idx)}
                  className={`p-6 rounded-2xl text-lg font-bold border-4 transition-all ${
                    selectedOption === idx 
                      ? (idx === exercise.content.correctIndex ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                      : 'border-slate-100 bg-slate-50 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {exercise.type === 'WORD_SCRAMBLE' && (
            <form onSubmit={handleScrambleSubmit} className="flex flex-col items-center">
              <input 
                autoFocus
                type="text"
                value={scrambleInput}
                onChange={(e) => setScrambleInput(e.target.value.toUpperCase())}
                placeholder="Escribe la palabra..."
                className="w-full max-w-sm p-5 text-center text-3xl font-black tracking-widest text-slate-800 bg-slate-100 rounded-2xl border-4 border-transparent focus:border-blue-500 outline-none transition-all uppercase"
              />
              <button 
                type="submit"
                className="mt-6 px-10 py-4 bg-blue-600 text-white font-bold text-xl rounded-2xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all"
              >
                Comprobar
              </button>
            </form>
          )}

          {exercise.type === 'GRID_MEMORY' && (
            <div className="flex flex-col items-center">
              <div 
                className="grid gap-4" 
                style={{ gridTemplateColumns: `repeat(${exercise.content.size}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: exercise.content.size * exercise.content.size }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-20 h-20 rounded-2xl border-4 transition-all ${
                      isShowingGrid && gridState.includes(idx)
                        ? 'bg-purple-500 border-purple-600 scale-105'
                        : 'bg-slate-100 border-slate-200'
                    }`}
                  />
                ))}
              </div>
              {!isShowingGrid && (
                <p className="mt-8 text-slate-500 font-medium italic animate-pulse">
                  ¿Recuerdas dónde estaban los cuadros morados?
                </p>
              )}
              {isShowingGrid && (
                <div className="mt-8 flex items-center gap-2 text-purple-600 font-bold">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Memorizando...
                </div>
              )}
              {!isShowingGrid && (
                <button 
                  onClick={() => onComplete(exercise.id)}
                  className="mt-8 px-8 py-3 bg-purple-600 text-white rounded-xl font-bold"
                >
                  Ya lo tengo
                </button>
              )}
            </div>
          )}
        </div>

        {/* Feedback Area */}
        {feedback && (
          <div className="flex items-center gap-4 animate-bounce">
            {feedback === 'correct' ? (
              <div className="flex items-center gap-3 text-green-600 text-2xl font-black">
                <CheckCircle className="w-10 h-10" /> ¡Excelente!
              </div>
            ) : (
              <div className="flex items-center gap-3 text-red-600 text-2xl font-black">
                <XCircle className="w-10 h-10" /> Inténtalo de nuevo
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default ExerciseViewer;
