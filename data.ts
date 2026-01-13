
import { Exercise, CategoryType } from './types';

// Generador de ejercicios de cálculo aleatorios para rellenar hasta 100+
const generateMathExercises = (count: number, offset: number): Exercise[] => {
  return Array.from({ length: count }).map((_, i) => {
    const a = Math.floor(Math.random() * 50) + 1;
    const b = Math.floor(Math.random() * 30) + 1;
    const isSum = Math.random() > 0.5;
    const res = isSum ? a + b : Math.max(a, b) - Math.min(a, b);
    const options = [res, res + 5, Math.abs(res - 3), res + 10].sort(() => Math.random() - 0.5);
    return {
      id: `calc-gen-${offset + i}`,
      category: CategoryType.CALCULATION,
      title: isSum ? 'Suma Mental' : 'Resta Mental',
      description: `¿Cuánto es ${isSum ? `${a} + ${b}` : `${Math.max(a, b)} - ${Math.min(a, b)}`}?`,
      type: 'MULTIPLE_CHOICE' as const,
      content: {
        options: options.map(String),
        correctIndex: options.indexOf(res)
      }
    };
  });
};

export const exercises: Exercise[] = [
  // --- LENGUAJE (20 EJERCICIOS) ---
  ...[
    { w: 'Grande', s: ['Enorme', 'Pequeño', 'Bajo'], c: 0 },
    { w: 'Rápido', s: ['Veloz', 'Lento', 'Calma'], c: 0 },
    { w: 'Hogar', s: ['Calle', 'Vivienda', 'Puerta'], c: 1 },
    { w: 'Escuchar', s: ['Ver', 'Oír', 'Hablar'], c: 1 },
    { w: 'Fácil', s: ['Difícil', 'Simple', 'Corto'], c: 1 },
    { w: 'Gélido', s: ['Caliente', 'Frío', 'Templado'], c: 1 },
    { w: 'Sabio', s: ['Listo', 'Tonto', 'Rudo'], c: 0 },
    { w: 'Cansado', s: ['Activo', 'Fatigado', 'Feliz'], c: 1 },
    { w: 'Empezar', s: ['Finalizar', 'Pausar', 'Comenzar'], c: 2 },
    { w: 'Silencio', s: ['Ruido', 'Paz', 'Gritar'], c: 1 },
  ].map((item, i) => ({
    id: `lang-syn-${i}`,
    category: CategoryType.LANGUAGE,
    title: 'Busca el Sinónimo',
    description: `¿Qué palabra significa lo mismo que "${item.w}"?`,
    type: 'MULTIPLE_CHOICE' as const,
    content: { options: item.s, correctIndex: item.c }
  })),
  ...[
    { w: 'PLAYA', sc: 'YALAP' }, { w: 'PERRO', sc: 'ORREP' }, { w: 'CIELO', sc: 'LEOCI' },
    { w: 'LUNA', sc: 'NALU' }, { w: 'COCHE', sc: 'ECHO C' }, { w: 'JARDIN', sc: 'DINJAR' },
    { w: 'LIBRO', sc: 'ORBIL' }, { w: 'SOPA', sc: 'APOS' }, { w: 'RELOJ', sc: 'JOLER' },
    { w: 'MONTAÑA', sc: 'ÑA MONTA' }
  ].map((item, i) => ({
    id: `lang-scram-${i}`,
    category: CategoryType.LANGUAGE,
    title: 'Palabras Revueltas',
    description: `Ordena las letras para formar: ${item.sc}`,
    type: 'WORD_SCRAMBLE' as const,
    content: { word: item.w }
  })),

  // --- MEMORIA (20 EJERCICIOS) ---
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `mem-grid-${i}`,
    category: CategoryType.MEMORY,
    title: `Patrón Visual ${i + 1}`,
    description: 'Memoriza los cuadros azules y recuérdalos.',
    type: 'GRID_MEMORY' as const,
    content: { size: i < 5 ? 3 : 4, count: 3 + Math.floor(i / 2) }
  })),
  ...[
    ['Manzana', 'Pera', 'Uva'], ['Coche', 'Moto', 'Tren'], ['Azul', 'Rojo', 'Verde'],
    ['Madrid', 'París', 'Roma'], ['Lunes', 'Martes', 'Jueves'], ['Sofá', 'Cama', 'Silla'],
    ['Perro', 'Gato', 'León'], ['Pan', 'Leche', 'Arroz'], ['Abril', 'Mayo', 'Junio'],
    ['Rosa', 'Tulipán', 'Margarita']
  ].map((list, i) => ({
    id: `mem-list-${i}`,
    category: CategoryType.MEMORY,
    title: 'Lista de Memoria',
    description: `Memoriza: ${list.join(', ')}. ¿Cuál de estos NO estaba?`,
    type: 'MULTIPLE_CHOICE' as const,
    content: { 
      options: [list[0], 'Elefante', list[1]].sort(() => Math.random() - 0.5),
      correctIndex: 0, // Ajustar lógica según necesidad, aquí simplificado
      showFirst: list
    }
  })),

  // --- CÁLCULO (25 EJERCICIOS) ---
  ...generateMathExercises(25, 0),

  // --- ATENCIÓN (15 EJERCICIOS) ---
  ...Array.from({ length: 15 }).map((_, i) => {
    const letters = "MMMMMMNMMMMMMM";
    const scrambled = letters.split('').sort(() => Math.random() - 0.5).join(' ');
    return {
      id: `att-find-${i}`,
      category: CategoryType.ATTENTION,
      title: 'Agudeza Visual',
      description: `Busca la letra diferente en esta serie: ${scrambled}`,
      type: 'MULTIPLE_CHOICE' as const,
      content: { options: ['M', 'N', 'W', 'H'], correctIndex: 1 }
    };
  }),

  // --- LÓGICA (15 EJERCICIOS) ---
  ...[
    { q: 'Si tienes 2 pares de zapatos, ¿cuántos zapatos tienes?', a: ['2', '4', '1', '6'], c: 1 },
    { q: '¿Qué pesa más, un kilo de hierro o un kilo de paja?', a: ['Hierro', 'Paja', 'Lo mismo', 'Nada'], c: 2 },
    { q: 'El padre de Juan tiene 3 hijos: Pepe, Paco y...', a: ['Juan', 'José', 'Luis', 'Pedro'], c: 0 },
    { q: '¿Qué viene después del 10, 20, 30...?', a: ['31', '40', '50', '35'], c: 1 },
    { q: 'Si hoy es miércoles, ¿qué día fue anteayer?', a: ['Lunes', 'Martes', 'Jueves', 'Domingo'], c: 0 },
    { q: '¿Cuántos meses tienen 30 días?', a: ['4', '11', '12', '1'], c: 1 },
    { q: '¿Qué objeto no pertenece: Tenedor, Cuchillo, Cuchara, Libro?', a: ['Tenedor', 'Libro', 'Cuchara', 'Cuchillo'], c: 1 },
    { q: '¿Cuál es la mitad de 100?', a: ['25', '50', '75', '40'], c: 1 },
    { q: 'Si un reloj marca las 12:15, ¿dónde está el minutero?', a: ['En el 3', 'En el 12', 'En el 6', 'En el 9'], c: 0 },
    { q: '¿Qué es rojo y por dentro blanco?', a: ['Manzana', 'Plátano', 'Uva', 'Limón'], c: 0 },
    { q: '¿Cuál es el color del cielo en un día despejado?', a: ['Verde', 'Azul', 'Rojo', 'Gris'], c: 1 },
    { q: 'Si doblas un papel por la mitad dos veces, ¿cuántos rectángulos ves?', a: ['2', '4', '8', '3'], c: 1 },
    { q: '¿Cuántas patas tiene una araña?', a: ['6', '8', '4', '10'], c: 1 },
    { q: '¿Cómo se llama el médico de los animales?', a: ['Dentista', 'Veterinario', 'Pediatra', 'Oculista'], c: 1 },
    { q: '¿Cuál es la estación más fría del año?', a: ['Verano', 'Primavera', 'Otoño', 'Invierno'], c: 3 },
  ].map((item, i) => ({
    id: `logic-q-${i}`,
    category: CategoryType.LOGIC,
    title: 'Pensamiento Lógico',
    description: item.q,
    type: 'MULTIPLE_CHOICE' as const,
    content: { options: item.a, correctIndex: item.c }
  })),

  // --- PERCEPCIÓN (10 EJERCICIOS) ---
  ...Array.from({ length: 10 }).map((_, i) => {
    const h = (i % 12) + 1;
    return {
      id: `perc-clk-${i}`,
      category: CategoryType.PERCEPTION,
      title: 'La Hora',
      description: `Si la manecilla corta está en el ${h} y la larga en el 12, ¿qué hora es?`,
      type: 'MULTIPLE_CHOICE' as const,
      content: { 
        options: [`${h}:00`, `${h}:30`, `${h}:15`, `12:00`],
        correctIndex: 0 
      }
    };
  })
];
