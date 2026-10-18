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
  Terminal,
} from "lucide-react";
import { MatrixInput } from "../ui/MatrixInput";
import { MatrixDisplay } from "../ui/MatrixDisplay";
import { StepCard } from "../ui/StepCard";
import { CodeRunner } from "../ui/CodeRunner";
import { dekripsiHill, numToChar } from "@/lib/algorithms/hillCipher";
import { HILL_CIPHER_PRESETS, HillCipherPreset } from "@/lib/presets";
import {
  generateHillStep1Code,
  generateHillStep2Code,
  generateHillStep3Code,
  generateHillStep4Code,
  generateHillStep5Code,
  generateHillFullScript,
} from "@/lib/algorithms/codeGenerator";

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

  // Generate runnable JavaScript code snippets for each step & full script
  const step1Code = useMemo(() => generateHillStep1Code(keyMatrix), [keyMatrix]);
  const step2Code = useMemo(() => generateHillStep2Code(keyMatrix), [keyMatrix]);
  const step3Code = useMemo(() => generateHillStep3Code(keyMatrix), [keyMatrix]);
  const step4Code = useMemo(() => generateHillStep4Code(keyMatrix), [keyMatrix]);
  const step5Code = useMemo(
    () => generateHillStep5Code(keyMatrix, ciphertextInput),
    [keyMatrix, ciphertextInput]
  );
  const fullScript = useMemo(
    () => generateHillFullScript(keyMatrix, ciphertextInput),
    [keyMatrix, ciphertextInput]
  );

  const handleCopyPlaintext = () => {
    if (trace.plaintext) {
      navigator.clipboard.writeText(trace.plaintext);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Header Banner */}
      <div className="p-3.5 sm:p-4 rounded bg-[#15191f] border border-[#262c36]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-neutral-400 text-[11px] sm:text-xs font-semibold uppercase tracking-wider mb-1">
              <KeyRound className="w-3.5 h-3.5 text-neutral-400" />
              <span>Studi Kasus Sistem Informasi — Topik A (Modul 7 – 8)</span>
            </div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight">
              Dekripsi Hill Cipher Matriks 3 × 3 dalam Gelanggang ℤ₂₆
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed">
              Penerapan invers matriks adjoin modulo 26: K⁻¹ ≡ det(K)⁻¹ · adj(K) (mod 26) dengan eksekusi kode JavaScript langsung di setiap langkah.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            <span className="text-xs text-neutral-400 font-medium mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              Preset:
            </span>
            {HILL_CIPHER_PRESETS.map((p) => (
              <button
                key={p.id}
                onClick={() => handleApplyPreset(p)}
                className={`text-xs px-2.5 py-1 rounded border transition-colors ${
                  selectedPresetId === p.id
                    ? "bg-[#202630] border-neutral-400 text-white font-medium"
                    : "bg-[#111418] border-[#262c36] text-neutral-300 hover:border-neutral-500 hover:text-white"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-4">
        <div className="lg:col-span-2 bg-[#15191f] p-3.5 sm:p-4 rounded border border-[#262c36] space-y-3">
          <MatrixInput
            label="Matriks Kunci K (Ukuran 3 × 3)"
            subLabel="Elemen bilangan bulat integer"
            matrix={keyMatrix}
            onChange={setKeyMatrix}
          />
        </div>

        <div className="bg-[#15191f] p-3.5 sm:p-4 rounded border border-[#262c36] flex flex-col justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-neutral-200">
                Teks Sandi (Ciphertext)
              </label>
              <span className="text-[10px] font-mono text-neutral-300 bg-[#1e232b] border border-[#2a313d] px-1.5 py-0.5 rounded-sm">
                Panjang: {trace.ciphertext.length} ({(trace.ciphertext.length / 3).toFixed(0)} Blok)
              </span>
            </div>
            <textarea
              rows={3}
              value={ciphertextInput}
              onChange={(e) => setCiphertextInput(e.target.value)}
              placeholder="Contoh: GWMOPEBYOKCVYEK"
              className="w-full bg-[#111418] text-white font-mono text-xs border border-[#2a313d] hover:border-neutral-500 focus:border-neutral-300 rounded p-2.5 outline-none uppercase tracking-wider transition-colors"
            />
            <p className="text-[11px] text-neutral-500">
              * Huruf otomatis dikapitalisasi (A=0 ... Z=25). Jika panjang bukan kelipatan 3, otomatis dipadkan dengan huruf &apos;X&apos;.
            </p>
          </div>

          {/* Quick Alphabet Reference Strip */}
          <div className="p-2.5 rounded bg-[#111418] border border-[#262c36] text-[10px] font-mono text-neutral-400">
            <span className="text-neutral-300 font-semibold block mb-1.5">
              Pemetaan Huruf ke Angka (ℤ₂₆):
            </span>
            <div className="flex flex-wrap gap-1 text-[9px] text-neutral-300">
              {["A:0", "B:1", "C:2", "E:4", "G:6", "I:8", "K:10", "M:12", "O:14", "P:15", "R:17", "S:18", "T:19", "W:22", "Y:24", "Z:25"].map(
                (item) => (
                  <span key={item} className="px-1.5 py-0.5 bg-[#181c22] rounded-sm border border-[#262c36]">
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
        <div className="p-3.5 sm:p-4 rounded bg-[#111418] border border-emerald-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="space-y-0.5 text-center sm:text-left">
            <div className="flex items-center gap-1.5 justify-center sm:justify-start text-[11px] font-semibold text-emerald-400 uppercase tracking-wider font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Hasil Dekripsi Teks Asli (Plaintext)</span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono tracking-widest text-white">
              {trace.plaintext}
            </div>
            {trace.plaintext === "SISTEMINFORMASI" && (
              <p className="text-xs text-emerald-400 font-mono">
                ✓ Sesuai eksak laporan akademik: Pesan rahasia terdekripsi menjadi <strong>&quot;SISTEMINFORMASI&quot;</strong>
              </p>
            )}
          </div>

          <button
            onClick={handleCopyPlaintext}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1c2420] hover:bg-[#23302a] text-emerald-300 border border-emerald-800 text-xs font-medium transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Tersalin!" : "Salin Plaintext"}</span>
          </button>
        </div>
      )}

      {/* STEP-BY-STEP HILL CIPHER DECRYPTION TRACE */}
      <div className="space-y-3.5">
        {/* Invalid Key Alert */}
        {!trace.isValidKey && (
          <div className="p-4 rounded bg-[#201518] border border-rose-900 text-rose-200 space-y-2">
            <div className="flex items-center gap-2.5">
              <AlertOctagon className="w-5 h-5 text-rose-400 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-rose-100 font-mono">
                  &quot;Kunci tidak valid (tidak koprima dengan 26)&quot;
                </h3>
                <p className="text-xs text-rose-300/90 mt-0.5 leading-relaxed">
                  Determinan d = {trace.detKMod26} tidak saling prima (koprima) dengan 26 karena GCD({trace.detKMod26}, 26) = {trace.gcdVal} ≠ 1. Invers modular d⁻¹ tidak ada dalam ℤ₂₆, sehingga matriks kunci tidak dapat dibalik.
                </p>
              </div>
            </div>
            <div className="font-mono text-xs bg-[#111418] p-2.5 rounded border border-rose-900/60 text-neutral-300 overflow-x-auto">
              d = Det(K, 3) mod 26 = {trace.detKMod26} ⟹ JIKA GCD({trace.detKMod26}, 26) != 1: CETAK &quot;Kunci tidak valid (tidak koprima dengan 26)&quot; ⟹ BERHENTI
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
          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1">
                <span className="text-neutral-400 font-mono text-[10px]">Determinan Matriks K:</span>
                <div className="text-base font-bold font-mono text-white">
                  det(K) = {trace.detK}
                </div>
                <div className="text-neutral-400 pt-1 border-t border-[#262c36] font-mono text-[10px]">
                  d = {trace.detK} mod 26 = <strong className="text-neutral-200">{trace.detKMod26}</strong>
                </div>
              </div>

              <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1">
                <span className="text-neutral-400 font-mono text-[10px]">Pengecekan Koprima FPB / GCD:</span>
                <div className="text-base font-bold font-mono text-emerald-400">
                  GCD({trace.detKMod26}, 26) = {trace.gcdVal}
                </div>
                <div className="text-neutral-400 pt-1 border-t border-[#262c36] text-[10px]">
                  {trace.isValidKey ? "✓ Valid (Saling prima dengan 26)" : "✕ Tidak valid"}
                </div>
              </div>

              <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1">
                <span className="text-neutral-400 font-mono text-[10px]">Invers Modular d⁻¹ (Modul 7):</span>
                <div className="text-base font-bold font-mono text-amber-400">
                  d⁻¹ = {trace.detInverse}
                </div>
                <div className="text-neutral-400 pt-1 border-t border-[#262c36] font-mono text-[10px]">
                  ({trace.detKMod26} × {trace.detInverse}) = {trace.detKMod26 * (trace.detInverse || 0)} ≡ 1 (mod 26)
                </div>
              </div>
            </div>

            <p className="text-neutral-400 leading-relaxed text-[11px]">
              * Rincian hitungan manual: det(K) = 6(70) - 24(-5) + 1(-99) = 420 + 120 - 99 = 441. Maka d = 441 mod 26 = 25. Pengujian loop InversModular(25, 26): untuk x = 25 diperoleh (25 × 25) = 625 = 24 × 26 + 1 ≡ 1 (mod 26), sehingga invers modular determinan d⁻¹ adalah <strong>25</strong>.
            </p>

            {/* RUNNABLE CODE RUNNER FOR STEP 1 */}
            <CodeRunner
              code={step1Code}
              title="Kode JavaScript Langkah 1: Determinan & Invers Modular"
              subtitle="Menjalankan Det(K, 3), GCD(d, 26), dan fungsi InversModular(d, 26)"
              badge="Modul 7"
            />
          </div>
        </StepCard>

        {trace.isValidKey && (
          <>
            {/* Langkah 2: Matriks Kofaktor C */}
            <StepCard
              stepNumber="2"
              title="Langkah 2: Menentukan Matriks Kofaktor C"
              formula="C[i][j] = (-1)^(i+j) · Det(Minor(K, 3, i, j))"
              subtitle="Menghitung kofaktor setiap elemen pada matriks kunci K (3 × 3)"
            >
              <div className="space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3.5 sm:gap-4">
                  <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1.5 flex-shrink-0">
                    <span className="text-xs font-semibold text-neutral-300">Matriks Kofaktor C:</span>
                    <MatrixDisplay matrix={trace.cofactorMatrix} size="md" />
                  </div>

                  <div className="flex-1 space-y-1.5 text-neutral-300 min-w-0">
                    <div className="font-semibold text-neutral-200">Rincian Perhitungan Setiap Baris Kofaktor:</div>
                    <div className="space-y-1.5 font-mono text-[11px] bg-[#111418] p-2.5 rounded border border-[#262c36]">
                      <div>
                        • <strong className="text-neutral-200">Baris 1:</strong> C[1][1] = +70, C[1][2] = -(-5) = 5, C[1][3] = +(-99) = -99
                      </div>
                      <div>
                        • <strong className="text-neutral-200">Baris 2:</strong> C[2][1] = -(343) = -343, C[2][2] = +70, C[2][3] = -(-378) = 378
                      </div>
                      <div>
                        • <strong className="text-neutral-200">Baris 3:</strong> C[3][1] = +224, C[3][2] = -(47) = -47, C[3][3] = +(-216) = -216
                      </div>
                    </div>
                  </div>
                </div>

                {/* RUNNABLE CODE RUNNER FOR STEP 2 */}
                <CodeRunner
                  code={step2Code}
                  title="Kode JavaScript Langkah 2: Matriks Kofaktor C"
                  subtitle="Menjalankan fungsi Kofaktor(K, 3) dan merinci nilai tiap sel"
                  badge="Modul 3"
                />
              </div>
            </StepCard>

            {/* Langkah 3: Matriks Adjoin adj(K) & Reduksi Modulo 26 */}
            <StepCard
              stepNumber="3"
              title="Langkah 3: Matriks Adjoin adj(K) = Cᵀ & Reduksi Modulo 26"
              formula="adj(K) = Cᵀ; adj₂₆[i][j] = adj[i][j] mod 26"
              subtitle="Transpos kofaktor dan normalisasi setiap elemen ke dalam himpunan bilangan bulat positif [0, 25]"
            >
              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1.5">
                    <span className="text-xs font-semibold text-neutral-300">Matriks Adjoin Mentah adj(K) = Cᵀ:</span>
                    <MatrixDisplay matrix={trace.adjMatrix} size="md" />
                  </div>

                  <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1.5">
                    <span className="text-xs font-semibold text-neutral-200">Matriks Adjoin Ter-reduksi (adj mod 26):</span>
                    <MatrixDisplay matrix={trace.adjMatrixMod26} size="md" />
                    <p className="text-[10px] text-neutral-400 pt-1 font-mono">
                      Perhitungan modulo positif: -343 mod 26 = 21, -47 mod 26 = 5, -99 mod 26 = 5.
                    </p>
                  </div>
                </div>

                {/* RUNNABLE CODE RUNNER FOR STEP 3 */}
                <CodeRunner
                  code={step3Code}
                  title="Kode JavaScript Langkah 3: Matriks Adjoin & Reduksi Modulo 26"
                  subtitle="Mentranspos kofaktor dan mereduksi seluruh elemen ke dalam [0..25]"
                  badge="Modul 4"
                />
              </div>
            </StepCard>

            {/* Langkah 4: Matriks Kunci Invers K^-1 */}
            <StepCard
              stepNumber="4"
              title="Langkah 4: Pembentukan Matriks Kunci Invers K⁻¹ (mod 26)"
              formula="K⁻¹ ≡ (d⁻¹ · adj(K)) mod 26"
              subtitle="Mengalikan invers determinan dengan adjoin lalu mereduksi modulo 26"
              badge="Matriks Kunci Invers"
              badgeType="purple"
            >
              <div className="space-y-3 text-xs">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3.5 sm:gap-4">
                  <div className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-1.5 flex-shrink-0">
                    <span className="text-xs font-bold text-neutral-200">Matriks K⁻¹ (mod 26):</span>
                    <MatrixDisplay matrix={trace.invKeyMatrix} size="md" />
                  </div>

                  <div className="p-3.5 rounded bg-[#111418] border border-[#262c36] flex-1 space-y-1.5 text-neutral-300">
                    <span className="font-semibold text-neutral-200">Perhitungan Perkalian Elemen K⁻¹:</span>
                    <p className="text-[10px] text-neutral-400 leading-relaxed font-mono">
                      K⁻¹[i][j] = (d⁻¹ × adj[i][j]) mod 26 = (25 × adj[i][j]) mod 26
                      <br />
                      • Baris 1: [(25×18) mod 26 = 8, (25×21) mod 26 = 5, (25×16) mod 26 = 10]
                      <br />
                      • Baris 2: [(25×5) mod 26 = 21, (25×18) mod 26 = 8, (25×5) mod 26 = 21]
                      <br />
                      • Baris 3: [(25×5) mod 26 = 21, (25×14) mod 26 = 12, (25×18) mod 26 = 8]
                    </p>
                  </div>
                </div>

                {/* RUNNABLE CODE RUNNER FOR STEP 4 */}
                <CodeRunner
                  code={step4Code}
                  title="Kode JavaScript Langkah 4: Matriks Kunci Invers K⁻¹"
                  subtitle="Menghitung K_inv[i][j] = (d_inv * adj[i][j]) mod 26"
                  badge="Modul 8 (Tahap Kunci)"
                />
              </div>
            </StepCard>

            {/* Langkah 5: Dekripsi Blok Demi Blok */}
            <StepCard
              stepNumber="5"
              title="Langkah 5: Dekripsi Teks Sandi Per Blok (Tiap 3 Huruf)"
              formula="p = (K⁻¹ · c) mod 26; Plainteks += Huruf(p[i])"
              subtitle="Transformasi perkalian matriks-vektor modulo 26 untuk setiap triplet sandi"
              badge={`${trace.blocks.length} Blok Diproses`}
              badgeType="success"
            >
              <div className="space-y-3 text-xs">
                <p className="text-neutral-300 leading-relaxed">
                  Setiap blok 3 huruf diubah menjadi vektor kolom <code className="text-neutral-200 font-mono">c = [c₁, c₂, c₃]ᵀ</code>, dikalikan dengan matriks kunci invers <code className="text-neutral-200 font-mono">K⁻¹</code>, dan hasilnya dimodulo 26:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                  {trace.blocks.map((block) => (
                    <div
                      key={block.blockIndex}
                      className="p-3 rounded bg-[#111418] border border-[#262c36] space-y-2"
                    >
                      <div className="flex flex-wrap items-center justify-between border-b border-[#262c36] pb-1.5 gap-1.5">
                        <span className="font-bold text-neutral-300">
                          Blok #{block.blockIndex}
                        </span>
                        <div className="flex items-center gap-1.5 font-mono text-xs">
                          <span className="text-neutral-300 font-bold px-1.5 py-0.5 rounded bg-[#181c22] border border-[#2a313d]">
                            {block.cipherLetters}
                          </span>
                          <ArrowRight className="w-3 h-3 text-neutral-600" />
                          <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-[#1c2420] border border-emerald-900/60">
                            {block.plainLetters}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-0.5 font-mono text-[10px] text-neutral-400">
                        <div>
                          Vektor sandi c: [{block.cipherVector.join(", ")}]ᵀ
                        </div>
                        <div className="text-neutral-500">
                          Hasil kali K⁻¹ · c: [{block.rawProduct.join(", ")}]ᵀ
                        </div>
                        <div className="text-neutral-200 font-bold">
                          Modulo 26: [{block.plainVector.join(", ")}]ᵀ
                        </div>
                      </div>

                      <div className="pt-1.5 border-t border-[#262c36] flex items-center justify-between text-[10px]">
                        <span className="text-neutral-500">Teks asli:</span>
                        <span className="font-mono font-bold text-emerald-400 tracking-wider">
                          {block.plainVector
                            .map((num) => `${numToChar(num)}(${num})`)
                            .join(" - ")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* RUNNABLE CODE RUNNER FOR STEP 5 */}
                <CodeRunner
                  code={step5Code}
                  title="Kode JavaScript Langkah 5: Dekripsi Per Blok"
                  subtitle="Menjalankan perkalian modular blok per blok P_k = (K_inv * C_k) mod 26"
                  badge="Modul 8 (Dekripsi)"
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
                <span>Program Lengkap: Dekripsi Hill Cipher Matriks 3 × 3 (Modul 7 – 8)</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Script JavaScript utuh dan mandiri. Klik &quot;Jalankan Kode&quot; untuk mengeksekusi dekripsi secara keseluruhan dengan matriks kunci K dan teks sandi saat ini.
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18231c] text-emerald-300 border border-emerald-800 self-start sm:self-auto">
              Mandiri (Zero-Dependency)
            </span>
          </div>

          <CodeRunner
            code={fullScript}
            title="Program Utama Lengkap: DekripsiHill(K, C_teks)"
            subtitle="Memuat seluruh implementasi fungsi Minor, Det, Kofaktor, Adjoin, InversModular, dan DekripsiHill"
            badge="Full Script Modul 7-8"
            variant="full"
            defaultOpen={true}
          />
        </div>
      </div>
    </div>
  );
};
