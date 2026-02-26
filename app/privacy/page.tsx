import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main
      style={{
        maxWidth: 820,
        margin: "0 auto",
        padding: 24,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
      }}
    >
      <h1 style={{ marginTop: 0, fontWeight: 800 }}>Privacy Policy</h1>

      <p>This site provides a PDF formatting tool that runs in your browser.</p>

      <h2 style={{ fontWeight: 800, marginTop: 18 }}>File handling</h2>
      <p>
        Your PDF is processed locally in your browser and is not uploaded to our servers by the tool itself.
      </p>

      <h2 style={{ fontWeight: 800, marginTop: 18 }}>Analytics and advertising</h2>
      <p>
        If advertising is enabled, third party ad providers may use cookies or similar technologies to show ads and
        measure performance. You can control cookies in your browser settings. If we use a consent banner, you can
        manage your preferences there.
      </p>

      <h2 style={{ fontWeight: 800, marginTop: 18 }}>Contact</h2>
      <p>
        If you have questions, contact:{" "}
        <a href="mailto:katherinehluo@gmail.com" style={{ color: "#111" }}>
          katherinehluo@gmail.com
        </a>
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