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
      ? "bg-[#1c2420] text-emerald-400 border-emerald-800/60"
      : badgeType === "warning"
      ? "bg-[#252219] text-amber-400 border-amber-800/60"
      : badgeType === "purple"
      ? "bg-[#211e28] text-purple-300 border-purple-800/60"
      : "bg-[#1e232b] text-neutral-300 border-neutral-700";

  return (
    <div className="border border-[#262c36] bg-[#15191f] rounded">
      {/* Header */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-start justify-between p-3 sm:p-3.5 cursor-pointer select-none bg-[#111418] hover:bg-[#181c22] transition-colors border-b border-[#262c36] gap-2.5"
      >
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          <div className="w-6 h-6 rounded bg-[#1e232b] text-neutral-300 border border-[#2a313d] flex items-center justify-center font-bold text-xs font-mono flex-shrink-0 mt-0.5">
            {stepNumber}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight">{title}</h4>
              {formula && (
                <span className="font-mono text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded bg-[#181c22] border border-[#2e3542] text-neutral-300">
                  {formula}
                </span>
              )}
              {badge && (
                <span className={`text-[9px] sm:text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border ${badgeColor}`}>
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-[11px] text-neutral-400 mt-1 leading-normal">{subtitle}</p>}
          </div>
        </div>

        <button className="text-neutral-400 hover:text-white p-1 transition-colors flex-shrink-0 mt-0.5" aria-label="Toggle step card">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Body */}
      {isOpen && <div className="p-3 sm:p-4 space-y-3 sm:space-y-3.5">{children}</div>}
    </div>
  );
};
