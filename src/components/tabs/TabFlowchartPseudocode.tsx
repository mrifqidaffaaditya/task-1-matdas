"use client";

import React, { useState } from "react";
import {
  FileCode2,
  GitBranch,
  Copy,
  Check,
  Activity,
  ArrowDown,
} from "lucide-react";
import { PSEUDOCODE_MODULES } from "@/lib/algorithms/pseudocode";
import { solveSPLAdjoin } from "@/lib/algorithms/matrix";
import { SPL_PRESETS } from "@/lib/presets";

export const TabFlowchartPseudocode: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const p = SPL_PRESETS[0];
  const testTrace = solveSPLAdjoin(p.A, p.b, 4);

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredModules = PSEUDOCODE_MODULES.filter((m) => {
    if (filter === "spl") return m.category === "SPL Adjoin";
    if (filter === "hill") return m.category === "Studi Kasus Hill Cipher";
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Tab Header Banner */}
      <div className="p-4 rounded bg-[#15191f] border border-[#262c36]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <FileCode2 className="w-3.5 h-3.5 text-neutral-400" />
              <span>Dokumentasi Formal 8 Modul Laporan Resmi</span>
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Flowchart & Pseudocode Formal (8 Modul)
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Menampilkan teks pseudocode asli penulis secara verbatim beserta visualisasi alur komputasi dan frekuensi eksekusi panggilan fungsi (*call counters*).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#111418] p-1 rounded border border-[#262c36] text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === "all" ? "bg-[#252c38] text-white font-medium border border-neutral-600" : "text-neutral-400 hover:text-white"
              }`}
            >
              Semua (8 Modul)
            </button>
            <button
              onClick={() => setFilter("spl")}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === "spl" ? "bg-[#252c38] text-white font-medium border border-neutral-600" : "text-neutral-400 hover:text-white"
              }`}
            >
              SPL Adjoin (1-6)
            </button>
            <button
              onClick={() => setFilter("hill")}
              className={`px-2.5 py-1 rounded transition-colors ${
                filter === "hill" ? "bg-[#252c38] text-white font-medium border border-neutral-600" : "text-neutral-400 hover:text-white"
              }`}
            >
              Hill Cipher (7-8)
            </button>
          </div>
        </div>
      </div>

      {/* LIVE CALL COUNTER METRICS */}
      <div className="p-4 rounded bg-[#15191f] border border-[#262c36] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-200">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Execution Call Counter (Pengujian Kasus Matriks Ukuran 4 × 4)</span>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            Berdasarkan Preset Manual Tracing Laporan
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
          <div className="p-3 rounded bg-[#111418] border border-[#262c36] text-center">
            <div className="text-[10px] text-neutral-400 font-mono">Modul 1: Minor()</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {testTrace.stats.minorCalls} ×
            </div>
            <div className="text-[9px] text-neutral-500 mt-0.5">Sub-matriks diekstraksi</div>
          </div>

          <div className="p-3 rounded bg-[#111418] border border-[#262c36] text-center">
            <div className="text-[10px] text-neutral-400 font-mono">Modul 2: Det()</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {testTrace.stats.detCalls} ×
            </div>
            <div className="text-[9px] text-neutral-500 mt-0.5">Ekspansi Laplace rekursif</div>
          </div>

          <div className="p-3 rounded bg-[#111418] border border-[#262c36] text-center">
            <div className="text-[10px] text-neutral-400 font-mono">Modul 3: Kofaktor()</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {testTrace.stats.kofaktorCalls} ×
            </div>
            <div className="text-[9px] text-neutral-500 mt-0.5">Matriks kofaktor lengkap</div>
          </div>

          <div className="p-3 rounded bg-[#111418] border border-[#262c36] text-center">
            <div className="text-[10px] text-neutral-400 font-mono">Modul 4: Adjoin()</div>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {testTrace.stats.adjoinCalls} ×
            </div>
            <div className="text-[9px] text-neutral-500 mt-0.5">Transpos kofaktor</div>
          </div>

          <div className="p-3 rounded bg-[#111418] border border-[#262c36] text-center col-span-2 sm:col-span-1">
            <div className="text-[10px] text-neutral-400 font-mono">Modul 5: Solusi()</div>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
              {testTrace.stats.solusiCalls} ×
            </div>
            <div className="text-[9px] text-neutral-500 mt-0.5">Tahap 1 & 2 kalkulasi</div>
          </div>
        </div>
      </div>

      {/* VISUAL FLOWCHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Flowchart 1: SPL Adjoin */}
        <div className="p-4 rounded bg-[#15191f] border border-[#262c36] space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-200">
            <GitBranch className="w-3.5 h-3.5 text-neutral-400" />
            <span>Alur Diagram Alir (Flowchart) SPL Matriks Adjoin</span>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-neutral-200 text-center font-bold">
              [START] BACA n, Matriks A, Vektor b
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-center text-neutral-300">
              Hitung Determinan: d = Det(A, n) via Laplace Baris 1
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#252219] border border-amber-900/60 text-center text-amber-300 font-bold">
              Keputusan: Apakah d == 0?
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-1.5 rounded bg-[#201518] border border-rose-900/60 text-rose-300 text-center">
                YA ⟹ CETAK &quot;Matriks Singular&quot; ⟹ [BERHENTI]
              </div>
              <div className="p-1.5 rounded bg-[#1c2420] border border-emerald-900/60 text-emerald-300 text-center">
                TIDAK ⟹ Lanjut ke Modul 3
              </div>
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-center text-neutral-300">
              Bentuk Matriks Kofaktor: C = Kofaktor(A, n)
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-center text-neutral-300">
              Transpos Kofaktor: adj = Adjoin(C, n)
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-center text-neutral-300">
              Solusi(adj, d, b, n): Tahap 1 A_inv = (1/d)*adj; Tahap 2 x = A_inv * b
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#1c2420] border border-emerald-900/60 text-emerald-300 text-center font-bold">
              [END] CETAK Solusi Vektor x
            </div>
          </div>
        </div>

        {/* Flowchart 2: Dekripsi Hill Cipher */}
        <div className="p-4 rounded bg-[#15191f] border border-[#262c36] space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-200">
            <GitBranch className="w-3.5 h-3.5 text-neutral-400" />
            <span>Alur Diagram Alir (Flowchart) Dekripsi Hill Cipher</span>
          </div>

          <div className="space-y-1.5 text-xs font-mono">
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-neutral-200 text-center font-bold">
              [START] BACA K (3x3) & Teks Sandi (Kelipatan 3)
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-center text-neutral-300">
              Hitung d = Det(K, 3) mod 26
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#252219] border border-amber-900/60 text-center text-amber-300 font-bold">
              Keputusan: Apakah GCD(d, 26) == 1?
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px]">
              <div className="p-1.5 rounded bg-[#201518] border border-rose-900/60 text-rose-300 text-center">
                TIDAK ⟹ &quot;Kunci Tak Valid&quot; ⟹ [STOP]
              </div>
              <div className="p-1.5 rounded bg-[#1c2420] border border-emerald-900/60 text-emerald-300 text-center">
                YA ⟹ Lanjut Cari Invers Modular
              </div>
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-center text-neutral-300">
              Cari d_inv = InversModular(d, 26); Hitung C & adj = Adjoin(C)
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-center text-neutral-300">
              Bentuk Matriks Invers: K_inv[i][j] = (d_inv * adj[i][j]) mod 26
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#111418] border border-[#262c36] text-center text-neutral-300">
              Perulangan Tiap Blok: p = (K_inv * c) mod 26 ⟹ Huruf(p)
            </div>
            <div className="flex justify-center text-neutral-600"><ArrowDown className="w-3.5 h-3.5" /></div>
            <div className="p-2 rounded bg-[#1c2420] border border-emerald-900/60 text-emerald-300 text-center font-bold">
              [END] CETAK Plainteks Hasil Dekripsi
            </div>
          </div>
        </div>
      </div>

      {/* VERBATIM PSEUDOCODE LIST */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <span className="font-bold text-neutral-200">
            Teks Pseudocode Formal (Verbatim Laporan Penulis)
          </span>
          <span>Menampilkan {filteredModules.length} dari 8 Modul</span>
        </div>

        <div className="space-y-3">
          {filteredModules.map((mod) => (
            <div
              key={mod.id}
              className="border border-[#262c36] rounded bg-[#15191f] overflow-hidden"
            >
              <div className="p-3 bg-[#111418] border-b border-[#262c36] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-[#1e232b] text-neutral-300 flex items-center justify-center font-mono font-bold text-xs border border-[#2a313d]">
                    {mod.number}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-tight">{mod.title}</h4>
                    <p className="text-[11px] text-neutral-400 mt-0.5">{mod.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#181c22] border border-[#262c36] text-neutral-300">
                    Kompleksitas: <strong className="text-neutral-200">{mod.complexity}</strong>
                  </span>
                  <button
                    onClick={() => handleCopyCode(mod.id, mod.code)}
                    className="flex items-center gap-1 px-2 py-0.5 text-neutral-300 hover:text-white bg-[#1e232b] hover:bg-[#282f3a] rounded text-xs transition-colors border border-[#2a313d]"
                  >
                    {copiedId === mod.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedId === mod.id ? "Tersalin" : "Salin"}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-[#111418] font-mono text-xs overflow-x-auto text-neutral-300 leading-relaxed border-t border-[#262c36]">
                <pre>{mod.code}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
