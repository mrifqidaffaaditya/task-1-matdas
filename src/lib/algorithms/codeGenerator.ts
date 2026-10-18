/**
 * Generator script JavaScript murni yang dapat dieksekusi langsung
 * di browser (via CodeRunner) maupun disalin untuk dijalankan di Node.js / DevTools.
 * Sesuai persis dengan pseudocode 8 modul laporan akademik.
 */

export function generateSPLStep1Code(A: number[][], n: number): string {
  return `// ==========================================
// LANGKAH 1: Menentukan Determinan Matriks A
// Modul 1: Minor(A, n, p, q) & Modul 2: Det(A, n)
// ==========================================

function Minor(A, n, p, q) {
  const M = [];
  for (let i = 0; i < n; i++) {
    if (i === p - 1) continue;
    const row = [];
    for (let j = 0; j < n; j++) {
      if (j === q - 1) continue;
      row.push(A[i][j]);
    }
    M.push(row);
  }
  return M;
}

function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    const el = A[0][j - 1];
    if (el !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      const detMinor = Det(M, n - 1);
      const suku = tanda * el * detMinor;
      console.log(\`  Kolom j=\${j} (A[1][\${j}]=\${el}): Tanda=(\${tanda > 0 ? '+1' : '-1'}), Det(Minor)=\${detMinor} => Suku = \${suku}\`);
      hasil += suku;
    }
  }
  return hasil;
}

// Data Masukan Matriks A
const n = ${n};
const A = ${JSON.stringify(A)};

console.log("=== EKSEKUSI LANGKAH 1: DETERMINAN ===");
console.log("Ukuran n:", n);
console.log("Matriks A:", A);

const d = Det(A, n);
console.log("------------------------------------------");
console.log("Hasil Akhir: d = Det(A, " + n + ") =", d);
if (d === 0) {
  console.log("Status: Matriks singular (det = 0). Metode adjoin tidak dapat dipakai.");
} else {
  console.log("Status: Matriks non-singular (det != 0). Solusi unik ada.");
}
return d;`;
}

export function generateSPLStep2Code(A: number[][], n: number): string {
  return `// ==========================================
// LANGKAH 2: Menentukan Matriks Kofaktor C
// Modul 3: Kofaktor(A, n)
// C[i][j] = (-1)^(i + j) * Det(Minor(A, n, i, j))
// ==========================================

function Minor(A, n, p, q) {
  const M = [];
  for (let i = 0; i < n; i++) {
    if (i === p - 1) continue;
    const row = [];
    for (let j = 0; j < n; j++) {
      if (j === q - 1) continue;
      row.push(A[i][j]);
    }
    M.push(row);
  }
  return M;
}

function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    const el = A[0][j - 1];
    if (el !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * el * Det(M, n - 1);
    }
  }
  return hasil;
}

function Kofaktor(A, n) {
  const C = Array.from({ length: n }, () => new Array(n).fill(0));
  console.log("Rincian Perhitungan Setiap Elemen Kofaktor C[i][j]:");
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const tanda = ((i + j) % 2 === 0) ? 1 : -1;
      const detMinor = Det(M, n - 1);
      const val = tanda * detMinor;
      C[i - 1][j - 1] = val;
      console.log(\`  C[\${i}][\${j}]: Tanda=(\${tanda > 0 ? '+1' : '-1'}), Det(M_\${i}\${j})=\${detMinor} => C[\${i}][\${j}] = \${val}\`);
    }
  }
  return C;
}

const n = ${n};
const A = ${JSON.stringify(A)};

console.log("=== EKSEKUSI LANGKAH 2: MATRIKS KOFAKTOR ===");
const C = Kofaktor(A, n);
console.log("------------------------------------------");
console.log("Hasil Matriks Kofaktor C (" + n + "x" + n + "):");
C.forEach((row, i) => console.log(\`  Baris \${i + 1}: [\${row.join(", ")}]\`));
return C;`;
}

