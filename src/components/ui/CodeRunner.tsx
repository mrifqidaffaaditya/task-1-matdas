"use client";

import React, { useState } from "react";
import {
  Play,
  Copy,
  Check,
  Terminal,
  Code2,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface CodeRunnerProps {
  code: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  badge?: React.ReactNode;
  defaultOpen?: boolean;
  variant?: "step" | "full";
}

export const CodeRunner: React.FC<CodeRunnerProps> = ({
  code,
  title = "Kode JavaScript Langkah Ini",
  subtitle = "Dapat langsung dieksekusi di browser atau disalin ke Node.js / DevTools",
  badge,
  defaultOpen = false,
  variant = "step",
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setIsRunning(true);
    setError(null);
    setOutput(null);

    const logs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => {
        logs.push(
          args
            .map((a) =>
              typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
            )
            .join(" ")
        );
      },
      error: (...args: any[]) => {
        logs.push(
          "[ERROR] " +
            args
              .map((a) =>
                typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
              )
              .join(" ")
        );
      },
      warn: (...args: any[]) => {
        logs.push(
          "[WARN] " +
            args
              .map((a) =>
                typeof a === "object" ? JSON.stringify(a, null, 2) : String(a)
              )
              .join(" ")
        );
      },
    };

    const startTime = performance.now();
    try {
      // Execute pure JavaScript via standard browser runtime
      const runnable = new Function("console", code);
      const result = runnable(customConsole);
      const elapsed = performance.now() - startTime;
      setExecutionTime(Number(elapsed.toFixed(2)));

      if (result !== undefined && logs.length === 0) {
        logs.push(
          typeof result === "object"
            ? JSON.stringify(result, null, 2)
            : String(result)
        );
      }

      setOutput(
        logs.join("\n") || "(Kode dieksekusi sukses tanpa output console)"
      );
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setIsRunning(false);
    }
  };

  const handleClearOutput = () => {
    setOutput(null);
    setError(null);
    setExecutionTime(null);
  };

  const isFull = variant === "full";

  return (
    <div
      className={`border rounded ${
        isFull
          ? "border-emerald-900/60 bg-[#12161c]"
          : "border-[#262c36] bg-[#111418]"
      }`}
    >
      {/* Runner Bar / Header */}
      <div className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 bg-[#0d1014] border-b border-[#262c36] rounded-t">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${
              isFull
                ? "bg-[#18231c] text-emerald-400 border border-emerald-800"
                : "bg-[#181c22] text-neutral-300 border border-[#2a313d]"
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-white font-mono truncate">
                {title}
              </span>
              {badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1e232b] text-neutral-300 border border-[#2a313d]">
                  {badge}
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-[10px] text-neutral-400 truncate">{subtitle}</p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#15191f] hover:bg-[#1c222b] text-neutral-300 hover:text-white border border-[#262c36] text-[11px] font-mono transition-colors"
            title={isOpen ? "Sembunyikan Kode" : "Tampilkan Kode"}
          >
            {isOpen ? (
              <>
                <ChevronUp className="w-3 h-3" />
                <span>Tutup Kode</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3 h-3" />
                <span>Lihat Kode</span>
              </>
            )}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#15191f] hover:bg-[#1c222b] text-neutral-200 hover:text-white border border-[#262c36] text-[11px] font-mono transition-colors"
            title="Salin kode ke papan klip untuk dijalankan di Node.js atau DevTools"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Salin Kode</span>
              </>
            )}
          </button>

          <button
            onClick={handleRun}
            disabled={isRunning}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-[11px] font-mono font-bold transition-colors ${
              isFull
                ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                : "bg-[#252c38] hover:bg-[#303847] text-white border border-neutral-600"
            }`}
            title="Jalankan kode JavaScript ini langsung di browser"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isRunning ? "Mengeksekusi..." : "Jalankan Kode"}</span>
          </button>
        </div>
      </div>

      {/* Expandable Code Block */}
      {isOpen && (
        <div className="p-3 border-b border-[#262c36] bg-[#0a0d11]">
          <div className="relative">
            <pre className="font-mono text-[11px] sm:text-xs text-neutral-200 overflow-x-auto max-h-64 sm:max-h-80 p-2.5 rounded bg-[#0e1217] border border-[#222832] leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Live Terminal Output Window */}
      {(output !== null || error !== null) && (
        <div className="p-3 bg-[#0a0d11] space-y-2">
          <div className="flex items-center justify-between border-b border-[#222832] pb-1.5 text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-neutral-300">
              <Terminal className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white">Hasil Eksekusi (Console Log):</span>
              {executionTime !== null && (
                <span className="text-neutral-500 text-[10px]">
                  ({executionTime} ms)
                </span>
              )}
            </div>

            <button
              onClick={handleClearOutput}
              className="flex items-center gap-1 text-[10px] text-neutral-400 hover:text-rose-300 transition-colors"
              title="Bersihkan output konsol"
            >
              <Trash2 className="w-3 h-3" />
              <span>Bersihkan</span>
            </button>
          </div>

          {error ? (
            <div className="p-2.5 rounded bg-[#201518] border border-rose-900 text-rose-300 font-mono text-[11px] leading-relaxed">
              <strong>Galat Waktu Eksekusi:</strong>
              <div>{error}</div>
            </div>
          ) : (
            <pre className="p-2.5 rounded bg-[#0e1217] border border-[#222832] font-mono text-[11px] sm:text-xs text-emerald-400 overflow-x-auto max-h-60 leading-relaxed whitespace-pre-wrap">
              {output}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};
