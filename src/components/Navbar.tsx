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
    <header className="border-b border-[#262c36] bg-[#15191f]">
      {/* Top Banner / Student Identity Bar */}
      <div className="border-b border-[#262c36] bg-[#111418] px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold text-neutral-300">
              <GraduationCap className="w-4 h-4 text-neutral-400" />
              Proyek Evaluasi Algoritma
            </span>
            <span className="text-[#3c4554]">|</span>
            <span className="text-neutral-400">
              Mata Kuliah: <strong className="text-neutral-200">Matematika Dasar / Aljabar Linier</strong>
            </span>
            <span className="hidden sm:inline text-[#3c4554]">•</span>
            <span className="hidden sm:inline text-neutral-400">Semester Ganjil 2026/2027</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#181c22] border border-[#2a313d] px-2.5 py-1 rounded text-neutral-300 text-xs font-mono">
              <span className="w-1.5 h-1.5 bg-emerald-400"></span>
              <span><strong>M. Rifqi Daffa Aditya</strong> (NIM: 2604140016)</span>
              <span className="text-[#3c4554]">|</span>
              <span className="text-neutral-400 font-sans">Sistem Informasi</span>
            </div>
            <button
              onClick={onOpenAbout}
              className="flex items-center gap-1 px-2.5 py-1 text-neutral-300 hover:text-white bg-[#1e232b] hover:bg-[#282f3a] border border-[#2a313d] rounded text-xs font-medium transition-colors"
              title="Informasi Penulis & Proyek"
            >
              <Info className="w-3.5 h-3.5 text-neutral-400" />
              <span>Tentang</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Logo and Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#202630] border border-[#303846] flex items-center justify-center text-neutral-200">
            <Binary className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              Adjoin SPL & Hill Cipher Engine
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-[#1c2420] text-emerald-400 border border-emerald-800/60">
                Zero Math Libs
              </span>
            </h1>
            <p className="text-[11px] text-neutral-400">
              Metode Matriks Adjoin Klasik & Kriptografi Modulo 26
            </p>
          </div>
        </div>

        {/* Tab Navigation Buttons */}
        <nav className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-colors whitespace-nowrap border ${
                  isActive
                    ? "bg-[#252c38] text-white border-neutral-500"
                    : "text-neutral-400 hover:text-neutral-200 hover:bg-[#1c2128] border-transparent"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-neutral-200" : "text-neutral-500"}`} />
                <div className="text-left">
                  <div className="leading-tight">{tab.label}</div>
                  <div
                    className={`text-[10px] leading-tight font-normal ${
                      isActive ? "text-neutral-300" : "text-neutral-500"
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
