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
    const val = valueStr === "" || valueStr === "-" ? 0 : parseFloat(valueStr) || 0;
    const newMatrix = matrix.map((row, r) =>
      row.map((cell, c) => (r === rowIndex && c === colIndex ? val : cell))
    );
    onChange(newMatrix);
  };

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex flex-wrap items-center justify-between gap-1.5">
        <div>
          <span className="text-xs font-bold text-neutral-200 tracking-wide">{label}</span>
          {subLabel && <span className="ml-1.5 text-[11px] text-neutral-400 font-sans">({subLabel})</span>}
        </div>
        <span className="text-[10px] font-mono text-neutral-300 bg-[#1e232b] border border-[#2a313d] px-1.5 py-0.5 rounded-sm">
          {n} × {n}
        </span>
      </div>

      <div className="matrix-bracket bg-[#111418] border border-[#262c36] p-2 sm:p-2.5 w-full overflow-x-auto">
        <div
          className="grid gap-1.5 sm:gap-2 pt-1"
          style={{
            gridTemplateColumns: `repeat(${n}, minmax(48px, 1fr))`,
            minWidth: n >= 4 ? "230px" : undefined,
          }}
        >
          {matrix.map((row, r) =>
            row.map((val, c) => (
              <div key={`${r}-${c}`} className="relative group">
                <div className="absolute -top-1.5 left-1 text-[8px] font-mono text-neutral-400 pointer-events-none select-none">
                  [{r + 1},{c + 1}]
                </div>
                <input
                  type="number"
                  value={val}
                  disabled={disabled}
                  onChange={(e) => handleCellChange(r, c, e.target.value)}
                  className="w-full h-8 sm:h-7 text-center bg-[#181c22] text-white font-mono text-xs border border-[#2e3542] hover:border-neutral-500 focus:border-neutral-300 py-1 px-0.5 rounded-none outline-none disabled:opacity-50 transition-colors"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
