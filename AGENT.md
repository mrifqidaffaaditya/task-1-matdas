# AGENT.md — System Architecture & Algorithmic Guardrails

**Project:** Proyek Evaluasi & Perancangan Algoritma: Penyelesaian SPL Berbasis Metode Matriks Adjoin & Dekripsi Hill Cipher  
**Author:** M. Rifqi Daffa Aditya  
**NIM:** 2604140016  
**Program Studi:** Sistem Informasi  
**Mata Kuliah:** Matematika Dasar / Aljabar Linier (Semester Ganjil 2026/2027)  

---

## 1. Architectural Overview

This system is an academic web application designed to demonstrate, trace, and evaluate:
1. **System of Linear Equations (SPL) Solver** using the classical Matrix Adjoint / Adjugate method ($x = A^{-1}b = \frac{1}{\det(A)}\text{adj}(A)b$) for dimensions $n \in \{2, 3, 4\}$.
2. **Hill Cipher Decryption Engine ($3\times3$)** in $\mathbb{Z}_{26}$ modular arithmetic, utilizing the modular inverse determinant and modular adjugate matrix ($K^{-1} \equiv \det(K)^{-1}\cdot\text{adj}(K) \pmod{26}$).
3. **Live Challenge Arena** for real-time oral exams and classroom evaluation with step-by-step reveal capabilities.
4. **Complexity Analysis Visualizer** providing theoretical derivations and empirical operation counters for $T(n) = O(n \times n!)$ and $S(n) = O(n^3)$.

---

## 2. Strict Engineering Guardrails (NON-NEGOTIABLE)

1. **Zero External Math Packages:**
   - Packages like `mathjs`, `numeric`, `algebrite`, `ndarray`, or similar are strictly **FORBIDDEN**.
   - All matrix operations (minor extraction, cofactor computation, matrix transposition, determinant evaluation, vector dot products, greatest common divisor, and modular multiplicative inverse) MUST be implemented from scratch in pure TypeScript in `src/lib/algorithms/`.
2. **Type Safety & Strict Mode:**
   - Project must compile with `tsc --noEmit` and build with `npm run build` under strict TypeScript configuration without `any` workarounds.
3. **Immutability:**
   - Matrix functions must treat inputs as immutable 2D arrays (`number[][]`) and return fresh matrices without side effects on input data.
4. **Preservation of Academic Logic:**
   - The TypeScript implementation must directly correspond to the author's 8 formal pseudocode modules.

---

## 3. Mathematical Indexing Conventions

### Academic Pseudocode (1-based Indexing) vs TypeScript (0-based Indexing)
- In the author's formal pseudocode and lecture notes:
  - Rows are indexed from $1$ to $n$.
  - Columns are indexed from $1$ to $n$.
  - Minors are denoted $M_{ij}$ where $i, j \in \{1, \dots, n\}$.
  - Cofactors are denoted $C_{ij} = (-1)^{i+j} \det(M_{ij})$.
- In TypeScript implementation:
  - Arrays are zero-indexed (`A[r][c]` where $r, c \in \{0, \dots, n-1\}$).
  - Row index `r` corresponds to mathematical row `r + 1`.
  - Column index `c` corresponds to mathematical column `c + 1`.
- **UI Trace Requirement:**
  - All labels shown to the lecturer, evaluator, and student in the UI step-by-step trace MUST use mathematical 1-based indexing (e.g., $M_{11}$, $M_{12}$, $C_{34}$, row 1 to row $n$).

---

## 4. Modular Arithmetic Guardrail for JavaScript / TypeScript

In standard ECMAScript, the `%` operator is the remainder operator, NOT the mathematical modulo operator. For negative numbers:
```typescript
// WRONG in JS:
-343 % 26 === -5 // Negative remainder!
```
In modular arithmetic over $\mathbb{Z}_m$, negative remainders must be normalized into $[0, m-1]$. All modular operations MUST use the standard formula:
```typescript
export function mod(a: number, m: number): number {
  return ((a % m) + m) % m;
}
```
For example:
$$\text{mod}(-343, 26) = ((-343 \bmod 26) + 26) \bmod 26 = (-5 + 26) \bmod 26 = 21$$
This ensures exact correspondence with the manual paper trace.

---

## 5. Algorithmic Trace Data Structures

To support both computational resolution and granular UI tracing, algorithms return structured execution trace objects:

```typescript
export interface MinorTrace {
  row: number; // 1-based
  col: number; // 1-based
  subMatrix: number[][];
  detMinor: number;
}

export interface CofactorTrace {
  row: number; // 1-based
  col: number; // 1-based
  sign: number; // +1 or -1
  minorDet: number;
  cofactorValue: number;
}

export interface SPLTrace {
  n: number;
  A: number[][];
  b: number[];
  detA: number;
  detExpansionRow1: {
    col: number; // 1-based
    element: number;
    sign: number;
    minorDet: number;
    term: number;
  }[];
  isSingular: boolean;
  cofactorMatrix: number[][];
  adjMatrix: number[][];
  adjTimesB: number[];
  // Tahap 1: A_inv = (1/d) * adj
  invMatrixDecimal: number[][];
  invMatrixFraction: { numerator: number; denominator: number }[][];
  // Tahap 2: x = A_inv * b
  x: number[];
  xFraction: { numerator: number; denominator: number }[];
  verificationResidual: number[]; // A * x - b
}
```

---

## 6. Directory Structure

```
├── AGENT.md
├── PRD.md
├── CHANGELOG.md
├── README.md
├── package.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AboutModal.tsx
│   │   ├── tabs/
│   │   │   ├── TabSPLAdjoin.tsx
│   │   │   ├── TabHillCipher.tsx
│   │   │   ├── TabLiveChallenge.tsx
│   │   │   ├── TabFlowchartPseudocode.tsx
│   │   │   └── TabComplexityAnalysis.tsx
│   │   └── ui/
│   │       ├── MatrixInput.tsx
│   │       ├── MatrixDisplay.tsx
│   │       ├── VectorInput.tsx
│   │       └── StepCard.tsx
│   └── lib/
│       ├── algorithms/
│       │   ├── matrix.ts        // Modules 1-6 (Minor, Det, Cofactor, Adjoin, Solusi, SPL)
│       │   ├── hillCipher.ts    // Modules 7-8 (InversModular, DekripsiHill)
│       │   ├── fractions.ts     // Exact fraction arithmetic for display
│       │   └── stats.ts         // Call execution counter & complexity tables
│       └── presets.ts           // Official presets (4x4 report, Hill Cipher 3x3, Singular)
```
