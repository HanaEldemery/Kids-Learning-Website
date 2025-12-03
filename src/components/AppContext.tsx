import { createContext, useContext, useState, ReactNode } from 'react';

export interface Child {
  id: string;
  name: string;
  username: string;
  password: string;
  avatar?: string; // Avatar emoji
  accuracy: number;
  correctCount: number;
  correctWithinTimerCount: number;
  incorrectCount: number;
  exerciseHistory: ExerciseRecord[];
}

export interface Parent {
  id: string;
  username: string;
  password: string;
  email: string;
  children: Child[];
}

export interface QuizQuestion {
  id: string;
  subject: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ExerciseRecord {
  id: string;
  questionId: string;
  subject: string;
  question: string;
  options: string[];
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
  withinTime: boolean;
  timeSpent: number;
  timestamp: Date;
}

type Screen = 
  | 'welcome' 
  | 'parent-login' 
  | 'parent-signup' 
  | 'child-login' 
  | 'parent-home'
  | 'parent-dashboard' 
  | 'child-performance-groups'
  | 'exercise-categories'
  | 'exercise-list'
  | 'create-child' 
  | 'topic-selection' 
  | 'quiz' 
  | 'performance' 
  | 'incorrect-exercises'
  | 'account-info'
  | 'edit-account'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'forgot-password';

interface AppContextType {
  currentUser: Parent | Child | null;
  userType: 'parent' | 'child' | null;
  selectedChild: Child | null;
  selectedGroup: 'correct' | 'timer' | 'incorrect' | null;
  selectedSubject: string | null;
  currentScreen: Screen;
  currentTopic: string | null;
  navigate: (screen: Screen, data?: any) => void;
  login: (username: string, password: string, type: 'parent' | 'child') => boolean;
  logout: () => void;
  signupParent: (username: string, password: string, email: string) => boolean;
  createChild: (name: string, username: string, password: string) => boolean;
  selectChild: (childId: string) => void;
  selectGroup: (group: 'correct' | 'timer' | 'incorrect') => void;
  selectSubject: (subject: string) => void;
  deleteChild: (childId: string) => void;
  submitQuizAnswer: (answer: Omit<ExerciseRecord, 'id' | 'timestamp'>) => void;
  updateParentInfo: (username: string, email: string) => void;
  updateChildInfo: (name: string, username: string) => void;
  updateChildAvatar: (avatar: string) => void;
  updateParentChildInfo: (childId: string, name: string, username: string, password: string) => void;
  parents: Parent[];
  children: Child[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data with more exercises - 20 questions per subject
export const mockQuizQuestions: QuizQuestion[] = [
  // Maths questions (20 total)
  {
    id: '1',
    subject: 'Maths',
    question: 'What is 5 + 3?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'When you add 5 and 3 together, you get 8.'
  },
  {
    id: '2',
    subject: 'Maths',
    question: 'What is 12 - 4?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 2,
    explanation: 'When you subtract 4 from 12, you get 8.'
  },
  {
    id: '3',
    subject: 'Maths',
    question: 'What is 7 × 2?',
    options: ['12', '14', '16', '18'],
    correctAnswer: 1,
    explanation: '7 multiplied by 2 equals 14.'
  },
  {
    id: '4',
    subject: 'Maths',
    question: 'What is 20 ÷ 4?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 1,
    explanation: '20 divided by 4 equals 5.'
  },
  {
    id: '5',
    subject: 'Maths',
    question: 'What is 9 + 6?',
    options: ['13', '14', '15', '16'],
    correctAnswer: 2,
    explanation: 'When you add 9 and 6, you get 15.'
  },
  {
    id: '6',
    subject: 'Maths',
    question: 'What is 18 - 9?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 2,
    explanation: 'When you subtract 9 from 18, you get 9.'
  },
  {
    id: '7',
    subject: 'Maths',
    question: 'What is 6 × 3?',
    options: ['15', '16', '17', '18'],
    correctAnswer: 3,
    explanation: '6 multiplied by 3 equals 18.'
  },
  {
    id: '8',
    subject: 'Maths',
    question: 'What is 25 ÷ 5?',
    options: ['3', '4', '5', '6'],
    correctAnswer: 2,
    explanation: '25 divided by 5 equals 5.'
  },
  {
    id: 'm9',
    subject: 'Maths',
    question: 'What is 8 + 7?',
    options: ['14', '15', '16', '17'],
    correctAnswer: 1,
    explanation: 'When you add 8 and 7, you get 15.'
  },
  {
    id: 'm10',
    subject: 'Maths',
    question: 'What is 16 - 7?',
    options: ['7', '8', '9', '10'],
    correctAnswer: 2,
    explanation: 'When you subtract 7 from 16, you get 9.'
  },
  {
    id: 'm11',
    subject: 'Maths',
    question: 'What is 4 × 5?',
    options: ['15', '20', '25', '30'],
    correctAnswer: 1,
    explanation: '4 multiplied by 5 equals 20.'
  },
  {
    id: 'm12',
    subject: 'Maths',
    question: 'What is 36 ÷ 6?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: '36 divided by 6 equals 6.'
  },
  {
    id: 'm13',
    subject: 'Maths',
    question: 'What is 11 + 9?',
    options: ['18', '19', '20', '21'],
    correctAnswer: 2,
    explanation: 'When you add 11 and 9, you get 20.'
  },
  {
    id: 'm14',
    subject: 'Maths',
    question: 'What is 24 - 8?',
    options: ['14', '15', '16', '17'],
    correctAnswer: 2,
    explanation: 'When you subtract 8 from 24, you get 16.'
  },
  {
    id: 'm15',
    subject: 'Maths',
    question: 'What is 9 × 4?',
    options: ['32', '34', '36', '38'],
    correctAnswer: 2,
    explanation: '9 multiplied by 4 equals 36.'
  },
  {
    id: 'm16',
    subject: 'Maths',
    question: 'What is 42 ÷ 7?',
    options: ['5', '6', '7', '8'],
    correctAnswer: 1,
    explanation: '42 divided by 7 equals 6.'
  },
  {
    id: 'm17',
    subject: 'Maths',
    question: 'What is 13 + 8?',
    options: ['19', '20', '21', '22'],
    correctAnswer: 2,
    explanation: 'When you add 13 and 8, you get 21.'
  },
  {
    id: 'm18',
    subject: 'Maths',
    question: 'What is 30 - 12?',
    options: ['16', '17', '18', '19'],
    correctAnswer: 2,
    explanation: 'When you subtract 12 from 30, you get 18.'
  },
  {
    id: 'm19',
    subject: 'Maths',
    question: 'What is 8 × 6?',
    options: ['42', '44', '46', '48'],
    correctAnswer: 3,
    explanation: '8 multiplied by 6 equals 48.'
  },
  {
    id: 'm20',
    subject: 'Maths',
    question: 'What is 56 ÷ 8?',
    options: ['6', '7', '8', '9'],
    correctAnswer: 1,
    explanation: '56 divided by 8 equals 7.'
  },
  // English questions (20 total)
  {
    id: '9',
    subject: 'English',
    question: 'Which word is a noun?',
    options: ['Run', 'Happy', 'Book', 'Quickly'],
    correctAnswer: 2,
    explanation: 'A noun is a person, place, or thing. "Book" is a thing.'
  },
  {
    id: '10',
    subject: 'English',
    question: 'Which word is a verb?',
    options: ['Cat', 'Jump', 'Blue', 'Tall'],
    correctAnswer: 1,
    explanation: 'A verb is an action word. "Jump" is an action.'
  },
  {
    id: '11',
    subject: 'English',
    question: 'What is the plural of "child"?',
    options: ['Childs', 'Children', 'Childes', 'Childrens'],
    correctAnswer: 1,
    explanation: 'The plural of "child" is "children".'
  },
  {
    id: '12',
    subject: 'English',
    question: 'Which word is an adjective?',
    options: ['Run', 'Beautiful', 'Table', 'Swim'],
    correctAnswer: 1,
    explanation: 'An adjective describes a noun. "Beautiful" describes something.'
  },
  {
    id: '13',
    subject: 'English',
    question: 'What is the opposite of "hot"?',
    options: ['Warm', 'Cold', 'Cool', 'Freezing'],
    correctAnswer: 1,
    explanation: 'The opposite of "hot" is "cold".'
  },
  {
    id: '14',
    subject: 'English',
    question: 'Which sentence is correct?',
    options: ['She go to school', 'She goes to school', 'She going to school', 'She gone to school'],
    correctAnswer: 1,
    explanation: 'The correct form is "She goes to school".'
  },
  {
    id: 'e7',
    subject: 'English',
    question: 'What is the past tense of "run"?',
    options: ['Runned', 'Ran', 'Running', 'Runs'],
    correctAnswer: 1,
    explanation: 'The past tense of "run" is "ran".'
  },
  {
    id: 'e8',
    subject: 'English',
    question: 'Which word rhymes with "cat"?',
    options: ['Dog', 'Hat', 'House', 'Tree'],
    correctAnswer: 1,
    explanation: '"Hat" rhymes with "cat" because they both end in "-at".'
  },
  {
    id: 'e9',
    subject: 'English',
    question: 'What is a synonym for "happy"?',
    options: ['Sad', 'Joyful', 'Angry', 'Tired'],
    correctAnswer: 1,
    explanation: '"Joyful" means the same as "happy".'
  },
  {
    id: 'e10',
    subject: 'English',
    question: 'Which word is a pronoun?',
    options: ['Book', 'Run', 'She', 'Beautiful'],
    correctAnswer: 2,
    explanation: 'A pronoun replaces a noun. "She" is a pronoun.'
  },
  {
    id: 'e11',
    subject: 'English',
    question: 'What is the plural of "box"?',
    options: ['Boxs', 'Boxes', 'Boxies', 'Boxen'],
    correctAnswer: 1,
    explanation: 'The plural of "box" is "boxes".'
  },
  {
    id: 'e12',
    subject: 'English',
    question: 'Which word is an adverb?',
    options: ['Quick', 'Quickly', 'Quickness', 'Quicker'],
    correctAnswer: 1,
    explanation: 'An adverb describes how something is done. "Quickly" is an adverb.'
  },
  {
    id: 'e13',
    subject: 'English',
    question: 'What is the opposite of "big"?',
    options: ['Large', 'Huge', 'Small', 'Tiny'],
    correctAnswer: 2,
    explanation: 'The opposite of "big" is "small".'
  },
  {
    id: 'e14',
    subject: 'English',
    question: 'Which sentence has correct punctuation?',
    options: ['How are you', 'How are you.', 'How are you?', 'How are you!'],
    correctAnswer: 2,
    explanation: 'Questions should end with a question mark.'
  },
  {
    id: 'e15',
    subject: 'English',
    question: 'What is a compound word?',
    options: ['Running', 'Sunshine', 'Beautiful', 'Quickly'],
    correctAnswer: 1,
    explanation: '"Sunshine" is made of two words: "sun" and "shine".'
  },
  {
    id: 'e16',
    subject: 'English',
    question: 'Which word means the same as "start"?',
    options: ['End', 'Begin', 'Finish', 'Stop'],
    correctAnswer: 1,
    explanation: '"Begin" means the same as "start".'
  },
  {
    id: 'e17',
    subject: 'English',
    question: 'What is the plural of "mouse"?',
    options: ['Mouses', 'Mice', 'Mices', 'Mousies'],
    correctAnswer: 1,
    explanation: 'The plural of "mouse" is "mice".'
  },
  {
    id: 'e18',
    subject: 'English',
    question: 'Which word is a preposition?',
    options: ['Under', 'Jump', 'Happy', 'Book'],
    correctAnswer: 0,
    explanation: 'A preposition shows position or direction. "Under" is a preposition.'
  },
  {
    id: 'e19',
    subject: 'English',
    question: 'What is the past tense of "eat"?',
    options: ['Eated', 'Ate', 'Eating', 'Eats'],
    correctAnswer: 1,
    explanation: 'The past tense of "eat" is "ate".'
  },
  {
    id: 'e20',
    subject: 'English',
    question: 'Which word is a conjunction?',
    options: ['Run', 'And', 'Beautiful', 'Quickly'],
    correctAnswer: 1,
    explanation: 'A conjunction connects words or sentences. "And" is a conjunction.'
  },
  // Science questions (20 total)
  {
    id: '15',
    subject: 'Science',
    question: 'What do plants need to grow?',
    options: ['Only water', 'Only sunlight', 'Water and sunlight', 'Nothing'],
    correctAnswer: 2,
    explanation: 'Plants need both water and sunlight to grow through photosynthesis.'
  },
  {
    id: '16',
    subject: 'Science',
    question: 'How many legs does a spider have?',
    options: ['6', '8', '10', '12'],
    correctAnswer: 1,
    explanation: 'Spiders have 8 legs.'
  },
  {
    id: '17',
    subject: 'Science',
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 2,
    explanation: 'Jupiter is the largest planet in our solar system.'
  },
  {
    id: '18',
    subject: 'Science',
    question: 'What do we call animals that eat only plants?',
    options: ['Carnivores', 'Herbivores', 'Omnivores', 'Insectivores'],
    correctAnswer: 1,
    explanation: 'Animals that eat only plants are called herbivores.'
  },
  {
    id: '19',
    subject: 'Science',
    question: 'What is the center of our solar system?',
    options: ['Earth', 'Moon', 'Sun', 'Mars'],
    correctAnswer: 2,
    explanation: 'The Sun is at the center of our solar system.'
  },
  {
    id: '20',
    subject: 'Science',
    question: 'What is water made of?',
    options: ['Hydrogen only', 'Oxygen only', 'Hydrogen and Oxygen', 'Carbon and Oxygen'],
    correctAnswer: 2,
    explanation: 'Water (H2O) is made of hydrogen and oxygen.'
  },
  {
    id: 's7',
    subject: 'Science',
    question: 'What gas do humans breathe in?',
    options: ['Carbon dioxide', 'Oxygen', 'Nitrogen', 'Helium'],
    correctAnswer: 1,
    explanation: 'Humans breathe in oxygen to survive.'
  },
  {
    id: 's8',
    subject: 'Science',
    question: 'What is the boiling point of water?',
    options: ['50°C', '100°C', '150°C', '200°C'],
    correctAnswer: 1,
    explanation: 'Water boils at 100°C (212°F) at sea level.'
  },
  {
    id: 's9',
    subject: 'Science',
    question: 'How many bones does an adult human have?',
    options: ['106', '206', '306', '406'],
    correctAnswer: 1,
    explanation: 'An adult human has 206 bones in their body.'
  },
  {
    id: 's10',
    subject: 'Science',
    question: 'What force keeps us on the ground?',
    options: ['Magnetism', 'Gravity', 'Friction', 'Electricity'],
    correctAnswer: 1,
    explanation: 'Gravity is the force that keeps us on the ground.'
  },
  {
    id: 's11',
    subject: 'Science',
    question: 'What is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Horse', 'Tiger'],
    correctAnswer: 1,
    explanation: 'The cheetah is the fastest land animal.'
  },
  {
    id: 's12',
    subject: 'Science',
    question: 'What do bees make?',
    options: ['Milk', 'Honey', 'Butter', 'Cheese'],
    correctAnswer: 1,
    explanation: 'Bees make honey from nectar.'
  },
  {
    id: 's13',
    subject: 'Science',
    question: 'What part of the plant makes food?',
    options: ['Roots', 'Leaves', 'Stem', 'Flowers'],
    correctAnswer: 1,
    explanation: 'Leaves make food for the plant through photosynthesis.'
  },
  {
    id: 's14',
    subject: 'Science',
    question: 'What is the hardest natural substance?',
    options: ['Gold', 'Iron', 'Diamond', 'Silver'],
    correctAnswer: 2,
    explanation: 'Diamond is the hardest natural substance.'
  },
  {
    id: 's15',
    subject: 'Science',
    question: 'How many hearts does an octopus have?',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
    explanation: 'An octopus has three hearts.'
  },
  {
    id: 's16',
    subject: 'Science',
    question: 'What is the main source of energy for Earth?',
    options: ['Moon', 'Sun', 'Stars', 'Wind'],
    correctAnswer: 1,
    explanation: 'The Sun is the main source of energy for Earth.'
  },
  {
    id: 's17',
    subject: 'Science',
    question: 'What do we call baby frogs?',
    options: ['Kittens', 'Puppies', 'Tadpoles', 'Cubs'],
    correctAnswer: 2,
    explanation: 'Baby frogs are called tadpoles.'
  },
  {
    id: 's18',
    subject: 'Science',
    question: 'What is the closest planet to the Sun?',
    options: ['Venus', 'Earth', 'Mercury', 'Mars'],
    correctAnswer: 2,
    explanation: 'Mercury is the closest planet to the Sun.'
  },
  {
    id: 's19',
    subject: 'Science',
    question: 'What do we call animals that eat both plants and meat?',
    options: ['Carnivores', 'Herbivores', 'Omnivores', 'Insectivores'],
    correctAnswer: 2,
    explanation: 'Animals that eat both plants and meat are called omnivores.'
  },
  {
    id: 's20',
    subject: 'Science',
    question: 'How many legs does an insect have?',
    options: ['4', '6', '8', '10'],
    correctAnswer: 1,
    explanation: 'All insects have 6 legs.'
  }
];

const initialChildren: Child[] = [
  {
    id: 'child1',
    name: 'Ahmed',
    username: 'ahmed123',
    password: 'password',
    avatar: '👨‍🎓',
    accuracy: 75,
    correctCount: 45,
    correctWithinTimerCount: 30,
    incorrectCount: 15,
    exerciseHistory: [
      {
        id: 'ex1',
        questionId: '1',
        subject: 'Maths',
        question: 'What is 5 + 3?',
        options: ['6', '7', '8', '9'],
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true,
        withinTime: true,
        timeSpent: 8,
        timestamp: new Date('2024-11-15T10:30:00')
      },
      {
        id: 'ex2',
        questionId: '2',
        subject: 'Maths',
        question: 'What is 12 - 4?',
        options: ['6', '7', '8', '9'],
        userAnswer: 1,
        correctAnswer: 2,
        isCorrect: false,
        withinTime: false,
        timeSpent: 18,
        timestamp: new Date('2024-11-15T10:32:00')
      },
      {
        id: 'ex3',
        questionId: '9',
        subject: 'English',
        question: 'Which word is a noun?',
        options: ['Run', 'Happy', 'Book', 'Quickly'],
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true,
        withinTime: true,
        timeSpent: 6,
        timestamp: new Date('2024-11-15T10:35:00')
      },
      {
        id: 'ex4',
        questionId: '3',
        subject: 'Maths',
        question: 'What is 7 × 2?',
        options: ['12', '14', '16', '18'],
        userAnswer: 1,
        correctAnswer: 1,
        isCorrect: true,
        withinTime: true,
        timeSpent: 10,
        timestamp: new Date('2024-11-16T09:15:00')
      },
      {
        id: 'ex5',
        questionId: '10',
        subject: 'English',
        question: 'Which word is a verb?',
        options: ['Cat', 'Jump', 'Blue', 'Tall'],
        userAnswer: 0,
        correctAnswer: 1,
        isCorrect: false,
        withinTime: true,
        timeSpent: 12,
        timestamp: new Date('2024-11-16T09:20:00')
      },
      {
        id: 'ex6',
        questionId: '15',
        subject: 'Science',
        question: 'What do plants need to grow?',
        options: ['Only water', 'Only sunlight', 'Water and sunlight', 'Nothing'],
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true,
        withinTime: true,
        timeSpent: 9,
        timestamp: new Date('2024-11-16T14:30:00')
      },
      {
        id: 'ex7',
        questionId: '4',
        subject: 'Maths',
        question: 'What is 20 ÷ 4?',
        options: ['4', '5', '6', '7'],
        userAnswer: 1,
        correctAnswer: 1,
        isCorrect: true,
        withinTime: false,
        timeSpent: 20,
        timestamp: new Date('2024-11-17T10:00:00')
      },
      {
        id: 'ex8',
        questionId: '16',
        subject: 'Science',
        question: 'How many legs does a spider have?',
        options: ['6', '8', '10', '12'],
        userAnswer: 0,
        correctAnswer: 1,
        isCorrect: false,
        withinTime: true,
        timeSpent: 7,
        timestamp: new Date('2024-11-17T10:05:00')
      },
      {
        id: 'ex9',
        questionId: '11',
        subject: 'English',
        question: 'What is the plural of "child"?',
        options: ['Childs', 'Children', 'Childes', 'Childrens'],
        userAnswer: 1,
        correctAnswer: 1,
        isCorrect: true,
        withinTime: true,
        timeSpent: 11,
        timestamp: new Date('2024-11-17T11:00:00')
      },
      {
        id: 'ex10',
        questionId: '5',
        subject: 'Maths',
        question: 'What is 9 + 6?',
        options: ['13', '14', '15', '16'],
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true,
        withinTime: true,
        timeSpent: 8,
        timestamp: new Date('2024-11-18T09:00:00')
      }
    ]
  },
  {
    id: 'child2',
    name: 'Omar',
    username: 'omar456',
    password: 'password',
    avatar: '👨‍🎓',
    accuracy: 81,
    correctCount: 50,
    correctWithinTimerCount: 40,
    incorrectCount: 12,
    exerciseHistory: [
      {
        id: 'ex11',
        questionId: '1',
        subject: 'Maths',
        question: 'What is 5 + 3?',
        options: ['6', '7', '8', '9'],
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true,
        withinTime: true,
        timeSpent: 7,
        timestamp: new Date('2024-11-15T14:00:00')
      },
      {
        id: 'ex12',
        questionId: '9',
        subject: 'English',
        question: 'Which word is a noun?',
        options: ['Run', 'Happy', 'Book', 'Quickly'],
        userAnswer: 2,
        correctAnswer: 2,
        isCorrect: true,
        withinTime: true,
        timeSpent: 9,
        timestamp: new Date('2024-11-15T14:10:00')
      },
      {
        id: 'ex13',
        questionId: '15',
        subject: 'Science',
        question: 'What do plants need to grow?',
        options: ['Only water', 'Only sunlight', 'Water and sunlight', 'Nothing'],
        userAnswer: 1,
        correctAnswer: 2,
        isCorrect: false,
        withinTime: true,
        timeSpent: 10,
        timestamp: new Date('2024-11-16T10:00:00')
      },
      {
        id: 'ex14',
        questionId: '3',
        subject: 'Maths',
        question: 'What is 7 × 2?',
        options: ['12', '14', '16', '18'],
        userAnswer: 1,
        correctAnswer: 1,
        isCorrect: true,
        withinTime: true,
        timeSpent: 8,
        timestamp: new Date('2024-11-16T10:15:00')
      },
      {
        id: 'ex15',
        questionId: '12',
        subject: 'English',
        question: 'Which word is an adjective?',
        options: ['Run', 'Beautiful', 'Table', 'Swim'],
        userAnswer: 1,
        correctAnswer: 1,
        isCorrect: true,
        withinTime: true,
        timeSpent: 11,
        timestamp: new Date('2024-11-17T09:00:00')
      }
    ]
  }
];

const initialParents: Parent[] = [
  {
    id: 'parent1',
    username: 'sarah',
    password: 'password',
    email: 'sarah@example.com',
    children: initialChildren
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [parents, setParents] = useState<Parent[]>(initialParents);
  const [currentUser, setCurrentUser] = useState<Parent | Child | null>(null);
  const [userType, setUserType] = useState<'parent' | 'child' | null>(null);
  const [selectedChild, setSelectedChild] = useState<Child | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<'correct' | 'timer' | 'incorrect' | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [currentTopic, setCurrentTopic] = useState<string | null>(null);
  const [allChildren] = useState<Child[]>(initialChildren);

  const navigate = (screen: Screen, data?: any) => {
    setCurrentScreen(screen);
    if (data?.topic) {
      setCurrentTopic(data.topic);
    }
    if (data?.group) {
      setSelectedGroup(data.group);
    }
    if (data?.subject) {
      setSelectedSubject(data.subject);
    }
    // Scroll to top on navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectGroup = (group: 'correct' | 'timer' | 'incorrect') => {
    setSelectedGroup(group);
    navigate('exercise-categories', { group });
  };

  const selectSubject = (subject: string) => {
    setSelectedSubject(subject);
    navigate('exercise-list', { subject });
  };

  const login = (username: string, password: string, type: 'parent' | 'child'): boolean => {
    if (type === 'parent') {
      const parent = parents.find(p => p.username === username && p.password === password);
      if (parent) {
        setCurrentUser(parent);
        setUserType('parent');
        navigate('parent-home');
        return true;
      }
    } else {
      const child = allChildren.find(c => c.username === username && c.password === password);
      if (child) {
        setCurrentUser(child);
        setUserType('child');
        navigate('topic-selection');
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setUserType(null);
    setSelectedChild(null);
    setSelectedGroup(null);
    setSelectedSubject(null);
    navigate('welcome');
  };

  const signupParent = (username: string, password: string, email: string): boolean => {
    if (parents.some(p => p.username === username)) {
      return false;
    }
    const newParent: Parent = {
      id: `parent${parents.length + 1}`,
      username,
      password,
      email,
      children: []
    };
    setParents([...parents, newParent]);
    setCurrentUser(newParent);
    setUserType('parent');
    navigate('parent-home');
    return true;
  };

  const createChild = (name: string, username: string, password: string): boolean => {
    if (userType !== 'parent' || !currentUser) return false;
    
    const parent = currentUser as Parent;
    const newChild: Child = {
      id: `child${Date.now()}`,
      name,
      username,
      password,
      avatar: '👨‍🎓',
      accuracy: 0,
      correctCount: 0,
      correctWithinTimerCount: 0,
      incorrectCount: 0,
      exerciseHistory: []
    };
    
    const updatedParent = {
      ...parent,
      children: [...parent.children, newChild]
    };
    
    setParents(parents.map(p => p.id === parent.id ? updatedParent : p));
    setCurrentUser(updatedParent);
    navigate('parent-home');
    return true;
  };

  const selectChild = (childId: string) => {
    if (userType !== 'parent' || !currentUser) return;
    const parent = currentUser as Parent;
    const child = parent.children.find(c => c.id === childId);
    if (child) {
      setSelectedChild(child);
    }
  };

  const deleteChild = (childId: string) => {
    if (userType !== 'parent' || !currentUser) return;
    const parent = currentUser as Parent;
    const updatedParent = {
      ...parent,
      children: parent.children.filter(c => c.id !== childId)
    };
    setParents(parents.map(p => p.id === parent.id ? updatedParent : p));
    setCurrentUser(updatedParent);
    if (selectedChild?.id === childId) {
      setSelectedChild(null);
    }
  };

  const submitQuizAnswer = (answer: Omit<ExerciseRecord, 'id' | 'timestamp'>) => {
    if (userType !== 'child' || !currentUser) return;
    
    const child = currentUser as Child;
    const updatedChild = { ...child };
    
    const newRecord: ExerciseRecord = {
      ...answer,
      id: `ex${Date.now()}`,
      timestamp: new Date()
    };
    
    updatedChild.exerciseHistory = [...updatedChild.exerciseHistory, newRecord];
    
    if (answer.isCorrect) {
      updatedChild.correctCount += 1;
      if (answer.withinTime) {
        updatedChild.correctWithinTimerCount += 1;
      }
    } else {
      updatedChild.incorrectCount += 1;
    }
    
    const total = updatedChild.correctCount + updatedChild.incorrectCount;
    updatedChild.accuracy = total > 0 ? Math.round((updatedChild.correctCount / total) * 100) : 0;
    
    setCurrentUser(updatedChild);
  };

  const updateParentInfo = (username: string, email: string) => {
    if (userType !== 'parent' || !currentUser) return;
    const parent = currentUser as Parent;
    const updatedParent = { ...parent, username, email };
    setParents(parents.map(p => p.id === parent.id ? updatedParent : p));
    setCurrentUser(updatedParent);
  };

  const updateChildInfo = (name: string, username: string) => {
    if (userType !== 'child' || !currentUser) return;
    const child = currentUser as Child;
    const updatedChild = { ...child, name, username };
    setCurrentUser(updatedChild);
  };

  const updateChildAvatar = (avatar: string) => {
    if (userType !== 'child' || !currentUser) return;
    const child = currentUser as Child;
    const updatedChild = { ...child, avatar };
    setCurrentUser(updatedChild);
  };

  const updateParentChildInfo = (childId: string, name: string, username: string, password: string) => {
    if (userType !== 'parent' || !currentUser) return;
    const parent = currentUser as Parent;
    
    const updatedChildren = parent.children.map(child => 
      child.id === childId 
        ? { ...child, name, username, password }
        : child
    );
    
    const updatedParent = { ...parent, children: updatedChildren };
    setParents(parents.map(p => p.id === parent.id ? updatedParent : p));
    setCurrentUser(updatedParent);
    
    // Update selectedChild if it's the one being edited
    if (selectedChild?.id === childId) {
      const updatedSelectedChild = updatedChildren.find(c => c.id === childId);
      if (updatedSelectedChild) {
        setSelectedChild(updatedSelectedChild);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        userType,
        selectedChild,
        selectedGroup,
        selectedSubject,
        currentScreen,
        currentTopic,
        navigate,
        login,
        logout,
        signupParent,
        createChild,
        selectChild,
        selectGroup,
        selectSubject,
        deleteChild,
        submitQuizAnswer,
        updateParentInfo,
        updateChildInfo,
        updateChildAvatar,
        updateParentChildInfo,
        parents,
        children: allChildren
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}