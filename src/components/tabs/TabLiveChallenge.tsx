"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Dices,
  Eye,
  EyeOff,
  FastForward,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { MatrixInput } from "../ui/MatrixInput";
import { VectorInput } from "../ui/VectorInput";
import { MatrixDisplay } from "../ui/MatrixDisplay";
import { solveSPLAdjoin, det } from "@/lib/algorithms/matrix";

export const TabLiveChallenge: React.FC = () => {
  const [dimension, setDimension] = useState<number>(3);
  const [matrixA, setMatrixA] = useState<number[][]>([
    [2, 3, 1],
    [1, 2, 3],
    [3, 1, 2],
  ]);
  const [vectorB, setVectorB] = useState<number[]>([9, 6, 8]);

  const [revealStep, setRevealStep] = useState<number>(0);

  // Stopwatch for the 25-minute challenge session
  const [timerSeconds, setTimerSeconds] = useState<number>(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate random non-singular integer matrix
  const handleGenerateRandomMatrix = () => {
    let attempts = 0;
    let newA: number[][] = [];
    let d = 0;

    while (attempts < 100) {
      newA = Array.from({ length: dimension }, () =>
        Array.from({ length: dimension }, () => Math.floor(Math.random() * 7) - 3)
      );
      d = det(newA, dimension);
      if (d !== 0 && Math.abs(d) <= 150) {
        break;
      }
      attempts++;
    }

    const newB = Array.from({ length: dimension }, () =>
      Math.floor(Math.random() * 9) - 4
    );

    setMatrixA(newA);
    setVectorB(newB);
    setRevealStep(0);
  };

  const handleDimensionChange = (n: number) => {
    setDimension(n);
    setRevealStep(0);
    if (n === 3) {
      setMatrixA([
        [2, 3, 1],
        [1, 2, 3],
        [3, 1, 2],
      ]);
      setVectorB([9, 6, 8]);
    } else {
      setMatrixA([
        [2, 1, 0, 3],
        [1, 3, 1, 0],
        [0, 2, 4, 1],
        [3, 0, 1, 2],
      ]);
      setVectorB([4, 0, 7, 7]);
    }
  };

  const trace = useMemo(() => {
    return solveSPLAdjoin(matrixA, vectorB, dimension);
  }, [matrixA, vectorB, dimension]);

  const stepNames = [
    "Determinan Det(A)",
    "Determinan Minor M[i][j]",
    "Matriks Kofaktor C[i][j]",
    "Matriks Adjoin adj(A)",
    "Matriks Invers A⁻¹",
    "Vektor Solusi x",
  ];

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-3.5 sm:p-4 rounded bg-[#15191f] border border-[#262c36]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
              <Dices className="w-3.5 h-3.5 text-neutral-400" />
              <span>Simulasi Ujian Lisan & Rubrik Penilaian (25 Menit)</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Mode &quot;Live Challenge&quot; Dosen (Real-Time Arena)
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
              Dirancang untuk menguji matriks acak secara interaktif dengan kontrol buka-tutup bertahap (<em>reveal mode</em>) saat menghitung di papan tulis.
            </p>
          </div>

          {/* 25-Minute Session Timer */}
          <div className="flex items-center gap-2.5 bg-[#111418] p-2 rounded border border-[#262c36] self-start md:self-auto">
            <Clock className="w-4 h-4 text-neutral-400" />
            <div className="text-center font-mono">
              <div className="text-base font-bold text-white">{formatTimer(timerSeconds)}</div>
              <div className="text-[9px] uppercase tracking-wider text-neutral-500">Sisa Sesi</div>
            </div>
            <div className="flex items-center gap-1 pl-2 border-l border-[#262c36]">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1 rounded bg-[#181c22] hover:bg-[#202630] text-neutral-300 transition-colors"
                title={isTimerRunning ? "Pause" : "Start"}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(25 * 60);
                }}
                className="p-1 rounded bg-[#181c22] hover:bg-[#202630] text-neutral-400 hover:text-white transition-colors"
                title="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="mt-3 pt-3 border-t border-[#262c36] flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-neutral-400">Dimensi:</span>
            {[3, 4].map((n) => (
              <button
                key={n}
                onClick={() => handleDimensionChange(n)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                  dimension === n
                    ? "bg-[#252c38] text-white border border-neutral-600"
                    : "bg-[#111418] border border-[#262c36] text-neutral-400 hover:text-white"
                }`}
              >
                {n} × {n}
              </button>
            ))}

            <button
              onClick={handleGenerateRandomMatrix}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#111418] text-neutral-200 hover:text-white border border-[#262c36] text-xs font-medium transition-colors ml-1"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              Acak Matriks
            </button>
          </div>

          {/* Reveal Controls */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setRevealStep((prev) => Math.min(stepNames.length, prev + 1))}
              disabled={revealStep >= stepNames.length}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#252c38] hover:bg-[#303846] disabled:opacity-40 text-white text-xs font-medium border border-neutral-600 transition-colors"
            >
              <FastForward className="w-3 h-3" />
              Buka Langkah ({revealStep}/{stepNames.length})
            </button>
            <button
              onClick={() => setRevealStep(stepNames.length)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#181c22] hover:bg-[#202630] text-neutral-300 text-xs border border-[#262c36] transition-colors"
            >
              <Eye className="w-3 h-3" />
              Buka Semua
            </button>
            <button
              onClick={() => setRevealStep(0)}
              className="flex items-center gap-1 px-2 py-1 rounded bg-[#181c22] hover:bg-[#202630] text-neutral-400 hover:text-white text-xs border border-[#262c36] transition-colors"
            >
              <EyeOff className="w-3 h-3" />
              Sembunyikan
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Input Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="lg:col-span-3 bg-[#15191f] p-3.5 sm:p-4 rounded border border-[#262c36]">
          <MatrixInput
            label="Matriks Soal Tantangan Dosen A"
            subLabel="Ubah elemen langsung di grid"
            matrix={matrixA}
            onChange={setMatrixA}
          />
        </div>
        <div className="lg:col-span-1 bg-[#15191f] p-3.5 sm:p-4 rounded border border-[#262c36]">
          <VectorInput
            label="Vektor Target b"
            subLabel="Sistem A · x = b"
            vector={vectorB}
            onChange={setVectorB}
          />
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="p-3 rounded bg-[#111418] border border-[#262c36] flex flex-wrap items-center justify-between gap-2.5 text-xs">
        <span className="font-semibold text-neutral-300">Tahapan Solusi Terbuka:</span>
        <div className="flex flex-wrap items-center gap-1">
          {stepNames.map((name, idx) => {
            const isUnlocked = revealStep > idx;
            return (
              <button
                key={name}
                onClick={() => setRevealStep(idx + 1)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors border ${
                  isUnlocked
                    ? "bg-[#1c2420] text-emerald-400 border-emerald-800"
                    : "bg-[#15191f] text-neutral-500 border-[#262c36] hover:border-neutral-600"
                }`}
              >
                {idx + 1}. {name} {isUnlocked && "✓"}
              </button>
            );
          })}
        </div>
      </div>

      {/* REVEALABLE CONTENT BLOCKS */}
      <div className="space-y-3">
        {/* Step 1: Determinan */}
        <div
          className={`border rounded transition-colors ${
            revealStep >= 1
              ? "bg-[#15191f] border-[#262c36] p-3.5 sm:p-4"
              : "bg-[#111418] border-[#262c36] p-3 border-dashed"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-[#1e232b] text-neutral-300 flex items-center justify-center font-mono text-xs font-bold border border-[#2a313d]">
                1
              </span>
              <span className="text-xs font-bold text-white">Langkah 1: Determinan Matriks A (d = det(A))</span>
            </div>
            {revealStep < 1 ? (
              <button
                onClick={() => setRevealStep(1)}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
              >
                <Eye className="w-3 h-3" /> Buka Kunci
              </button>
            ) : (
              <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
            )}
          </div>

          {revealStep >= 1 && (
            <div className="mt-3 pt-3 border-t border-[#262c36] space-y-2.5 text-xs">
              <div className="flex flex-wrap items-center justify-between p-2.5 rounded bg-[#111418] border border-[#262c36] gap-2">
                <span className="text-neutral-400 font-mono">Nilai Determinan det(A):</span>
                <span
                  className={`text-base font-bold font-mono ${
                    trace.isSingular ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  det(A) = {trace.detA}
                </span>
              </div>
              {trace.isSingular && (
                <div className="p-2.5 rounded bg-[#201518] border border-rose-900 text-rose-300">
                  Matriks singular (det = 0): Metode adjoin berhenti di sini.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 2: Minor */}
        {!trace.isSingular && (
          <div
            className={`border rounded transition-colors ${
              revealStep >= 2
                ? "bg-[#15191f] border-[#262c36] p-3.5 sm:p-4"
                : "bg-[#111418] border-[#262c36] p-3 border-dashed"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#1e232b] text-neutral-300 flex items-center justify-center font-mono text-xs font-bold border border-[#2a313d]">
                  2
                </span>
                <span className="text-xs font-bold text-white">Langkah 2: Determinan Minor M[i][j]</span>
              </div>
              {revealStep < 2 ? (
                <button
                  onClick={() => setRevealStep(2)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3 h-3" /> Buka Kunci
                </button>
              ) : (
                <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
              )}
            </div>

            {revealStep >= 2 && (
              <div className="mt-3 pt-3 border-t border-[#262c36] space-y-2.5 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1.5">
                  {trace.minors.flatMap((row) =>
                    row.map((m) => (
                      <div
                        key={`${m.row}-${m.col}`}
                        className="p-1.5 rounded bg-[#111418] border border-[#262c36] font-mono text-[10px] flex justify-between"
                      >
                        <span className="text-neutral-400">M[{m.row}][{m.col}]:</span>
                        <span className="font-bold text-white">{m.detMinor}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Kofaktor */}
        {!trace.isSingular && (
          <div
            className={`border rounded transition-colors ${
              revealStep >= 3
                ? "bg-[#15191f] border-[#262c36] p-3.5 sm:p-4"
                : "bg-[#111418] border-[#262c36] p-3 border-dashed"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#1e232b] text-neutral-300 flex items-center justify-center font-mono text-xs font-bold border border-[#2a313d]">
                  3
                </span>
                <span className="text-xs font-bold text-white">Langkah 3: Matriks Kofaktor C[i][j] = (-1)^(i+j) · Det(M[i][j])</span>
              </div>
              {revealStep < 3 ? (
                <button
                  onClick={() => setRevealStep(3)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3 h-3" /> Buka Kunci
                </button>
              ) : (
                <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
              )}
            </div>

            {revealStep >= 3 && (
              <div className="mt-3 pt-3 border-t border-[#262c36] space-y-2.5 text-xs">
                <MatrixDisplay matrix={trace.cofactorMatrix} size="md" />
              </div>
            )}
          </div>
        )}

        {/* Step 4: Adjoin */}
        {!trace.isSingular && (
          <div
            className={`border rounded transition-colors ${
              revealStep >= 4
                ? "bg-[#15191f] border-[#262c36] p-3.5 sm:p-4"
                : "bg-[#111418] border-[#262c36] p-3 border-dashed"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#1e232b] text-neutral-300 flex items-center justify-center font-mono text-xs font-bold border border-[#2a313d]">
                  4
                </span>
                <span className="text-xs font-bold text-white">Langkah 4: Matriks Adjoin adj(A) = Cᵀ</span>
              </div>
              {revealStep < 4 ? (
                <button
                  onClick={() => setRevealStep(4)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3 h-3" /> Buka Kunci
                </button>
              ) : (
                <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
              )}
            </div>

            {revealStep >= 4 && (
              <div className="mt-3 pt-3 border-t border-[#262c36] space-y-2.5 text-xs">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3.5 sm:gap-4">
                  <div className="flex-shrink-0">
                    <MatrixDisplay matrix={trace.adjMatrix} size="md" />
                  </div>
                  <div className="p-2.5 rounded bg-[#111418] border border-[#262c36] font-mono text-neutral-300 text-xs overflow-x-auto flex-1">
                    adj(A) · b = [{trace.adjTimesB.join(", ")}]ᵀ
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 5: Invers */}
        {!trace.isSingular && (
          <div
            className={`border rounded transition-colors ${
              revealStep >= 5
                ? "bg-[#15191f] border-[#262c36] p-3.5 sm:p-4"
                : "bg-[#111418] border-[#262c36] p-3 border-dashed"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#1e232b] text-neutral-300 flex items-center justify-center font-mono text-xs font-bold border border-[#2a313d]">
                  5
                </span>
                <span className="text-xs font-bold text-white">Langkah 5: Matriks Invers A⁻¹ = (1/d) · adj(A)</span>
              </div>
              {revealStep < 5 ? (
                <button
                  onClick={() => setRevealStep(5)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3 h-3" /> Buka Kunci
                </button>
              ) : (
                <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
              )}
            </div>

            {revealStep >= 5 && (
              <div className="mt-3 pt-3 border-t border-[#262c36] space-y-2.5 text-xs">
                <MatrixDisplay matrix={trace.invMatrixFraction} isFraction size="sm" />
              </div>
            )}
          </div>
        )}

        {/* Step 6: Vektor Solusi x */}
        {!trace.isSingular && (
          <div
            className={`border rounded transition-colors ${
              revealStep >= 6
                ? "bg-[#15191f] border-[#262c36] p-3.5 sm:p-4"
                : "bg-[#111418] border-[#262c36] p-3 border-dashed"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-[#1c2420] text-emerald-400 flex items-center justify-center font-mono text-xs font-bold border border-emerald-900/60">
                  6
                </span>
                <span className="text-xs font-bold text-white">Langkah 6: Vektor Solusi x = A⁻¹ · b</span>
              </div>
              {revealStep < 6 ? (
                <button
                  onClick={() => setRevealStep(6)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3 h-3" /> Buka Kunci
                </button>
              ) : (
                <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
              )}
            </div>

            {revealStep >= 6 && (
              <div className="mt-3 pt-3 border-t border-[#262c36] space-y-3 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {trace.x.map((val, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded bg-[#111418] border border-[#2a313d] text-center"
                    >
                      <div className="text-[10px] text-neutral-400 font-mono">x[{idx + 1}]</div>
                      <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-0.5">
                        {Number.isInteger(val) ? val : val.toFixed(4)}
                      </div>
                      <div className="text-[10px] text-amber-300 font-mono mt-0.5">
                        {trace.xFraction[idx].formatted}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2.5 rounded bg-[#1c2420] border border-emerald-900 text-emerald-300 flex items-center gap-1.5 font-mono text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>Verifikasi Residual: r = A · x - b ≈ 0 ({trace.isVerified ? "Cocok 100%" : "Periksa Pembulatan"})</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
