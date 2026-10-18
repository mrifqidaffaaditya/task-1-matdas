"use client";

import React from "react";
import { GraduationCap, Code2, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#262c36] bg-[#111418] mt-8 sm:mt-12 py-5 sm:py-6 text-xs text-neutral-500">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 flex flex-col md:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2.5">
          <div className="flex items-center gap-1.5 text-neutral-300 font-semibold">
            <GraduationCap className="w-4 h-4 text-neutral-400" />
            <span>M. Rifqi Daffa Aditya</span>
          </div>
          <span className="text-[#3c4554] hidden sm:inline">•</span>
          <span className="font-mono text-neutral-400">NIM: 2604140016</span>
          <span className="text-[#3c4554] hidden sm:inline">•</span>
          <span className="text-neutral-400">Sistem Informasi</span>
          <span className="text-[#3c4554] hidden md:inline">•</span>
          <span className="text-neutral-500 hidden md:inline">Matematika Dasar / Aljabar Linier (Semester Ganjil 2026/2027)</span>
        </div>

        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 text-neutral-400 text-[11px] sm:text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Pure TypeScript (Zero Math Libs)</span>
          </div>
          <span className="text-[#3c4554] hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-neutral-400" />
            <span>Next.js App Router</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
