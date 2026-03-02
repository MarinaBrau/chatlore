"use client";

import { useCallback, useRef, useState } from "react";
import { Upload, FileJson, AlertCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onFileAccepted: (file: File) => void;
  status: "idle" | "parsing" | "success" | "error";
  error: string | null;
}

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export function UploadZone({ onFileAccepted, status, error }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      setFileError(null);
      if (!file.name.endsWith(".json")) {
        setFileError("Please upload a .json file");
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setFileError("File too large (max 500MB)");
        return;
      }
      onFileAccepted(file);
    },
    [onFileAccepted]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const isParsing = status === "parsing";

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !isParsing && inputRef.current?.click()}
      className={cn(
        "relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-12 transition-all duration-200",
        isDragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border/60 hover:border-primary/50 hover:bg-accent/30",
        isParsing && "pointer-events-none opacity-70"
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        onChange={handleInputChange}
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {isParsing ? (
          <motion.div
            key="parsing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-3"
          >
            <Loader2 className="size-10 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Parsing your conversations...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex size-14 items-center justify-center rounded-xl border border-border/60 bg-background transition-all group-hover:border-amber/40 group-hover:bg-amber/5">
              {isDragging ? (
                <FileJson className="size-6 text-amber animate-bounce" />
              ) : (
                <Upload className="size-6 text-muted-foreground group-hover:text-amber" />
              )}
            </div>
            <div className="text-center">
              <p className="font-bold text-lg">
                {isDragging
                  ? "Drop it here!"
                  : "Upload your ChatGPT history"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Drag and drop your <span className="font-mono text-xs text-amber font-semibold">conversations.json</span> file here
              </p>
              <p className="mt-4 text-xs font-medium text-amber/60">
                or click to browse your computer
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {fileError && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive"
        >
          <AlertCircle className="size-4 shrink-0" />
          {fileError}
        </motion.div>
      )}

      {status === "error" && error && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-2 text-sm text-destructive"
        >
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </motion.div>
      )}
    </div>
  );
}
