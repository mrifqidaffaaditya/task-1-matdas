/**
 * Verbatim formal pseudocode from author's report (Modules 1 - 8)
 * Author: M. Rifqi Daffa Aditya (NIM: 2604140016)
 * Program Studi: Sistem Informasi - Aljabar Linier / Matematika Dasar
 */

export interface PseudocodeModule {
  id: string;
  number: number;
  title: string;
  category: "SPL Adjoin" | "Studi Kasus Hill Cipher";
  description: string;
  code: string;
  complexity: string;
}

export const PSEUDOCODE_MODULES: PseudocodeModule[] = [
  {
    id: "modul-1",
    number: 1,
    title: "Modul 1: Menentukan Matriks Minor",
    category: "SPL Adjoin",
    description: "Menghapus baris ke-p dan kolom ke-q dari matriks A ukuran n x n untuk membentuk sub-matriks (n-1) x (n-1).",
    code: `FUNGSI Minor(A, n, p, q):
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
    KEMBALIKAN M`,
    complexity: "O(n²)",
  },
  {
    id: "modul-2",
    number: 2,
    title: "Modul 2: Menentukan Determinan",
    category: "SPL Adjoin",
    description: "Ekspansi kofaktor sepanjang baris pertama (Laplace expansion) dengan basis rekursi n=1 dan n=2.",
    code: `FUNGSI Det(A, n):
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
    KEMBALIKAN hasil`,
    complexity: "O(n!)",
  },
  {
    id: "modul-3",
    number: 3,
    title: "Modul 3: Menentukan Kofaktor",
    category: "SPL Adjoin",
    description: "Menghitung matriks kofaktor C di mana C[i][j] = (-1)^(i+j) * Det(Minor(A, n, i, j), n - 1).",
    code: `FUNGSI Kofaktor(A, n):
    C = matriks baru ukuran n x n
    UNTUK i = 1 SAMPAI n:
        UNTUK j = 1 SAMPAI n:
            M = Minor(A, n, i, j)
            tanda = (-1) ^ (i + j)
            C[i][j] = tanda * Det(M, n - 1)
    KEMBALIKAN C`,
    complexity: "O(n × n!)",
  },
  {
    id: "modul-4",
    number: 4,
    title: "Modul 4: Menentukan Adjoin",
    category: "SPL Adjoin",
    description: "Transpos dari matriks kofaktor C, di mana elemen adj[j][i] = C[i][j].",
    code: `FUNGSI Adjoin(C, n):
    adj = matriks baru ukuran n x n
    UNTUK i = 1 SAMPAI n:
        UNTUK j = 1 SAMPAI n:
            adj[j][i] = C[i][j]
    KEMBALIKAN adj`,
    complexity: "O(n²)",
  },
  {
    id: "modul-5",
    number: 5,
    title: "Modul 5: Menentukan Solusi",
    category: "SPL Adjoin",
    description: "Tahap 1: Hitung matriks invers A_inv = (1 / d) * adj. Tahap 2: Kalikan matriks A_inv dengan vektor b.",
    code: `FUNGSI Solusi(adj, d, b, n):
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
    KEMBALIKAN x`,
    complexity: "O(n²)",
  },
  {
    id: "modul-6",
    number: 6,
    title: "Modul 6: Contoh Program Utama (SPL_Adjoin)",
    category: "SPL Adjoin",
    description: "Algoritma utama membaca masukan, memvalidasi determinan singular, dan mengorkestrasi modul 1-5.",
    code: `ALGORITMA SPL_Adjoin:
    BACA n, A, b
    d = Det(A, n)
    JIKA d == 0:
        CETAK "Matriks singular (det = 0): metode adjoin tidak dapat dipakai"
        BERHENTI
    C = Kofaktor(A, n)
    adj = Adjoin(C, n)
    x = Solusi(adj, d, b, n)
    CETAK x`,
    complexity: "O(n × n!)",
  },
  {
    id: "modul-7",
    number: 7,
    title: "Modul 7: Studi Kasus Topik A (Bagian 1): FUNGSI InversModular(a, m)",
    category: "Studi Kasus Hill Cipher",
    description: "Mencari balikan perkalian modular x di mana (a * x) mod m == 1 dalam ring Z_m.",
    code: `FUNGSI InversModular(a, m):
    a = a MOD m
    UNTUK x = 1 SAMPAI m - 1:
        JIKA (a * x) MOD m == 1:
            KEMBALIKAN x
    KEMBALIKAN TIDAK_ADA`,
    complexity: "O(m)",
  },
  {
    id: "modul-8",
    number: 8,
    title: "Modul 8: Studi Kasus Topik A (Bagian 2): ALGORITMA DekripsiHill",
    category: "Studi Kasus Hill Cipher",
    description: "Algoritma dekripsi Hill Cipher 3x3 dengan determinan mod 26, validasi koprima, invers kunci mod 26, dan dekripsi per blok 3 huruf.",
    code: `ALGORITMA DekripsiHill:
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
    CETAK plainteks`,
    complexity: "O(1) [Kunci 3x3 tetap] + O(L) [L: panjang teks]",
  },
];
