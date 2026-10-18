# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.3.1] - 2026-10-18

### Fixed & Enhanced
- **Total Elimination of Unrendered Unicode Glyphs (`⁻`, `ᵀ`, `ℤ₂₆`, `⅔`, `⟹`):**
  - Resolved missing glyph / tofu rendering on mobile Android and Windows system fonts:
    - Replaced unrendered superscript minus `⁻` (`\u207B`) in `A⁻¹`, `K⁻¹`, and `d⁻¹` with standard HTML `<sup>-1</sup>` in JSX and `A^-1` / `K^-1` in plain text.
    - Replaced phonetic modifier `ᵀ` (`\u1D40`) in `Cᵀ` and transpose vectors `[...]ᵀ` with HTML `<sup>T</sup>` in JSX and `^T` in plain text.
    - Replaced letterlike symbol `ℤ₂₆` with universal standard `Z`<sub>26</sub>` (Modulo 26)`.
    - Replaced vulgar fraction `⅔` (`\u2154`) with `(2/3)`.
    - Replaced supplemental arrow `⟹` (`\u27F9`) with standard arrow `→`.
  - Updated `StepCardProps` and `CodeRunnerProps` to accept `React.ReactNode` for `title`, `formula`, `subtitle`, and `badge` to support clean HTML tags (`<sup>`, `<sub>`) natively.

---

## [1.3.0] - 2026-10-18

### Added & Enhanced
- **Interactive JavaScript Code Execution at Every Step (`CodeRunner`):**
  - Integrated live client-side JavaScript execution (`CodeRunner.tsx`) inside each computational step for both SPL Adjoin (Steps 1–6) and Hill Cipher Decryption (Steps 1–5).
  - Pre-populated with current matrix $A$, vector $b$, dimension $n$, or key matrix $K$ and ciphertext inputs in real time.
  - Interactive controls: "Jalankan Kode" (runs directly in browser, measuring execution time in ms), "Salin Kode" (copies to clipboard for Node.js / DevTools), and live console log terminal output viewer.
- **Full Standalone Script Runners at Simulation Bottom:**
  - Placed complete, zero-dependency, self-contained scripts at the bottom of both simulation tabs (`SPL_Adjoin` Modul 1–6 and `DekripsiHill` Modul 7–8).
  - Can be executed directly with 1 click in the UI or copied to run in terminal / Node.js.
- **Crystal Clear Step-by-Step Educational Tracing:**
  - **SPL Adjoin:** Detailed arithmetic breakdown for Laplace expansion terms, full cofactor cell evaluations, explicit row-by-column calculations for $\text{adj}(A) \cdot b$, exact fraction & decimal $A^{-1}$, and explicit division for each solution variable $x[i] = (\text{adj}(A) \cdot b)[i] / d$.
  - **Hill Cipher:** Step-by-step modular inverse search loop, positive modulo reduction for every cell of $\text{adj}(K)$, explicit row multiplications for $K^{-1}$, and per-block matrix-vector multiplication with character mappings.
- **Fixed Notation Rendering & Typography Casing:**
  - Removed all exotic Unicode combining marks (e.g. `₍`, `₎`, `ⱼ`, `₌`, `ⁿ`, `ⁱ`, `ʲ`) that caused broken rendering / tofu glyphs on mobile screens.
  - Standardized on universal mathematical array notation matching report pseudocode (`A[i][j]`, `x[1]..x[n]`, `M[i][j]`, `C[i][j]`, `(-1)^(i+j)`).
  - Harmonized Indonesian capitalization rules across all headings, badges, tabs, and technical descriptions.

---

## [1.2.0] - 2026-10-18

### Changed & Improved
- **Clean Mathematical Notation & Typography:**
  - Eliminated all raw unrendered LaTeX syntax (e.g. `$\mathbb{Z}_{26}$` and `$T(n) = O(n \times n!)$`) from UI components.
  - Replaced with standard, beautiful Unicode typography: `ℤ₂₆`, `x = A⁻¹ · b`, `det(A)`, `K⁻¹ ≡ det(K)⁻¹ · adj(K) (mod 26)`, `adj(A) = Cᵀ`, `Cᵢⱼ = (-1)ⁱ⁺ʲ · Det(Mᵢⱼ)`, `T(n) = O(n × n!)`, `S(n) = O(n³)`.
  - Added clean Unicode subscripts for variables across all tabs: `x₍1₎, x₍2₎, x₍3₎, x₍4₎`, `M₍ij₎`, and `Cᵢⱼ`.