export function generateSPLStep3Code(A: number[][], b: number[], n: number): string {
  return `// ==========================================
// LANGKAH 3: Menentukan Matriks Adjoin adj(A)
// Modul 4: Adjoin(C, n)
// adj[j][i] = C[i][j] (Transpos Matriks Kofaktor)
// Perkalian Perantara: adj(A) · b
// ==========================================

function Minor(A, n, p, q) {
  const M = [];
  for (let i = 0; i < n; i++) {
    if (i === p - 1) continue;
    const row = [];
    for (let j = 0; j < n; j++) {
      if (j === q - 1) continue;
      row.push(A[i][j]);
    }
    M.push(row);
  }
  return M;
}

function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    const el = A[0][j - 1];
    if (el !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * el * Det(M, n - 1);
    }
  }
  return hasil;
}

function Kofaktor(A, n) {
  const C = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const tanda = ((i + j) % 2 === 0) ? 1 : -1;
      C[i - 1][j - 1] = tanda * Det(M, n - 1);
    }
  }
  return C;
}

function Adjoin(C, n) {
  const adj = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      adj[j - 1][i - 1] = C[i - 1][j - 1];
    }
  }
  return adj;
}

const n = ${n};
const A = ${JSON.stringify(A)};
const b = ${JSON.stringify(b)};

console.log("=== EKSEKUSI LANGKAH 3: MATRIKS ADJOIN ===");
const C = Kofaktor(A, n);
const adj = Adjoin(C, n);

console.log("Matriks Adjoin adj(A) = C^T:");
adj.forEach((row, i) => console.log(\`  Baris \${i + 1}: [\${row.join(", ")}]\`));

console.log("------------------------------------------");
console.log("Perkalian Perantara Kertas Kerja: adj(A) · b");
const adjTimesB = [];
for (let i = 0; i < n; i++) {
  let total = 0;
  const terms = [];
  for (let k = 0; k < n; k++) {
    total += adj[i][k] * b[k];
    terms.push(\`(\${adj[i][k]} * \${b[k]})\`);
  }
  adjTimesB.push(total);
  console.log(\`  Baris \${i + 1}: \${terms.join(" + ")} = \${total}\`);
}
console.log("Vektor adj(A) · b = [" + adjTimesB.join(", ") + "]^T");
return { adj, adjTimesB };`;
}

export function generateSPLStep4Code(A: number[][], n: number): string {
  return `// ==========================================
// LANGKAH 4: Tahap 1 Solusi - Matriks Invers A^-1
// Modul 5 (Bagian Invers): A_inv = (1 / d) * adj
// ==========================================

function Minor(A, n, p, q) {
  const M = [];
  for (let i = 0; i < n; i++) {
    if (i === p - 1) continue;
    const row = [];
    for (let j = 0; j < n; j++) {
      if (j === q - 1) continue;
      row.push(A[i][j]);
    }
    M.push(row);
  }
  return M;
}

function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    const el = A[0][j - 1];
    if (el !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * el * Det(M, n - 1);
    }
  }
  return hasil;
}

function Kofaktor(A, n) {
  const C = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const tanda = ((i + j) % 2 === 0) ? 1 : -1;
      C[i - 1][j - 1] = tanda * Det(M, n - 1);
    }
  }
  return C;
}

function Adjoin(C, n) {
  const adj = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      adj[j - 1][i - 1] = C[i - 1][j - 1];
    }
  }
  return adj;
}

const n = ${n};
const A = ${JSON.stringify(A)};

console.log("=== EKSEKUSI LANGKAH 4: MATRIKS INVERS A^-1 ===");
const d = Det(A, n);
if (d === 0) {
  console.log("Galat: d = 0, matriks singular tidak memiliki invers!");
  return null;
}

const C = Kofaktor(A, n);
const adj = Adjoin(C, n);

const A_inv = Array.from({ length: n }, () => new Array(n).fill(0));
console.log(\`Determinan d = \${d}\`);
console.log("Menghitung A_inv[i][j] = adj[i][j] / d:");

for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    A_inv[i][j] = adj[i][j] / d;
  }
}

console.log("------------------------------------------");
console.log("Matriks Invers A^-1 (Desimal):");
A_inv.forEach((row, i) => {
  const formattedRow = row.map(v => v.toFixed(4));
  console.log(\`  Baris \${i + 1}: [\${formattedRow.join(", ")}]\`);
});
return A_inv;`;
}

