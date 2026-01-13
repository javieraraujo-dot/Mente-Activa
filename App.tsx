
import React, { useState, useMemo, useEffect } from 'react';
import { exercises } from './data';
import { CategoryType, Exercise, UserStats } from './types';
import { CategoryConfig } from './constants';
import ExerciseCard from './components/ExerciseCard';
import ExerciseViewer from './components/ExerciseViewer';
import { Brain, Trophy, History, LayoutGrid, Search, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryType | 'All'>('All');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem('mente_activa_stats');
      return saved ? JSON.parse(saved) : { completedIds: [], totalPoints: 0 };
    } catch (e) {
      return { completedIds: [], totalPoints: 0 };
    }
  });

  useEffect(() => {
    localStorage.setItem('mente_activa_stats', JSON.stringify(stats));
  }, [stats]);

  const resetProgress = () => {
    if (confirm('¿Estás seguro de que quieres borrar todo tu progreso?')) {
      const empty = { completedIds: [], totalPoints: 0 };
      setStats(empty);
      localStorage.setItem('mente_activa_stats', JSON.stringify(empty));
    }
  };

  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => {
      const matchesCategory = activeCategory === 'All' || ex.category === activeCategory;
      const matchesSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            ex.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const activeExercise = useMemo(() => 
    exercises.find(ex => ex.id === selectedExerciseId), 
    [selectedExerciseId]
  );

  const handleComplete = (id: string) => {
    setStats(prev => {
      if (prev.completedIds.includes(id)) return prev;
      return {
        completedIds: [...prev.completedIds, id],
        totalPoints: prev.totalPoints + 10
      };
    });
    setSelectedExerciseId(null);
  };

  const categories = Object.values(CategoryType);
  const progressPercent = Math.round((stats.completedIds.length / exercises.length) * 100);

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <Brain className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 leading-none">Mente Activa</h1>
              <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-bold">Ejercicios Diarios</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <button 
              onClick={resetProgress}
              className="p-3 text-slate-400 hover:text-red-500 transition-colors"
              title="Reiniciar progreso"
            >
              <Trash2 className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-slate-700">{stats.totalPoints} pts</span>
            </div>
            <div className="px-4 py-2 bg-amber-100 rounded-xl text-amber-700 border border-amber-200 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <span className="font-black text-lg">{stats.completedIds.length}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 mt-8">
        {/* Progress Summary */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-[2rem] p-8 md:p-12 text-white mb-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl font-black mb-4">¡Hola! Qué alegría verte.</h2>
            <p className="opacity-90 max-w-lg text-xl mb-8">
              Has completado {stats.completedIds.length} ejercicios hoy. Mantener la mente activa es el mejor regalo para tu salud.
            </p>
            
            <div className="max-w-md">
               <div className="flex justify-between items-end mb-3">
                 <span className="text-base font-bold uppercase tracking-wider opacity-80">Tu progreso total</span>
                 <span className="text-3xl font-black">{progressPercent}%</span>
               </div>
               <div className="w-full h-5 bg-white/20 rounded-full overflow-hidden border border-white/10 shadow-inner">
                 <div 
                   className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out" 
                   style={{ width: `${progressPercent}%` }} 
                 />
               </div>
               <p className="mt-4 text-sm opacity-70 italic">
                 {progressPercent < 30 ? "¡Buen comienzo! Sigue así." : progressPercent < 70 ? "¡Vas por muy buen camino!" : "¡Eres todo un experto!"}
               </p>
            </div>
          </div>
          <Brain className="absolute -right-16 -bottom-16 w-80 h-80 text-white/10 rotate-12" />
        </div>

        {/* Filtros y Buscador */}
        <div className="space-y-6 mb-12">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6 transition-colors group-focus-within:text-blue-500" />
            <input 
              type="text"
              placeholder="¿Qué quieres practicar hoy? Escribe aquí..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-200 rounded-[1.5rem] focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm text-xl"
            />
          </div>
          
          <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar scroll-smooth">
            <button
              onClick={() => setActiveCategory('All')}
              className={`flex items-center gap-3 px-8 py-5 rounded-2xl font-bold whitespace-nowrap transition-all border-2 ${
                activeCategory === 'All' 
                ? 'bg-slate-900 border-slate-900 text-white shadow-xl scale-105' 
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              <LayoutGrid className="w-6 h-6" />
              Todos los ejercicios
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex items-center gap-3 px-8 py-5 rounded-2xl font-bold whitespace-nowrap transition-all border-2 ${
                  activeCategory === cat 
                  ? `${CategoryConfig[cat].color} ${CategoryConfig[cat].borderColor.replace('border-', 'border-opacity-50 border-')} text-white shadow-xl scale-105` 
                  : `bg-white border-slate-200 text-slate-600 hover:border-slate-300`
                }`}
              >
                {CategoryConfig[cat].icon}
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Ejercicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredExercises.map(ex => (
            <ExerciseCard 
              key={ex.id}
              exercise={ex}
              isCompleted={stats.completedIds.includes(ex.id)}
              onClick={setSelectedExerciseId}
            />
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300 mb-6">
              <Search className="w-12 h-12" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">No hemos encontrado nada</h3>
            <p className="text-slate-500 text-lg">Prueba a escribir otra cosa o cambia de categoría.</p>
          </div>
        )}
      </main>

      {/* Footer / Info */}
      <footer className="mt-24 py-12 border-t border-slate-200 text-center">
        <p className="text-slate-400 font-medium">© 2024 Mente Activa • Tu gimnasio cerebral</p>
      </footer>

      {/* Visor de Ejercicios */}
      {activeExercise && (
        <ExerciseViewer 
          exercise={activeExercise}
          onClose={() => setSelectedExerciseId(null)}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
};

export default App;