- **Comprehensive Mobile Responsiveness & Gap Refinements:**
  - **`MatrixInput` & `VectorInput`:** Added responsive `overflow-x-auto` wrappers with comfortable cell touch targets (`minmax(48px, 1fr)`), clean subscript positioning `[{r+1},{c+1}]`, and tight, clear gap spacing for phone viewports (320px–375px).
  - **`MatrixDisplay`:** Wrapped tables in `max-w-full overflow-x-auto` with responsive cell padding (`px-1.5 sm:px-2.5 py-0.5 sm:py-1`), preventing horizontal clipping on narrow mobile screens.
  - **`StepCard`:** Refactored header layout to `items-start justify-between gap-2.5` with responsive flex-wrapping for titles, formula badges, and status chips; fixed invalid `py-0.2` classes to `py-0.5`.
  - **`Navbar`:** Top identity banner now wraps gracefully on mobile (`flex-col sm:flex-row`), and tabs container supports smooth horizontal swiping (`-mx-3 px-3 overflow-x-auto`).
  - **Tables & Grids:** Added horizontal scroll wrappers with `min-w-[500px]` (SPL verification table) and `min-w-[620px]` (complexity table), ensuring columns never collapse or squish on mobile devices.
  - Added `-webkit-overflow-scrolling: touch` momentum scrolling for all mobile overflow containers in `globals.css`.

---

## [1.1.0] - 2026-10-18

### Changed & Refactored
- **Strict Pseudocode 8-Module Alignment (`src/lib/algorithms/`):**
  - Standardized exact function names matching the author's formal academic report:
    - `Minor(A, n, p, q)` — Module 1
    - `Det(A, n)` — Module 2, with strict skip-zero optimization (`JIKA A[1][j] != 0`) on Row 1 before invoking `Minor`.
    - `Kofaktor(A, n)` — Module 3
    - `Adjoin(C, n)` — Module 4
    - `Solusi(adj, d, b, n)` — Module 5, computing both Tahap 1 ($A^{-1} = \frac{1}{d}\text{adj}$) and Tahap 2 ($x = A^{-1}b$).
    - `SPL_Adjoin(A, b, n)` — Module 6, with exact error string: `"Matriks singular (det = 0): metode adjoin tidak dapat dipakai"`.
    - `InversModular(a, m)` — Module 7
    - `DekripsiHill(K, teks_sandi)` — Module 8, with exact error string: `"Kunci tidak valid (tidak koprima dengan 26)"`.
  - Maintained backward-compatible aliases for existing callers.
- **Positive Modulo Arithmetic Guard:**
  - Guaranteed all modular computations use `((val % m) + m) % m` to handle negative dividends correctly (e.g., `-343 MOD 26 = 21`, `-47 MOD 26 = 5`, `-99 MOD 26 = 5`).
- **Two-Stage Solusi & Intermediate Tracing:**
  - UI displays both Tahap 1 ($A^{-1} = \frac{1}{d}\text{adj}$ in fraction & decimal) and Tahap 2 ($x = A^{-1}b$), alongside the manual paper tracing intermediate vector $\text{adj}(A) \cdot b = [-72, 72, -144, -72]^T$ and $x = \frac{1}{\det(A)}(\text{adj}(A) \cdot b) = [1, -1, 2, 1]^T$.
- **Design Style Refactoring (Flat & Neutral):**
  - Removed all background gradients, glowing box-shadows, and large rounded corners (`rounded-2xl`, `rounded-full`).
  - Switched to a flat, neutral, high-contrast academic dashboard style (`rounded`, `rounded-sm`, flat solid backgrounds `#111418`, `#15191f`, and `#181c22`).
- **Comprehensive Verification Suite (`verify.ts`):**
  - Added automated test cases for modulo positive guard, 4x4 SPL preset, singular matrix detection, 3x3 Hill Cipher decryption, and invalid key rejection.

---

## [1.0.0] - 2026-10-17

