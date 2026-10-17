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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Tentang Penulis & Proyek Evaluasi
              </h3>
              <p className="text-xs text-slate-400">
                Aljabar Linier & Matematika Dasar Terapan
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm">
          {/* Identity Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl"></div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                DA
              </div>
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Identitas Mahasiswa
                </div>
                <h4 className="text-lg font-bold text-white">
                  M. Rifqi Daffa Aditya
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-slate-300 pt-1">
                  <div>
                    <span className="text-slate-500">NIM:</span>{" "}
                    <strong className="text-slate-200 font-mono">2604140016</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Program Studi:</span>{" "}
                    <strong className="text-slate-200">Sistem Informasi</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Mata Kuliah:</span>{" "}
                    <strong className="text-slate-200">Matematika Dasar / Aljabar Linier</strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Semester:</span>{" "}
                    <strong className="text-slate-200">Ganjil 2026/2027</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Academic Rigor Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mt-0.5">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  100% Zero Math Libraries
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Tidak memakai `mathjs` atau library eksternal. Semua fungsi matriks, determinan Laplace, kofaktor, invers modular, dan GCD diimplementasikan murni dari dasar.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 mt-0.5">
                <Code2 className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Kesesuaian Pseudocode 8 Modul
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Struktur kontrol, nama variabel, dan tahapan eksekusi mengikuti persis 8 modul pseudocode formal pada laporan resmi penulis.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Aritmetika Rasional Eksak (Pecahan)
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Mendukung representasi pecahan rasional eksak yang disederhanakan dengan FPB untuk mencegah galat pembulatan floating-point.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 mt-0.5">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-200">
                  Analisis Asimtotik Formal Big-O
                </div>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                  Menyajikan penurunan lengkap kompleksitas waktu T(n) = O(n × n!) dan ruang S(n) = O(n³) beserta komparasi terhadap eliminasi Gauss.
                </p>
              </div>
            </div>
          </div>

          {/* Topics Description */}
          <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              Ruang Lingkup Proyek
            </div>
            <p className="text-slate-400 leading-relaxed">
              Aplikasi ini dikembangkan untuk keperluan evaluasi akhir mata kuliah Matematika Dasar / Aljabar Linier. Aplikasi ini mendemonstrasikan penyelesaian SPL menggunakan metode matriks adjoin berukuran 2x2, 3x3, dan 4x4, serta studi kasus Topik A yakni dekripsi Hill Cipher 3x3 pada pesan sandi <code className="text-indigo-300 font-mono">GWMOPEBYOKCVYEK</code> menjadi <code className="text-emerald-300 font-mono">SISTEMINFORMASI</code>.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-slate-400" />
            <span>Tahun Akademik 2026/2027</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors text-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
