/**
 * Pure TypeScript Implementation of Hill Cipher 3x3 Decryption Engine (Modules 7 - 8)
 * Strict Zero-Math-Libraries Rule: Pure TypeScript modular arithmetic.
 * Author: M. Rifqi Daffa Aditya (NIM: 2604140016)
 * Program Studi: Sistem Informasi - Aljabar Linier / Matematika Dasar
 */

import {
  ExecutionStats,
  HillCipherBlockTrace,
  HillCipherTraceResult,
} from "./types";
import { Det, Kofaktor, Adjoin, createEmptyStats } from "./matrix";
import { gcd } from "./fractions";

/**
 * Mathematical Modulo (Positive remainder guard)
 * Ensures correct modular arithmetic for negative dividends: ((a % m) + m) % m
 * e.g., mod(-343, 26) = 21, mod(-47, 26) = 5, mod(-99, 26) = 5.
 */
export function mod(a: number, m: number): number {
  return ((a % m) + m) % m;
}

/**
 * Converts uppercase letter 'A'-'Z' to integer 0..25
 */
export function charToNum(ch: string): number {
  const code = ch.toUpperCase().charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return code - 65;
  }
  return 0;
}

/**
 * Converts integer 0..25 to uppercase letter 'A'-'Z'
 */
export function numToChar(n: number): string {
  const normalized = mod(Math.round(n), 26);
  return String.fromCharCode(65 + normalized);
}

/**
 * MODUL 7: Studi Kasus Topik A (Bagian 1): FUNGSI InversModular(a, m)
 * FUNGSI InversModular(a, m):
 *     a = a MOD m
 *     UNTUK x = 1 SAMPAI m - 1:
 *         JIKA (a * x) MOD m == 1:
 *             KEMBALIKAN x
 *     KEMBALIKAN TIDAK_ADA
 */
export function InversModular(a: number, m: number): number | null {
  a = mod(a, m);
  for (let x = 1; x <= m - 1; x++) {
    if (mod(a * x, m) === 1) {
      return x;
    }
  }
  return null; // TIDAK_ADA
}

/**
 * MODUL 8: Studi Kasus Topik A (Bagian 2): ALGORITMA DekripsiHill
 * ALGORITMA DekripsiHill:
 *     BACA K (matriks 3x3), teks_sandi (panjang kelipatan 3)
 *     // 1. Hitung determinan modulo 26 dan cek validitas kunci
 *     d = Det(K, 3) MOD 26
 *     JIKA GCD(d, 26) != 1:
 *         CETAK "Kunci tidak valid (tidak koprima dengan 26)"
 *         BERHENTI
 *     // 2. Hitung invers determinan dan matriks adjoin
 *     d_inv = InversModular(d, 26)
 *     C = Kofaktor(K, 3)
 *     adj = Adjoin(C, 3)
 *     // 3. Bentuk matriks kunci invers K_inv = (d_inv * adj) mod 26
 *     K_inv = matriks baru ukuran 3 x 3
 *     UNTUK i = 1 SAMPAI 3:
 *         UNTUK j = 1 SAMPAI 3:
 *             K_inv[i][j] = (d_inv * adj[i][j]) MOD 26
 *     // 4. Dekripsi teks sandi per blok (tiap 3 huruf)
 *     plainteks = ""
 *     UNTUK tiap blok c = (c[1], c[2], c[3]) pada teks_sandi:
 *         UNTUK i = 1 SAMPAI 3:
 *             total = 0
 *             UNTUK k = 1 SAMPAI 3:
 *                 total = total + (K_inv[i][k] * c[k])
 *             p[i] = total MOD 26
 *         plainteks = plainteks + Huruf(p[i])
 *     CETAK plainteks
 */
export function DekripsiHill(
  K: number[][],
  rawCiphertext: string
): HillCipherTraceResult {
  const stats = createEmptyStats();

  // Bersihkan teks sandi: hanya huruf latin, kapital
  const cleanCipher = rawCiphertext.toUpperCase().replace(/[^A-Z]/g, "");

  // 1. Hitung determinan modulo 26 dan cek validitas kunci
  const rawDet = Det(K, 3, stats);
  const d = mod(rawDet, 26);
  const gcdVal = gcd(d, 26);
  const isValidKey = gcdVal === 1;

  // JIKA GCD(d, 26) != 1: CETAK "Kunci tidak valid (tidak koprima dengan 26)" BERHENTI
  if (!isValidKey) {
    return {
      K,
      ciphertext: cleanCipher,
      detK: rawDet,
      detKMod26: d,
      gcdVal,
      isValidKey: false,
      errorMessage: "Kunci tidak valid (tidak koprima dengan 26)",
      detInverse: null,
      cofactorMatrix: [],
      adjMatrix: [],
      adjMatrixMod26: [],
      invKeyMatrix: [],
      blocks: [],
      plaintext: "",
      stats,
    };
  }

  // 2. Hitung invers determinan dan matriks adjoin
  const d_inv = InversModular(d, 26)!;
  const C = Kofaktor(K, 3, stats);
  const adj = Adjoin(C, 3, stats);

  // Reduksi adjoin mod 26 untuk representasi analitik laporan
  const adjMatrixMod26: number[][] = adj.map((row) =>
    row.map((val) => mod(val, 26))
  );

  // 3. Bentuk matriks kunci invers: K_inv = (d_inv * adj) mod 26
  const K_inv: number[][] = Array.from({ length: 3 }, () => new Array(3).fill(0));
  for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
      K_inv[i - 1][j - 1] = mod(d_inv * adj[i - 1][j - 1], 26);
      stats.multiplications++;
    }
  }

  // 4. Dekripsi teks sandi per blok (tiap 3 huruf)
  // Berikan padding 'X' jika panjang teks bukan kelipatan 3
  let paddedCipher = cleanCipher;
  while (paddedCipher.length % 3 !== 0) {
    paddedCipher += "X";
  }

  const blocks: HillCipherBlockTrace[] = [];
  let plainteks = "";

  const numBlocks = paddedCipher.length / 3;
  for (let b = 0; b < numBlocks; b++) {
    const chunk = paddedCipher.slice(b * 3, b * 3 + 3);
    const c: [number, number, number] = [
      charToNum(chunk[0]),
      charToNum(chunk[1]),
      charToNum(chunk[2]),
    ];

    const rawProduct: [number, number, number] = [0, 0, 0];
    const p: [number, number, number] = [0, 0, 0];
    let plainChunk = "";

    for (let i = 1; i <= 3; i++) {
      let total = 0;
      for (let k = 1; k <= 3; k++) {
        total = total + K_inv[i - 1][k - 1] * c[k - 1];
        stats.multiplications++;
        stats.additions++;
      }
      rawProduct[i - 1] = total;
      p[i - 1] = mod(total, 26);
      plainChunk += numToChar(p[i - 1]);
    }

    plainteks += plainChunk;
    blocks.push({
      blockIndex: b + 1,
      cipherLetters: chunk,
      cipherVector: c,
      rawProduct,
      plainVector: p,
      plainLetters: plainChunk,
    });
  }

  return {
    K,
    ciphertext: paddedCipher,
    detK: rawDet,
    detKMod26: d,
    gcdVal,
    isValidKey: true,
    detInverse: d_inv,
    cofactorMatrix: C,
    adjMatrix: adj,
    adjMatrixMod26,
    invKeyMatrix: K_inv,
    blocks,
    plaintext: plainteks,
    stats,
  };
}

// Backward compatible aliases
export const inversModular = InversModular;
export const dekripsiHill = DekripsiHill;
