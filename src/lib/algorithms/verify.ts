/**
 * Verification Script for Pure TypeScript Algorithms
 * Tests:
 * 1. 4x4 SPL Preset: det = -72, x = [1, -1, 2, 1]
 * 2. 3x3 Singular Preset: isSingular = true, det = 0
 * 3. 3x3 Hill Cipher Preset: det = 441, d = 25, d_inv = 25, plaintext = SISTEMINFORMASI
 */

import { solveSPLAdjoin } from "./matrix";
import { dekripsiHill } from "./hillCipher";
import { SPL_PRESETS, HILL_CIPHER_PRESETS } from "../presets";

function runVerification() {
  console.log("=== MEMULAI VERIFIKASI ALGORITMA MURNI ===");

  // Test 1: 4x4 SPL Preset
  const p1 = SPL_PRESETS[0];
  const r1 = solveSPLAdjoin(p1.A, p1.b, p1.n);
  console.log(`\n[Test 1] 4x4 SPL Preset:`);
  console.log(`  det(A) = ${r1.detA} (Expected: ${p1.expectedDet})`);
  console.log(`  x = [${r1.x.join(", ")}] (Expected: [${p1.expectedX?.join(", ")}])`);
  console.log(`  adj(A) * b = [${r1.adjTimesB.join(", ")}] (Expected: [-72, 72, -144, -72])`);
  console.log(`  isVerified = ${r1.isVerified}`);

  if (
    r1.detA !== -72 ||
    JSON.stringify(r1.x) !== JSON.stringify([1, -1, 2, 1]) ||
    JSON.stringify(r1.adjTimesB) !== JSON.stringify([-72, 72, -144, -72]) ||
    !r1.isVerified
  ) {
    throw new Error("Test 1 FAILED! Mathematical output does not match paper trace!");
  }
  console.log("  >>> Test 1 PASSED 100%!");

  // Test 2: Singular Matrix
  const p2 = SPL_PRESETS[1];
  const r2 = solveSPLAdjoin(p2.A, p2.b, p2.n);
  console.log(`\n[Test 2] Singular Matrix Preset:`);
  console.log(`  det(A) = ${r2.detA}`);
  console.log(`  isSingular = ${r2.isSingular}`);

  if (!r2.isSingular || r2.detA !== 0) {
    throw new Error("Test 2 FAILED! Singular matrix not detected correctly!");
  }
  console.log("  >>> Test 2 PASSED 100%!");

  // Test 3: Hill Cipher Decryption
  const h1 = HILL_CIPHER_PRESETS[0];
  const rh1 = dekripsiHill(h1.K, h1.ciphertext);
  console.log(`\n[Test 3] Hill Cipher 3x3 Decryption:`);
  console.log(`  det(K) = ${rh1.detK} (Expected: 441)`);
  console.log(`  det(K) mod 26 = ${rh1.detKMod26} (Expected: 25)`);
  console.log(`  gcd(25, 26) = ${rh1.gcdVal} (Expected: 1)`);
  console.log(`  d_inv = ${rh1.detInverse} (Expected: 25)`);
  console.log(`  plaintext = "${rh1.plaintext}" (Expected: "${h1.expectedPlaintext}")`);

  console.log(`  K_inv mod 26:`);
  rh1.invKeyMatrix.forEach((row, i) => {
    console.log(`    Row ${i + 1}: [${row.join(", ")}]`);
  });

  if (
    rh1.detK !== 441 ||
    rh1.detKMod26 !== 25 ||
    rh1.detInverse !== 25 ||
    rh1.plaintext !== "SISTEMINFORMASI"
  ) {
    throw new Error("Test 3 FAILED! Hill cipher decryption does not match paper trace!");
  }
  console.log("  >>> Test 3 PASSED 100%!");

  console.log("\n==========================================");
  console.log("SEMUA PENGUJIAN MATEMATIS BERHASIL 100%!");
  console.log("==========================================");
}

runVerification();
