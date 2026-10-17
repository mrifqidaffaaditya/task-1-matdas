"use client";

import React from "react";
import {
  Binary,
  Layers,
  KeyRound,
  Dices,
  FileCode2,
  TrendingUp,
  Info,
  GraduationCap,
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAbout,
}) => {
  const tabs = [
    {
      id: "spl-adjoin",
      label: "Simulasi SPL Adjoin",
      subLabel: "2x2, 3x3, 4x4",
      icon: Layers,
    },
    {
      id: "hill-cipher",
      label: "Dekripsi Hill Cipher",
      subLabel: "Topik A (3x3)",
      icon: KeyRound,
    },
    {
      id: "live-challenge",
      label: "Live Challenge Arena",
      subLabel: "Reveal Mode Dosen",
      icon: Dices,
    },
    {
      id: "pseudocode-flowchart",
      label: "Flowchart & Pseudocode",
      subLabel: "8 Modul Formal",
      icon: FileCode2,
    },
    {
      id: "complexity-analysis",
      label: "Kompleksitas Asimtotik",
      subLabel: "T(n) & S(n) Big-O",
      icon: TrendingUp,
    },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner / Student Identity Bar */}
      <div className="border-b border-slate-800/60 bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-purple-950/40 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold text-indigo-400">
              <GraduationCap className="w-4 h-4 text-indigo-400" />
              Proyek Evaluasi Algoritma
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">
              Mata Kuliah: <strong className="text-slate-200">Matematika Dasar / Aljabar Linier</strong>
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline text-slate-400">Semester Ganjil 2026/2027</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded-full text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span><strong>M. Rifqi Daffa Aditya</strong> (NIM: 2604140016)</span>
              <span className="text-slate-500">•</span>
              <span className="text-indigo-300">Sistem Informasi</span>
            </div>
            <button
              onClick={onOpenAbout}
              className="flex items-center gap-1 px-2.5 py-1 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-full transition-all text-xs font-medium"
              title="Informasi Penulis & Proyek"
            >
              <Info className="w-3.5 h-3.5 text-blue-400" />
              <span>Tentang</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Binary className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              Adjoin SPL & Hill Cipher Engine
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Zero Math Libs
              </span>
            </h1>
            <p className="text-xs text-slate-400">
              Metode Matriks Adjoin Klasik & Kriptografi Modulo 26
            </p>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <nav className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-indigo-400/40"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                <div className="text-left">
                  <div className="leading-tight">{tab.label}</div>
                  <div
                    className={`text-[10px] leading-tight font-normal ${
                      isActive ? "text-indigo-200" : "text-slate-500"
                    }`}
                  >
                    {tab.subLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
