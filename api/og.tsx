import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default function handler(req: Request) {
  const url = new URL(req.url);

  const title = url.searchParams.get("title") ?? "Aditya Tripathi — Portfolio";
  const subtitle = url.searchParams.get("subtitle") ?? "AI • Robotics • Startups";
  const description =
    url.searchParams.get("description") ??
    "Builder of autonomous drones, product systems, and real-world tools.";

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(900px 450px at 20% 15%, rgba(99,102,241,0.35), rgba(0,0,0,0)), radial-gradient(800px 400px at 80% 70%, rgba(236,72,153,0.25), rgba(0,0,0,0)), linear-gradient(180deg, #05070F 0%, #070A14 60%, #05070F 100%)",
          color: "#E5E7EB",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontSize: 22,
              color: "rgba(229,231,235,0.85)",
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: 999,
                background: "#6366F1",
                boxShadow: "0 0 0 6px rgba(99,102,241,0.15)",
              }}
            />
            Portfolio
          </div>

          <div
            style={{
              fontSize: 74,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              fontSize: 28,
              fontWeight: 600,
              color: "rgba(229,231,235,0.9)",
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 28,
              lineHeight: 1.35,
              maxWidth: 980,
              color: "rgba(229,231,235,0.78)",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 26,
            borderTop: "1px solid rgba(148,163,184,0.18)",
            fontSize: 22,
            color: "rgba(229,231,235,0.75)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "rgba(99,102,241,0.18)",
                border: "1px solid rgba(99,102,241,0.25)",
              }}
            />
            <div>beni-aditya.dev</div>
          </div>
          <div style={{ opacity: 0.9 }}>Built with purpose</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
