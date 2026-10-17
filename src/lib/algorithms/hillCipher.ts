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
import { det, kofaktor, adjoin, createEmptyStats } from "./matrix";
import { gcd } from "./fractions";

/**
 * Mathematical Modulo (Positive remainder)
 * Handles negative dividends: ((a % m) + m) % m
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
 * MODUL 7: FUNGSI InversModular(a, m)
 * Mencari balikan perkalian modular x in [1, m-1] sedemikian hingga (a * x) mod m == 1
 */
export function inversModular(a: number, m: number): number | null {
  a = mod(a, m);
  for (let x = 1; x <= m - 1; x++) {
    if (mod(a * x, m) === 1) {
      return x;
    }
  }
  return null; // TIDAK_ADA
}

/**
 * MODUL 8: ALGORITMA DekripsiHill
 * Mendekripsi teks sandi menggunakan matriks kunci 3x3 dengan pelacakan lengkap per blok.
 */
export function dekripsiHill(
  K: number[][],
  rawCiphertext: string
): HillCipherTraceResult {
  const stats = createEmptyStats();

  // Bersihkan teks sandi: hanya huruf latin, kapital
  const cleanCipher = rawCiphertext.toUpperCase().replace(/[^A-Z]/g, "");

  // 1. Hitung determinan matriks kunci
  const rawDet = det(K, 3, stats);
  const d = mod(rawDet, 26);
  const gcdVal = gcd(d, 26);
  const isValidKey = gcdVal === 1;

  if (!isValidKey) {
    return {
      K,
      ciphertext: cleanCipher,
      detK: rawDet,
      detKMod26: d,
      gcdVal,
      isValidKey: false,
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
  const d_inv = inversModular(d, 26)!;
  const C = kofaktor(K, 3, stats);
  const adj = adjoin(C, 3, stats);

  // Reduksi adjoin mod 26 untuk representasi analitik
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