### Added
- **Core Scratch Mathematical Engine (`src/lib/algorithms/`):**
  - Implemented 100% pure TypeScript algorithms without any external mathematical packages.
  - `matrix.ts`:
    - `minor(A, n, p, q)` — Module 1: Submatrix minor extraction with 0-based conversion.
    - `det(A, n)` — Module 2: Recursive Laplace cofactor expansion with $n=1$ and $n=2$ base cases.
    - `kofaktor(A, n)` — Module 3: Full cofactor matrix generator with $(-1)^{i+j}$ sign alternating logic.
    - `adjoin(C, n)` — Module 4: Classical adjoint matrix computation via matrix transposition.
    - `solusi(adj, d, b, n)` — Module 5: Two-stage linear system solver ($A^{-1} = \frac{1}{d}\text{adj}$ and $x = A^{-1}b$).
    - `splAdjoin(A, b, n)` — Module 6: High-level orchestrator with singular matrix ($d = 0$) check.
  - `hillCipher.ts`:
    - `gcd(a, b)` — Euclidean algorithm for coprimality check.
    - `inversModular(a, m)` — Module 7: Modular multiplicative inverse in $\mathbb{Z}_m$.
    - `dekripsiHill(K, ciphertext)` — Module 8: Modulo-26 Hill cipher decryption engine with block-by-block trace.
  - `fractions.ts`:
    - Pure integer arithmetic fraction representation (`Fraction`) with automatic GCD simplification for exact matrix display without floating-point errors.
  - `stats.ts`:
    - Execution call counters and mathematical operation statistics for academic demonstration.

- **Interactive User Interface (Next.js App Router + Tailwind CSS):**
  - **Tab 1: Simulasi SPL Matriks Adjoin ($2\times2, 3\times3, 4\times4$)**:
    - Dimension selector ($n = 2, 3, 4$).
    - One-click presets:
      - "Preset Manual Tracing 4x4 (Laporan)" ($A, b$, $\det(A)=-72$, $x=[1, -1, 2, 1]^T$).
      - "Preset Matriks Singular ($\det=0$)".
    - Two-stage solution display: Tahap 1 ($A^{-1}_{ij} = \text{adj}_{ij}/d$ fraction & decimal) and Tahap 2 ($A^{-1} \cdot b$).
    - Verification card displaying residual $A \cdot x = b$.
  - **Tab 2: Studi Kasus SI — Topik A: Dekripsi Hill Cipher ($3\times3$)**:
    - Interactive $3\times3$ key matrix $K$ and ciphertext input.
    - One-click preset: "Preset Manual Tracing Hill Cipher 3x3" (`GWMOPEBYOKCVYEK` $\to$ `SISTEMINFORMASI`).
    - Step-by-step breakdown: Determinant modulo 26, coprime verification, modular inverse determinant, cofactor matrix, transpose adjoint, reduced adjoint modulo 26, modular inverse key matrix $K^{-1}$, and per-block matrix-vector multiplication.
  - **Tab 3: Mode "Live Challenge" Dosen**:
    - Rapid random non-singular $3\times3$ and $4\times4$ integer matrix generator.
    - Step-by-Step Reveal mode to hide/unhide minors, cofactors, determinant, adjoin, and final solution one by one for classroom oral examination.
  - **Tab 4: Flowchart & Pseudocode Formal (8 Modul)**:
    - Verbatim reproduction of the 8 authoritative pseudocode modules from author's paper.
    - Visual flowchart representations for SPL Adjoin and Hill Cipher decryption pipelines.
    - Live Execution Call Counter showing real-time invocation counts of `Minor`, `Det`, `Kofaktor`, `Adjoin`, and `Solusi`.
  - **Tab 5: Analisis Kompleksitas Komputasi Asimtotik (Big-O)**:
    - Formal mathematical derivations for Time Complexity $T(n) = O(n \times n!)$ and Space Complexity $S(n) = O(n^3)$.
    - Interactive operations growth table for $n = 1 \dots 10$.
    - Comparative analysis of Adjoint method vs Gaussian elimination.

- **Author Metadata & Branding:**
  - Header, sidebar, and about modal embedding author identity:
    - **Nama:** M. Rifqi Daffa Aditya
    - **NIM:** 2604140016
    - **Program Studi:** Sistem Informasi
    - **Mata Kuliah:** Matematika Dasar / Aljabar Linier (Semester Ganjil 2026/2027)

- **Documentation Suite:**
  - `AGENT.md`: System architecture guide, indexing conversions, and modular arithmetic rules.
  - `PRD.md`: Full Product Requirements Document with user personas and technical specs.
  - `CHANGELOG.md`: Semantic version history.
  - `README.md`: Complete theoretical explanation, pseudocode reference, complexity proofs, and quick start guide.