export function generateSPLStep5Code(A: number[][], b: number[], n: number): string {
  return `// ==========================================
// LANGKAH 5: Tahap 2 Solusi - Vektor Solusi x
// Modul 5: Solusi(adj, d, b, n)
// x = A_inv · b = (1 / d) * (adj · b)
// ==========================================

function Minor(A, n, p, q) {
  const M = [];
  for (let i = 0; i < n; i++) {
    if (i === p - 1) continue;
    const row = [];
    for (let j = 0; j < n; j++) {
      if (j === q - 1) continue;
      row.push(A[i][j]);
    }
    M.push(row);
  }
  return M;
}

function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    const el = A[0][j - 1];
    if (el !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * el * Det(M, n - 1);
    }
  }
  return hasil;
}

function Kofaktor(A, n) {
  const C = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const tanda = ((i + j) % 2 === 0) ? 1 : -1;
      C[i - 1][j - 1] = tanda * Det(M, n - 1);
    }
  }
  return C;
}

function Adjoin(C, n) {
  const adj = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      adj[j - 1][i - 1] = C[i - 1][j - 1];
    }
  }
  return adj;
}

function Solusi(adj, d, b, n) {
  const A_inv = Array.from({ length: n }, () => new Array(n).fill(0));
  const x = new Array(n).fill(0);

  // Tahap 1: Hitung matriks invers
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      A_inv[i][j] = adj[i][j] / d;
    }
  }

  // Tahap 2: Kalikan matriks A_inv dengan vektor b
  console.log("Perhitungan Tiap Komponen Solusi x[i]:");
  for (let i = 0; i < n; i++) {
    let total = 0;
    for (let k = 0; k < n; k++) {
      total += A_inv[i][k] * b[k];
    }
    // Pembulatan angka presisi floating point jika sangat dekat integer
    x[i] = Math.abs(total - Math.round(total)) < 1e-9 ? Math.round(total) : total;
    console.log(\`  x[\${i + 1}] = total baris \${i + 1} = \${x[i]}\`);
  }
  return x;
}

const n = ${n};
const A = ${JSON.stringify(A)};
const b = ${JSON.stringify(b)};

console.log("=== EKSEKUSI LANGKAH 5: VEKTOR SOLUSI x ===");
const d = Det(A, n);
const C = Kofaktor(A, n);
const adj = Adjoin(C, n);
const x = Solusi(adj, d, b, n);

console.log("------------------------------------------");
console.log("Solusi Akhir Sistem Persamaan Linier:");
x.forEach((val, i) => console.log(\`  x[\${i + 1}] = \${val}\`));
console.log("Vektor x = [" + x.join(", ") + "]^T");
return x;`;
}

export function generateSPLStep6Code(A: number[][], b: number[], x: number[], n: number): string {
  return `// ==========================================
// LANGKAH 6: Verifikasi Otomatis A · x = b
// Residual r[i] = A[i] · x - b[i] == 0
// ==========================================

const n = ${n};
const A = ${JSON.stringify(A)};
const b = ${JSON.stringify(b)};
const x = ${JSON.stringify(x)};

console.log("=== EKSEKUSI LANGKAH 6: VERIFIKASI A · x = b ===");
let allMatch = true;

for (let i = 0; i < n; i++) {
  let rowSum = 0;
  const terms = [];
  for (let j = 0; j < n; j++) {
    rowSum += A[i][j] * x[j];
    terms.push(\`(\${A[i][j]} * \${x[j]})\`);
  }
  const residual = Math.abs(rowSum - b[i]);
  const isOk = residual < 1e-6;
  if (!isOk) allMatch = false;

  console.log(\`Baris \${i + 1}: \${terms.join(" + ")} = \${rowSum} | Target b[\${i + 1}] = \${b[i]} => \${isOk ? 'COCOK ✓' : 'BEDA ✕'}\`);
}

console.log("------------------------------------------");
if (allMatch) {
  console.log("HASIL: 100% TERVERIFIKASI VALID! Seluruh persamaan terpenuhi secara eksak.");
} else {
  console.log("HASIL: Galat terdeteksi pada substitusi solusi.");
}
return allMatch;`;
}

export function generateSPLFullScript(A: number[][], b: number[], n: number): string {
  return `/**
 * ============================================================================
 * PROGRAM LENGKAP: PENYELESAIAN SPL METODE MATRIKS ADJOIN (MODUL 1 - 6)
 * ============================================================================
 * Penulis      : M. Rifqi Daffa Aditya
 * NIM          : 2604140016
 * Program Studi: Sistem Informasi
 * Mata Kuliah  : Matematika Dasar / Aljabar Linier
 * Sifat        : 100% Algoritma Murni Tanpa Library Eksternal
 * Standar      : Pseudocode Laporan Akademik
 * ============================================================================
 */

// Modul 1: Menentukan matriks minor
function Minor(A, n, p, q) {
  const M = [];
  let r = 0;
  for (let i = 1; i <= n; i++) {
    if (i !== p) {
      r++;
      let c = 0;
      const row = [];
      for (let j = 1; j <= n; j++) {
        if (j !== q) {
          c++;
          row.push(A[i - 1][j - 1]);
        }
      }
      M.push(row);
    }
  }
  return M;
}

// Modul 2: Menentukan determinan via Ekspansi Laplace
function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    if (A[0][j - 1] !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * A[0][j - 1] * Det(M, n - 1);
    }
  }
  return hasil;
}

// Modul 3: Menentukan kofaktor
function Kofaktor(A, n) {
  const C = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const tanda = ((i + j) % 2 === 0) ? 1 : -1;
      C[i - 1][j - 1] = tanda * Det(M, n - 1);
    }
  }
  return C;
}

// Modul 4: Menentukan adjoin
function Adjoin(C, n) {
  const adj = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      adj[j - 1][i - 1] = C[i - 1][j - 1];
    }
  }
  return adj;
}

// Modul 5: Menentukan solusi
function Solusi(adj, d, b, n) {
  const A_inv = Array.from({ length: n }, () => new Array(n).fill(0));
  const x = new Array(n).fill(0);

  // Tahap 1: Hitung matriks invers
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      A_inv[i][j] = adj[i][j] / d;
    }
  }

  // Tahap 2: Kalikan matriks A_inv dengan vektor b
  for (let i = 0; i < n; i++) {
    let total = 0;
    for (let k = 0; k < n; k++) {
      total += A_inv[i][k] * b[k];
    }
    x[i] = Math.abs(total - Math.round(total)) < 1e-9 ? Math.round(total) : total;
  }
  return x;
}

// Modul 6: Program utama SPL_Adjoin
function SPL_Adjoin(A, b, n) {
  console.log("=================================================");
  console.log("PROGRAM UTAMA: METODE MATRIKS ADJOIN (SPL_Adjoin)");
  console.log("Ukuran n =", n);
  console.log("Matriks A:", A);
  console.log("Vektor b :", b);
  console.log("=================================================");

  // Langkah 1: Determinan
  const d = Det(A, n);
  console.log("Langkah 1: Determinan d = Det(A, n) =", d);

  // Percabangan Singular
  if (d === 0) {
    console.log('CETAK: "Matriks singular (det = 0): metode adjoin tidak dapat dipakai"');
    console.log("BERHENTI.");
    return null;
  }

  // Langkah 2: Kofaktor
  console.log("Langkah 2: Menghitung matriks kofaktor C...");
  const C = Kofaktor(A, n);

  // Langkah 3: Adjoin
  console.log("Langkah 3: Menghitung matriks adjoin adj(A) = C^T...");
  const adj = Adjoin(C, n);

  // Langkah 4 & 5: Solusi
  console.log("Langkah 4 & 5: Menghitung invers dan vektor solusi x...");
  const x = Solusi(adj, d, b, n);

  console.log("=================================================");
  console.log("HASIL SOLUSI AKHIR:");
  x.forEach((val, i) => console.log(\`  x[\${i + 1}] = \${val}\`));
  console.log("Vektor x = [" + x.join(", ") + "]^T");
  console.log("=================================================");

  // Verifikasi Hasil
  let isValid = true;
  for (let i = 0; i < n; i++) {
    const rowVal = A[i].reduce((sum, c, j) => sum + c * x[j], 0);
    if (Math.abs(rowVal - b[i]) > 1e-6) isValid = false;
  }
  console.log("Verifikasi A · x = b :", isValid ? "VALID (Cocok 100%)" : "GALAT");

  return x;
}

// Inisialisasi Parameter Berjalan
const n = ${n};
const A = ${JSON.stringify(A)};
const b = ${JSON.stringify(b)};

// Eksekusi Program
const solusi = SPL_Adjoin(A, b, n);
return solusi;`;
}

