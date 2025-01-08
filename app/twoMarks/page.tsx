"use client";

import React, { useState } from "react";
import TwoMarksData from "@/utils/2marks.json";
import { TwoMarkQuestion } from "@/utils/types";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const QUESTIONS_PER_PAGE = 10;

const TwoMarksList: React.FC = () => {
  const questions = Object.entries(TwoMarksData).map(([id, question]) => ({
    id: Number(id),
    ...question,
  }));

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastQuestion = currentPage * QUESTIONS_PER_PAGE;
  const indexOfFirstQuestion = indexOfLastQuestion - QUESTIONS_PER_PAGE;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center gap-2 text-indigo-400">
          <BookOpen className="w-6 h-6" />
          <h1 className="text-2xl sm:text-4xl font-bold">Two-Mark 40 Questions</h1>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {currentQuestions.map((question) => (
            <Card key={question.id} className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {question.id}. {question.question}
                </h2>
                <p className="text-sm text-gray-300 mb-2">{question.explanation}</p>
                {question.code && (
                  <pre className="bg-gray-700 p-2 rounded-md overflow-auto">
                    <code>{question.code}</code>
                  </pre>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <span className="text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoMarksList;