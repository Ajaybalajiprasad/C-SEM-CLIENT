"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MdContentCopy } from "react-icons/md";

interface Snippet {
  id: string;
  content: string;
}

export default function Codes() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/snippets");
        setSnippets(response.data);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching snippets:", err.message);
        setError("Failed to fetch snippets");
      } finally {
        setLoading(false);
      }
    };

    fetchSnippets();
  }, []);

  const filteredSnippets = snippets.filter((snippet) =>
    snippet.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-5xl font-bold text-center mb-6 text-indigo-500">
          C Exam Codes
        </h1>
        <p className="text-center text-lg mb-8 text-gray-400">
          Search and explore codes here...
          <br />
          Made with ❤️ By Ajay
        </p>
        {/* Sticky search bar */}
        <div className="sticky top-0 z-50 mt-1 lg:fixed lg:right-4 lg:top-4 lg:w-1/4">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search Codes by Question (or) Title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 rounded-lg shadow-lg border border-gray-600 bg-gray-700 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <span className="hidden lg:block text-sm text-gray-500 mt-1">
              Press Windows + K to focus search
            </span>
          </div>
        </div>
        {loading ? (
          <p className="text-center text-xl font-medium mt-12 text-gray-400">
            Loading snippets...
          </p>
        ) : error ? (
          <p className="text-center text-xl font-medium mt-12 text-red-500">
            {error}
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {filteredSnippets.map((snippet) => (
              <li
                key={snippet.id}
                className="p-6 bg-gray-800 text-gray-200 rounded-lg shadow-lg"
              >
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-xl font-semibold text-indigo-400 mb-3">
                    {snippet.id
                      .replace(/_/g, " ")
                      .split(".")
                      .slice(0, -1)
                      .join(".")}
                  </h2>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(snippet.content)
                    }
                    className="text-gray-400 hover:text-gray-200 focus:outline-none"
                    aria-label="Copy code"
                  >
                    <MdContentCopy size={20} />
                  </button>
                </div>
                <SyntaxHighlighter
                  language="c"
                  style={vscDarkPlus}
                  className="rounded-md overflow-auto"
                >
                  {snippet.content}
                </SyntaxHighlighter>
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && filteredSnippets.length === 0 && (
          <p className="text-center text-xl font-medium mt-12 text-gray-400">
            No Codes found!! No worries Ask Ajay to Add it :)
          </p>
        )}
      </div>
    </div>
  );
}