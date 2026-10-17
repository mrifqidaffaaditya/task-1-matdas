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
  AlertTriangle,
  Clock,
  Layers,
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

  // Reveal step indices: 0 = none, 1 = det, 2 = minor, 3 = cofactor, 4 = adjoin, 5 = inv, 6 = solution
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
    setRevealStep(0); // Reset reveal on new matrix
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
    "Determinan Matriks A",
    "Matriks Minor M_ij",
    "Matriks Kofaktor C_ij",
    "Matriks Adjoin adj(A)",
    "Matriks Invers A⁻¹",
    "Vektor Solusi x",
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Dices className="w-4 h-4" />
              <span>Simulasi Ujian Lisan & Rubrik Penilaian (25 Menit)</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Mode &quot;Live Challenge&quot; Dosen (Real-Time Arena)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Dirancang untuk menguji matriks acak secara interaktif dengan kontrol buka-tutup bertahap (*reveal mode*) saat menghitung di papan tulis.
            </p>
          </div>

          {/* 25-Minute Session Timer */}
          <div className="flex items-center gap-3 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <Clock className="w-5 h-5 text-amber-400" />
            <div className="text-center font-mono">
              <div className="text-lg font-bold text-white">{formatTimer(timerSeconds)}</div>
              <div className="text-[9px] uppercase tracking-wider text-slate-500">Sisa Waktu Sesi</div>
            </div>
            <div className="flex items-center gap-1 pl-2 border-l border-slate-800">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                title={isTimerRunning ? "Pause Timer" : "Start Timer"}
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(25 * 60);
                }}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="Reset 25 Menit"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Action Controls Toolbar */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Dimensi:</span>
            {[3, 4].map((n) => (
              <button
                key={n}
                onClick={() => handleDimensionChange(n)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  dimension === n
                    ? "bg-amber-600 text-white"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {n} × {n}
              </button>
            ))}

            <button
              onClick={handleGenerateRandomMatrix}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border border-amber-500/30 text-xs font-medium transition-all ml-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Acak Matriks Non-Singular
            </button>
          </div>

          {/* Reveal Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setRevealStep((prev) => Math.min(stepNames.length, prev + 1))}
              disabled={revealStep >= stepNames.length}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-medium transition-all"
            >
              <FastForward className="w-3.5 h-3.5" />
              Buka Langkah ({revealStep}/{stepNames.length})
            </button>
            <button
              onClick={() => setRevealStep(stepNames.length)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Buka Semua
            </button>
            <button
              onClick={() => setRevealStep(0)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition-colors"
            >
              <EyeOff className="w-3.5 h-3.5" />
              Sembunyikan
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Input Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <MatrixInput
            label="Matriks Soal Tantangan Dosen A"
            subLabel="Ubah elemen langsung di grid"
            matrix={matrixA}
            onChange={setMatrixA}
          />
        </div>
        <div className="lg:col-span-1 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <VectorInput
            label="Vektor b"
            subLabel="Target SPL"
            vector={vectorB}
            onChange={setVectorB}
          />
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-300">Tahapan Solusi Terbuka:</span>
        <div className="flex flex-wrap items-center gap-1.5">
          {stepNames.map((name, idx) => {
            const isUnlocked = revealStep > idx;
            return (
              <button
                key={name}
                onClick={() => setRevealStep(idx + 1)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  isUnlocked
                    ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                    : "bg-slate-900 text-slate-500 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {idx + 1}. {name} {isUnlocked && "✓"}
              </button>
            );
          })}
        </div>
      </div>

      {/* REVEALABLE CONTENT BLOCKS */}
      <div className="space-y-4">
        {/* Step 1: Determinan */}
        <div
          className={`border rounded-xl transition-all ${
            revealStep >= 1
              ? "bg-slate-900/80 border-slate-700 p-5"
              : "bg-slate-950/40 border-slate-800/60 p-4 border-dashed"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold">
                1
              </span>
              <span className="text-sm font-bold text-white">Langkah 1: Determinan Matriks A</span>
            </div>
            {revealStep < 1 ? (
              <button
                onClick={() => setRevealStep(1)}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
              >
                <Eye className="w-3.5 h-3.5" /> Klik untuk Membuka Kunci
              </button>
            ) : (
              <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
            )}
          </div>

          {revealStep >= 1 && (
            <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 font-mono">Nilai Determinan det(A):</span>
                <span
                  className={`text-lg font-bold font-mono ${
                    trace.isSingular ? "text-rose-400" : "text-emerald-400"
                  }`}
                >
                  det(A) = {trace.detA}
                </span>
              </div>
              {trace.isSingular && (
                <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-600 text-rose-300">
                  Matriks singular (det = 0): Metode adjoin berhenti di sini.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 2: Minor */}
        {!trace.isSingular && (
          <div
            className={`border rounded-xl transition-all ${
              revealStep >= 2
                ? "bg-slate-900/80 border-slate-700 p-5"
                : "bg-slate-950/40 border-slate-800/60 p-4 border-dashed"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold">
                  2
                </span>
                <span className="text-sm font-bold text-white">Langkah 2: Determinan Minor M_ij</span>
              </div>
              {revealStep < 2 ? (
                <button
                  onClick={() => setRevealStep(2)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3.5 h-3.5" /> Klik untuk Membuka Kunci
                </button>
              ) : (
                <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
              )}
            </div>

            {revealStep >= 2 && (
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {trace.minors.flatMap((row) =>
                    row.map((m) => (
                      <div
                        key={`${m.row}-${m.col}`}
                        className="p-2 rounded bg-slate-950 border border-slate-800 font-mono text-[11px] flex justify-between"
                      >
                        <span className="text-slate-400">M_{m.row}{m.col}:</span>
                        <span className="font-bold text-indigo-300">{m.detMinor}</span>
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
            className={`border rounded-xl transition-all ${
              revealStep >= 3
                ? "bg-slate-900/80 border-slate-700 p-5"
                : "bg-slate-950/40 border-slate-800/60 p-4 border-dashed"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold">
                  3
                </span>
                <span className="text-sm font-bold text-white">Langkah 3: Matriks Kofaktor C_ij</span>
              </div>
              {revealStep < 3 ? (
                <button
                  onClick={() => setRevealStep(3)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3.5 h-3.5" /> Klik untuk Membuka Kunci
                </button>
              ) : (
                <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
              )}
            </div>

            {revealStep >= 3 && (
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs">
                <MatrixDisplay matrix={trace.cofactorMatrix} size="md" />
              </div>
            )}
          </div>
        )}

        {/* Step 4: Adjoin */}
        {!trace.isSingular && (
          <div
            className={`border rounded-xl transition-all ${
              revealStep >= 4
                ? "bg-slate-900/80 border-slate-700 p-5"
                : "bg-slate-950/40 border-slate-800/60 p-4 border-dashed"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold">
                  4
                </span>
                <span className="text-sm font-bold text-white">Langkah 4: Matriks Adjoin adj(A) = Cᵀ</span>
              </div>
              {revealStep < 4 ? (
                <button
                  onClick={() => setRevealStep(4)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3.5 h-3.5" /> Klik untuk Membuka Kunci
                </button>
              ) : (
                <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
              )}
            </div>

            {revealStep >= 4 && (
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <MatrixDisplay matrix={trace.adjMatrix} size="md" />
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 font-mono text-slate-300">
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
            className={`border rounded-xl transition-all ${
              revealStep >= 5
                ? "bg-slate-900/80 border-slate-700 p-5"
                : "bg-slate-950/40 border-slate-800/60 p-4 border-dashed"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold">
                  5
                </span>
                <span className="text-sm font-bold text-white">Langkah 5: Matriks Invers A⁻¹ = (1/d) · adj(A)</span>
              </div>
              {revealStep < 5 ? (
                <button
                  onClick={() => setRevealStep(5)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3.5 h-3.5" /> Klik untuk Membuka Kunci
                </button>
              ) : (
                <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
              )}
            </div>

            {revealStep >= 5 && (
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-3 text-xs">
                <MatrixDisplay matrix={trace.invMatrixFraction} isFraction size="sm" />
              </div>
            )}
          </div>
        )}

        {/* Step 6: Vektor Solusi x */}
        {!trace.isSingular && (
          <div
            className={`border rounded-xl transition-all ${
              revealStep >= 6
                ? "bg-slate-900/80 border-slate-700 p-5"
                : "bg-slate-950/40 border-slate-800/60 p-4 border-dashed"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-mono text-xs font-bold">
                  6
                </span>
                <span className="text-sm font-bold text-white">Langkah 6: Vektor Solusi x = A⁻¹ · b</span>
              </div>
              {revealStep < 6 ? (
                <button
                  onClick={() => setRevealStep(6)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono"
                >
                  <Eye className="w-3.5 h-3.5" /> Klik untuk Membuka Kunci
                </button>
              ) : (
                <span className="font-mono text-xs text-emerald-400 font-bold">Terbuka</span>
              )}
            </div>

            {revealStep >= 6 && (
              <div className="mt-4 pt-4 border-t border-slate-800/80 space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {trace.x.map((val, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-center"
                    >
                      <div className="text-[11px] text-slate-400 font-mono">x_{idx + 1}</div>
                      <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                        {Number.isInteger(val) ? val : val.toFixed(4)}
                      </div>
                      <div className="text-[11px] text-amber-300 font-mono mt-0.5">
                        {trace.xFraction[idx].formatted}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
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
