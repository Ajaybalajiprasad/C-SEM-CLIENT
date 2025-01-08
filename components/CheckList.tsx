"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { predefinedQuestions, units } from "@/utils/questions";
import { ChecklistItem } from "@/utils/types";

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
    <div className="w-full max-w-4xl mx-auto p-3 sm:p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-indigo-400 text-center">
        Important Topics
      </h2>
      
      <div className="mb-4 sm:mb-6 flex justify-center sm:justify-start">
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showImportantOnly}
            onChange={() => setShowImportantOnly(!showImportantOnly)}
            className="mr-2 h-4 w-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
          />
          <span className="text-sm sm:text-base text-white">Show Important Topics Only</span>
        </label>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {units.map((unit) => {
          const unitItems = items.filter(item => 
            item.unit === unit.id && 
            (!showImportantOnly || item.important)
          );
          const isExpanded = expandedUnits.includes(unit.id);
          const progress = getProgress(unit.id);

          return (
            <div key={unit.id} className="bg-gray-700 rounded-lg p-3 sm:p-4">
              <div 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between cursor-pointer gap-2 sm:gap-4"
                onClick={() => toggleUnit(unit.id)}
              >
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-indigo-300">
                    Unit {unit.id}: {unit.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">{unit.description}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
                  <div className="text-white text-sm sm:text-base min-w-[2rem] text-right">
                    {progress}%
                  </div>
                  <div className="w-20 sm:w-32 h-2 bg-gray-600 rounded-full">
                    <div 
                      className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <svg
                    className={`w-4 h-4 sm:w-6 sm:h-6 text-gray-400 transform transition-transform ${
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
                <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3">
                  {unitItems.map((item) => (
                    <li key={item.id} className="flex items-start sm:items-center gap-2 sm:gap-3">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => toggleItem(item.id)}
                        className="mt-1 sm:mt-0 h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                      />
                      <div className={`flex-1 text-sm sm:text-base ${
                        item.completed ? "line-through text-gray-500" : "text-white"
                      }`}>
                        <Link href={`/notes/${item.id}`} 
                              className="break-words">{item.text}
                        </Link>
                        {item.important && (
                          <span className="inline-block ml-2 px-2 py-0.5 text-xs bg-indigo-600 text-white rounded-full">
                            Important
                          </span>
                        )}
                      </div>
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