export function generateHillStep1Code(K: number[][]): string {
  return `// ==========================================
// LANGKAH 1: Determinan Modulo 26 & Invers Modular
// Modul 7: InversModular(a, m)
// ==========================================

function Minor(A, n, p, q) {
  const M = [];
  for (let i = 0; i < n; i++) {
    if (i === p - 1) continue;
    const row = [];
    for (let j = 0; j < n; j++) {
      if (j === q - 1) continue;
      row.push(A[i][j]);
    }
    M.push(row);
  }
  return M;
}

function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    const el = A[0][j - 1];
    if (el !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * el * Det(M, n - 1);
    }
  }
  return hasil;
}

function GCD(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Modul 7: Studi Kasus Topik A (Bagian 1)
function InversModular(a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x <= m - 1; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return null; // TIDAK_ADA
}

const K = ${JSON.stringify(K)};

console.log("=== EKSEKUSI LANGKAH 1: DETERMINAN & INVERS MODULAR ===");
const detK = Det(K, 3);
const d = ((detK % 26) + 26) % 26;
const gcdVal = GCD(d, 26);

console.log("Matriks Kunci K (3x3):", K);
console.log("det(K) bulat =", detK);
console.log("d = det(K) mod 26 =", d);
console.log("GCD(d, 26) = GCD(" + d + ", 26) =", gcdVal);

if (gcdVal !== 1) {
  console.log('CETAK: "Kunci tidak valid (tidak koprima dengan 26)"');
  console.log("BERHENTI.");
  return null;
}

const d_inv = InversModular(d, 26);
console.log("------------------------------------------");
console.log("Invers Modular Determinan: d_inv = InversModular(" + d + ", 26) =", d_inv);
console.log("Uji Invers: (" + d + " * " + d_inv + ") mod 26 =", (d * d_inv) % 26, "(= 1)");
return { detK, d, d_inv };`;
}

export function generateHillStep2Code(K: number[][]): string {
  return `// ==========================================
// LANGKAH 2: Menentukan Matriks Kofaktor C
// Modul 3: Kofaktor(K, 3)
// ==========================================

function Minor(A, n, p, q) {
  const M = [];
  for (let i = 0; i < n; i++) {
    if (i === p - 1) continue;
    const row = [];
    for (let j = 0; j < n; j++) {
      if (j === q - 1) continue;
      row.push(A[i][j]);
    }
    M.push(row);
  }
  return M;
}

function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    const el = A[0][j - 1];
    if (el !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * el * Det(M, n - 1);
    }
  }
  return hasil;
}

function Kofaktor(A, n) {
  const C = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const tanda = ((i + j) % 2 === 0) ? 1 : -1;
      const detM = Det(M, n - 1);
      C[i - 1][j - 1] = tanda * detM;
      console.log(\`  C[\${i}][\${j}]: Tanda=(\${tanda > 0 ? '+1' : '-1'}), Det(M_\${i}\${j})=\${detM} => C[\${i}][\${j}] = \${C[i - 1][j - 1]}\`);
    }
  }
  return C;
}

const K = ${JSON.stringify(K)};

console.log("=== EKSEKUSI LANGKAH 2: KOFAKTOR KUNCI K ===");
const C = Kofaktor(K, 3);
console.log("------------------------------------------");
console.log("Matriks Kofaktor C:");
C.forEach((row, i) => console.log(\`  Baris \${i + 1}: [\${row.join(", ")}]\`));
return C;`;
}

