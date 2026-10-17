"use client";

import React, { useState } from "react";
import {
  FileCode2,
  GitBranch,
  Copy,
  Check,
  Activity,
  Layers,
  KeyRound,
  ArrowDown,
  ArrowRight,
} from "lucide-react";
import { PSEUDOCODE_MODULES, PseudocodeModule } from "@/lib/algorithms/pseudocode";
import { solveSPLAdjoin } from "@/lib/algorithms/matrix";
import { SPL_PRESETS } from "@/lib/presets";

export const TabFlowchartPseudocode: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Live execution call counter on official 4x4 preset
  const [counterDimension, setCounterDimension] = useState<number>(4);
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
    <div className="space-y-6 animate-fade-in">
      {/* Tab Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <FileCode2 className="w-4 h-4" />
              <span>Dokumentasi Formal 8 Modul Laporan Resmi</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Flowchart & Pseudocode Formal (8 Modul)
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Menampilkan teks pseudocode asli penulis secara verbatim beserta visualisasi alur komputasi dan frekuensi eksekusi panggilan fungsi (*call counters*).
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === "all" ? "bg-indigo-600 text-white font-medium" : "text-slate-400 hover:text-white"
              }`}
            >
              Semua (8 Modul)
            </button>
            <button
              onClick={() => setFilter("spl")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === "spl" ? "bg-indigo-600 text-white font-medium" : "text-slate-400 hover:text-white"
              }`}
            >
              SPL Adjoin (1-6)
            </button>
            <button
              onClick={() => setFilter("hill")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                filter === "hill" ? "bg-indigo-600 text-white font-medium" : "text-slate-400 hover:text-white"
              }`}
            >
              Hill Cipher (7-8)
            </button>
          </div>
        </div>
      </div>

      {/* LIVE CALL COUNTER METRICS */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Live Execution Call Counter (Pengujian Kasus Matriks Ukuran 4 × 4)</span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Berdasarkan Preset Manual Tracing Laporan
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 font-mono">Modul 1: Minor()</div>
            <div className="text-xl font-bold font-mono text-indigo-400 mt-1">
              {testTrace.stats.minorCalls} ×
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Sub-matriks diekstraksi</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 font-mono">Modul 2: Det()</div>
            <div className="text-xl font-bold font-mono text-purple-400 mt-1">
              {testTrace.stats.detCalls} ×
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Ekspansi Laplace rekursif</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 font-mono">Modul 3: Kofaktor()</div>
            <div className="text-xl font-bold font-mono text-amber-400 mt-1">
              {testTrace.stats.kofaktorCalls} ×
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Matriks kofaktor lengkap</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 font-mono">Modul 4: Adjoin()</div>
            <div className="text-xl font-bold font-mono text-blue-400 mt-1">
              {testTrace.stats.adjoinCalls} ×
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Transpos kofaktor</div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-center col-span-2 sm:col-span-1">
            <div className="text-[10px] text-slate-400 font-mono">Modul 5: Solusi()</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">
              {testTrace.stats.solusiCalls} ×
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">Tahap 1 & 2 kalkulasi</div>
          </div>
        </div>
      </div>

      {/* VISUAL FLOWCHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Flowchart 1: SPL Adjoin */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <GitBranch className="w-4 h-4 text-indigo-400" />
            <span>Alur Diagram Alir (Flowchart) SPL Matriks Adjoin</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-indigo-500/30 text-indigo-300 text-center font-bold">
              [START] BACA n, Matriks A, Vektor b
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center text-slate-200">
              Hitung Determinan: d = Det(A, n) via Laplace Baris 1
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/40 text-center text-amber-200 font-bold">
              Keputusan: Apakah d == 0?
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-rose-950/40 border border-rose-500/40 text-rose-300 text-center">
                YA ⟹ CETAK &quot;Matriks Singular&quot; ⟹ [BERHENTI]
              </div>
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-center">
                TIDAK ⟹ Lanjut ke Modul 3
              </div>
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center text-slate-200">
              Bentuk Matriks Kofaktor: C = Kofaktor(A, n)
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center text-slate-200">
              Transpos Kofaktor: adj = Adjoin(C, n)
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center text-slate-200">
              Solusi(adj, d, b, n): Tahap 1 A_inv = (1/d)*adj; Tahap 2 x = A_inv * b
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-center font-bold">
              [END] CETAK Solusi Vektor x
            </div>
          </div>
        </div>

        {/* Flowchart 2: Dekripsi Hill Cipher */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
            <GitBranch className="w-4 h-4 text-purple-400" />
            <span>Alur Diagram Alir (Flowchart) Dekripsi Hill Cipher</span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-slate-950 border border-purple-500/30 text-purple-300 text-center font-bold">
              [START] BACA K (3x3) & Teks Sandi (Kelipatan 3)
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center text-slate-200">
              Hitung d = Det(K, 3) mod 26
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/40 text-center text-amber-200 font-bold">
              Keputusan: Apakah GCD(d, 26) == 1?
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-rose-950/40 border border-rose-500/40 text-rose-300 text-center">
                TIDAK ⟹ &quot;Kunci Tak Valid (Bukan Koprima)&quot; ⟹ [STOP]
              </div>
              <div className="p-2 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-center">
                YA ⟹ Lanjut Cari Invers Modular
              </div>
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center text-slate-200">
              Cari d_inv = InversModular(d, 26); Hitung C & adj = Adjoin(C)
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center text-slate-200">
              Bentuk Matriks Invers: K_inv[i][j] = (d_inv * adj[i][j]) mod 26
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-center text-slate-200">
              Perulangan Tiap Blok: p = (K_inv * c) mod 26 ⟹ Huruf(p)
            </div>
            <div className="flex justify-center text-slate-500"><ArrowDown className="w-4 h-4" /></div>
            <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-center font-bold">
              [END] CETAK Plainteks Hasil Dekripsi
            </div>
          </div>
        </div>
      </div>

      {/* VERBATIM PSEUDOCODE LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-bold text-slate-200 text-sm">
            Teks Pseudocode Formal (Verbatim Laporan Penulis)
          </span>
          <span>Menampilkan {filteredModules.length} dari 8 Modul</span>
        </div>

        <div className="space-y-4">
          {filteredModules.map((mod) => (
            <div
              key={mod.id}
              className="border border-slate-800 rounded-xl bg-slate-900/80 overflow-hidden shadow-sm"
            >
              <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-xs border border-indigo-500/30">
                    {mod.number}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{mod.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{mod.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    Kompleksitas: <strong className="text-indigo-300">{mod.complexity}</strong>
                  </span>
                  <button
                    onClick={() => handleCopyCode(mod.id, mod.code)}
                    className="flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg text-xs transition-colors"
                  >
                    {copiedId === mod.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === mod.id ? "Tersalin" : "Salin"}</span>
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-950/60 font-mono text-xs overflow-x-auto text-slate-300 leading-relaxed border-t border-slate-800/40">
                <pre>{mod.code}</pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
