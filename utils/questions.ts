import { ChecklistItem,Unit } from "./types";

export const units: Unit[] = [
  { id: 1, name: "C PROGRAMMING FUNDAMENTALS ", description: "Basic Functions And Arrays" },
  { id: 2, name: "C PROGRAMMING - ADVANCED FEATURES", description: "pointers, File Handling, Structure And Union" },
  { id: 3, name: "LINEAR DATA STRUCTURES", description: "Linked List, Stacks, Queue, And ADT" },
  { id: 4, name: "NON-LINEAR DATA STRUCTURES", description: "Binary Tree, Binary Search Tree And Hashing" },
  { id: 5, name: "SORTING AND SEARCHING TECHNIQUES", description: "Sorting, Searching" },
];

export const predefinedQuestions: Omit<ChecklistItem, "completed">[] = [
  { id: 1, text: "Linear Search", unit: 5, important: true },
  { id: 2, text: "Binary Search", unit: 5, important: true },
  { id: 3, text: "Min Heap and Max Heap", unit: 5, important: true },
  { id: 4, text: "Insertion Sort", unit: 5, important: true },
  { id: 5, text: "Quick Sort", unit: 5, important: false },
  { id: 6, text: "Merge Sort", unit: 5, important: false },

  { id: 7, text: "Single and Multi-Dimensional Arrays", unit: 1, important: true },
  { id: 8, text: "Iterative and Recursive Functions", unit: 1, important: true },
  { id: 9, text: "Conditional Statements (if, else)", unit: 1, important: true },
  { id: 10, text: "Control Statements (for, while loops)", unit: 1, important: true },
  { id: 11, text: "Data Types (int, float...) and operations", unit: 1, important: false },
  { id: 12, text: "Functions", unit: 1, important: false },

  { id: 13, text: "Preprocessor Directives", unit: 2, important: true },
  { id: 14, text: "File Handling", unit: 2, important: true },
  { id: 15, text: "Structure and Union", unit: 2, important: true },
  { id: 16, text: "Pointers", unit: 2, important: false },    
  
  { id: 19, text: "Linked List", unit: 3, important: true },
  { id: 20, text: "Stacks(infix and postfix, ADT, Linked List)", unit: 3, important: true },
  { id: 21, text: "Queue(ADT)", unit: 3, important: true },
  { id: 22, text: "DoublyLinked List", unit: 3, important: true },
  { id: 23, text: "Abstract Data Types", unit: 3, important: false },

  { id: 24, text: "Binary Tree", unit: 4, important: true },
  { id: 25, text: "Binary Search Tree", unit: 4, important: true },
  { id: 26, text: "Linear Hashing, Probing, Double Hashing, Rehasing", unit: 4, important: true },
  { id: 28, text: "Tree Traversals (Inorder, postorder, Preorder)", unit: 4, important: true },
];