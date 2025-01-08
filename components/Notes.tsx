"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { predefinedQuestions, units } from "@/utils/questions";
import { ChecklistItem, Unit, DetailedInfo, DetailedInfoMap, Answers, AnswerDetail } from "@/utils/types";
import { ChevronLeft, AlertCircle, BookOpen, Star, Clock, Lightbulb } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Card, CardContent } from "@/components/ui/card";
import answers from "@/utils/answers.json";
import details from "@/utils/details.json";

const DetailedNotes: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [question, setQuestion] = useState<ChecklistItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [answer, setAnswer] = useState<AnswerDetail | null>(null);
  const [detailInfo, setDetailInfo] = useState<DetailedInfo | null>(null);

  useEffect(() => {
    if (!id) return;
    const parsedId = parseInt(id as string, 10);
    const foundQuestion = predefinedQuestions.find((q) => q.id === parsedId)
      ? { ...predefinedQuestions.find((q) => q.id === parsedId)!, completed: false }
      : null;
    setQuestion(foundQuestion);
    setAnswer((answers as unknown as { [key: number]: AnswerDetail })[parsedId] || null);
    setDetailInfo((details as DetailedInfoMap)[parsedId] || null);
    setIsLoading(false);
  }, [id]);

  const unit = question ? units.find((u) => u.id === question.unit) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
        <AlertCircle className="w-16 h-16 text-red-400 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Question Not Found</h1>
        <p className="text-gray-400 mb-6">The question you're looking for doesn't exist.</p>
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Questions
          </button>
          <div className="flex items-center gap-2 text-sm text-indigo-400 mb-2">
            <BookOpen className="w-4 h-4" />
            Unit {question.unit}: {unit?.name}
          </div>
          <h1 className="text-xl sm:text-3xl font-bold">{question.text}</h1>
        </div>

        {/* Question Details */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Star className="w-4 h-4" />
                <h2 className="font-semibold">Importance</h2>
              </div>
              <p className="text-sm text-gray-300">
                {detailInfo?.importanceDescription ||
                  "No description available."}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-indigo-400 mb-2">
                <Clock className="w-4 h-4" />
                <h2 className="font-semibold">Estimated Study Time</h2>
              </div>
              <p className="text-sm text-gray-300">
                {detailInfo?.estimatedStudyTime || "N/A"}
              </p>
            </CardContent>
          </Card>
        </div> */}

        {/* Main Content */}
        <div className="space-y-6">
          {/* Key Concepts */}
          <section>
            <div className="flex items-center gap-2 text-indigo-400 mb-4">
              <Lightbulb className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Key Concepts</h2>
            </div>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <ul className="space-y-3 text-gray-300">
                  {detailInfo?.keyConcepts.map((concept, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2" />
                      <span>{concept}</span>
                    </li>
                  )) || <li>No key concepts available.</li>}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Study Resources */}
          <section>
            <div className="flex items-center gap-2 text-indigo-400 mb-4">
              <BookOpen className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Study Resources</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {detailInfo?.studyResources.map((resource, index) => (
                <Card
                  key={index}
                  className="bg-gray-800/50 border-gray-700 hover:border-indigo-500 transition-colors cursor-pointer"
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">{resource.name}</h3>
                    <p className="text-sm text-gray-400">
                      {resource.description}
                    </p>
                  </CardContent>
                </Card>
              )) || <p>No study resources available.</p>}
            </div>
          </section>

          {/* Answer */}
          <section>
            <div className="flex items-center gap-2 text-indigo-400 mb-4">
              <BookOpen className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Answer</h2>
            </div>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                {answer ? (
                  <>
                    <p className="text-sm text-gray-300 mb-4">
                      {answer.explanation}
                    </p>
                    <SyntaxHighlighter
                      language="c"
                      style={vscDarkPlus}
                      className="rounded-md overflow-auto"
                    >
                      {answer.code}
                    </SyntaxHighlighter>
                  </>
                ) : (
                  <p className="text-sm text-gray-300">No answer available.</p>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailedNotes;