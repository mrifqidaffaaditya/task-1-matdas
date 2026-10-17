/**
 * Mathematical Asymptotic Complexity Formulas and Data
 * Author: M. Rifqi Daffa Aditya (NIM: 2604140016)
 * Program Studi: Sistem Informasi
 */

export interface ComplexityRow {
  n: number;
  factorial: number;
  timeAdjoin: number; // n * n!
  spaceAdjoin: number; // n^3
  timeGauss: number; // ~ 2/3 * n^3
  matrixStorage: number; // n^2
}

/**
 * Calculates factorial n!
 */
export function factorial(n: number): number {
  if (n <= 1) return 1;
  let res = 1;
  for (let i = 2; i <= n; i++) {
    res *= i;
  }
  return res;
}

/**
 * Generates complexity growth table data for n = 1 .. 10
 */
export function getComplexityTable(): ComplexityRow[] {
  const rows: ComplexityRow[] = [];
  for (let n = 1; n <= 10; n++) {
    const fact = factorial(n);
    rows.push({
      n,
      factorial: fact,
      timeAdjoin: n * fact,
      spaceAdjoin: Math.pow(n, 3),
      timeGauss: Math.round((2 / 3) * Math.pow(n, 3)),
      matrixStorage: Math.pow(n, 2),
    });
  }
  return rows;
}

export const TIME_COMPLEXITY_DERIVATION = [
  {
    step: "1. Analisis Fungsi Minor",
    detail: "Fungsi Minor(A, n, p, q) melakukan dua perulangan bersarang berukuran n x n untuk menyaring dan menyalin (n - 1) x (n - 1) elemen ke matriks baru. Kompleksitasnya adalah O(n²).",
    bigO: "O(n²)",
  },
  {
    step: "2. Analisis Modul Determinan (Det)",
    detail: "Determinan dihitung melalui ekspansi kofaktor rekursif baris ke-1. Pada ukuran n, fungsi memanggil dirinya sendiri sebanyak n kali pada matriks berukuran (n - 1). Relasi rekurensi: T_det(n) = n * T_det(n - 1) + O(n²). Solusi relasi rekurensi ini menghasilkan O(n!).",
    bigO: "O(n!)",
  },
  {
    step: "3. Analisis Modul Kofaktor (Kofaktor)",
    detail: "Modul Kofaktor memiliki dua perulangan bersarang berukuran n x n = n² sel. Pada setiap sel (i, j), fungsi memanggil Minor (O(n²)) dan Det(M, n - 1) yang membutuhkan O((n - 1)!) operasi. Sehingga waktu komputasi: n² × (n - 1)! = n × (n × (n - 1)!) = n × n!.",
    bigO: "O(n × n!)",
  },
  {
    step: "4. Analisis Modul Transpos (Adjoin) & Solusi (Solusi)",
    detail: "Modul Adjoin mentranspos matriks n x n melalui dua perulangan O(n²). Modul Solusi melakukan perkalian skalar 1/d dengan adj (O(n²)) dan perkalian matriks-vektor A_inv * b (O(n²)).",
    bigO: "O(n²)",
  },
  {
    step: "5. Penurunan Total Waktu T(n)",
    detail: "T(n) = T_det(n) + T_kofaktor(n) + T_adjoin(n) + T_solusi(n) = O(n!) + O(n × n!) + O(n²) + O(n²). Mengambil suku dominan asimtotik tertinggi: T(n) = O(n × n!).",
    bigO: "O(n × n!)",
  },
];

export const SPACE_COMPLEXITY_DERIVATION = [
  {
    step: "1. Matriks Utama Program",
    detail: "Program menyimpan matriks A, C, adj, dan A_inv yang masing-masing berukuran n x n, serta vektor b dan x berukuran n. Memori statis ini membutuhkan O(n²) ruang penyimpanan.",
    bigO: "O(n²)",
  },
  {
    step: "2. Tumpukan Memori Rekursi (Call Stack & Matriks Minor)",
    detail: "Panggilan rekursif Determinan memiliki kedalaman stack maksimal sebesar n (dari n hingga n = 2). Pada setiap frame rekursi, dialokasikan matriks minor M baru berukuran hingga (n - 1) x (n - 1) ≈ O(n²). Sehingga total memori tumpukan: n frame × O(n²) per frame = O(n³).",
    bigO: "O(n³)",
  },
  {
    step: "3. Penurunan Total Ruang S(n)",
    detail: "S(n) = S_matriks(n) + S_rekursi(n) = O(n²) + O(n³) = O(n³).",
    bigO: "O(n³)",
  },
];
