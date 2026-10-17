# Proyek Evaluasi & Perancangan Algoritma: Penyelesaian SPL Berbasis Metode Matriks Adjoin & Dekripsi Hill Cipher

Aplikasi web akademik interaktif untuk evaluasi komputasi Sistem Persamaan Linier (SPL) menggunakan metode matriks adjoin klasik dan dekripsi Hill Cipher $3\times3$ berbasis aritmetika modulo 26.

---

## 📌 Identitas Penulis & Mata Kuliah

| Komponen | Keterangan |
| :--- | :--- |
| **Nama Mahasiswa** | **M. Rifqi Daffa Aditya** |
| **NIM** | **2604140016** |
| **Program Studi** | **Sistem Informasi** |
| **Mata Kuliah** | **Matematika Dasar / Aljabar Linier** |
| **Periode Akademik** | **Semester Ganjil 2026/2027** |

---

## 🎯 Gambaran Umum Proyek

Proyek ini dibangun untuk mendemonstrasikan implementasi algoritma aljabar linier murni tanpa pustaka matematika eksternal (*zero math libraries*). Sistem ini menyediakan penelusuran langkah-demi-langkah (*step-by-step trace*) transparan yang mencocokkan perhitungan analitik di atas kertas dengan eksekusi program.

Fitur utama meliputi:
1. **Penyelesaian SPL Metode Adjoin ($2\times2, 3\times3, 4\times4$)** dengan penanganan matriks singular ($\det = 0$) dan penyajian invers dalam bentuk pecahan eksak dan desimal.
2. **Studi Kasus Kriptografi Hill Cipher ($3\times3$)** dengan aritmetika modulo 26, pengecekan koprima $\gcd(\det(K)\bmod 26, 26) = 1$, pencarian invers modular, transpos kofaktor adjoin, dan dekripsi per blok 3 karakter.
3. **Mode Live Challenge Dosen** untuk pengujian matriks secara acak dengan fitur *Step-by-Step Reveal* saat presentasi di depan kelas/papan tulis.
4. **Visualisasi Flowchart & Pseudocode Formal (8 Modul)** disertai *Live Execution Call Counter*.
5. **Analisis Asimtotik Big-O** yang menjabarkan pembuktian matematis $T(n) = O(n \times n!)$ dan $S(n) = O(n^3)$ beserta tabel laju pertumbuhan operasi komputasi.

---

## 📐 Teori & Teorema Matematis

### 1. Metode Matriks Adjoin untuk SPL
Diberikan sistem persamaan linier dalam bentuk matriks $A x = b$, di mana $A \in \mathbb{R}^{n \times n}$, $x \in \mathbb{R}^n$, dan $b \in \mathbb{R}^n$. Jika $\det(A) \neq 0$, matriks invers $A^{-1}$ ada dan dirumuskan sebagai:
$$A^{-1} = \frac{1}{\det(A)} \text{adj}(A)$$
di mana matriks adjoin $\text{adj}(A)$ adalah transpos dari matriks kofaktor $C$:
$$\text{adj}(A) = C^T, \quad C_{ij} = (-1)^{i+j} \det(M_{ij})$$
dengan $M_{ij}$ merupakan sub-matriks minor ukuran $(n-1) \times (n-1)$ setelah menghapus baris $i$ dan kolom $j$.

Vektor solusi $x$ diperoleh melalui:
$$x = A^{-1} b = \left( \frac{1}{\det(A)} \text{adj}(A) \right) b = \frac{1}{\det(A)} (\text{adj}(A) \cdot b)$$

Jika $\det(A) = 0$, matriks $A$ bersifat singular dan sistem tidak memiliki solusi unik (metode adjoin tidak dapat dipakai).

---

