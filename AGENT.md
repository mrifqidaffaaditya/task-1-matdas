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
4. **Preservation of Academic Logic & Exact Naming:**
   - The TypeScript implementation must directly correspond to the author's 8 formal pseudocode modules:
     - `Minor(A, n, p, q)`
     - `Det(A, n)` (with skip-zero check `JIKA A[1][j] != 0`)
     - `Kofaktor(A, n)`
     - `Adjoin(C, n)`
     - `Solusi(adj, d, b, n)` (Tahap 1 $A^{-1} = \frac{1}{d}\text{adj}$ & Tahap 2 $x = A^{-1}b$)
     - `SPL_Adjoin(A, b, n)` with error `"Matriks singular (det = 0): metode adjoin tidak dapat dipakai"`
     - `InversModular(a, m)`
     - `DekripsiHill(K, teks_sandi)` with error `"Kunci tidak valid (tidak koprima dengan 26)"`

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

## 5. Authoritative 8 Pseudocode Modules Reference

```text
// Modul 1: Menentukan matriks minor
FUNGSI Minor(A, n, p, q):
    M = matriks baru ukuran (n - 1) x (n - 1)
    r = 0
    UNTUK i = 1 SAMPAI n:
        JIKA i != p:
            r = r + 1
            c = 0
            UNTUK j = 1 SAMPAI n:
                JIKA j != q:
                    c = c + 1
                    M[r][c] = A[i][j]
    KEMBALIKAN M

// Modul 2: Menentukan Determinan
FUNGSI Det(A, n):
    JIKA n == 1:
        KEMBALIKAN A[1][1]
    JIKA n == 2:
        KEMBALIKAN (A[1][1] * A[2][2]) - (A[1][2] * A[2][1])
    hasil = 0
    UNTUK j = 1 SAMPAI n:
        JIKA A[1][j] != 0:
            M = Minor(A, n, 1, j)
            tanda = (-1) ^ (1 + j)
            hasil = hasil + (tanda * A[1][j] * Det(M, n - 1))
    KEMBALIKAN hasil

// Modul 3: Menentukan Kofaktor
FUNGSI Kofaktor(A, n):
    C = matriks baru ukuran n x n
    UNTUK i = 1 SAMPAI n:
        UNTUK j = 1 SAMPAI n:
            M = Minor(A, n, i, j)
            tanda = (-1) ^ (i + j)
            C[i][j] = tanda * Det(M, n - 1)
    KEMBALIKAN C

// Modul 4: Menentukan Adjoin
FUNGSI Adjoin(C, n):
    adj = matriks baru ukuran n x n
    UNTUK i = 1 SAMPAI n:
        UNTUK j = 1 SAMPAI n:
            adj[j][i] = C[i][j]
    KEMBALIKAN adj

// Modul 5: Menentukan Solusi
FUNGSI Solusi(adj, d, b, n):
    A_inv = matriks baru ukuran n x n
    x = vektor baru ukuran n
    // Tahap 1: Hitung matriks invers
    A_inv = (1 / d) * adj
    UNTUK i = 1 SAMPAI n:
        UNTUK j = 1 SAMPAI n:
            A_inv[i][j] = adj[i][j] / d
    // Tahap 2: Kalikan matriks A_inv dengan vektor b
    UNTUK i = 1 SAMPAI n:
        total = 0
        UNTUK k = 1 SAMPAI n:
            total = total + (A_inv[i][k] * b[k])
        x[i] = total
    KEMBALIKAN x

// Modul 6: Contoh program utama (SPL_Adjoin)
ALGORITMA SPL_Adjoin:
    BACA n, A, b
    d = Det(A, n)
    JIKA d == 0:
        CETAK "Matriks singular (det = 0): metode adjoin tidak dapat dipakai"
        BERHENTI
    C = Kofaktor(A, n)
    adj = Adjoin(C, n)
    x = Solusi(adj, d, b, n)
    CETAK x

// Modul 7: Studi Kasus Topik A (Bagian 1): FUNGSI InversModular(a, m)
FUNGSI InversModular(a, m):
    a = a MOD m
    UNTUK x = 1 SAMPAI m - 1:
        JIKA (a * x) MOD m == 1:
            KEMBALIKAN x
    KEMBALIKAN TIDAK_ADA

// Modul 8: Studi Kasus Topik A (Bagian 2): ALGORITMA DekripsiHill
ALGORITMA DekripsiHill:
    BACA K (matriks 3x3), teks_sandi (panjang kelipatan 3)
    // 1. Hitung determinan modulo 26 dan cek validitas kunci
    d = Det(K, 3) MOD 26
    JIKA GCD(d, 26) != 1:
        CETAK "Kunci tidak valid (tidak koprima dengan 26)"
        BERHENTI
    // 2. Hitung invers determinan dan matriks adjoin
    d_inv = InversModular(d, 26)
    C = Kofaktor(K, 3)
    adj = Adjoin(C, 3)
    // 3. Bentuk matriks kunci invers K_inv = (d_inv * adj) mod 26
    K_inv = matriks baru ukuran 3 x 3
    UNTUK i = 1 SAMPAI 3:
        UNTUK j = 1 SAMPAI 3:
            K_inv[i][j] = (d_inv * adj[i][j]) MOD 26
    // 4. Dekripsi teks sandi per blok (tiap 3 huruf)
    plainteks = ""
    UNTUK tiap blok c = (c[1], c[2], c[3]) pada teks_sandi:
        UNTUK i = 1 SAMPAI 3:
            total = 0
            UNTUK k = 1 SAMPAI 3:
                total = total + (K_inv[i][k] * c[k])
            p[i] = total MOD 26
        plainteks = plainteks + Huruf(p[i])
    CETAK plainteks
```

---

## 6. Asymptotic Complexity Derivation

### Kompleksitas Waktu $T(n) = O(n \times n!)$:
- **Fungsi Minor:** 2 nested loops ($1 \dots n$) $\implies n \times n = n^2 \implies O(n^2)$.
- **Modul Determinan (Det):** Recursive calls from $n, (n-1), \dots, 2 \implies n \times (n-1) \times \dots \times 1 \implies O(n!)$.
- **Modul Kofaktor (Kofaktor):** 2 nested loops ($n^2$) calling `Det` of size $(n-1)$ which takes $(n-1)! \implies n^2 \times (n-1)! = n \times n! \implies O(n \times n!)$.
- **Modul Transpose (Adjoin) & Solusi (Solusi):** 2 nested loops ($1 \dots n$) $\implies O(n^2)$ each.
- **Penurunan Rumus Waktu $T(n)$:**
  $$T(n) = O(n!) + O(n \times n!) + O(n^2) + O(n^2) \implies T(n) = O(n \times n!)$$

### Kompleksitas Ruang $S(n) = O(n^3)$:
- **Matriks Utama:** Menyimpan `A`, `C`, `adj`, dan `A_inv` berukuran $n \times n = n^2 \implies O(n^2)$.
- **Matriks Rekursi (Det):** Recursive determinant creates a stack of `Minor` matrices of depth $n$, each roughly $n^2 \implies n \times n^2 = n^3 \implies O(n^3)$.
- **Penurunan Rumus Ruang $S(n)$:**
  $$S(n) = O(n^2) + O(n^3) \implies S(n) = O(n^3)$$
