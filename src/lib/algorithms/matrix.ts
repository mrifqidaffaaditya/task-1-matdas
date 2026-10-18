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
 * FUNGSI Minor(A, n, p, q):
 *     M = matriks baru ukuran (n - 1) x (n - 1)
 *     r = 0
 *     UNTUK i = 1 SAMPAI n:
 *         JIKA i != p:
 *             r = r + 1
 *             c = 0
 *             UNTUK j = 1 SAMPAI n:
 *                 JIKA j != q:
 *                     c = c + 1
 *                     M[r][c] = A[i][j]
 *     KEMBALIKAN M
 *
 * Catatan indeks: p dan q adalah 1-based (1..n) sesuai pseudocode laporan.
 */
export function Minor(
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
 * FUNGSI Det(A, n):
 *     JIKA n == 1:
 *         KEMBALIKAN A[1][1]
 *     JIKA n == 2:
 *         KEMBALIKAN (A[1][1] * A[2][2]) - (A[1][2] * A[2][1])
 *     hasil = 0
 *     UNTUK j = 1 SAMPAI n:
 *         JIKA A[1][j] != 0:
 *             M = Minor(A, n, 1, j)
 *             tanda = (-1) ^ (1 + j)
 *             hasil = hasil + (tanda * A[1][j] * Det(M, n - 1))
 *     KEMBALIKAN hasil
 */
export function Det(A: number[][], n: number, stats?: ExecutionStats): number {
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
    // JIKA A[1][j] != 0 (Skip-Zero Optimization sesuai Flowchart & Pseudocode)
    if (A[0][j - 1] !== 0) {
      const M = Minor(A, n, 1, j, stats);
      const tanda = (1 + j) % 2 === 0 ? 1 : -1;
      const subDet = Det(M, n - 1, stats);
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
 * FUNGSI Kofaktor(A, n):
 *     C = matriks baru ukuran n x n
 *     UNTUK i = 1 SAMPAI n:
 *         UNTUK j = 1 SAMPAI n:
 *             M = Minor(A, n, i, j)
 *             tanda = (-1) ^ (i + j)
 *             C[i][j] = tanda * Det(M, n - 1)
 *     KEMBALIKAN C
 */
export function Kofaktor(A: number[][], n: number, stats?: ExecutionStats): number[][] {
  if (stats) stats.kofaktorCalls++;

  // C = matriks baru ukuran n x n
  const C: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j, stats);
      const tanda = (i + j) % 2 === 0 ? 1 : -1;
      const detMinor = Det(M, n - 1, stats);
      if (stats) stats.multiplications++;
      C[i - 1][j - 1] = tanda * detMinor;
    }
  }

  return C;
}

/**
 * MODUL 4: Menentukan Adjoin
 * FUNGSI Adjoin(C, n):
 *     adj = matriks baru ukuran n x n
 *     UNTUK i = 1 SAMPAI n:
 *         UNTUK j = 1 SAMPAI n:
 *             adj[j][i] = C[i][j]
 *     KEMBALIKAN adj
 */
