"use client";

import React, { useState, useMemo } from "react";
import {
  KeyRound,
  ShieldCheck,
  AlertOctagon,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { MatrixInput } from "../ui/MatrixInput";
import { MatrixDisplay } from "../ui/MatrixDisplay";
import { StepCard } from "../ui/StepCard";
import { dekripsiHill, charToNum, numToChar } from "@/lib/algorithms/hillCipher";
import { HILL_CIPHER_PRESETS, HillCipherPreset } from "@/lib/presets";

export const TabHillCipher: React.FC = () => {
  const [keyMatrix, setKeyMatrix] = useState<number[][]>(HILL_CIPHER_PRESETS[0].K);
  const [ciphertextInput, setCiphertextInput] = useState<string>(
    HILL_CIPHER_PRESETS[0].ciphertext
  );
  const [selectedPresetId, setSelectedPresetId] = useState<string>("laporan-hill-3x3");
  const [copied, setCopied] = useState<boolean>(false);

  // Apply Preset
  const handleApplyPreset = (preset: HillCipherPreset) => {
    setKeyMatrix(preset.K);
    setCiphertextInput(preset.ciphertext);
    setSelectedPresetId(preset.id);
  };

  // Compute Hill Cipher Decryption Trace
  const trace = useMemo(() => {
    return dekripsiHill(keyMatrix, ciphertextInput);
  }, [keyMatrix, ciphertextInput]);

  const handleCopyPlaintext = () => {
    if (trace.plaintext) {
      navigator.clipboard.writeText(trace.plaintext);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Tab Header Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900 border border-slate-800 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <KeyRound className="w-4 h-4" />
              <span>Studi Kasus Sistem Informasi — Topik A (Modul 7 - 8)</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              Dekripsi Hill Cipher Matriks 3 × 3 dalam Gelanggang $\mathbb&#123;Z&#125;_{'{26}'}$
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Penerapan invers matriks adjoin modulo 26: $K^{'{ -1 }'} \equiv \det(K)^{'{ -1 }'} \cdot \text&#123;adj&#125;(K) \pmod&#123;26&#125;$
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Preset:
            </span>
            {HILL_CIPHER_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  selectedPresetId === p.id
                    ? "bg-purple-600/30 border-purple-500 text-purple-200 font-semibold"
                    : "bg-slate-900 border-slate-800 text-slate-300 hover:text-white"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/60 p-5 rounded-2xl border border-slate-800 space-y-4">
          <MatrixInput
            label="Matriks Kunci K (Ukuran 3 × 3)"
            subLabel="Elemen bilangan bulat integer"
            matrix={keyMatrix}
            onChange={setKeyMatrix}
          />
        </div>

        <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200">
                Teks Sandi (Ciphertext)
              </label>
              <span className="text-[11px] font-mono text-purple-400 bg-purple-950/60 border border-purple-800/40 px-2 py-0.5 rounded">
                Panjang: {trace.ciphertext.length} ({(trace.ciphertext.length / 3).toFixed(0)} Blok)
              </span>
            </div>
            <textarea
              rows={3}
              value={ciphertextInput}
              onChange={(e) => setCiphertextInput(e.target.value)}
              placeholder="Contoh: GWMOPEBYOKCVYEK"
              className="w-full bg-slate-950 text-white font-mono text-sm border border-slate-700/80 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 rounded-lg p-3 outline-none uppercase tracking-wider"
            />
            <p className="text-[11px] text-slate-500">
              * Huruf otomatis dikapitalisasi (A=0 ... Z=25). Jika panjang bukan kelipatan 3, ditambahkan padding &apos;X&apos;.
            </p>
          </div>

          {/* Quick Alphabet Reference Strip */}
          <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-400">
            <span className="text-purple-400 font-semibold block mb-1">
              Pemetaan Huruf ke Angka (Z₂₆):
            </span>
            <div className="flex flex-wrap gap-1 text-[9px] text-slate-300">
              {["A:0", "B:1", "C:2", "E:4", "G:6", "I:8", "K:10", "M:12", "O:14", "P:15", "R:17", "S:18", "T:19", "W:22", "Y:24", "Z:25"].map(
                (item) => (
                  <span key={item} className="px-1 py-0.5 bg-slate-900 rounded border border-slate-800">
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FINAL PLAINTEXT HERO CARD */}
      {trace.isValidKey && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/50 via-slate-900 to-indigo-950/50 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Hasil Dekripsi Teks Asli (Plaintext)</span>
            </div>
            <div className="text-3xl font-black font-mono tracking-widest text-white">
              {trace.plaintext}
            </div>
            {trace.plaintext === "SISTEMINFORMASI" && (
              <p className="text-xs text-emerald-300">
                ✓ Sesuai eksak laporan: Pesan rahasia terdekripsi menjadi <strong>&quot;SISTEMINFORMASI&quot;</strong>
              </p>
            )}
          </div>

          <button
            onClick={handleCopyPlaintext}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-lg transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Tersalin!" : "Salin Plaintext"}</span>
          </button>
        </div>
      )}

      {/* STEP-BY-STEP HILL CIPHER DECRYPTION TRACE */}
      <div className="space-y-4">
        {/* Invalid Key Alert */}
        {!trace.isValidKey && (
          <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-rose-200 space-y-3">
            <div className="flex items-center gap-3">
              <AlertOctagon className="w-6 h-6 text-rose-400 flex-shrink-0" />
              <div>
                <h3 className="text-base font-bold text-rose-100">
                  Kunci Tidak Valid: gcd(det(K) mod 26, 26) = {trace.gcdVal} ≠ 1
                </h3>
                <p className="text-xs text-rose-300/90 mt-0.5">
                  Determinan d = {trace.detKMod26} tidak saling prima (koprima) dengan 26. Invers modular d⁻¹ tidak ada dalam Z₂₆, sehingga matriks kunci tidak dapat dibalik.
                </p>
              </div>
            </div>
            <div className="font-mono text-xs bg-slate-950/80 p-3 rounded-lg border border-rose-900/60 text-slate-300">
              d = Det(K, 3) mod 26 = {trace.detKMod26} ⟹ GCD({trace.detKMod26}, 26) = {trace.gcdVal} ≠ 1 ⟹ BERHENTI
            </div>
          </div>
        )}

        {/* Langkah 1: Determinan Modulo 26 & Invers Modular */}
        <StepCard
          stepNumber="1"
          title="Langkah 1: Determinan Modulo 26 & Invers Modular Determinan"
          formula="d = Det(K, 3) mod 26; d · d⁻¹ ≡ 1 (mod 26)"
          badge={trace.isValidKey ? `d = ${trace.detKMod26}, d⁻¹ = ${trace.detInverse}` : "Kunci Tidak Valid"}
          badgeType={trace.isValidKey ? "success" : "warning"}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[11px]">Determinan Matriks K:</span>
                <div className="text-lg font-bold font-mono text-white">
                  det(K) = {trace.detK}
                </div>
                <div className="text-slate-400 pt-1 border-t border-slate-800/80 font-mono text-[11px]">
                  d = {trace.detK} mod 26 = <strong className="text-indigo-400">{trace.detKMod26}</strong>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[11px]">Pengecekan Koprima FPB / GCD:</span>
                <div className="text-lg font-bold font-mono text-emerald-400">
                  gcd({trace.detKMod26}, 26) = {trace.gcdVal}
                </div>
                <div className="text-slate-400 pt-1 border-t border-slate-800/80 text-[11px]">
                  {trace.isValidKey ? "✓ Valid (Saling prima dengan 26)" : "✕ Tidak valid"}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[11px]">Invers Modular d⁻¹ (Modul 7):</span>
                <div className="text-lg font-bold font-mono text-purple-400">
                  d⁻¹ = {trace.detInverse}
                </div>
                <div className="text-slate-400 pt-1 border-t border-slate-800/80 font-mono text-[11px]">
                  ({trace.detKMod26} × {trace.detInverse}) = {trace.detKMod26 * (trace.detInverse || 0)} ≡ 1 (mod 26)
                </div>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed">
              * Pada preset laporan: det(K) = 6(70) - 24(-5) + 1(-99) = 420 + 120 - 99 = 441. Maka d = 441 mod 26 = 25. Karena 25 × 25 = 625 = 24 × 26 + 1 ≡ 1 (mod 26), invers determinan adalah <strong>25</strong>.
            </p>
          </div>
        </StepCard>

        {trace.isValidKey && (
          <>
            {/* Langkah 2: Matriks Kofaktor C */}
            <StepCard
              stepNumber="2"
              title="Langkah 2: Menentukan Matriks Kofaktor C"
              formula="C[i][j] = (-1)^(i+j) · Det(Minor(K, 3, i, j))"
              subtitle="Menghitung kofaktor setiap elemen pada kunci K (3x3)"
            >
              <div className="space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-slate-300">Matriks Kofaktor C:</span>
                    <MatrixDisplay matrix={trace.cofactorMatrix} size="md" />
                  </div>

                  <div className="flex-1 space-y-2 text-slate-300">
                    <div className="font-semibold text-indigo-300">Rincian Nilai Minor & Kofaktor:</div>
                    <ul className="space-y-1 font-mono text-[11px] text-slate-400">
                      <li>• Baris 1: C₁₁ = +70, C₁₂ = -(-5) = 5, C₁₃ = +(-99) = -99</li>
                      <li>• Baris 2: C₂₁ = -(343) = -343, C₂₂ = +70, C₂₃ = -(-378) = 378</li>
                      <li>• Baris 3: C₃₁ = +224, C₃₂ = -(47) = -47, C₃₃ = +(-216) = -216</li>
                    </ul>
                  </div>
                </div>
              </div>
            </StepCard>

            {/* Langkah 3: Matriks Adjoin adj(K) & Reduksi Modulo 26 */}
            <StepCard
              stepNumber="3"
              title="Langkah 3: Matriks Adjoin adj(K) = Cᵀ & Reduksi Modulo 26"
              formula="adj(K) = Cᵀ; adj₂₆ = adj(K) mod 26"
              subtitle="Transpos kofaktor dan normalisasi setiap elemen ke dalam [0, 25]"
            >
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-slate-300">Matriks Adjoin Mentah adj(K) = Cᵀ:</span>
                    <MatrixDisplay matrix={trace.adjMatrix} size="md" />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-xs font-semibold text-purple-300">Matriks Adjoin Ter-reduksi (adj mod 26):</span>
                    <MatrixDisplay matrix={trace.adjMatrixMod26} size="md" />
                    <p className="text-[11px] text-slate-400 pt-1">
                      Contoh normalisasi modulo positif: -343 mod 26 = 21, -47 mod 26 = 5, -99 mod 26 = 5.
                    </p>
                  </div>
                </div>
              </div>
            </StepCard>

            {/* Langkah 4: Matriks Kunci Invers K^-1 */}
            <StepCard
              stepNumber="4"
              title="Langkah 4: Pembentukan Matriks Kunci Invers K⁻¹ (mod 26)"
              formula="K⁻¹ ≡ (d⁻¹ · adj(K)) mod 26"
              subtitle="Mengalikan invers determinan dengan adjoin lalu dimodulo 26"
              badge="Matriks Kunci Invers"
              badgeType="purple"
            >
              <div className="space-y-4 text-xs">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 space-y-2">
                    <span className="text-xs font-bold text-purple-300">Matriks K⁻¹ (mod 26):</span>
                    <MatrixDisplay matrix={trace.invKeyMatrix} size="md" />
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex-1 space-y-2 text-slate-300">
                    <span className="font-semibold text-indigo-300">Perhitungan Elemen K⁻¹:</span>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                      K⁻¹[i][j] = (d⁻¹ × adj[i][j]) mod 26 = (25 × adj[i][j]) mod 26
                      <br />
                      Baris 1: [(25×18) mod 26 = 8, (25×21) mod 26 = 5, (25×16) mod 26 = 10]
                      <br />
                      Baris 2: [(25×5) mod 26 = 21, (25×18) mod 26 = 8, (25×5) mod 26 = 21]
                      <br />
                      Baris 3: [(25×5) mod 26 = 21, (25×14) mod 26 = 12, (25×18) mod 26 = 8]
                    </p>
                  </div>
                </div>
              </div>
            </StepCard>

            {/* Langkah 5: Dekripsi Blok Demi Blok */}
            <StepCard
              stepNumber="5"
              title="Langkah 5: Dekripsi Teks Sandi Per Blok (Tiap 3 Huruf)"
              formula="p = (K⁻¹ · c) mod 26; plainteks += Huruf(p[i])"
              subtitle="Transformasi vektor perkalian matriks-vektor modulo 26 untuk setiap triplet sandi"
              badge={`${trace.blocks.length} Blok Diproses`}
              badgeType="success"
            >
              <div className="space-y-4 text-xs">
                <p className="text-slate-300">
                  Setiap blok 3 huruf diubah menjadi vektor kolom <code className="text-purple-300 font-mono">c = [c₁, c₂, c₃]ᵀ</code>, dikalikan dengan <code className="text-purple-300 font-mono">K⁻¹</code>, dan hasilnya dimodulo 26:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {trace.blocks.map((block) => (
                    <div
                      key={block.blockIndex}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 hover:border-slate-700 transition-colors"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                        <span className="font-bold text-slate-200">
                          Blok #{block.blockIndex}
                        </span>
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          <span className="text-purple-400 font-bold px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40">
                            {block.cipherLetters}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
                          <span className="text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
                            {block.plainLetters}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1 font-mono text-[11px] text-slate-400">
                        <div>
                          Vektor sandi c: [{block.cipherVector.join(", ")}]ᵀ
                        </div>
                        <div className="text-slate-500">
                          Hasil kali K⁻¹ · c: [{block.rawProduct.join(", ")}]ᵀ
                        </div>
                        <div className="text-indigo-300 font-bold">
                          Modulo 26: [{block.plainVector.join(", ")}]ᵀ
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Huruf teks asli:</span>
                        <span className="font-mono font-bold text-emerald-300 tracking-wider">
                          {block.plainVector
                            .map((num) => `${numToChar(num)}(${num})`)
                            .join(" - ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </StepCard>
          </>
        )}
      </div>
    </div>
  );
};
