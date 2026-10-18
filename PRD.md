# Product Requirements Document (PRD)
## Proyek Evaluasi & Perancangan Algoritma: Penyelesaian SPL Berbasis Metode Matriks Adjoin & Dekripsi Hill Cipher

**Versi Dokumen:** 1.1.0  
**Status:** Approved for Production  
**Tanggal:** 18 Oktober 2026  
**Penulis (Author):** M. Rifqi Daffa Aditya  
**NIM:** 2604140016  
**Program Studi:** Sistem Informasi  
**Mata Kuliah:** Matematika Dasar / Aljabar Linier (Semester Ganjil 2026/2027)  

---

## 1. Pendahuluan & Latar Belakang

Sistem Persamaan Linier (SPL) dan Kriptografi Kunci Simetris merupakan dua pilar penting dalam komputasi sains dan sistem informasi. Pada studi aljabar linier terapan:
1. **Metode Matriks Adjoin (Invers Matriks Klasik):**
   $$x = A^{-1} b = \frac{1}{\det(A)} \text{adj}(A) \cdot b$$
   Metode ini memberikan solusi analitik eksak untuk SPL berukuran $n \times n$ selama $\det(A) \neq 0$. Melalui ekspansi kofaktor dan matriks minor, algoritma ini merefleksikan prinsip fundamental aljabar matriks secara transparan dibandingkan metode numerik heuristik (seperti eliminasi Gauss-Jordan atau faktorisasi LU).
2. **Dekripsi Hill Cipher ($3\times3$):**
   Sebagai aplikasi langsung dalam keamanan informasi, Hill Cipher memetakan blok huruf ke dalam ruang vektor berdimensi $m$ atas gelanggang aritmetika modulo 26 ($\mathbb{Z}_{26}$). Proses dekripsi memerlukan invers matriks kunci modulo 26:
   $$K^{-1} \equiv \det(K)^{-1} \cdot \text{adj}(K) \pmod{26}$$
   Keberadaan $K^{-1}$ dijamin jika dan hanya jika $\gcd(\det(K) \bmod 26, 26) = 1$.

Aplikasi web ini dibangun sebagai media evaluasi akademik terpadu yang memadukan komputasi murni dari nol (*zero math libraries*), penelusuran langkah demi langkah (*step-by-step tracing*), visualisasi pseudocode formal, dan arena *Live Challenge* interaktif untuk evaluasi langsung oleh dosen penguji.

---

## 2. Profil Pengguna (User Personas)

### Persona 1: Dosen Penguji / Evaluator Akademik
- **Karakteristik:** Menilai ketelitian matematis, keaslian implementasi kode (*scratch vs library*), analisis asimtotik Big-O, serta penanganan kasus-kasus batas (*edge cases* seperti matriks singular atau kunci tak berkoprima).
- **Kebutuhan Utama:**
  - Kemampuan menguji matriks acak secara instan pada sesi *Live Challenge* (25 menit).
  - Validasi bahwa hasil perhitungan perangkat lunak cocok 100% dengan lembar hitungan manual (preset 4x4 SPL dan preset 3x3 Hill Cipher).
  - Pembuktian transparansi komputasi melalui penghitung frekuensi eksekusi fungsi (*execution counter*).

### Persona 2: Mahasiswa Presenter (M. Rifqi Daffa Aditya)
- **Karakteristik:** Mempresentasikan arsitektur algoritma, alur data dari pseudocode ke program, dan mendemonstrasikan penyelesaian soal di depan kelas/papan tulis.
- **Kebutuhan Utama:**
  - Fitur *One-Click Preset* untuk mendemonstrasikan contoh kasus laporan secara cepat tanpa salah ketik.
  - Mode *Step-by-Step Reveal* untuk membuka nilai minor $M_{ij}$, kofaktor $C_{ij}$, dan adjoin satu per satu seiring mahasiswa menuliskan tahapannya di papan tulis.
  - Tampilan UI yang bersih, responsif, kontras tinggi, dan berstandar dashboard modern.

