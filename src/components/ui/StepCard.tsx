"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface StepCardProps {
  stepNumber: number | string;
  title: string;
  formula?: string;
  subtitle?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string;
  badgeType?: "info" | "success" | "warning" | "purple";
}

export const StepCard: React.FC<StepCardProps> = ({
  stepNumber,
  title,
  formula,
  subtitle,
  children,
  defaultOpen = true,
  badge,
  badgeType = "info",
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const badgeColor =
    badgeType === "success"
      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
      : badgeType === "warning"
      ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
      : badgeType === "purple"
      ? "bg-purple-500/10 text-purple-400 border-purple-500/30"
      : "bg-indigo-500/10 text-indigo-400 border-indigo-500/30";

  return (
    <div className="border border-slate-800 rounded-xl bg-slate-900/70 overflow-hidden shadow-md transition-all hover:border-slate-700/80">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between p-4 cursor-pointer select-none bg-slate-900/90 hover:bg-slate-800/60 transition-colors border-b border-slate-800/60"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold text-xs font-mono">
            {stepNumber}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm font-bold text-white tracking-tight">{title}</h4>
              {formula && (
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-slate-300">
                  {formula}
                </span>
              )}
              {badge && (
                <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeColor}`}>
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <button className="text-slate-400 hover:text-white p-1 rounded transition-colors">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Body */}
      {isOpen && <div className="p-4 sm:p-5 space-y-4">{children}</div>}
    </div>
  );
};