### 2. Dekripsi Hill Cipher ($3\times3$) dalam $\mathbb{Z}_{26}$
Hill Cipher mengenkripsi blok teks sandi berdimensi $m=3$ melalui transformasi linier:
$$c \equiv K \cdot p \pmod{26}$$
Untuk mendekripsi kembali menjadi teks asli $p$:
$$p \equiv K^{-1} \cdot c \pmod{26}$$
Matriks invers kunci $K^{-1}$ dihitung dengan metode adjoin modulo 26:
$$K^{-1} \equiv (\det(K)^{-1} \cdot \text{adj}(K)) \pmod{26}$$
Syarat keberadaan $K^{-1}$:
1. $d = \det(K) \bmod 26$
2. $\gcd(d, 26) = 1$ (determinan harus saling prima dengan modulus 26).
3. Invers modular $d^{-1}$ dicari sedemikian hingga:
   $$(d \cdot d^{-1}) \equiv 1 \pmod{26}$$

---

## 📜 8 Modul Pseudocode Formal (Verbatim)

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

## 📊 Analisis Kompleksitas Asimtotik (Big-O)

### 1. Kompleksitas Waktu $T(n) = O(n \times n!)$
- **Fungsi Minor:** Mengiterasi $n \times n$ elemen matriks untuk menyalin $(n-1) \times (n-1)$ elemen $\implies O(n^2)$.
- **Modul Determinan (Det):** Melakukan $n$ panggilan rekursif berukuran $(n-1)$. Persamaan relasi rekurensi:
  $$T_{\text{det}}(n) = n \cdot T_{\text{det}}(n-1) + O(n^2) \implies O(n!)$$
- **Modul Kofaktor (Kofaktor):** Memiliki 2 perulangan bersarang berukuran $n \times n = n^2$, di mana pada setiap sel dipanggil `Det(M, n-1)` yang memerlukan $O((n-1)!)$ operasi:
  $$T_{\text{kofaktor}}(n) = n^2 \times O((n-1)!) = n \times (n \times (n-1)!) = O(n \times n!)$$
- **Modul Transpos (Adjoin) & Solusi:** Masing-masing terdiri atas dua perulangan bersarang $n \times n \implies O(n^2)$.
- **Total Kompleksitas Waktu:**
  $$T(n) = O(n!) + O(n \times n!) + O(n^2) + O(n^2) \implies T(n) = O(n \times n!)$$

### 2. Kompleksitas Ruang $S(n) = O(n^3)$
- **Matriks Utama:** Menyimpan matriks $A$, $C$, $\text{adj}$, dan $A^{-1}$ berukuran $n \times n \implies O(n^2)$.
- **Matriks Rekursi (Det):** Kedalaman rekursi maksimal adalah $n$. Pada setiap level rekursi dibentuk matriks minor berukuran hingga $(n-1) \times (n-1) \approx O(n^2)$:
  $$S_{\text{stack}}(n) = n \times O(n^2) = O(n^3)$$
- **Total Kompleksitas Ruang:**
  $$S(n) = O(n^2) + O(n^3) \implies S(n) = O(n^3)$$

---

## 🚀 Panduan Instalasi & Menjalankan Proyek

### Kebutuhan Sistem
- Node.js versi 18+ (disarankan Node.js 20 LTS atau 22)
- npm versi 9+

### Langkah Instalasi
```bash
# 1. Kloning atau buka direktori proyek
cd /home/aditya/project/task-1-matdas

# 2. Instalasi dependensi
npm install

# 3. Jalankan server pengembang lokal
npm run dev
```
Akses aplikasi melalui peramban web di: `http://localhost:3000`

### Build untuk Produksi
```bash
# Type-check TypeScript
npx tsc --noEmit

# Build aplikasi Next.js
npm run build

# Menjalankan hasil build produksi
npm run start
```

---

## 🛡️ Kebijakan Nol Pustaka Matematika Eksternal (*Zero Math Libraries*)
Aplikasi ini mematuhi standar akademik dengan **TIDAK menggunakan pustaka matematika pihak ketiga** seperti `mathjs`, `numeric`, atau `algebrite`. Seluruh operasi matriks, ekspansi kofaktor, invers modular, dan FPB/GCD dibangun murni dari algoritma dasar dalam berkas `src/lib/algorithms/`.
