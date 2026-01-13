
export enum CategoryType {
  MEMORY = 'Memoria',
  LANGUAGE = 'Lenguaje',
  CALCULATION = 'Cálculo',
  ATTENTION = 'Atención',
  LOGIC = 'Lógica',
  PERCEPTION = 'Percepción'
}

export type ExerciseType = 
  | 'MULTIPLE_CHOICE' 
  | 'GRID_MEMORY' 
  | 'WORD_SCRAMBLE' 
  | 'CLOCK_READING' 
  | 'SEQUENCE_COMPLETION' 
  | 'MATH_PUZZLE';

export interface Exercise {
  id: string;
  category: CategoryType;
  title: string;
  description: string;
  type: ExerciseType;
  content: any;
}

export interface UserStats {
  completedIds: string[];
  totalPoints: number;
}
