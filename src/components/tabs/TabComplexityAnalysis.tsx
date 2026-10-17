"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Cpu,
  HardDrive,
  Scale,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";
import {
  getComplexityTable,
  TIME_COMPLEXITY_DERIVATION,
  SPACE_COMPLEXITY_DERIVATION,
} from "@/lib/algorithms/complexity";

export const TabComplexityAnalysis: React.FC = () => {
  const tableData = getComplexityTable();
  const [selectedN, setSelectedN] = useState<number>(4);

  const selectedRow = tableData.find((r) => r.n === selectedN) || tableData[3];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>Analisis Algoritma Asimtotik Formal (Big-O)</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Analisis Kompleksitas Waktu $T(n) = O(n \times n!)$ & Ruang $S(n) = O(n^3)$
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Pembuktian matematis formal penurunan kompleksitas asimtotik serta perbandingan laju pertumbuhan operasi terhadap eliminasi Gauss $O(n^3)$.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-mono">Waktu Asimtotik</div>
              <div className="text-base font-bold font-mono text-indigo-400">O(n × n!)</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-mono">Ruang Asimtotik</div>
              <div className="text-base font-bold font-mono text-emerald-400">O(n³)</div>
            </div>
          </div>
        </div>
      </div>

      {/* DERIVATION CARDS (TIME & SPACE) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Complexity Derivation */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Cpu className="w-4 h-4 text-indigo-400" />
              <span>1. Penurunan Kompleksitas Waktu T(n)</span>
            </div>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 font-bold">
              T(n) = O(n × n!)
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {TIME_COMPLEXITY_DERIVATION.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-200">{item.step}</span>
                  <span className="font-mono text-[11px] text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-950/40 border border-indigo-900/40">
                    {item.bigO}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {item.detail}
                </p>
              </div>
            ))}

            <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-indigo-200 font-mono text-xs space-y-1">
              <div className="font-bold">Rumus Gabungan Waktu:</div>
              <div>T(n) = O(n!) + O(n × n!) + O(n²) + O(n²)</div>
              <div className="text-emerald-400 font-bold pt-1">
                ⟹ Suku Dominan Tertinggi: T(n) = O(n × n!)
              </div>
            </div>
          </div>
        </div>

        {/* Space Complexity Derivation */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <HardDrive className="w-4 h-4 text-emerald-400" />
              <span>2. Penurunan Kompleksitas Ruang S(n)</span>
            </div>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 font-bold">
              S(n) = O(n³)
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {SPACE_COMPLEXITY_DERIVATION.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-200">{item.step}</span>
                  <span className="font-mono text-[11px] text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-900/40">
                    {item.bigO}
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  {item.detail}
                </p>
              </div>
            ))}

            <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 font-mono text-xs space-y-1">
              <div className="font-bold">Rumus Gabungan Ruang:</div>
              <div>S(n) = O(n²) [Matriks Utama] + O(n³) [Tumpukan Rekursi]</div>
              <div className="text-emerald-400 font-bold pt-1">
                ⟹ Suku Dominan Tertinggi: S(n) = O(n³)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE COMPARISON TABLE (n = 1 .. 10) */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              Tabel Pertumbuhan Operasi Komputasi (n = 1 sampai 10)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Memperlihatkan lonjakan eksponensial/faktorial metode adjoin dibandingkan metode Eliminasi Gauss.
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-400 mr-1">Pilih Sorotan n:</span>
            {[2, 3, 4, 5, 8, 10].map((n) => (
              <button
                key={n}
                onClick={() => setSelectedN(n)}
                className={`px-2 py-1 rounded font-mono font-bold text-xs transition-all ${
                  selectedN === n
                    ? "bg-amber-600 text-white"
                    : "bg-slate-950 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                n={n}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400">
                <th className="py-2.5 px-3">Ukuran n</th>
                <th className="py-2.5 px-3">n! (Faktorial)</th>
                <th className="py-2.5 px-3 text-indigo-400">Waktu Adjoin: n × n!</th>
                <th className="py-2.5 px-3 text-emerald-400">Waktu Gauss: ~ 2/3 n³</th>
                <th className="py-2.5 px-3 text-amber-400">Rasio (Adjoin / Gauss)</th>
                <th className="py-2.5 px-3 text-slate-400">Ruang S(n): n³</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {tableData.map((row) => {
                const isSelected = row.n === selectedN;
                const ratio =
                  row.timeGauss > 0
                    ? (row.timeAdjoin / row.timeGauss).toFixed(1)
                    : "1.0";
                return (
                  <tr
                    key={row.n}
                    className={`transition-colors ${
                      isSelected ? "bg-indigo-950/40 border-l-2 border-indigo-500" : "hover:bg-slate-900/40"
                    }`}
                  >
                    <td className="py-2.5 px-3 font-bold text-white">
                      n = {row.n}
                    </td>
                    <td className="py-2.5 px-3 text-slate-300">
                      {row.factorial.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-indigo-300">
                      {row.timeAdjoin.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-emerald-300">
                      {row.timeGauss.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-amber-300 font-semibold">
                      {Number(ratio) > 1000
                        ? `${Number(ratio).toExponential(2)} ×`
                        : `${ratio} ×`}
                    </td>
                    <td className="py-2.5 px-3 text-slate-400">
                      {row.spaceAdjoin.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected N Analysis Box */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
          <div className="flex items-center justify-between font-semibold text-slate-200">
            <span>Analisis Operasi untuk Matriks Ukuran n = {selectedRow.n}:</span>
            <span className="font-mono text-amber-400">
              Metode Adjoin: {selectedRow.timeAdjoin.toLocaleString()} Operasi vs Gauss: {selectedRow.timeGauss.toLocaleString()} Operasi
            </span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            {selectedRow.n <= 4 ? (
              <>
                Pada ukuran kecil ($n = {selectedRow.n}$), metode matriks adjoin sangat praktis dan memberikan ekspresi analitik pecahan eksak secara transparan tanpa akumulasi galat pembulatan. Jumlah operasinya ({selectedRow.timeAdjoin}) dieksekusi oleh mesin dalam fraksi milidetik.
              </>
            ) : (
              <>
                Pada ukuran $n = {selectedRow.n}$, kompleksitas faktorial $O(n \times n!)$ mengalami ledakan kombinatorial (*combinatorial explosion*), menghasilkan {selectedRow.timeAdjoin.toLocaleString()} operasi. Oleh sebab itu, untuk sistem linier berdimensi besar ($n &gt; 5$), metode eliminasi Gauss $O(n^3)$ menjadi jauh lebih efisien.
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
