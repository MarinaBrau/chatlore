"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UploadZone } from "@/components/UploadZone";
import { useParser } from "@/lib/parsers/use-parser";
import { useConversations } from "@/context/conversations";

export default function UploadPage() {
  const router = useRouter();
  const { status, conversations, error, parse } = useParser();
  const { setConversations } = useConversations();

  const handleFile = useCallback(
    (file: File) => {
      parse(file);
    },
    [parse]
  );

  // Redirect to conversations list after successful parse
  useEffect(() => {
    if (status === "success" && conversations.length > 0) {
      setConversations(conversations);
      router.push("/conversations");
    }
  }, [status, conversations, setConversations, router]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Upload your ChatGPT export
          </h1>
          <p className="mt-2 text-muted-foreground">
            Go to{" "}
            <span className="font-medium text-foreground">
              ChatGPT → Settings → Data controls → Export data
            </span>{" "}
            and upload the <code className="text-sm">conversations.json</code>{" "}
            file from the zip.
          </p>
        </div>

        <UploadZone
          onFileAccepted={handleFile}
          status={status}
          error={error}
        />

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Your file is parsed entirely in your browser. Nothing is uploaded to
          our servers.
        </p>
      </motion.div>
    </div>
  );
}
