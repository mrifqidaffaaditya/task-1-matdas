"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Cpu,
  HardDrive,
  Scale,
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
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-4 rounded bg-[#15191f] border border-[#262c36]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-neutral-400" />
              <span>Analisis Algoritma Asimtotik Formal (Big-O)</span>
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Analisis Kompleksitas Waktu $T(n) = O(n \times n!)$ & Ruang $S(n) = O(n^3)$
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Pembuktian matematis formal penurunan kompleksitas asimtotik serta perbandingan laju pertumbuhan operasi terhadap eliminasi Gauss $O(n^3)$.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-center min-w-[100px]">
              <div className="text-[9px] text-neutral-400 font-mono">Waktu Asimtotik</div>
              <div className="text-sm font-bold font-mono text-white">O(n × n!)</div>
            </div>
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-center min-w-[100px]">
              <div className="text-[9px] text-neutral-400 font-mono">Ruang Asimtotik</div>
              <div className="text-sm font-bold font-mono text-white">O(n³)</div>
            </div>
          </div>
        </div>
      </div>

      {/* DERIVATION CARDS (TIME & SPACE) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Time Complexity Derivation */}
        <div className="p-4 rounded bg-[#15191f] border border-[#262c36] space-y-3">
          <div className="flex items-center justify-between border-b border-[#262c36] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <Cpu className="w-3.5 h-3.5 text-neutral-400" />
              <span>1. Penurunan Kompleksitas Waktu T(n)</span>
            </div>
            <span className="font-mono text-xs px-1.5 py-0.2 rounded bg-[#181c22] border border-[#2a313d] text-neutral-200 font-bold">
              T(n) = O(n × n!)
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {TIME_COMPLEXITY_DERIVATION.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded bg-[#111418] border border-[#262c36] space-y-1"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-neutral-200 text-xs">{item.step}</span>
                  <span className="font-mono text-[10px] text-neutral-300 px-1 py-0.2 rounded bg-[#181c22] border border-[#262c36]">
                    {item.bigO}
                  </span>
                </div>
                <p className="text-neutral-400 leading-relaxed text-[11px]">
                  {item.detail}
                </p>
              </div>
            ))}

            <div className="p-2.5 rounded bg-[#111418] border border-[#262c36] text-neutral-200 font-mono text-xs space-y-0.5">
              <div className="font-bold text-neutral-300">Rumus Gabungan Waktu:</div>
              <div>T(n) = O(n!) + O(n × n!) + O(n²) + O(n²)</div>
              <div className="text-emerald-400 font-bold pt-0.5">
                ⟹ Suku Dominan Tertinggi: T(n) = O(n × n!)
              </div>
            </div>
          </div>
        </div>

        {/* Space Complexity Derivation */}
        <div className="p-4 rounded bg-[#15191f] border border-[#262c36] space-y-3">
          <div className="flex items-center justify-between border-b border-[#262c36] pb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white">
              <HardDrive className="w-3.5 h-3.5 text-neutral-400" />
              <span>2. Penurunan Kompleksitas Ruang S(n)</span>
            </div>
            <span className="font-mono text-xs px-1.5 py-0.2 rounded bg-[#181c22] border border-[#2a313d] text-neutral-200 font-bold">
              S(n) = O(n³)
            </span>
          </div>

          <div className="space-y-2 text-xs">
            {SPACE_COMPLEXITY_DERIVATION.map((item, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded bg-[#111418] border border-[#262c36] space-y-1"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-neutral-200 text-xs">{item.step}</span>
                  <span className="font-mono text-[10px] text-neutral-300 px-1 py-0.2 rounded bg-[#181c22] border border-[#262c36]">
                    {item.bigO}
                  </span>
                </div>
                <p className="text-neutral-400 leading-relaxed text-[11px]">
                  {item.detail}
                </p>
              </div>
            ))}

            <div className="p-2.5 rounded bg-[#111418] border border-[#262c36] text-neutral-200 font-mono text-xs space-y-0.5">
              <div className="font-bold text-neutral-300">Rumus Gabungan Ruang:</div>
              <div>S(n) = O(n²) [Matriks Utama] + O(n³) [Tumpukan Rekursi]</div>
              <div className="text-emerald-400 font-bold pt-0.5">
                ⟹ Suku Dominan Tertinggi: S(n) = O(n³)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE COMPARISON TABLE (n = 1 .. 10) */}
      <div className="p-4 rounded bg-[#15191f] border border-[#262c36] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-neutral-400" />
              Tabel Pertumbuhan Operasi Komputasi (n = 1 sampai 10)
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Memperlihatkan perbandingan laju faktorial adjoin vs kuadratik/kubik Gauss.
            </p>
          </div>

          <div className="flex items-center gap-1 text-xs">
            <span className="text-neutral-400 mr-1 text-[11px]">Sorotan n:</span>
            {[2, 3, 4, 5, 8, 10].map((n) => (
              <button
                key={n}
                onClick={() => setSelectedN(n)}
                className={`px-2 py-0.5 rounded font-mono font-bold text-xs transition-colors ${
                  selectedN === n
                    ? "bg-[#252c38] text-white border border-neutral-600"
                    : "bg-[#111418] border border-[#262c36] text-neutral-400 hover:text-white"
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
              <tr className="border-b border-[#262c36] bg-[#111418] text-neutral-400">
                <th className="py-2 px-2.5">Ukuran n</th>
                <th className="py-2 px-2.5">n! (Faktorial)</th>
                <th className="py-2 px-2.5 text-neutral-200">Waktu Adjoin: n × n!</th>
                <th className="py-2 px-2.5 text-emerald-400">Waktu Gauss: ~ 2/3 n³</th>
                <th className="py-2 px-2.5 text-amber-300">Rasio (Adjoin / Gauss)</th>
                <th className="py-2 px-2.5 text-neutral-400">Ruang S(n): n³</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202630]">
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
                      isSelected ? "bg-[#181c22] border-l-2 border-neutral-400" : "hover:bg-[#181c22]"
                    }`}
                  >
                    <td className="py-2 px-2.5 font-bold text-white">
                      n = {row.n}
                    </td>
                    <td className="py-2 px-2.5 text-neutral-300">
                      {row.factorial.toLocaleString()}
                    </td>
                    <td className="py-2 px-2.5 font-bold text-white">
                      {row.timeAdjoin.toLocaleString()}
                    </td>
                    <td className="py-2 px-2.5 font-bold text-emerald-400">
                      {row.timeGauss.toLocaleString()}
                    </td>
                    <td className="py-2 px-2.5 text-amber-300 font-semibold">
                      {Number(ratio) > 1000
                        ? `${Number(ratio).toExponential(2)} ×`
                        : `${ratio} ×`}
                    </td>
                    <td className="py-2 px-2.5 text-neutral-400">
                      {row.spaceAdjoin.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected N Analysis Box */}
        <div className="p-3 rounded bg-[#111418] border border-[#262c36] text-xs space-y-1">
          <div className="flex items-center justify-between font-semibold text-neutral-200">
            <span>Analisis Operasi Matriks Ukuran n = {selectedRow.n}:</span>
            <span className="font-mono text-neutral-300">
              Adjoin: {selectedRow.timeAdjoin.toLocaleString()} ops vs Gauss: {selectedRow.timeGauss.toLocaleString()} ops
            </span>
          </div>
          <p className="text-neutral-400 leading-relaxed text-[11px]">
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