---

## 3. Persyaratan Fungsional (Functional Requirements)

### FR-1: Modul Algoritma Murni 100% (*Zero Math Libraries*)
Seluruh 8 modul wajib diimplementasikan menggunakan TypeScript murni tanpa paket eksternal (seperti `mathjs` atau `numeric`):
1. `Minor(A, n, p, q)` — Eliminasi baris $p$ dan kolom $q$ untuk menghasilkan sub-matriks $(n-1) \times (n-1)$.
2. `Det(A, n)` — Rekursi ekspansi kofaktor baris pertama dengan basis $n=1$ dan $n=2$, serta optimasi lewati nol `JIKA A[1][j] != 0`.
3. `Kofaktor(A, n)` — Perhitungan matriks kofaktor $C_{ij} = (-1)^{i+j} \det(M_{ij})$.
4. `Adjoin(C, n)` — Transpos matriks kofaktor $\text{adj}[j][i] = C[i][j]$.
5. `Solusi(adj, d, b, n)` — Dua tahap: Tahap 1: $A^{-1} = \frac{1}{d} \text{adj}$; Tahap 2: $x = A^{-1} \cdot b$.
6. `SPL_Adjoin(A, b, n)` — Percabangan singular: `JIKA d == 0: CETAK "Matriks singular (det = 0): metode adjoin tidak dapat dipakai" BERHENTI`.
7. `InversModular(a, m)` — Pencarian invers modular $x \in [1, m-1]$ sedemikian hingga $(a \cdot x) \equiv 1 \pmod m$.
8. `DekripsiHill(K, teks_sandi)` — Validasi koprima: `JIKA GCD(d, 26) != 1: CETAK "Kunci tidak valid (tidak koprima dengan 26)" BERHENTI`.

### FR-2: Tab 1 — Simulasi SPL Matriks Adjoin ($n = 2, 3, 4$)
- Pemilih ukuran dimensi dinamis ($2\times2, 3\times3, 4\times4$).
- Grid input matriks $A$ dan vektor $b$ yang interaktif.
- **Preset Resmi 1: "Manual Tracing 4x4 (Laporan)"**:
  - $A = \begin{pmatrix} 2 & 1 & 0 & 3 \\ 1 & 3 & 1 & 0 \\ 0 & 2 & 4 & 1 \\ 3 & 0 & 1 & 2 \end{pmatrix}$, $b = \begin{pmatrix} 4 \\ 0 \\ 7 \\ 7 \end{pmatrix}$
  - Hasil eksak:
    - Minor Baris 1: $M_{11}=17, M_{12}=10, M_{13}=13, M_{14}=32$
    - Determinan: $\det(A) = (+1)(2)(17) + (-1)(1)(10) + (+1)(0)(13) + (-1)(3)(32) = 34 - 10 + 0 - 96 = -72$
    - Kofaktor $C$: Row 1 `[17, -10, 13, -32]`, Row 2 `[-13, -22, 7, 16]`, Row 3 `[11, 2, -17, -8]`, Row 4 `[-31, 14, -11, 16]`
    - Adjoin $\text{adj}(A) = C^T$: Row 1 `[17, -13, 11, -31]`, Row 2 `[-10, -22, 2, 14]`, Row 3 `[13, 7, -17, -11]`, Row 4 `[-32, 16, -8, 16]`
    - Vektor perantara: $\text{adj}(A) \cdot b = [-72, 72, -144, -72]^T$
    - Vektor solusi: $x = [1, -1, 2, 1]^T$
- **Preset Resmi 2: "Matriks Singular ($\det=0$)"**:
  - Menampilkan pesan exact: `"Matriks singular (det = 0): metode adjoin tidak dapat dipakai"`.

