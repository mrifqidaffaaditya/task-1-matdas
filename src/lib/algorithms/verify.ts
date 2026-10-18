/**
 * Verification Script for Pure TypeScript Algorithms (Modules 1 - 8)
 * Verifies exact correspondence with the author's report and manual paper trace.
 * Author: M. Rifqi Daffa Aditya (NIM: 2604140016)
 */

import {
  Minor,
  Det,
  Kofaktor,
  Adjoin,
  Solusi,
  SPL_Adjoin,
} from "./matrix";
import {
  mod,
  InversModular,
  DekripsiHill,
} from "./hillCipher";
import { SPL_PRESETS, HILL_CIPHER_PRESETS } from "../presets";

function runVerification() {
  console.log("=== MEMULAI VERIFIKASI ALGORITMA MURNI (8 MODUL) ===");

  // Test 0: Modulo Guard for Negative Dividends
  console.log("\n[Test 0] Verifikasi Modulo Positif Guard ((a % m) + m) % m:");
  if (mod(-343, 26) !== 21 || mod(-47, 26) !== 5 || mod(-99, 26) !== 5) {
    throw new Error("Test 0 FAILED: Positive modulo guard failed!");
  }
  console.log("  mod(-343, 26) = 21, mod(-47, 26) = 5, mod(-99, 26) = 5 (OK)");
  console.log("  >>> Test 0 PASSED!");

  // Test 1: 4x4 SPL Preset (Laporan)
  const p1 = SPL_PRESETS[0];
  const r1 = SPL_Adjoin(p1.A, p1.b, p1.n);
  console.log(`\n[Test 1] 4x4 SPL Preset (Laporan):`);
  console.log(`  Row 1 Minors: M11=${r1.minors[0][0].detMinor}, M12=${r1.minors[0][1].detMinor}, M13=${r1.minors[0][2].detMinor}, M14=${r1.minors[0][3].detMinor}`);
  console.log(`  det(A) = ${r1.detA} (Expected: -72)`);
  console.log(`  adj(A) * b = [${r1.adjTimesB.join(", ")}] (Expected: [-72, 72, -144, -72])`);
  console.log(`  x = [${r1.x.join(", ")}] (Expected: [1, -1, 2, 1])`);
  console.log(`  isVerified = ${r1.isVerified}`);

  if (
    r1.detA !== -72 ||
    r1.minors[0][0].detMinor !== 17 ||
    r1.minors[0][1].detMinor !== 10 ||
    r1.minors[0][2].detMinor !== 13 ||
    r1.minors[0][3].detMinor !== 32 ||
    JSON.stringify(r1.x) !== JSON.stringify([1, -1, 2, 1]) ||
    JSON.stringify(r1.adjTimesB) !== JSON.stringify([-72, 72, -144, -72]) ||
    !r1.isVerified
  ) {
    throw new Error("Test 1 FAILED! Mathematical output does not match paper trace!");
  }
  console.log("  >>> Test 1 PASSED 100%!");

  // Test 2: Singular Matrix & Exact Error Message
  const p2 = SPL_PRESETS[1];
  const r2 = SPL_Adjoin(p2.A, p2.b, p2.n);
  console.log(`\n[Test 2] Singular Matrix Preset (det = 0):`);
  console.log(`  det(A) = ${r2.detA}`);
  console.log(`  isSingular = ${r2.isSingular}`);
  console.log(`  errorMessage = "${r2.errorMessage}"`);

  if (
    !r2.isSingular ||
    r2.detA !== 0 ||
    r2.errorMessage !== "Matriks singular (det = 0): metode adjoin tidak dapat dipakai"
  ) {
    throw new Error("Test 2 FAILED! Singular matrix or error message does not match report!");
  }
  console.log("  >>> Test 2 PASSED 100%!");

  // Test 3: Hill Cipher 3x3 Decryption (Laporan)
  const h1 = HILL_CIPHER_PRESETS[0];
  const rh1 = DekripsiHill(h1.K, h1.ciphertext);
  console.log(`\n[Test 3] Hill Cipher 3x3 Decryption (Laporan):`);
  console.log(`  det(K) = ${rh1.detK} (Expected: 441)`);
  console.log(`  det(K) mod 26 = ${rh1.detKMod26} (Expected: 25)`);
  console.log(`  gcd(25, 26) = ${rh1.gcdVal} (Expected: 1)`);
  console.log(`  d_inv = InversModular(25, 26) = ${rh1.detInverse} (Expected: 25)`);
  console.log(`  Reduced adj(K) mod 26:`);
  rh1.adjMatrixMod26.forEach((row, i) => console.log(`    Row ${i+1}: [${row.join(", ")}]`));
  console.log(`  K_inv mod 26:`);
  rh1.invKeyMatrix.forEach((row, i) => console.log(`    Row ${i+1}: [${row.join(", ")}]`));
  console.log(`  plaintext = "${rh1.plaintext}" (Expected: "${h1.expectedPlaintext}")`);

  const expectedReducedAdj = [
    [18, 21, 16],
    [5, 18, 5],
    [5, 14, 18],
  ];
  const expectedKInv = [
    [8, 5, 10],
    [21, 8, 21],
    [21, 12, 8],
  ];

  if (
    rh1.detK !== 441 ||
    rh1.detKMod26 !== 25 ||
    rh1.detInverse !== 25 ||
    JSON.stringify(rh1.adjMatrixMod26) !== JSON.stringify(expectedReducedAdj) ||
    JSON.stringify(rh1.invKeyMatrix) !== JSON.stringify(expectedKInv) ||
    rh1.plaintext !== "SISTEMINFORMASI"
  ) {
    throw new Error("Test 3 FAILED! Hill cipher decryption does not match paper trace!");
  }
  console.log("  >>> Test 3 PASSED 100%!");

  // Test 4: Invalid Hill Cipher Key & Exact Error Message
  const invalidK = [
    [2, 4, 6],
    [1, 3, 5],
    [0, 2, 4],
  ]; // det = 0, gcd(0, 26) = 26 != 1
  const rInvalid = DekripsiHill(invalidK, "ABC");
  console.log(`\n[Test 4] Invalid Hill Cipher Key (gcd != 1):`);
  console.log(`  isValidKey = ${rInvalid.isValidKey}`);
  console.log(`  errorMessage = "${rInvalid.errorMessage}"`);

  if (
    rInvalid.isValidKey ||
    rInvalid.errorMessage !== "Kunci tidak valid (tidak koprima dengan 26)"
  ) {
    throw new Error("Test 4 FAILED! Invalid key error message does not match report!");
  }
  console.log("  >>> Test 4 PASSED 100%!");

  console.log("\n==========================================");
  console.log("SEMUA 8 MODUL MATEMATIS DIVERIFIKASI 100%!");
  console.log("==========================================");
}

runVerification();
