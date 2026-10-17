"use client";

import React from "react";

interface MatrixInputProps {
  label: string;
  matrix: number[][];
  onChange: (newMatrix: number[][]) => void;
  subLabel?: string;
  disabled?: boolean;
}

export const MatrixInput: React.FC<MatrixInputProps> = ({
  label,
  matrix,
  onChange,
  subLabel,
  disabled = false,
}) => {
  const n = matrix.length;

  const handleCellChange = (rowIndex: number, colIndex: number, valueStr: string) => {
    // Allow empty string or minus sign during typing
    const val = valueStr === "" || valueStr === "-" ? 0 : parseFloat(valueStr) || 0;
    const newMatrix = matrix.map((row, r) =>
      row.map((cell, c) => (r === rowIndex && c === colIndex ? val : cell))
    );
    onChange(newMatrix);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-slate-200 tracking-wide">{label}</span>
          {subLabel && <span className="ml-2 text-[11px] text-slate-400">({subLabel})</span>}
        </div>
        <span className="text-[11px] font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-800/40 px-2 py-0.5 rounded">
          {n} × {n}
        </span>
      </div>

      <div className="matrix-bracket bg-slate-900/80 rounded-lg border border-slate-800/80 p-3 shadow-inner inline-block w-full">
        <div
          className="grid gap-2"
          style={{
            gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`,
          }}
        >
          {matrix.map((row, r) =>
            row.map((val, c) => (
              <div key={`${r}-${c}`} className="relative group">
                <div className="absolute -top-1.5 left-2 text-[9px] font-mono text-slate-500 pointer-events-none">
                  [{r + 1},{c + 1}]
                </div>
                <input
                  type="number"
                  value={val}
                  disabled={disabled}
                  onChange={(e) => handleCellChange(r, c, e.target.value)}
                  className="w-full text-center bg-slate-950/90 hover:bg-slate-950 text-white font-mono text-sm border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-md py-2 px-1 transition-all outline-none disabled:opacity-50"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
