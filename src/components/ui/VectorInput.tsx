"use client";

import React from "react";

interface VectorInputProps {
  label: string;
  vector: number[];
  onChange: (newVector: number[]) => void;
  subLabel?: string;
  disabled?: boolean;
}

export const VectorInput: React.FC<VectorInputProps> = ({
  label,
  vector,
  onChange,
  subLabel,
  disabled = false,
}) => {
  const n = vector.length;

  const handleCellChange = (index: number, valueStr: string) => {
    const val = valueStr === "" || valueStr === "-" ? 0 : parseFloat(valueStr) || 0;
    const newVector = [...vector];
    newVector[index] = val;
    onChange(newVector);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-200 tracking-wide">{label}</span>
          {subLabel && <span className="ml-2 text-[11px] text-slate-400">({subLabel})</span>}
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
          {n} × 1
        </span>
      </div>

      <div className="matrix-bracket bg-slate-900/80 rounded-lg border border-slate-800/80 p-3 shadow-inner inline-block w-full">
        <div className="grid gap-2" style={{ gridTemplateRows: `repeat(${n}, minmax(0, 1fr))` }}>
          {vector.map((val, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -top-1.5 left-2 text-[9px] font-mono text-slate-500 pointer-events-none">
                [{idx + 1}]
              </div>
              <input
                type="number"
                value={val}
                disabled={disabled}
                onChange={(e) => handleCellChange(idx, e.target.value)}
                className="w-full text-center bg-slate-950/90 hover:bg-slate-950 text-white font-mono text-sm border border-slate-700/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-md py-2 px-1 transition-all outline-none disabled:opacity-50"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