export function generateHillStep3Code(K: number[][]): string {
  return `// ==========================================
// LANGKAH 3: Matriks Adjoin & Reduksi Modulo 26
// Modul 4: Adjoin(C, 3)
// adj[j][i] = C[i][j] (Transpos)
// adj26 = adj mod 26 (Bilangan Bulat Positif [0..25])
// ==========================================

function Minor(A, n, p, q) {
  const M = [];
  for (let i = 0; i < n; i++) {
    if (i === p - 1) continue;
    const row = [];
    for (let j = 0; j < n; j++) {
      if (j === q - 1) continue;
      row.push(A[i][j]);
    }
    M.push(row);
  }
  return M;
}

function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    const el = A[0][j - 1];
    if (el !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * el * Det(M, n - 1);
    }
  }
  return hasil;
}

function Kofaktor(A, n) {
  const C = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const tanda = ((i + j) % 2 === 0) ? 1 : -1;
      C[i - 1][j - 1] = tanda * Det(M, n - 1);
    }
  }
  return C;
}

function Adjoin(C, n) {
  const adj = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      adj[j - 1][i - 1] = C[i - 1][j - 1];
    }
  }
  return adj;
}

const K = ${JSON.stringify(K)};

console.log("=== EKSEKUSI LANGKAH 3: ADJOIN & REDUKSI MODULO 26 ===");
const C = Kofaktor(K, 3);
const adj = Adjoin(C, 3);

console.log("Matriks Adjoin Mentah adj(K) = C^T:");
adj.forEach((row, i) => console.log(\`  Baris \${i + 1}: [\${row.join(", ")}]\`));

console.log("------------------------------------------");
console.log("Matriks Adjoin Ter-reduksi Modulo 26 [0..25]:");
const adjMod26 = adj.map(row => row.map(v => ((v % 26) + 26) % 26));
adjMod26.forEach((row, i) => console.log(\`  Baris \${i + 1}: [\${row.join(", ")}]\`));

return { adj, adjMod26 };`;
}

export function generateHillStep4Code(K: number[][]): string {
  return `// ==========================================
// LANGKAH 4: Matriks Kunci Invers K^-1 (mod 26)
// K_inv[i][j] = (d_inv * adj[i][j]) mod 26
// ==========================================

function Minor(A, n, p, q) {
  const M = [];
  for (let i = 0; i < n; i++) {
    if (i === p - 1) continue;
    const row = [];
    for (let j = 0; j < n; j++) {
      if (j === q - 1) continue;
      row.push(A[i][j]);
    }
    M.push(row);
  }
  return M;
}

function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    const el = A[0][j - 1];
    if (el !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * el * Det(M, n - 1);
    }
  }
  return hasil;
}

function InversModular(a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x <= m - 1; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

function Kofaktor(A, n) {
  const C = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const tanda = ((i + j) % 2 === 0) ? 1 : -1;
      C[i - 1][j - 1] = tanda * Det(M, n - 1);
    }
  }
  return C;
}

function Adjoin(C, n) {
  const adj = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      adj[j - 1][i - 1] = C[i - 1][j - 1];
    }
  }
  return adj;
}

const K = ${JSON.stringify(K)};

console.log("=== EKSEKUSI LANGKAH 4: MATRIKS KUNCI INVERS K^-1 ===");
const detK = Det(K, 3);
const d = ((detK % 26) + 26) % 26;
const d_inv = InversModular(d, 26);
const C = Kofaktor(K, 3);
const adj = Adjoin(C, 3);

const K_inv = Array.from({ length: 3 }, () => new Array(3).fill(0));
console.log(\`d_inv = \${d_inv}\`);
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    K_inv[i][j] = ((d_inv * adj[i][j]) % 26 + 26) % 26;
    console.log(\`  K^-1[\${i + 1}][\${j + 1}] = (\${d_inv} * \${adj[i][j]}) mod 26 = \${K_inv[i][j]}\`);
  }
}

console.log("------------------------------------------");
console.log("Matriks Kunci Invers K^-1 (mod 26):");
K_inv.forEach((row, i) => console.log(\`  Baris \${i + 1}: [\${row.join(", ")}]\`));
return K_inv;`;
}

