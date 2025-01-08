"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BookOpen, AlertCircle, ChevronLeft, Lightbulb } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Card, CardContent } from "@/components/ui/card";
import TwoMarksData from "@/utils/2marks.json";
import { TwoMarkQuestion } from "@/utils/types";

const DetailedTwoMark: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const [twoMarkQuestion, setTwoMarkQuestion] = useState<TwoMarkQuestion | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const parsedId = parseInt(id as string, 10);
    const question = (TwoMarksData as { [key: number]: TwoMarkQuestion })[parsedId] || null;
    setTwoMarkQuestion(question);
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  if (!twoMarkQuestion) {
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
            {/* Include unit information if available */}
          </div>
          <h1 className="text-xl sm:text-3xl font-bold">{twoMarkQuestion.question}</h1>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Explanation */}
          <section>
            <div className="flex items-center gap-2 text-indigo-400 mb-4">
              <Lightbulb className="w-5 h-5" />
              <h2 className="text-lg font-semibold">Explanation</h2>
            </div>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <p className="text-sm text-gray-300 mb-4">{twoMarkQuestion.explanation}</p>
                {twoMarkQuestion.code && (
                  <SyntaxHighlighter
                    language="c"
                    style={vscDarkPlus}
                    className="rounded-md overflow-auto"
                  >
                    {twoMarkQuestion.code}
                  </SyntaxHighlighter>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DetailedTwoMark;