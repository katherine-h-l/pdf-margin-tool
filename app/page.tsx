"use client";

import { PDFDocument } from "pdf-lib";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [extraRightIn, setExtraRightIn] = useState<number>(2);
  const [extraBottomIn, setExtraBottomIn] = useState<number>(1);
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canConvert = useMemo(() => !!file && !isWorking, [file, isWorking]);

  async function handleConvert() {
    if (!file) return;

    setIsWorking(true);
    setError(null);

    try {
      const inputBytes = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(inputBytes);
      const outPdf = await PDFDocument.create();

      const extraRightPts = extraRightIn * 72;
      const extraBottomPts = extraBottomIn * 72;

      const pageCount = srcPdf.getPageCount();

      for (let i = 0; i < pageCount; i++) {
        const [embedded] = await outPdf.embedPages([srcPdf.getPage(i)]);
        const { width, height } = embedded;

        const newPage = outPdf.addPage([width + extraRightPts, height + extraBottomPts]);

        newPage.drawPage(embedded, {
          x: 0,
          y: extraBottomPts,
        });
      }

      const outBytes = await outPdf.save();

      const ab = outBytes.buffer.slice(
        outBytes.byteOffset,
        outBytes.byteOffset + outBytes.byteLength
      );

      const blob = new Blob([ab], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "with_margins.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e: any) {
      setError(e?.message ? String(e.message) : "Conversion failed.");
    } finally {
      setIsWorking(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 920,
        margin: "0 auto",
        padding: 24,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
    >
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: 28 }}>PDF Margin Tool</h1>
          <p style={{ margin: "6px 0 0", color: "#555" }}>
            Adds blank space on the right and bottom while keeping text searchable.
          </p>
        </div>
        <nav style={{ display: "flex", gap: 12 }}>
          <Link href="/help">Help</Link>
          <Link href="/privacy">Privacy</Link>
        </nav>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div style={{ border: "1px solid #e6e6e6", borderRadius: 12, padding: 16 }}>
          <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Right space (inches)
              </label>
              <input
                type="number"
                min={0}
                step={0.25}
                value={extraRightIn}
                onChange={(e) => setExtraRightIn(Number(e.target.value))}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>
                Bottom space (inches)
              </label>
              <input
                type="number"
                min={0}
                step={0.25}
                value={extraBottomIn}
                onChange={(e) => setExtraBottomIn(Number(e.target.value))}
                style={{ width: "100%", padding: 8, borderRadius: 8, border: "1px solid #ddd" }}
              />
            </div>
          </div>

          <button
            onClick={handleConvert}
            disabled={!canConvert}
            style={{
              marginTop: 16,
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #111",
              background: canConvert ? "#111" : "#999",
              color: "#fff",
              cursor: canConvert ? "pointer" : "default",
            }}
          >
            {isWorking ? "Working…" : "Convert and download"}
          </button>

          {error && <p style={{ marginTop: 12, color: "#b00020" }}>{error}</p>}

          <p style={{ marginTop: 14, color: "#666", fontSize: 14 }}>
            Your PDF is processed in your browser. Files are not uploaded to a server.
          </p>
        </div>

        <aside style={{ border: "1px solid #e6e6e6", borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Ad space</div>
          <div style={{ color: "#666", fontSize: 14, lineHeight: 1.4 }}>
            When you are approved for ads, you can paste ad code here or move it into a component.
          </div>

          <div
            style={{
              marginTop: 12,
              background: "#f6f6f6",
              borderRadius: 10,
              padding: 12,
              color: "#777",
              fontSize: 13,
            }}
          >
            Placeholder box
          </div>
        </aside>
      </section>

      <footer style={{ marginTop: 22, color: "#777", fontSize: 13 }}>
        <p style={{ margin: 0 }}>
          Tip: if a PDF is already a scanned image, it will remain non searchable unless you OCR it.
        </p>
      </footer>
    </main>
  );
}