export function generateHillStep5Code(K: number[][], ciphertext: string): string {
  return `// ==========================================
// LANGKAH 5: Dekripsi Blok Demi Blok
// P_k = (K^-1 · C_k) mod 26
// Konversi Angka ke Huruf (0 -> 'A' ... 25 -> 'Z')
// ==========================================

function Minor(A, n, p, q) {
  const M = [];
  for (let i = 0; i < n; i++) {
    if (i === p - 1) continue;
    const row = [];
    for (let j = 0; j < n; j++) {
      if (j === q - 1) continue;
      row.push(A[i][j]);
    }
    M.push(row);
  }
  return M;
}

function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    const el = A[0][j - 1];
    if (el !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * el * Det(M, n - 1);
    }
  }
  return hasil;
}

function InversModular(a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x <= m - 1; x++) {
    if ((a * x) % m === 1) return x;
  }
  return null;
}

function Kofaktor(A, n) {
  const C = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const tanda = ((i + j) % 2 === 0) ? 1 : -1;
      C[i - 1][j - 1] = tanda * Det(M, n - 1);
    }
  }
  return C;
}

function Adjoin(C, n) {
  const adj = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      adj[j - 1][i - 1] = C[i - 1][j - 1];
    }
  }
  return adj;
}

const K = ${JSON.stringify(K)};
let text = ${JSON.stringify(ciphertext.toUpperCase().replace(/[^A-Z]/g, ""))};
while (text.length % 3 !== 0) text += "X";

console.log("=== EKSEKUSI LANGKAH 5: DEKRIPSI PER BLOK ===");
console.log("Teks Sandi (Ciphertext):", text);
console.log("Jumlah Blok (3 huruf/blok):", text.length / 3);

const detK = Det(K, 3);
const d = ((detK % 26) + 26) % 26;
const d_inv = InversModular(d, 26);
const C = Kofaktor(K, 3);
const adj = Adjoin(C, 3);

const K_inv = Array.from({ length: 3 }, () => new Array(3).fill(0));
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    K_inv[i][j] = ((d_inv * adj[i][j]) % 26 + 26) % 26;
  }
}

let plaintext = "";
console.log("------------------------------------------");

for (let b = 0; b < text.length; b += 3) {
  const blockLetters = text.slice(b, b + 3);
  const cVec = [
    blockLetters.charCodeAt(0) - 65,
    blockLetters.charCodeAt(1) - 65,
    blockLetters.charCodeAt(2) - 65
  ];

  const pVec = [];
  const termsDesc = [];

  for (let i = 0; i < 3; i++) {
    let sum = 0;
    const rowTerms = [];
    for (let k = 0; k < 3; k++) {
      sum += K_inv[i][k] * cVec[k];
      rowTerms.push(\`(\${K_inv[i][k]} * \${cVec[k]})\`);
    }
    const modVal = ((sum % 26) + 26) % 26;
    pVec.push(modVal);
    termsDesc.push(\`Baris \${i + 1}: \${rowTerms.join(" + ")} = \${sum} mod 26 = \${modVal} ('\${String.fromCharCode(65 + modVal)}')\`);
  }

  const plainLetters = pVec.map(v => String.fromCharCode(65 + v)).join("");
  plaintext += plainLetters;

  console.log(\`Blok #\${(b / 3) + 1} [\${blockLetters}]:\`);
  console.log(\`  Vektor sandi c: [\${cVec.join(", ")}]\`);
  termsDesc.forEach(td => console.log(\`  \${td}\`));
  console.log(\`  => Plaintext Blok: "\${plainLetters}"\`);
}

console.log("==========================================");
console.log("HASIL DEKRIPSI AKHIR (PLAINTEXT):", plaintext);
return plaintext;`;
}

