"use client";
import React from "react";
import CheckList from "@/components/CheckList";
import Link from "next/link";

const ChecklistPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white p-6">
      <Link href="/" className="text-indigo-400 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <CheckList />
    </div>
  );
};

export default ChecklistPage;