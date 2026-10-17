/**
 * Pure TypeScript Implementation of Matrix Adjoint SPL Algorithms (Modules 1 - 6)
 * Strict Zero-Math-Libraries Rule: 100% from scratch.
 * Author: M. Rifqi Daffa Aditya (NIM: 2604140016)
 * Program Studi: Sistem Informasi - Aljabar Linier / Matematika Dasar
 */

import {
  ExecutionStats,
  MinorStep,
  CofactorStep,
  DeterminantExpansionTerm,
  SPLTraceResult,
} from "./types";
import { createFraction } from "./fractions";

/**
 * Creates empty execution statistics tracker
 */
export function createEmptyStats(): ExecutionStats {
  return {
    minorCalls: 0,
    detCalls: 0,
    kofaktorCalls: 0,
    adjoinCalls: 0,
    solusiCalls: 0,
    multiplications: 0,
    additions: 0,
  };
}

/**
 * MODUL 1: Menentukan matriks minor
 * Menghapus baris p dan kolom q dari matriks A berukuran n x n.
 * Catatan indeks: p dan q adalah 1-based (1..n) sesuai pseudocode laporan.
 */
export function minor(
  A: number[][],
  n: number,
  p: number,
  q: number,
  stats?: ExecutionStats
): number[][] {
  if (stats) stats.minorCalls++;

  // M = matriks baru ukuran (n - 1) x (n - 1)
  const M: number[][] = Array.from({ length: n - 1 }, () => new Array(n - 1).fill(0));
  let r = 0; // r mewakili indeks baris baru 0-based

  for (let i = 1; i <= n; i++) {
    if (i !== p) {
      let c = 0; // c mewakili indeks kolom baru 0-based
      for (let j = 1; j <= n; j++) {
        if (j !== q) {
          M[r][c] = A[i - 1][j - 1];
          c = c + 1;
        }
      }
      r = r + 1;
    }
  }

  return M;
}

/**
 * MODUL 2: Menentukan Determinan
 * Ekspansi kofaktor sepanjang baris pertama (Laplace expansion) dengan basis rekursi n=1 dan n=2.
 */
export function det(A: number[][], n: number, stats?: ExecutionStats): number {
  if (stats) stats.detCalls++;

  // JIKA n == 1: KEMBALIKAN A[1][1]
  if (n === 1) {
    return A[0][0];
  }

  // JIKA n == 2: KEMBALIKAN (A[1][1] * A[2][2]) - (A[1][2] * A[2][1])
  if (n === 2) {
    if (stats) {
      stats.multiplications += 2;
      stats.additions += 1;
    }
    return A[0][0] * A[1][1] - A[0][1] * A[1][0];
  }

  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    if (A[0][j - 1] !== 0) {
      const M = minor(A, n, 1, j, stats);
      const tanda = (1 + j) % 2 === 0 ? 1 : -1;
      const subDet = det(M, n - 1, stats);
      if (stats) {
        stats.multiplications += 2;
        stats.additions += 1;
      }
      hasil = hasil + tanda * A[0][j - 1] * subDet;
    }
  }

  return hasil;
}

/**
 * MODUL 3: Menentukan Kofaktor
 * Menghitung matriks kofaktor C di mana C[i][j] = (-1)^(i+j) * Det(Minor(A, n, i, j), n - 1)
 */
export function kofaktor(A: number[][], n: number, stats?: ExecutionStats): number[][] {
  if (stats) stats.kofaktorCalls++;

  // C = matriks baru ukuran n x n
  const C: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = minor(A, n, i, j, stats);
      const tanda = (i + j) % 2 === 0 ? 1 : -1;
      const detMinor = det(M, n - 1, stats);
      if (stats) stats.multiplications++;
      C[i - 1][j - 1] = tanda * detMinor;
    }
  }

  return C;
}

/**
 * MODUL 4: Menentukan Adjoin
 * adj = transpos dari matriks kofaktor C
 */
export function adjoin(C: number[][], n: number, stats?: ExecutionStats): number[][] {
  if (stats) stats.adjoinCalls++;

  // adj = matriks baru ukuran n x n
  const adj: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      adj[j - 1][i - 1] = C[i - 1][j - 1];
    }
  }

  return adj;
}

/**
 * MODUL 5: Menentukan Solusi
 * Tahap 1: Hitung matriks invers A_inv = (1 / d) * adj
 * Tahap 2: Kalikan matriks A_inv dengan vektor b
 */
