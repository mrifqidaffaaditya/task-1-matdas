"use client";

import React from "react";
import { GraduationCap, Code2, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-16 py-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>M. Rifqi Daffa Aditya</span>
          </div>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="font-mono text-slate-400">NIM: 2604140016</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="text-slate-400">Sistem Informasi</span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span className="text-slate-400">Matematika Dasar / Aljabar Linier (Semester Ganjil 2026/2027)</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Pure TypeScript (Zero Math Libs)</span>
          </div>
          <span className="text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span>Next.js App Router</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
