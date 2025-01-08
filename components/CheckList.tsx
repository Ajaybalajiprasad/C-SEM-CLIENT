"use client";
import React, { useState, useEffect } from "react";

interface ChecklistItem {
  id: number;
  text: string;
  completed: boolean;
  unit: number;
  important: boolean;
}

interface Unit {
  id: number;
  name: string;
  description: string;
}

const units: Unit[] = [
  { id: 1, name: "C PROGRAMMING FUNDAMENTALS ", description: "Basic Functions And Arrays" },
  { id: 2, name: "C PROGRAMMING - ADVANCED FEATURES", description: "pointers, File Handling, Structure And Union" },
  { id: 3, name: "LINEAR DATA STRUCTURES", description: "Linked List, Stacks, Queue, And ADT" },
  { id: 4, name: "NON-LINEAR DATA STRUCTURES", description: "Binary Tree, Binary Search Tree And Hashing" },
  { id: 5, name: "SORTING AND SEARCHING TECHNIQUES", description: "Sorting, Searching" },
];

const predefinedQuestions: Omit<ChecklistItem, "completed">[] = [
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

const CheckList: React.FC = () => {
  const [items, setItems] = useState<ChecklistItem[]>([]);
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  const [expandedUnits, setExpandedUnits] = useState<number[]>([1]);

  useEffect(() => {
    const storedStatus = localStorage.getItem("checklistStatus");
    const storedExpandedUnits = localStorage.getItem("expandedUnits");
    
    let initialItems: ChecklistItem[] = predefinedQuestions.map((question) => ({
      ...question,
      completed: false,
    }));

    if (storedStatus) {
      const status = JSON.parse(storedStatus) as { [key: string]: boolean };
      initialItems = initialItems.map((item) => ({
        ...item,
        completed: status[item.id.toString()] || false,
      }));
    }

    if (storedExpandedUnits) {
      setExpandedUnits(JSON.parse(storedExpandedUnits));
    }

    setItems(initialItems);
  }, []);

  useEffect(() => {
    const status: { [key: string]: boolean } = {};
    items.forEach((item) => {
      status[item.id.toString()] = item.completed;
    });
    localStorage.setItem("checklistStatus", JSON.stringify(status));
  }, [items]);

  useEffect(() => {
    localStorage.setItem("expandedUnits", JSON.stringify(expandedUnits));
  }, [expandedUnits]);

  const toggleItem = (id: number) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const toggleUnit = (unitId: number) => {
    setExpandedUnits(expandedUnits.includes(unitId)
      ? expandedUnits.filter(id => id !== unitId)
      : [...expandedUnits, unitId]
    );
  };

  const getProgress = (unitId: number) => {
    const unitItems = items.filter(item => item.unit === unitId);
    const completedItems = unitItems.filter(item => item.completed);
    return Math.round((completedItems.length / unitItems.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-indigo-400">Important Topics</h2>
      
      <div className="mb-6">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showImportantOnly}
            onChange={() => setShowImportantOnly(!showImportantOnly)}
            className="mr-2 h-4 w-4 text-indigo-600"
          />
          <span className="text-white">Show Important Topics Only</span>
        </label>
      </div>

      <div className="space-y-6">
        {units.map((unit) => {
          const unitItems = items.filter(item => 
            item.unit === unit.id && 
            (!showImportantOnly || item.important)
          );
          const isExpanded = expandedUnits.includes(unit.id);
          const progress = getProgress(unit.id);

          return (
            <div key={unit.id} className="bg-gray-700 rounded-lg p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleUnit(unit.id)}
              >
                <div>
                  <h3 className="text-xl font-semibold text-indigo-300">
                    Unit {unit.id}: {unit.name}
                  </h3>
                  <p className="text-gray-400 text-sm">{unit.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-white">{progress}%</div>
                  <div className="w-32 h-2 bg-gray-600 rounded-full">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-400 transform transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {isExpanded && (
                <ul className="mt-4 space-y-3">
                  {unitItems.map((item) => (
                    <li key={item.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleItem(item.id)}
                        className="mr-3 h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className={`flex-1 ${item.completed ? "line-through text-gray-500" : "text-white"}`}>
                        {item.text}
                        {item.important && (
                          <span className="ml-2 px-2 py-1 text-xs bg-indigo-600 text-white rounded-full">
                            Important
                          </span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckList;