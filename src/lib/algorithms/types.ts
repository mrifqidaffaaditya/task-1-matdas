/**
 * Data types and interfaces for Matrix, Adjoint SPL, and Hill Cipher algorithms.
 * Author: M. Rifqi Daffa Aditya (NIM: 2604140016)
 * Program Studi: Sistem Informasi - Matematika Dasar / Aljabar Linier
 */

export interface Fraction {
  numerator: number;
  denominator: number;
  formatted: string;
}

export interface ExecutionStats {
  minorCalls: number;
  detCalls: number;
  kofaktorCalls: number;
  adjoinCalls: number;
  solusiCalls: number;
  multiplications: number;
  additions: number;
}

export interface MinorStep {
  row: number; // 1-based
  col: number; // 1-based
  subMatrix: number[][];
  detMinor: number;
}

export interface CofactorStep {
  row: number; // 1-based
  col: number; // 1-based
  sign: number; // +1 or -1
  minorDet: number;
  cofactorValue: number;
}

export interface DeterminantExpansionTerm {
  col: number; // 1-based
  element: number;
  sign: number;
  minorDet: number;
  subMatrix: number[][];
  termValue: number;
}

export interface SPLTraceResult {
  n: number;
  A: number[][];
  b: number[];
  detA: number;
  detExpansionRow1: DeterminantExpansionTerm[];
  isSingular: boolean;
  minors: MinorStep[][]; // n x n
  cofactorMatrix: number[][];
  cofactorSteps: CofactorStep[][]; // n x n
  adjMatrix: number[][];
  adjTimesB: number[]; // adj(A) * b
  invMatrixDecimal: number[][];
  invMatrixFraction: Fraction[][];
  x: number[];
  xFraction: Fraction[];
  residual: number[]; // A * x - b
  isVerified: boolean;
  stats: ExecutionStats;
}

export interface HillCipherBlockTrace {
  blockIndex: number;
  cipherLetters: string;
  cipherVector: [number, number, number];
  rawProduct: [number, number, number]; // K_inv * c before modulo
  plainVector: [number, number, number]; // rawProduct mod 26
  plainLetters: string;
}

export interface HillCipherTraceResult {
  K: number[][];
  ciphertext: string;
  detK: number;
  detKMod26: number;
  gcdVal: number;
  isValidKey: boolean;
  detInverse: number | null;
  cofactorMatrix: number[][];
  adjMatrix: number[][];
  adjMatrixMod26: number[][];
  invKeyMatrix: number[][]; // K^-1 mod 26
  blocks: HillCipherBlockTrace[];
  plaintext: string;
  stats: ExecutionStats;
}
