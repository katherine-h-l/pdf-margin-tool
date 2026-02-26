import Link from "next/link";

export default function HelpPage() {
  return (
    <main
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: 24,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
    >
      <h1 style={{ marginTop: 0, fontWeight: 800 }}>Help</h1>

      <p>
        This tool adds blank space to the right and bottom of each PDF page while keeping the original content intact.
      </p>

      <h2 style={{ fontWeight: 800, marginTop: 18 }}>How to use</h2>
      <p>
        Upload a PDF, set the right and bottom space in inches, then convert. A new PDF downloads automatically.
      </p>

      <h2 style={{ fontWeight: 800, marginTop: 18 }}>Notes</h2>
      <p>
        If your PDF is a scan, it may not be searchable because it contains images of text. This tool does not add OCR.
      </p>

      <p style={{ marginTop: 18 }}>
        <Link
          href="/"
          style={{
            display: "inline-block",
            border: "1px solid #222",
            borderRadius: 10,
            padding: "10px 12px",
            background: "#fff",
            textDecoration: "none",
            color: "#111",
            fontWeight: 600,
          }}
        >
          Back to the tool
        </Link>
      </p>
    </main>
  );
}