export function generateHillFullScript(K: number[][], ciphertext: string): string {
  return `/**
 * ============================================================================
 * PROGRAM LENGKAP: DEKRIPSI HILL CIPHER MATRIKS 3x3 DALAM Z_26 (MODUL 7 - 8)
 * ============================================================================
 * Penulis      : M. Rifqi Daffa Aditya
 * NIM          : 2604140016
 * Program Studi: Sistem Informasi
 * Mata Kuliah  : Matematika Dasar / Aljabar Linier
 * Sifat        : 100% Algoritma Murni Tanpa Library Eksternal
 * Standar      : Pseudocode Laporan Akademik Modul 7 & 8
 * ============================================================================
 */

// Modul 1: Menentukan matriks minor
function Minor(A, n, p, q) {
  const M = [];
  let r = 0;
  for (let i = 1; i <= n; i++) {
    if (i !== p) {
      r++;
      let c = 0;
      const row = [];
      for (let j = 1; j <= n; j++) {
        if (j !== q) {
          c++;
          row.push(A[i - 1][j - 1]);
        }
      }
      M.push(row);
    }
  }
  return M;
}

// Modul 2: Menentukan determinan via Laplace
function Det(A, n) {
  if (n === 1) return A[0][0];
  if (n === 2) return (A[0][0] * A[1][1]) - (A[0][1] * A[1][0]);
  let hasil = 0;
  for (let j = 1; j <= n; j++) {
    if (A[0][j - 1] !== 0) {
      const M = Minor(A, n, 1, j);
      const tanda = ((1 + j) % 2 === 0) ? 1 : -1;
      hasil += tanda * A[0][j - 1] * Det(M, n - 1);
    }
  }
  return hasil;
}

// Modul 3: Menentukan kofaktor
function Kofaktor(A, n) {
  const C = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      const M = Minor(A, n, i, j);
      const tanda = ((i + j) % 2 === 0) ? 1 : -1;
      C[i - 1][j - 1] = tanda * Det(M, n - 1);
    }
  }
  return C;
}

// Modul 4: Menentukan adjoin
function Adjoin(C, n) {
  const adj = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      adj[j - 1][i - 1] = C[i - 1][j - 1];
    }
  }
  return adj;
}

// Fungsi FPB / GCD
function GCD(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

// Modul 7: InversModular(a, m)
function InversModular(a, m) {
  a = ((a % m) + m) % m;
  for (let x = 1; x <= m - 1; x++) {
    if ((a * x) % m === 1) {
      return x;
    }
  }
  return null; // TIDAK_ADA
}

// Modul 8: DekripsiHill(K, C_teks)
function DekripsiHill(K, C_teks) {
  console.log("=================================================");
  console.log("ALGORITMA UTAMA: DEKRIPSI HILL CIPHER (DekripsiHill)");
  console.log("Matriks Kunci K (3x3):", K);
  console.log("Teks Sandi Mentah    :", C_teks);
  console.log("=================================================");

  // Langkah 1: Hitung determinan K
  const d_raw = Det(K, 3);
  const d = ((d_raw % 26) + 26) % 26;
  console.log("Determinan bulat det(K) =", d_raw);
  console.log("d = det(K) mod 26       =", d);

  // Uji koprima
  if (GCD(d, 26) !== 1) {
    console.log('CETAK: "Kunci tidak valid (tidak koprima dengan 26)"');
    console.log("BERHENTI.");
    return null;
  }

  // Invers modular determinan
  const d_inv = InversModular(d, 26);
  console.log("Invers modular d_inv    =", d_inv);

  // Langkah 2: Kofaktor & Adjoin
  const C = Kofaktor(K, 3);
  const adj = Adjoin(C, 3);

  // Langkah 3: Matriks kunci invers K^-1 (mod 26)
  const K_inv = Array.from({ length: 3 }, () => new Array(3).fill(0));
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      K_inv[i][j] = ((d_inv * adj[i][j]) % 26 + 26) % 26;
    }
  }
  console.log("Matriks Kunci Dekripsi K^-1 (mod 26):");
  K_inv.forEach((row, i) => console.log(\`  Row \${i + 1}: [\${row.join(", ")}]\`));

  // Langkah 4: Dekripsi tiap blok 3 huruf
  let cleanText = C_teks.toUpperCase().replace(/[^A-Z]/g, "");
  while (cleanText.length % 3 !== 0) cleanText += "X";

  let P_teks = "";
  console.log("-------------------------------------------------");
  console.log("Memproses", cleanText.length / 3, "blok ciphertext:");

  for (let b = 0; b < cleanText.length; b += 3) {
    const cVec = [
      cleanText.charCodeAt(b) - 65,
      cleanText.charCodeAt(b + 1) - 65,
      cleanText.charCodeAt(b + 2) - 65
    ];

    const pVec = [];
    for (let i = 0; i < 3; i++) {
      let sum = 0;
      for (let k = 0; k < 3; k++) {
        sum += K_inv[i][k] * cVec[k];
      }
      pVec.push(((sum % 26) + 26) % 26);
    }

    const blockPlain = pVec.map(v => String.fromCharCode(65 + v)).join("");
    P_teks += blockPlain;
    console.log(\`  Blok \${cleanText.slice(b, b + 3)} -> c=[\${cVec.join(",")}] -> p=[\${pVec.join(",")}] -> \${blockPlain}\`);
  }

  console.log("=================================================");
  console.log("HASIL DEKRIPSI TEKS ASLI (PLAINTEXT):", P_teks);
  console.log("=================================================");

  return P_teks;
}

// Inisialisasi Parameter Berjalan
const K = ${JSON.stringify(K)};
const ciphertext = ${JSON.stringify(ciphertext)};

// Eksekusi Dekripsi
const hasilPlaintext = DekripsiHill(K, ciphertext);
return hasilPlaintext;`;
}