### FR-3: Tab 2 — Studi Kasus Topik A: Dekripsi Hill Cipher ($3\times3$)
- Input matriks kunci $K$ ($3\times3$) dan input string teks sandi.
- **Preset Resmi: "Manual Tracing Hill Cipher 3x3"**:
  - Kunci $K = \begin{pmatrix} 6 & 24 & 1 \\ 13 & 16 & 10 \\ 20 & 17 & 15 \end{pmatrix}$
  - Teks Sandi: `GWMOPEBYOKCVYEK`
  - Validasi: $\det(K) = 441 \implies d = 441 \bmod 26 = 25$. $\gcd(25, 26) = 1$. Invers modular $d^{-1} = 25$.
  - Matriks Kofaktor $C$: Row 1 `[70, 5, -99]`, Row 2 `[-343, 70, 378]`, Row 3 `[224, -47, -216]`
  - Adjoin $\text{adj}(K)$: Row 1 `[70, -343, 224]`, Row 2 `[5, 70, -47]`, Row 3 `[-99, 378, -216]`
  - Reduced $\text{adj}(K) \pmod{26}$: Row 1 `[18, 21, 16]`, Row 2 `[5, 18, 5]`, Row 3 `[5, 14, 18]`
  - Invers Kunci $K^{-1} \equiv 25 \cdot \text{adj}(K) \pmod{26}$:
    $$K^{-1} \equiv \begin{pmatrix} 8 & 5 & 10 \\ 21 & 8 & 21 \\ 21 & 12 & 8 \end{pmatrix} \pmod{26}$$
  - Dekripsi 5 blok:
    1. `GWM` $\to [6, 22, 12]^T \to [278, 554, 486] \pmod{26} = [18, 8, 18]^T \to$ `SIS`
    2. `OPE` $\to [14, 15, 4]^T \to [227, 498, 506] \pmod{26} = [19, 4, 12]^T \to$ `TEM`
    3. `BYO` $\to [1, 24, 14]^T \to [268, 507, 421] \pmod{26} = [8, 13, 5]^T \to$ `INF`
    4. `KCV` $\to [10, 2, 21]^T \to [300, 667, 402] \pmod{26} = [14, 17, 12]^T \to$ `ORM`
    5. `YEK` $\to [24, 4, 10]^T \to [312, 746, 632] \pmod{26} = [0, 18, 8]^T \to$ `ASI`
  - Hasil akhir teks terang: **`SISTEMINFORMASI`**.

### FR-4: Tab 3 — Mode "Live Challenge" Dosen
- Generator matriks $3\times3$ dan $4\times4$ acak non-singular bilangan bulat kecil.
- Mode Step-by-Step Reveal untuk membuka tahapan solusi satu per satu seiring mahasiswa menulis di papan tulis.
- Stopwatch 25 menit sesi evaluasi lisan.

### FR-5: Tab 4 — Flowchart & Pseudocode Formal (8 Modul)
- Menampilkan 8 modul pseudocode formal verbatim dari laporan asli.
- Diagram alir visual SVG untuk alur SPL Adjoin dan Dekripsi Hill Cipher.
- *Live Execution Call Counter* menghitung pemanggilan fungsi `Minor`, `Det`, `Kofaktor`, `Adjoin`, dan `Solusi`.

### FR-6: Tab 5 — Analisis Kompleksitas Komputasi Asimtotik (Big-O)
- Penurunan formal waktu $T(n) = O(n \times n!)$ dan ruang $S(n) = O(n^3)$.
- Tabel perbandingan komputasi untuk $n = 1 \dots 10$.

---

## 4. Persyaratan Non-Fungsional (Non-Functional Requirements)

1. **Akurasi & Integritas Aritmetika:**
   - Algoritma pecahan eksak (*rational numbers*) dengan FPB/GCD otomatis.
   - Modulo positif `((a % m) + m) % m` pada seluruh perhitungan modular.
2. **Kinerja & Responsivitas:**
   - Waktu komputasi untuk matriks hingga $4\times4$ di bawah 5 milidetik.
3. **Desain & Estetika Flat Netral:**
   - Desain flat, solid, netral tanpa gradasi latar belakang dan tanpa lengkungan sudut berlebih (*clean technical UI*).
