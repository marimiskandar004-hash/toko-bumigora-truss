import { ArrowRight, Truck, Shield, PhoneCall, RotateCcw } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "Gratis Kirim",
    desc: "Minimal pembelian Rp 500.000",
    color: "#0284c7",
  },
  {
    icon: Shield,
    title: "Produk Terjamin",
    desc: "100% original bergaransi",
    color: "#059669",
  },
  {
    icon: PhoneCall,
    title: "Konsultasi Gratis",
    desc: "Tim ahli siap membantu 24/7",
    color: "#ea580c",
  },
  {
    icon: RotateCcw,
    title: "Retur Mudah",
    desc: "7 hari retur tanpa syarat",
    color: "#7c3aed",
  },
];

export function PromoBanner() {
  return (
    <>
      {/* Trust bar */}
      <div style={{ background: "#fafaf9", borderTop: "1px solid #e7e5e4", borderBottom: "1px solid #e7e5e4", padding: "28px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px" }}
            className="max-md:grid-cols-2"
          >
            {TRUST_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  style={{ display: "flex", alignItems: "flex-start", gap: "14px", fontFamily: "'Inter', sans-serif" }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "10px",
                      background: `${item.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} style={{ color: item.color }} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1c1917", marginBottom: "2px" }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#78716c" }}>{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Promo double banner */}
      <div style={{ background: "#f5f5f4", padding: "40px 0" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
            className="max-md:grid-cols-1"
          >
            {/* Banner 1 */}
            <div
              style={{
                background: "linear-gradient(120deg, #0f172a 0%, #1e3a5f 100%)",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                position: "relative",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              className="hover:scale-[1.01] overflow-hidden max-md:overflow-visible"
            >
              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "#38bdf8", marginBottom: "8px", fontFamily: "'Inter', sans-serif" }}>
                  SPESIAL KONTRAKTOR
                </p>
                <h3
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1.2,
                    marginBottom: "12px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Beli Grosir,<br />Harga Lebih Hemat
                </h3>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#38bdf8",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Daftar Program <ArrowRight size={14} />
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1685464196387-854858ce0f4f?w=200&h=200&fit=crop&auto=format"
                alt="Konstruksi"
                style={{ objectFit: "cover", borderRadius: "12px", opacity: 0.85, flexShrink: 0 }}
                className="w-[120px] h-[120px] max-md:w-[96px] max-md:h-[96px]"
              />
              {/* Decorative circle */}
              <div
                style={{
                  position: "absolute",
                  right: "-40px",
                  top: "-40px",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: "rgba(56,189,248,0.06)",
                  pointerEvents: "none",
                }}
                className="max-md:hidden"
              />
            </div>

            {/* Banner 2 */}
            <div
              style={{
                background: "linear-gradient(120deg, #1a0a00 0%, #7c2d12 100%)",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                position: "relative",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
              className="hover:scale-[1.01] overflow-hidden max-md:overflow-visible"
            >
              <div style={{ position: "relative", zIndex: 1 }}>
                <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "#fb923c", marginBottom: "8px", fontFamily: "'Inter', sans-serif" }}>
                  SEWA ALAT BERAT
                </p>
                <h3
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "#ffffff",
                    lineHeight: 1.2,
                    marginBottom: "12px",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Scaffolding &<br />Alat Berat Harian
                </h3>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#fb923c",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Lihat Stok <ArrowRight size={14} />
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1669170930713-f7c778496177?w=200&h=200&fit=crop&auto=format"
                alt="Alat berat"
                style={{ objectFit: "cover", borderRadius: "12px", opacity: 0.85, flexShrink: 0 }}
                className="w-[120px] h-[120px] max-md:w-[96px] max-md:h-[96px]"
              />
              <div
                style={{
                  position: "absolute",
                  right: "-40px",
                  top: "-40px",
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  background: "rgba(251,146,60,0.06)",
                  pointerEvents: "none",
                }}
                className="max-md:hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
