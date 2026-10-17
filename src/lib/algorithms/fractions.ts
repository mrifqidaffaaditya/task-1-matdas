/**
 * Pure TypeScript Exact Rational Arithmetic (Fractions)
 * Avoids floating-point drift and renders clean fractions (e.g. -17/72, 1, 0).
 * Author: M. Rifqi Daffa Aditya (NIM: 2604140016)
 */

import { Fraction } from "./types";

/**
 * Euclidean algorithm to compute Greatest Common Divisor
 */
export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x === 0 ? 1 : x;
}

/**
 * Creates a normalized fraction:
 * - Denominator is always positive
 * - Reduced to lowest terms by dividing by gcd(num, den)
 */
export function createFraction(num: number, den: number): Fraction {
  if (den === 0) {
    throw new Error("Division by zero in Fraction creation");
  }

  const roundedNum = Math.round(num);
  const roundedDen = Math.round(den);

  if (roundedNum === 0) {
    return { numerator: 0, denominator: 1, formatted: "0" };
  }

  const commonDivisor = gcd(roundedNum, roundedDen);
  let finalNum = roundedNum / commonDivisor;
  let finalDen = roundedDen / commonDivisor;

  if (finalDen < 0) {
    finalNum = -finalNum;
    finalDen = -finalDen;
  }

  let formatted = "";
  if (finalDen === 1) {
    formatted = `${finalNum}`;
  } else {
    formatted = `${finalNum}/${finalDen}`;
  }

  return {
    numerator: finalNum,
    denominator: finalDen,
    formatted,
  };
}

/**
 * Multiply two fractions
 */
export function multiplyFraction(a: Fraction, b: Fraction): Fraction {
  return createFraction(a.numerator * b.numerator, a.denominator * b.denominator);
}

/**
 * Add two fractions
 */
export function addFraction(a: Fraction, b: Fraction): Fraction {
  const commonDen = a.denominator * b.denominator;
  const num = a.numerator * b.denominator + b.numerator * a.denominator;
  return createFraction(num, commonDen);
}
