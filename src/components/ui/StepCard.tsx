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
        className="flex items-center justify-between p-3.5 cursor-pointer select-none bg-[#111418] hover:bg-[#181c22] transition-colors border-b border-[#262c36]"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded bg-[#1e232b] text-neutral-300 border border-[#2a313d] flex items-center justify-center font-bold text-xs font-mono">
            {stepNumber}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-xs font-bold text-white tracking-tight">{title}</h4>
              {formula && (
                <span className="font-mono text-[11px] px-1.5 py-0.2 rounded bg-[#181c22] border border-[#2e3542] text-neutral-300">
                  {formula}
                </span>
              )}
              {badge && (
                <span className={`text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded border ${badgeColor}`}>
                  {badge}
                </span>
              )}
            </div>
            {subtitle && <p className="text-[11px] text-neutral-400 mt-0.5">{subtitle}</p>}
          </div>
        </div>

        <button className="text-neutral-400 hover:text-white p-0.5 transition-colors">
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Body */}
      {isOpen && <div className="p-4 space-y-3.5">{children}</div>}
    </div>
  );
};
