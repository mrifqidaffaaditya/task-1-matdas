"use client";

import React, { useState, useMemo } from "react";
import {
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  RotateCcw,
  ArrowRight,
  Info,
} from "lucide-react";
import { MatrixInput } from "../ui/MatrixInput";
import { VectorInput } from "../ui/VectorInput";
import { MatrixDisplay } from "../ui/MatrixDisplay";
import { StepCard } from "../ui/StepCard";
import { solveSPLAdjoin } from "@/lib/algorithms/matrix";
import { SPL_PRESETS, SPLPreset } from "@/lib/presets";

export const TabSPLAdjoin: React.FC = () => {
  const [dimension, setDimension] = useState<number>(4);
  const [matrixA, setMatrixA] = useState<number[][]>(SPL_PRESETS[0].A);
  const [vectorB, setVectorB] = useState<number[]>(SPL_PRESETS[0].b);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("laporan-4x4");

  // Handle changing dimension
  const handleDimensionChange = (n: number) => {
    setDimension(n);
    setSelectedPresetId("");

    // Initialize with identity or zeros
    const newA: number[][] = Array.from({ length: n }, (_, r) =>
      Array.from({ length: n }, (_, c) => (r === c ? 2 : 1))
    );
    const newB: number[] = new Array(n).fill(1);
    setMatrixA(newA);
    setVectorB(newB);
  };

  // Load Preset
  const handleApplyPreset = (preset: SPLPreset) => {
    setDimension(preset.n);
    setMatrixA(preset.A);
    setVectorB(preset.b);
    setSelectedPresetId(preset.id);
  };

  // Compute SPL Adjoin Trace
  const trace = useMemo(() => {
    return solveSPLAdjoin(matrixA, vectorB, dimension);
  }, [matrixA, vectorB, dimension]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tab Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Layers className="w-4 h-4" />
              <span>Modul 1 - 6 Algoritma Utama</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Simulasi SPL Berbasis Metode Matriks Adjoin ($x = A^{-1}b$)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Menghitung solusi eksak sistem persamaan linier dengan penelusuran minor, kofaktor, adjoin, dan invers analitik.
            </p>
          </div>

          {/* Dimension Selector */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 px-2 font-medium">Ukuran Matriks:</span>
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => handleDimensionChange(n)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                  dimension === n
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {n} × {n}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Preset Kasus Uji:
          </span>
          {SPL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                selectedPresetId === preset.id
                  ? "bg-indigo-600/20 border-indigo-500 text-indigo-300 font-semibold"
                  : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Matrix & Vector Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <MatrixInput
            label="Matriks Koefisien A"
            subLabel="Ukuran n × n"
            matrix={matrixA}
            onChange={setMatrixA}
          />
        </div>

        <div className="lg:col-span-1 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <VectorInput
            label="Vektor Konstanta b"
            subLabel="Ukuran n × 1"
            vector={vectorB}
            onChange={setVectorB}
          />

          <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Sistem: Ax = b</span>
            <button
              onClick={() => {
                const p = SPL_PRESETS.find((pr) => pr.n === dimension) || SPL_PRESETS[0];
                handleApplyPreset(p);
              }}
              className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Preset
            </button>
          </div>
        </div>
      </div>

      {/* COMPUTATIONAL STEP-BY-STEP TRACE */}
      <div className="space-y-4">
        {/* Singular Matrix Alert Branch (Modul 6) */}
        {trace.isSingular && (
          <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 space-y-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-rose-400 flex-shrink-0" />
              <div>
                <h3 className="text-base font-bold text-rose-100">
                  Matriks Singular (det = 0): Metode Adjoin Tidak Dapat Dipakai!
                </h3>
                <p className="text-xs text-rose-300/90 mt-0.5">
                  Sesuai Modul 6 pseudocode, jika determinan d == 0 maka sistem berhenti karena pembagian dengan determinan bernilai tak terdefinisi (1 / 0).
                </p>
              </div>
            </div>
            <div className="font-mono text-xs bg-slate-950/80 p-3 rounded-lg border border-rose-900/60 text-slate-300">
              d = Det(A, {dimension}) = 0 ⟹ BERHENTI (Tidak ada solusi tunggal)
            </div>
          </div>
        )}

        {/* Step 1: Determinant Laplace Expansion */}
        <StepCard
          stepNumber="1"
          title="Menentukan Determinan Matriks A"
          formula="d = Det(A, n) via Laplace Baris 1"
          badge={trace.isSingular ? "Singular (det = 0)" : `det(A) = ${trace.detA}`}
          badgeType={trace.isSingular ? "warning" : "info"}
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-300 leading-relaxed">
              Determinan dihitung melalui ekspansi kofaktor sepanjang baris pertama:
              <br />
              <code className="text-indigo-300 font-mono">
                det(A) = ∑ ((-1)^(1+j) · A[1][j] · Det(Minor(A, n, 1, j))) untuk j = 1..{dimension}
              </code>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {trace.detExpansionRow1.map((term) => (
                <div
                  key={term.col}
                  className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-indigo-400">
                      Kolom {term.col} (A[1][{term.col}] = {term.element})
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                      Tanda: {term.sign > 0 ? "+1" : "-1"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[11px] text-slate-400">Sub-matriks Minor M₁_{term.col}:</div>
                    <MatrixDisplay matrix={term.subMatrix} size="sm" />
                  </div>

                  <div className="pt-2 border-t border-slate-800 font-mono text-slate-300">
                    <div>det(M₁_{term.col}) = <strong className="text-white">{term.minorDet}</strong></div>
                    <div className="text-indigo-300 mt-0.5">
                      Suku = ({term.sign > 0 ? "+1" : "-1"}) × {term.element} × {term.minorDet} ={" "}
                      <strong className="text-white">{term.termValue}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Determinant Summation Result */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-900/40 flex flex-wrap items-center justify-between gap-3">
              <div className="font-mono text-slate-200">
                det(A) ={" "}
                {trace.detExpansionRow1
                  .map((t) => `${t.termValue < 0 ? `- ${Math.abs(t.termValue)}` : `+ ${t.termValue}`}`)
                  .join(" ")
                  .replace(/^\+\s*/, "")}{" "}
                ={" "}
                <strong className={`text-base ${trace.isSingular ? "text-rose-400" : "text-emerald-400"}`}>
                  {trace.detA}
                </strong>
              </div>
              <span className="text-[11px] text-slate-400">
                {dimension === 4 && trace.detA === -72 && "(Sesuai eksak laporan manual tracing: det = -72)"}
              </span>
            </div>
          </div>
        </StepCard>

        {!trace.isSingular && (
          <>
            {/* Step 2: Matriks Kofaktor C */}
            <StepCard
              stepNumber="2"
              title="Menentukan Matriks Kofaktor C"
              formula="C[i][j] = (-1)^(i+j) · Det(Minor(A, n, i, j))"
              subtitle="Menghitung kofaktor setiap elemen berdasarkan minor sub-matriks (n-1) x (n-1)"
            >
              <div className="space-y-4 text-xs">
                <p className="text-slate-300">
                  Matriks kofaktor berukuran {dimension} × {dimension} yang diperoleh dari perkalian tanda selang-seling <code className="text-indigo-300 font-mono">(-1)^(i+j)</code> dengan determinan minor masing-masing:
                </p>

                <div className="flex flex-col lg:flex-row items-start gap-6">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-slate-300">Matriks Kofaktor C:</span>
                    <MatrixDisplay matrix={trace.cofactorMatrix} size="md" />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="text-xs font-semibold text-slate-300">Contoh Hitungan Kofaktor Tiap Baris:</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                      {trace.cofactorSteps.flatMap((row) =>
                        row.map((step) => (
                          <div
                            key={`${step.row}-${step.col}`}
                            className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/80 font-mono text-[11px] flex items-center justify-between"
                          >
                            <span className="text-indigo-400">
                              C[{step.row}][{step.col}] = ({step.sign > 0 ? "+" : "-"}1) × {step.minorDet}
                            </span>
                            <span className="font-bold text-white">
                              = {step.cofactorValue}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </StepCard>

            {/* Step 3: Matriks Adjoin adj(A) */}
            <StepCard
              stepNumber="3"
              title="Menentukan Matriks Adjoin adj(A)"
              formula="adj(A) = C^T (Transpos Matriks Kofaktor)"
              subtitle="Menukar baris menjadi kolom: adj[j][i] = C[i][j]"
            >
              <div className="space-y-4 text-xs">
                <p className="text-slate-300">
                  Adjoin diperoleh dengan mentranspos matriks kofaktor C. Baris ke-i dari kofaktor menjadi kolom ke-i dari matriks adjoin:
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-slate-300">Matriks Adjoin adj(A) = C^T:</span>
                    <MatrixDisplay matrix={trace.adjMatrix} size="md" />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex-1 space-y-3">
                    <span className="text-xs font-semibold text-indigo-300">
                      Perkalian Perantara Kertas Kerja Laporan: adj(A) · b
                    </span>
                    <p className="text-slate-400 text-xs">
                      Mengalikan matriks adjoin bulat dengan vektor b menghasilkan vektor kelipatan determinan:
                    </p>
                    <div className="font-mono text-sm bg-slate-900 p-3 rounded-lg border border-slate-800 text-emerald-400 font-bold">
                      adj(A) · b = [{trace.adjTimesB.join(", ")}]^T
                    </div>
                    {dimension === 4 && trace.detA === -72 && (
                      <p className="text-[11px] text-slate-400">
                        Sesuai hitungan manual: [-72, 72, -144, -72]^T
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </StepCard>

            {/* Step 4: Tahap 1 Solusi - Matriks Invers A^-1 */}
            <StepCard
              stepNumber="4"
              title="Tahap 1: Menentukan Matriks Invers A⁻¹"
              formula="A⁻¹ = (1 / d) · adj(A)"
              subtitle="Membagi setiap elemen matriks adjoin dengan nilai determinan d"
            >
              <div className="space-y-4 text-xs">
                <p className="text-slate-300">
                  Setiap elemen <code className="text-indigo-300 font-mono">adj[i][j]</code> dibagi dengan determinan <code className="text-emerald-300 font-mono">d = {trace.detA}</code>. Disajikan dalam bentuk pecahan eksak yang disederhanakan dan desimal presisi:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-300">Bentuk Pecahan Eksak:</span>
                      <span className="text-[10px] text-slate-500 font-mono">Tanpa rounding drift</span>
                    </div>
                    <MatrixDisplay matrix={trace.invMatrixFraction} isFraction size="sm" />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-300">Bentuk Desimal:</span>
                      <span className="text-[10px] text-slate-500 font-mono">Presisi komputasi</span>
                    </div>
                    <MatrixDisplay
                      matrix={trace.invMatrixDecimal.map((r) =>
                        r.map((v) => Number(v.toFixed(4)))
                      )}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </StepCard>

            {/* Step 5: Tahap 2 Solusi - Vektor Solusi x */}
            <StepCard
              stepNumber="5"
              title="Tahap 2: Menentukan Vektor Solusi x"
              formula="x = A⁻¹ · b = (1 / det(A)) · (adj(A) · b)"
              subtitle="Mengalikan matriks invers dengan vektor konstanta b"
              badge="Solusi Akhir SPL"
              badgeType="success"
            >
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-slate-300">Vektor Pecahan:</span>
                    <div className="space-y-1 font-mono">
                      {trace.xFraction.map((frac, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800"
                        >
                          <span className="text-slate-400">x_{idx + 1} =</span>
                          <span className="font-bold text-amber-300">
                            {frac.formatted}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 space-y-2 md:col-span-2">
                    <span className="text-xs font-bold text-indigo-300">
                      Vektor Solusi Akhir x (Desimal / Bilangan Bulat):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {trace.x.map((val, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 text-center"
                        >
                          <div className="text-[10px] text-slate-400 font-mono">Variabel x_{idx + 1}</div>
                          <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
                            {Number.isInteger(val) ? val : val.toFixed(4)}
                          </div>
                        </div>
                      ))}
                    </div>
                    {dimension === 4 && JSON.stringify(trace.x) === JSON.stringify([1, -1, 2, 1]) && (
                      <p className="text-xs text-emerald-300/90 pt-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Sesuai 100% dengan hasil laporan analitik: x = [1, -1, 2, 1]ᵀ
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </StepCard>

            {/* Step 6: Verifikasi Hasil A * x = b */}
            <StepCard
              stepNumber="6"
              title="Verifikasi Otomatis A · x = b"
              formula="Residual r = A · x - b ≈ 0"
              subtitle="Memastikan integritas matematis solusi terhadap sistem persamaan awal"
              badge={trace.isVerified ? "Terverifikasi Valid" : "Galat Terdeteksi"}
              badgeType={trace.isVerified ? "success" : "warning"}
            >
              <div className="space-y-3 text-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2 px-3">Persamaan</th>
                        <th className="py-2 px-3">Substitusi (A[i] · x)</th>
                        <th className="py-2 px-3">Hasil Evaluasi</th>
                        <th className="py-2 px-3">Target (b[i])</th>
                        <th className="py-2 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {matrixA.map((row, i) => {
                        const calculatedRowVal = row.reduce(
                          (acc, coeff, j) => acc + coeff * trace.x[j],
                          0
                        );
                        const isMatch = Math.abs(calculatedRowVal - vectorB[i]) < 1e-6;
                        return (
                          <tr key={i} className="hover:bg-slate-900/40">
                            <td className="py-2.5 px-3 font-semibold text-slate-300">
                              Baris {i + 1}
                            </td>
                            <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                              {row
                                .map((c, j) => `(${c})(${Number.isInteger(trace.x[j]) ? trace.x[j] : trace.x[j].toFixed(2)})`)
                                .join(" + ")}
                            </td>
                            <td className="py-2.5 px-3 text-white font-bold">
                              {Number.isInteger(calculatedRowVal)
                                ? calculatedRowVal
                                : calculatedRowVal.toFixed(4)}
                            </td>
                            <td className="py-2.5 px-3 text-indigo-300 font-bold">
                              {vectorB[i]}
                            </td>
                            <td className="py-2.5 px-3">
                              {isMatch ? (
                                <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Cocok
                                </span>
                              ) : (
                                <span className="text-rose-400 font-semibold text-[11px]">
                                  Beda
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </StepCard>
          </>
        )}
      </div>
    </div>
  );
};