export function solusi(
  adj: number[][],
  d: number,
  b: number[],
  n: number,
  stats?: ExecutionStats
): { A_inv: number[][]; x: number[] } {
  if (stats) stats.solusiCalls++;

  const A_inv: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const x: number[] = new Array(n).fill(0);

  // Tahap 1: Hitung matriks invers
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      A_inv[i - 1][j - 1] = adj[i - 1][j - 1] / d;
      if (stats) stats.multiplications++; // Division counted as arithmetic multiplication
    }
  }

  // Tahap 2: Kalikan matriks A_inv dengan vektor b
  for (let i = 1; i <= n; i++) {
    let total = 0;
    for (let k = 1; k <= n; k++) {
      total = total + A_inv[i - 1][k - 1] * b[k - 1];
      if (stats) {
        stats.multiplications++;
        stats.additions++;
      }
    }
    x[i - 1] = total;
  }

  return { A_inv, x };
}

/**
 * MODUL 6: ALGORITMA SPL_Adjoin dengan pelacakan langkah lengkap untuk UI akademik
 */
export function solveSPLAdjoin(
  A: number[][],
  b: number[],
  n: number
): SPLTraceResult {
  const stats = createEmptyStats();

  // 1. Hitung determinan dan catat ekspansi baris pertama
  const detExpansionRow1: DeterminantExpansionTerm[] = [];
  for (let j = 1; j <= n; j++) {
    const M = minor(A, n, 1, j);
    const sign = (1 + j) % 2 === 0 ? 1 : -1;
    const subDet = det(M, n - 1);
    const element = A[0][j - 1];
    const termValue = sign * element * subDet;
    detExpansionRow1.push({
      col: j,
      element,
      sign,
      minorDet: subDet,
      subMatrix: M,
      termValue,
    });
  }

  const d = det(A, n, stats);
  const isSingular = Math.abs(d) < 1e-9;

  // Jika singular, buat hasil berhenti sesuai algoritma
  if (isSingular) {
    return {
      n,
      A,
      b,
      detA: 0,
      detExpansionRow1,
      isSingular: true,
      minors: [],
      cofactorMatrix: [],
      cofactorSteps: [],
      adjMatrix: [],
      adjTimesB: [],
      invMatrixDecimal: [],
      invMatrixFraction: [],
      x: [],
      xFraction: [],
      residual: [],
      isVerified: false,
      stats,
    };
  }

  // 2. Kofaktor dan rincian langkah minor
  const minors: MinorStep[][] = [];
  const cofactorSteps: CofactorStep[][] = [];
  for (let i = 1; i <= n; i++) {
    const minorRow: MinorStep[] = [];
    const cofRow: CofactorStep[] = [];
    for (let j = 1; j <= n; j++) {
      const M = minor(A, n, i, j);
      const minorDet = det(M, n - 1);
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      const cofactorValue = sign * minorDet;

      minorRow.push({ row: i, col: j, subMatrix: M, detMinor: minorDet });
      cofRow.push({ row: i, col: j, sign, minorDet, cofactorValue });
    }
    minors.push(minorRow);
    cofactorSteps.push(cofRow);
  }

  const C = kofaktor(A, n, stats);

  // 3. Adjoin = C^T
  const adj = adjoin(C, n, stats);

  // 4. Hitung adj(A) * b (vektor perantara kertas kerja manual)
  const adjTimesB: number[] = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let k = 0; k < n; k++) {
      sum += adj[i][k] * b[k];
    }
    adjTimesB[i] = Math.round(sum);
  }

  // 5. Solusi Tahap 1 & Tahap 2
  const { A_inv, x } = solusi(adj, d, b, n, stats);

  // 6. Bentuk pecahan eksak untuk tampilan bebas error rounding
  const invMatrixFraction = adj.map((row) =>
    row.map((val) => createFraction(val, d))
  );

  const xFraction = adjTimesB.map((val) => createFraction(val, d));

  // 7. Verifikasi A * x = b dan residual
  const residual: number[] = new Array(n).fill(0);
  let isVerified = true;
  for (let i = 0; i < n; i++) {
    let ax = 0;
    for (let j = 0; j < n; j++) {
      ax += A[i][j] * x[j];
    }
    residual[i] = ax - b[i];
    if (Math.abs(residual[i]) > 1e-6) {
      isVerified = false;
    }
  }

  return {
    n,
    A,
    b,
    detA: d,
    detExpansionRow1,
    isSingular: false,
    minors,
    cofactorMatrix: C,
    cofactorSteps,
    adjMatrix: adj,
    adjTimesB,
    invMatrixDecimal: A_inv,
    invMatrixFraction,
    x,
    xFraction,
    residual,
    isVerified,
    stats,
  };
}
