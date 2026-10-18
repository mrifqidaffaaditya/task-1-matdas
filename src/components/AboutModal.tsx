"use client";

import React from "react";
import {
  X,
  ShieldCheck,
  Award,
  BookOpen,
  Code2,
  Cpu,
  GraduationCap,
  Sparkles,
} from "lucide-react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-[#15191f] border border-[#2a313d] rounded-md overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-3.5 sm:p-4 border-b border-[#262c36] bg-[#111418]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-[#1e232b] text-neutral-300 border border-[#2a313d]">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white">
                Tentang Penulis & Proyek Evaluasi
              </h3>
              <p className="text-[11px] text-neutral-400">
                Aljabar Linier & Matematika Dasar Terapan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white hover:bg-[#1e232b] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-3.5 sm:space-y-4 text-xs">
          {/* Identity Card */}
          <div className="p-3.5 sm:p-4 rounded bg-[#111418] border border-[#2a313d]">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded bg-[#202630] border border-[#303846] flex items-center justify-center text-neutral-200 font-bold font-mono text-xs sm:text-sm flex-shrink-0">
                DA
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <div className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                  Identitas Mahasiswa
                </div>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  M. Rifqi Daffa Aditya
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-neutral-300 pt-1">
                  <div>
                    <span className="text-neutral-500">NIM:</span>{" "}
                    <strong className="text-neutral-200 font-mono">2604140016</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500">Program Studi:</span>{" "}
                    <strong className="text-neutral-200">Sistem Informasi</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500">Mata Kuliah:</span>{" "}
                    <strong className="text-neutral-200">Matematika Dasar / Aljabar Linier</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500">Semester:</span>{" "}
                    <strong className="text-neutral-200">Ganjil 2026/2027</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Rigor Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="p-3 rounded bg-[#111418] border border-[#262c36] flex items-start gap-2.5">
              <div className="p-1 rounded bg-[#1c2420] text-emerald-400 border border-emerald-900/50 mt-0.5 flex-shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-200">
                  100% Zero Math Libraries
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  Tidak memakai `mathjs` atau library eksternal. Semua fungsi minor, determinan Laplace, kofaktor, invers modular, dan FPB diimplementasikan dari dasar.
                </p>
              </div>
            </div>

            <div className="p-3 rounded bg-[#111418] border border-[#262c36] flex items-start gap-2.5">
              <div className="p-1 rounded bg-[#1e232b] text-neutral-300 border border-[#2a313d] mt-0.5 flex-shrink-0">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-200">
                  Kesesuaian Pseudocode 8 Modul
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  Struktur kontrol, nama variabel, dan tahapan eksekusi mengikuti persis 8 modul pseudocode formal pada laporan resmi penulis.
                </p>
              </div>
            </div>

            <div className="p-3 rounded bg-[#111418] border border-[#262c36] flex items-start gap-2.5">
              <div className="p-1 rounded bg-[#252219] text-amber-400 border border-amber-900/50 mt-0.5 flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-200">
                  Aritmetika Rasional Eksak (Pecahan)
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  Mendukung representasi pecahan rasional eksak yang disederhanakan dengan FPB untuk mencegah galat pembulatan floating-point.
                </p>
              </div>
            </div>

            <div className="p-3 rounded bg-[#111418] border border-[#262c36] flex items-start gap-2.5">
              <div className="p-1 rounded bg-[#211e28] text-purple-400 border border-purple-900/50 mt-0.5 flex-shrink-0">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-xs font-semibold text-neutral-200">
                  Analisis Asimtotik Formal Big-O
                </div>
                <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">
                  Menyajikan penurunan lengkap kompleksitas waktu T(n) = O(n × n!) dan ruang S(n) = O(n³) beserta komparasi terhadap eliminasi Gauss.
                </p>
              </div>
            </div>
          </div>

          {/* Topics Description */}
          <div className="p-3.5 rounded bg-[#111418] border border-[#262c36] text-[11px] text-neutral-300 space-y-1.5">
            <div className="font-semibold text-neutral-200 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-neutral-400" />
              Ruang Lingkup Proyek
            </div>
            <p className="text-neutral-400 leading-relaxed">
              Aplikasi ini dikembangkan untuk keperluan evaluasi akhir mata kuliah Matematika Dasar / Aljabar Linier. Mendemonstrasikan penyelesaian SPL menggunakan metode matriks adjoin berukuran 2 × 2, 3 × 3, dan 4 × 4, serta studi kasus Topik A yakni dekripsi Hill Cipher 3 × 3 pada pesan sandi <code className="text-neutral-200 font-mono">GWMOPEBYOKCVYEK</code> menjadi <code className="text-emerald-400 font-mono">SISTEMINFORMASI</code>.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-[#262c36] bg-[#111418] flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-neutral-400" />
            <span>Tahun Akademik 2026/2027</span>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 bg-[#252c38] hover:bg-[#303846] text-white font-medium rounded text-xs transition-colors border border-neutral-600"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
