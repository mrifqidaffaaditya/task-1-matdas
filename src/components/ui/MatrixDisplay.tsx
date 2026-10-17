"use client";

import React from "react";
import { Fraction } from "@/lib/algorithms/types";

interface MatrixDisplayProps {
  matrix: number[][] | Fraction[][];
  label?: string;
  subLabel?: string;
  size?: "sm" | "md" | "lg";
  highlightCell?: { r: number; c: number }; // 0-based
  highlightRow?: number; // 0-based
  highlightCol?: number; // 0-based
  badgeColor?: "indigo" | "emerald" | "amber" | "blue" | "purple";
  isFraction?: boolean;
}

export const MatrixDisplay: React.FC<MatrixDisplayProps> = ({
  matrix,
  label,
  subLabel,
  size = "md",
  highlightCell,
  highlightRow,
  highlightCol,
  badgeColor = "indigo",
  isFraction = false,
}) => {
  if (!matrix || matrix.length === 0) return null;

  const rows = matrix.length;
  const cols = (matrix[0] as unknown[]).length;

  const cellPadding =
    size === "sm" ? "px-2 py-1 text-xs" : size === "lg" ? "px-4 py-2.5 text-base" : "px-3 py-1.5 text-sm";

  return (
    <div className="inline-block space-y-1">
      {(label || subLabel) && (
        <div className="flex items-center justify-between text-xs mb-1 gap-2">
          {label && <span className="font-semibold text-slate-300">{label}</span>}
          {subLabel && <span className="text-[11px] text-slate-400 font-mono">{subLabel}</span>}
        </div>
      )}

      <div className="matrix-bracket bg-slate-900/60 rounded border border-slate-800/80 inline-block shadow-sm">
        <table className="border-collapse">
          <tbody>
            {matrix.map((row, r) => (
              <tr key={r}>
                {(row as (number | Fraction)[]).map((cell, c) => {
                  const isCellHighlighted =
                    (highlightCell && highlightCell.r === r && highlightCell.c === c) ||
                    highlightRow === r ||
                    highlightCol === c;

                  let cellContent: React.ReactNode = "";
                  if (isFraction || (typeof cell === "object" && cell !== null && "formatted" in cell)) {
                    const frac = cell as Fraction;
                    cellContent = (
                      <span className="font-mono font-medium">
                        {frac.denominator === 1 ? (
                          frac.numerator
                        ) : (
                          <span className="inline-flex items-center gap-0.5">
                            <span className="text-amber-300">{frac.numerator}</span>
                            <span className="text-slate-500">/</span>
                            <span className="text-slate-400">{frac.denominator}</span>
                          </span>
                        )}
                      </span>
                    );
                  } else {
                    cellContent = (
                      <span className="font-mono font-medium">
                        {typeof cell === "number" ? cell : String(cell)}
                      </span>
                    );
                  }

                  return (
                    <td
                      key={c}
                      className={`text-center font-mono transition-colors ${cellPadding} ${
                        isCellHighlighted
                          ? "bg-indigo-600/30 text-indigo-200 border border-indigo-500/40 rounded"
                          : "text-slate-200"
                      }`}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
