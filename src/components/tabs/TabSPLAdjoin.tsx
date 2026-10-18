"use client";

import React, { useState, useMemo } from "react";
import {
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { MatrixInput } from "../ui/MatrixInput";
import { VectorInput } from "../ui/VectorInput";
import { MatrixDisplay } from "../ui/MatrixDisplay";
import { StepCard } from "../ui/StepCard";
import { CodeRunner } from "../ui/CodeRunner";
import { solveSPLAdjoin } from "@/lib/algorithms/matrix";
import { SPL_PRESETS, SPLPreset } from "@/lib/presets";
import {
  generateSPLStep1Code,
  generateSPLStep2Code,
  generateSPLStep3Code,
  generateSPLStep4Code,
  generateSPLStep5Code,
  generateSPLStep6Code,
  generateSPLFullScript,
} from "@/lib/algorithms/codeGenerator";

export const TabSPLAdjoin: React.FC = () => {
  const [dimension, setDimension] = useState<number>(4);
  const [matrixA, setMatrixA] = useState<number[][]>(SPL_PRESETS[0].A);
  const [vectorB, setVectorB] = useState<number[]>(SPL_PRESETS[0].b);
  const [selectedPresetId, setSelectedPresetId] = useState<string>("laporan-4x4");

  // Handle changing dimension
  const handleDimensionChange = (n: number) => {
    setDimension(n);
    setSelectedPresetId("");

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

  // Generate runnable JavaScript code snippets for each step & full script
  const step1Code = useMemo(() => generateSPLStep1Code(matrixA, dimension), [matrixA, dimension]);
  const step2Code = useMemo(() => generateSPLStep2Code(matrixA, dimension), [matrixA, dimension]);
  const step3Code = useMemo(() => generateSPLStep3Code(matrixA, vectorB, dimension), [matrixA, vectorB, dimension]);
  const step4Code = useMemo(() => generateSPLStep4Code(matrixA, dimension), [matrixA, dimension]);
  const step5Code = useMemo(() => generateSPLStep5Code(matrixA, vectorB, dimension), [matrixA, vectorB, dimension]);
  const step6Code = useMemo(() => generateSPLStep6Code(matrixA, vectorB, trace.x, dimension), [matrixA, vectorB, trace.x, dimension]);
  const fullScript = useMemo(() => generateSPLFullScript(matrixA, vectorB, dimension), [matrixA, vectorB, dimension]);

  return (
    <div className="space-y-4">
      {/* Tab Header Banner */}
      <div className="p-3.5 sm:p-4 rounded bg-[#15191f] border border-[#262c36]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5 text-neutral-400" />
              <span>Modul 1 – 6 Algoritma Utama</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Simulasi SPL Berbasis Metode Matriks Adjoin: x = A<sup>-1</sup> · b
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
              Menghitung solusi eksak sistem persamaan linier dengan penelusuran minor, kofaktor, adjoin, invers analitik, dan kode JavaScript eksekutabel di setiap langkah.
            </p>
          </div>

          {/* Dimension Selector */}
          <div className="flex items-center gap-1.5 bg-[#111418] p-1 rounded border border-[#262c36] self-start md:self-auto">
            <span className="text-xs text-neutral-400 px-2 font-medium">Ukuran:</span>
            {[2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => handleDimensionChange(n)}
                className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-colors ${
                  dimension === n
                    ? "bg-[#252c38] text-white border border-neutral-600"
                    : "text-neutral-400 hover:text-white hover:bg-[#181c22]"
                }`}
              >
                {n} × {n}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="mt-3 pt-3 border-t border-[#262c36] flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-neutral-400 font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            Preset:
          </span>
          {SPL_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                selectedPresetId === preset.id
                  ? "bg-[#202630] border-neutral-400 text-white font-medium"
                  : "bg-[#111418] border-[#262c36] text-neutral-300 hover:border-neutral-500 hover:text-white"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Input Matrix & Vector Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3.5 sm:gap-4">
        <div className="lg:col-span-3 bg-[#15191f] p-3.5 sm:p-4 rounded border border-[#262c36]">
          <MatrixInput
            label="Matriks Koefisien A"
            subLabel="Ukuran n × n"
            matrix={matrixA}
            onChange={setMatrixA}
          />
        </div>

        <div className="lg:col-span-1 bg-[#15191f] p-3.5 sm:p-4 rounded border border-[#262c36] flex flex-col justify-between gap-3">
          <VectorInput
            label="Vektor Konstanta b"
            subLabel="Ukuran n × 1"
            vector={vectorB}
            onChange={setVectorB}
          />

          <div className="pt-2 border-t border-[#262c36] flex items-center justify-between text-xs text-neutral-400">
            <span className="font-mono">Sistem: A · x = b</span>
            <button
              onClick={() => {
                const p = SPL_PRESETS.find((pr) => pr.n === dimension) || SPL_PRESETS[0];
                handleApplyPreset(p);
              }}
              className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Preset
            </button>
          </div>
        </div>
      </div>

      {/* COMPUTATIONAL STEP-BY-STEP TRACE */}
      <div className="space-y-3.5">
        {/* Singular Matrix Alert Branch (Modul 6) */}
        {trace.isSingular && (
          <div className="p-4 rounded bg-[#201518] border border-rose-900 text-rose-200 space-y-2">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-rose-100 font-mono">
                  &quot;Matriks singular (det = 0): metode adjoin tidak dapat dipakai&quot;
                </h3>
                <p className="text-xs text-rose-300/90 mt-0.5">
                  Sesuai Modul 6 pseudocode, jika determinan d == 0 maka sistem berhenti karena pembagian dengan determinan bernilai tak terdefinisi (1 / 0).
                </p>
              </div>
            </div>
            <div className="font-mono text-xs bg-[#111418] p-2.5 rounded border border-rose-900/60 text-neutral-300">
              d = Det(A, {dimension}) = 0 → JIKA d == 0: CETAK &quot;Matriks singular (det = 0): metode adjoin tidak dapat dipakai&quot; → BERHENTI
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
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <p className="text-neutral-300 leading-relaxed">
                Determinan dihitung melalui ekspansi kofaktor sepanjang baris pertama (Modul 1 &amp; 2):
              </p>
              <div className="p-2 rounded bg-[#111418] border border-[#262c36] font-mono text-[11px] text-neutral-200">
                Det(A, n) = ∑ (j = 1 s.d. n) [ (-1)^(1+j) · A[1][j] · Det(Minor(A, n, 1, j)) ]
              </div>
            </div>

            {/* Grid of Columns Expansion */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {trace.detExpansionRow1.map((term) => (
                <div
                  key={term.col}
                  className="p-2.5 rounded bg-[#111418] border border-[#262c36] space-y-1.5"
                >
                  <div className="flex items-center justify-between border-b border-[#262c36] pb-1">
                    <span className="font-mono font-bold text-neutral-200">
                      Kolom j = {term.col} (A[1][{term.col}] = {term.element})
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1e232b] text-neutral-300">
                      Tanda: {term.sign > 0 ? "+1" : "-1"}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-[10px] text-neutral-400 font-mono">
                      Sub-matriks Minor M[1][{term.col}]:
                    </div>
                    <MatrixDisplay matrix={term.subMatrix} size="sm" />
                  </div>

                  <div className="pt-1.5 border-t border-[#262c36] font-mono text-neutral-300 space-y-0.5">
                    <div>
                      Det(M[1][{term.col}]) = <strong className="text-white">{term.minorDet}</strong>
                    </div>
                    <div className="text-[10px] text-neutral-400">
                      Suku = ({term.sign > 0 ? "+1" : "-1"}) × {term.element} × {term.minorDet} ={" "}
                      <strong className="text-white font-mono">{term.termValue}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Determinant Summation Result */}
            <div className="p-3 rounded bg-[#111418] border border-[#262c36] flex flex-wrap items-center justify-between gap-2.5">
              <div className="font-mono text-neutral-200 text-xs sm:text-sm">
                d = Det(A, {dimension}) ={" "}
                {trace.detExpansionRow1
                  .map((t) => `${t.termValue < 0 ? `- ${Math.abs(t.termValue)}` : `+ ${t.termValue}`}`)
                  .join(" ")
                  .replace(/^\+\s*/, "")}{" "}
                ={" "}
                <strong className={`text-sm sm:text-base ${trace.isSingular ? "text-rose-400" : "text-emerald-400"}`}>
                  {trace.detA}
                </strong>
              </div>
              <span className="text-[11px] text-neutral-400 font-mono">
                {dimension === 4 && trace.detA === -72 && "(Sesuai eksak laporan manual: d = -72)"}
              </span>
            </div>

            {/* RUNNABLE CODE RUNNER FOR STEP 1 */}
            <CodeRunner
              code={step1Code}
              title="Kode JavaScript Langkah 1: Minor & Determinan"
              subtitle="Menjalankan fungsi Minor(A, n, p, q) dan Det(A, n) secara langsung"
              badge="Modul 1 & 2"
            />
          </div>
        </StepCard>

        {!trace.isSingular && (
          <>
            {/* Step 2: Matriks Kofaktor C */}
            <StepCard
              stepNumber="2"
              title="Menentukan Matriks Kofaktor C"
              formula="C[i][j] = (-1)^(i+j) · Det(Minor(A, n, i, j))"
              subtitle="Menghitung kofaktor setiap elemen berdasarkan minor sub-matriks ukuran (n-1) × (n-1)"
            >
              <div className="space-y-3 text-xs">
                <p className="text-neutral-300 leading-relaxed">
                  Matriks kofaktor berukuran {dimension} × {dimension} yang diperoleh dari perkalian tanda selang-seling <code className="text-neutral-200 font-mono">(-1)^(i+j)</code> dengan determinan minor masing-masing sel:
                </p>

                <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-3.5 sm:gap-4">
                  <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1.5 flex-shrink-0">
                    <span className="text-xs font-semibold text-neutral-300">Matriks Kofaktor C:</span>
                    <MatrixDisplay matrix={trace.cofactorMatrix} size="md" />
                  </div>

                  <div className="flex-1 space-y-1.5 min-w-0">
                    <div className="text-xs font-semibold text-neutral-300">
                      Rincian Nilai Kofaktor C[i][j] (Seluruh Sel {dimension} × {dimension}):
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-52 overflow-y-auto pr-1">
                      {trace.cofactorSteps.flatMap((row) =>
                        row.map((step) => (
                          <div
                            key={`${step.row}-${step.col}`}
                            className="p-1.5 rounded bg-[#111418] border border-[#262c36] font-mono text-[10px] flex items-center justify-between"
                          >
                            <span className="text-neutral-400">
                              C[{step.row}][{step.col}] = ({step.sign > 0 ? "+1" : "-1"}) × {step.minorDet}
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

                {/* RUNNABLE CODE RUNNER FOR STEP 2 */}
                <CodeRunner
                  code={step2Code}
                  title="Kode JavaScript Langkah 2: Matriks Kofaktor"
                  subtitle="Menjalankan fungsi Kofaktor(A, n) dan menampilkan rincian tiap sel C[i][j]"
                  badge="Modul 3"
                />
              </div>
            </StepCard>

            {/* Step 3: Matriks Adjoin adj(A) */}
            <StepCard
              stepNumber="3"
              title="Menentukan Matriks Adjoin adj(A)"
              formula={<span>adj(A) = C<sup>T</sup> (Transpos Matriks Kofaktor)</span>}
              subtitle="Menukar baris menjadi kolom: adj[j][i] = C[i][j]"
            >
              <div className="space-y-3 text-xs">
                <p className="text-neutral-300 leading-relaxed">
                  Adjoin diperoleh dengan mentranspos matriks kofaktor C. Baris ke-i dari kofaktor menjadi kolom ke-i dari matriks adjoin (<code className="text-neutral-200 font-mono">adj[j][i] = C[i][j]</code>):
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3.5 sm:gap-4">
                  <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1.5 flex-shrink-0">
                    <span className="text-xs font-semibold text-neutral-300">
                      Matriks Adjoin adj(A) = C<sup>T</sup>:
                    </span>
                    <MatrixDisplay matrix={trace.adjMatrix} size="md" />
                  </div>

                  <div className="p-3.5 rounded bg-[#111418] border border-[#262c36] flex-1 space-y-2">
                    <span className="text-xs font-semibold text-neutral-200">
                      Perkalian Perantara Kertas Kerja: adj(A) · b
                    </span>
                    <p className="text-neutral-400 text-xs">
                      Mengalikan matriks adjoin bulat dengan vektor b menghasilkan vektor kelipatan determinan:
                    </p>
                    <div className="space-y-1 font-mono text-[11px] text-neutral-300 bg-[#0d1014] p-2 rounded border border-[#262c36]">
                      {trace.adjMatrix.map((row, i) => {
                        const terms = row.map((c, k) => `(${c} × ${vectorB[k]})`).join(" + ");
                        return (
                          <div key={i} className="flex justify-between items-center">
                            <span className="text-neutral-400">Baris {i + 1}: {terms}</span>
                            <span className="text-emerald-400 font-bold">= {trace.adjTimesB[i]}</span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="font-mono text-xs bg-[#181c22] p-2 rounded border border-[#2e3542] text-emerald-400 font-bold overflow-x-auto">
                      Vektor adj(A) · b = [{trace.adjTimesB.join(", ")}]^T
                    </div>
                  </div>
                </div>

                {/* RUNNABLE CODE RUNNER FOR STEP 3 */}
                <CodeRunner
                  code={step3Code}
                  title={<span>Kode JavaScript Langkah 3: Matriks Adjoin &amp; Perkalian adj(A) · b</span>}
                  subtitle="Menjalankan fungsi Adjoin(C, n) serta menghitung dot product dengan vektor b"
                  badge="Modul 4"
                />
              </div>
            </StepCard>

            {/* Step 4: Tahap 1 Solusi - Matriks Invers A^-1 */}
            <StepCard
              stepNumber="4"
              title={<span>Tahap 1 Solusi: Menentukan Matriks Invers A<sup>-1</sup></span>}
              formula={<span>A<sup>-1</sup> = (1/d) · adj(A)</span>}
              subtitle="Membagi setiap elemen matriks adjoin dengan nilai determinan d"
            >
              <div className="space-y-3 text-xs">
                <p className="text-neutral-300 leading-relaxed">
                  Setiap elemen <code className="text-neutral-200 font-mono">adj[i][j]</code> dibagi dengan determinan <code className="text-neutral-200 font-mono">d = {trace.detA}</code>. Disajikan dalam bentuk pecahan eksak dan desimal:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1.5 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-300">Bentuk Pecahan Eksak:</span>
                      <span className="text-[10px] text-neutral-500 font-mono">Tanpa pembulatan analitik</span>
                    </div>
                    <MatrixDisplay matrix={trace.invMatrixFraction} isFraction size="sm" />
                  </div>

                  <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1.5 overflow-hidden">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-neutral-300">Bentuk Desimal:</span>
                      <span className="text-[10px] text-neutral-500 font-mono">Presisi floating point</span>
                    </div>
                    <MatrixDisplay
                      matrix={trace.invMatrixDecimal.map((r) =>
                        r.map((v) => Number(v.toFixed(4)))
                      )}
                      size="sm"
                    />
                  </div>
                </div>

                {/* RUNNABLE CODE RUNNER FOR STEP 4 */}
                <CodeRunner
                  code={step4Code}
                  title={<span>Kode JavaScript Langkah 4: Matriks Invers A<sup>-1</sup></span>}
                  subtitle="Menghitung pembagian elemen A_inv[i][j] = adj[i][j] / d"
                  badge="Modul 5 (Tahap 1)"
                />
              </div>
            </StepCard>

            {/* Step 5: Tahap 2 Solusi - Vektor Solusi x */}
            <StepCard
              stepNumber="5"
              title="Tahap 2 Solusi: Menentukan Vektor Solusi x"
              formula={<span>x = A<sup>-1</sup> · b = (1/d) · (adj(A) · b)</span>}
              subtitle="Mengalikan matriks invers dengan vektor konstanta b"
              badge="Solusi Akhir SPL"
              badgeType="success"
            >
              <div className="space-y-3 text-xs">
                <p className="text-neutral-300 leading-relaxed">
                  Perhitungan komponen solusi akhir diperoleh dari <code className="text-neutral-200 font-mono">x[i] = (adj(A) · b)[i] / d</code>:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-stretch">
                  <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1.5">
                    <span className="text-xs font-semibold text-neutral-300">Rincian Pembagian Pecahan:</span>
                    <div className="space-y-1.5 font-mono">
                      {trace.xFraction.map((frac, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-1.5 rounded bg-[#181c22] border border-[#262c36]"
                        >
                          <span className="text-neutral-400">x[{idx + 1}] =</span>
                          <span className="text-[11px] text-neutral-300">
                            {trace.adjTimesB[idx]} / {trace.detA} =
                          </span>
                          <span className="font-bold text-amber-300 font-mono">
                            {frac.formatted}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-[#111418] border border-[#262c36] space-y-2 md:col-span-2">
                    <span className="text-xs font-bold text-neutral-200">
                      Vektor Solusi Akhir x (Desimal / Bulat):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {trace.x.map((val, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded bg-[#181c22] border border-[#2a313d] text-center"
                        >
                          <div className="text-[10px] text-neutral-400 font-mono">Variabel x[{idx + 1}]</div>
                          <div className="text-base sm:text-lg font-bold font-mono text-emerald-400 mt-0.5">
                            {Number.isInteger(val) ? val : val.toFixed(4)}
                          </div>
                        </div>
                      ))}
                    </div>
                    {dimension === 4 && JSON.stringify(trace.x) === JSON.stringify([1, -1, 2, 1]) && (
                      <p className="text-xs text-emerald-400 pt-1 flex items-center gap-1.5 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        Sesuai 100% hasil laporan: x = [1, -1, 2, 1]^T
                      </p>
                    )}
                  </div>
                </div>

                {/* RUNNABLE CODE RUNNER FOR STEP 5 */}
                <CodeRunner
                  code={step5Code}
                  title="Kode JavaScript Langkah 5: Vektor Solusi x"
                  subtitle="Menjalankan fungsi Solusi(adj, d, b, n) untuk menghitung vektor x"
                  badge="Modul 5 (Tahap 2)"
                />
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
                <div className="overflow-x-auto -mx-1">
                  <table className="w-full text-left font-mono border-collapse min-w-[500px]">
                    <thead>
                      <tr className="border-b border-[#262c36] text-neutral-400 bg-[#111418]">
                        <th className="py-2 px-2.5">Persamaan</th>
                        <th className="py-2 px-2.5">Substitusi (A[i] · x)</th>
                        <th className="py-2 px-2.5">Hasil Evaluasi</th>
                        <th className="py-2 px-2.5">Target (b[i])</th>
                        <th className="py-2 px-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#202630]">
                      {matrixA.map((row, i) => {
                        const calculatedRowVal = row.reduce(
                          (acc, coeff, j) => acc + coeff * trace.x[j],
                          0
                        );
                        const isMatch = Math.abs(calculatedRowVal - vectorB[i]) < 1e-6;
                        return (
                          <tr key={i} className="hover:bg-[#181c22]">
                            <td className="py-2 px-2.5 font-semibold text-neutral-300 whitespace-nowrap">
                              Baris {i + 1}
                            </td>
                            <td className="py-2 px-2.5 text-neutral-400 text-[10px]">
                              {row
                                .map((c, j) => `(${c})(${Number.isInteger(trace.x[j]) ? trace.x[j] : trace.x[j].toFixed(2)})`)
                                .join(" + ")}
                            </td>
                            <td className="py-2 px-2.5 text-white font-bold whitespace-nowrap">
                              {Number.isInteger(calculatedRowVal)
                                ? calculatedRowVal
                                : calculatedRowVal.toFixed(4)}
                            </td>
                            <td className="py-2 px-2.5 text-neutral-300 font-bold whitespace-nowrap">
                              {vectorB[i]}
                            </td>
                            <td className="py-2 px-2.5 whitespace-nowrap">
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

                {/* RUNNABLE CODE RUNNER FOR STEP 6 */}
                <CodeRunner
                  code={step6Code}
                  title="Kode JavaScript Langkah 6: Verifikasi A · x = b"
                  subtitle="Menghitung residual evaluasi baris demi baris secara otomatis"
                  badge="Verifikasi"
                />
              </div>
            </StepCard>
          </>
        )}
      </div>

      {/* FULL STANDALONE SCRIPT RUNNER AT BOTTOM */}
      <div className="pt-2">
        <div className="p-3.5 sm:p-4 rounded bg-[#11151b] border border-emerald-900/60 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#262c36] pb-2.5">
            <div>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold font-mono">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Program Lengkap: SPL Metode Matriks Adjoin (Modul 1 – 6)</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Script JavaScript utuh dan mandiri. Klik &quot;Jalankan Kode&quot; untuk mengeksekusi seluruh 6 modul sekaligus dengan input matriks A dan vektor b saat ini.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18231c] text-emerald-300 border border-emerald-800 self-start sm:self-auto">
              Mandiri (Zero-Dependency)
            </span>
          </div>

          <CodeRunner
            code={fullScript}
            title="Program Utama Lengkap: SPL_Adjoin(A, b, n)"
            subtitle="Memuat seluruh implementasi fungsi Minor, Det, Kofaktor, Adjoin, Solusi, dan SPL_Adjoin"
            badge="Full Script Modul 1-6"
            variant="full"
            defaultOpen={true}
          />
        </div>
      </div>
    </div>
  );
};