export function Adjoin(C: number[][], n: number, stats?: ExecutionStats): number[][] {
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
 * FUNGSI Solusi(adj, d, b, n):
 *     A_inv = matriks baru ukuran n x n
 *     x = vektor baru ukuran n
 *     // Tahap 1: Hitung matriks invers
 *     A_inv = (1 / d) * adj
 *     UNTUK i = 1 SAMPAI n:
 *         UNTUK j = 1 SAMPAI n:
 *             A_inv[i][j] = adj[i][j] / d
 *     // Tahap 2: Kalikan matriks A_inv dengan vektor b
 *     UNTUK i = 1 SAMPAI n:
 *         total = 0
 *         UNTUK k = 1 SAMPAI n:
 *             total = total + (A_inv[i][k] * b[k])
 *         x[i] = total
 *     KEMBALIKAN x
 */
export function Solusi(
  adj: number[][],
  d: number,
  b: number[],
  n: number,
  stats?: ExecutionStats
): { A_inv: number[][]; x: number[] } {
  if (stats) stats.solusiCalls++;

  const A_inv: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const x: number[] = new Array(n).fill(0);

  // Tahap 1: Hitung matriks invers A_inv = (1 / d) * adj
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      A_inv[i - 1][j - 1] = adj[i - 1][j - 1] / d;
      if (stats) stats.multiplications++;
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
 * MODUL 6: ALGORITMA SPL_Adjoin
 * ALGORITMA SPL_Adjoin:
 *     BACA n, A, b
 *     d = Det(A, n)
 *     JIKA d == 0:
 *         CETAK "Matriks singular (det = 0): metode adjoin tidak dapat dipakai"
 *         BERHENTI
 *     C = Kofaktor(A, n)
 *     adj = Adjoin(C, n)
 *     x = Solusi(adj, d, b, n)
 *     CETAK x
 */
export function SPL_Adjoin(
  A: number[][],
  b: number[],
  n: number
): SPLTraceResult {
  const stats = createEmptyStats();

  // 1. Catat ekspansi baris pertama untuk visualisasi tracing UI
  const detExpansionRow1: DeterminantExpansionTerm[] = [];
  for (let j = 1; j <= n; j++) {
    const M = Minor(A, n, 1, j);
    const sign = (1 + j) % 2 === 0 ? 1 : -1;
    const subDet = Det(M, n - 1);
    const element = A[0][j - 1];
    const termValue = sign * element * subDet;
    detExpansionRow1.push({
      col: j,
      element,
      sign,
      minorDet: subDet,
      subMatrix: M,
      termValue,
      skippedDueToZero: element === 0,
    });
  }

  // Hitung determinan d = Det(A, n)
  const d = Det(A, n, stats);
  const isSingular = Math.abs(d) < 1e-9;

  // JIKA d == 0: CETAK "Matriks singular (det = 0): metode adjoin tidak dapat dipakai" BERHENTI
  if (isSingular) {
    return {
      n,
      A,
      b,
      detA: 0,
      detExpansionRow1,
      isSingular: true,
      errorMessage: "Matriks singular (det = 0): metode adjoin tidak dapat dipakai",
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

  // 2. Kofaktor: C = Kofaktor(A, n)
  const minors: MinorStep[][] = [];
  const cofactorSteps: CofactorStep[][] = [];
  for (let i = 1; i <= n; i++) {
    const minorRow: MinorStep[] = [];
    const cofRow: CofactorStep[] = [];
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const minorDet = Det(M, n - 1);
      const sign = (i + j) % 2 === 0 ? 1 : -1;
      const cofactorValue = sign * minorDet;

      minorRow.push({ row: i, col: j, subMatrix: M, detMinor: minorDet });
      cofRow.push({ row: i, col: j, sign, minorDet, cofactorValue });
    }
    minors.push(minorRow);
    cofactorSteps.push(cofRow);
  }

  const C = Kofaktor(A, n, stats);

  // 3. Adjoin: adj = Adjoin(C, n)
  const adj = Adjoin(C, n, stats);

  // 4. Hitung adj(A) * b (Vektor perantara analitik pada kertas kerja laporan manual)
  const adjTimesB: number[] = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let k = 0; k < n; k++) {
      sum += adj[i][k] * b[k];
    }
    adjTimesB[i] = Math.round(sum);
  }

  // 5. Solusi: x = Solusi(adj, d, b, n)
  const { A_inv, x } = Solusi(adj, d, b, n, stats);

  // 6. Representasi pecahan eksak (Tahap 1 A_inv = (1/d)*adj dan Tahap 2 x)
  const invMatrixFraction = adj.map((row) =>
    row.map((val) => createFraction(val, d))
  );

  const xFraction = adjTimesB.map((val) => createFraction(val, d));

  // 7. Verifikasi otomatis A * x = b dan residual
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

// Backward compatible aliases
export const minor = Minor;
export const det = Det;
export const kofaktor = Kofaktor;
export const adjoin = Adjoin;
export const solusi = Solusi;
export const solveSPLAdjoin = SPL_Adjoin;
