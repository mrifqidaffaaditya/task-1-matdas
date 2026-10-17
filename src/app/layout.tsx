import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adjoin SPL & Hill Cipher Engine — M. Rifqi Daffa Aditya (2604140016)",
  description:
    "Proyek Evaluasi & Perancangan Algoritma: Penyelesaian SPL Berbasis Metode Matriks Adjoin & Dekripsi Hill Cipher. Dibuat murni dari nol (Zero Math Libraries) oleh M. Rifqi Daffa Aditya, NIM: 2604140016, Program Studi Sistem Informasi.",
  authors: [{ name: "M. Rifqi Daffa Aditya", url: "https://github.com" }],
  keywords: [
    "Matriks Adjoin",
    "Hill Cipher",
    "Sistem Persamaan Linier",
    "Aljabar Linier",
    "Matematika Dasar",
    "Sistem Informasi",
    "Kriptografi Modulo 26",
    "Zero Math Libraries",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#111418] text-neutral-100 selection:bg-neutral-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
