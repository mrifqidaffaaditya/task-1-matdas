/**
 * Preset Test Cases & Data for SPL Matriks Adjoin & Hill Cipher
 * Author: M. Rifqi Daffa Aditya (NIM: 2604140016)
 * Program Studi: Sistem Informasi
 */

export interface SPLPreset {
  id: string;
  name: string;
  description: string;
  n: number;
  A: number[][];
  b: number[];
  expectedDet?: number;
  expectedX?: number[];
  isSingular?: boolean;
}

export interface HillCipherPreset {
  id: string;
  name: string;
  description: string;
  K: number[][];
  ciphertext: string;
  expectedPlaintext: string;
}

export const SPL_PRESETS: SPLPreset[] = [
  {
    id: "laporan-4x4",
    name: "Preset Manual Tracing 4x4 (Laporan)",
    description: "Kasus uji utama pada laporan mahasiswa: A (4x4) dengan det(A) = -72 dan x = [1, -1, 2, 1]",
    n: 4,
    A: [
      [2, 1, 0, 3],
      [1, 3, 1, 0],
      [0, 2, 4, 1],
      [3, 0, 1, 2],
    ],
    b: [4, 0, 7, 7],
    expectedDet: -72,
    expectedX: [1, -1, 2, 1],
  },
  {
    id: "singular-3x3",
    name: "Preset Matriks Singular (det = 0)",
    description: "Mendemonstrasikan percabangan: det(A) = 0 sehingga metode matriks adjoin tidak dapat dipakai",
    n: 3,
    A: [
      [1, 2, 3],
      [2, 4, 6],
      [1, 1, 1],
    ],
    b: [6, 12, 3],
    isSingular: true,
    expectedDet: 0,
  },
  {
    id: "standar-3x3",
    name: "Preset Standar SPL 3x3",
    description: "Sistem 3 variabel linier dengan penyelesaian bilangan bulat",
    n: 3,
    A: [
      [3, -1, 2],
      [1, 2, 3],
      [2, -2, -1],
    ],
    b: [12, 11, 2],
    expectedDet: -13,
  },
  {
    id: "standar-2x2",
    name: "Preset Dasar SPL 2x2",
    description: "Sistem 2 variabel linier untuk verifikasi cepat dasar",
    n: 2,
    A: [
      [3, 2],
      [1, 4],
    ],
    b: [11, 7],
    expectedDet: 10,
    expectedX: [3, 1],
  },
];

export const HILL_CIPHER_PRESETS: HillCipherPreset[] = [
  {
    id: "laporan-hill-3x3",
    name: "Preset Manual Tracing Hill Cipher 3x3 (Laporan)",
    description: "Kunci K (3x3) det(K)=441, d=25, d_inv=25. Mendekripsi GWMOPEBYOKCVYEK menjadi SISTEMINFORMASI",
    K: [
      [6, 24, 1],
      [13, 16, 10],
      [20, 17, 15],
    ],
    ciphertext: "GWMOPEBYOKCVYEK",
    expectedPlaintext: "SISTEMINFORMASI",
  },
  {
    id: "short-hill-3x3",
    name: "Preset Uji Singkat (1 Blok: GWM)",
    description: "Dekripsi 1 blok 3 huruf GWM -> SIS",
    K: [
      [6, 24, 1],
      [13, 16, 10],
      [20, 17, 15],
    ],
    ciphertext: "GWM",
    expectedPlaintext: "SIS",
  },
];
