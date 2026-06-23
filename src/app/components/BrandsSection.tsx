import { Star } from "lucide-react";

const BRANDS = [
  { name: "Holcim", category: "Semen & Beton", color: "#dc2626" },
  { name: "Bosch", category: "Perkakas", color: "#1d4ed8" },
  { name: "Dulux", category: "Cat & Coating", color: "#7c3aed" },
  { name: "Wavin", category: "Pipa & Sanitasi", color: "#0284c7" },
  { name: "Makita", category: "Power Tools", color: "#059669" },
  { name: "Roman", category: "Keramik", color: "#d97706" },
  { name: "Supreme", category: "Kabel Listrik", color: "#dc2626" },
  { name: "Monier", category: "Genteng", color: "#ea580c" },
];

const TESTIMONIALS = [
  {
    name: "Budi Santoso",
    role: "Kontraktor, Surabaya",
    text: "BM TRUSS jadi andalan saya untuk proyek-proyek besar. Harga kompetitif, stok lengkap, dan pengiriman cepat. Sudah 3 tahun berlangganan!",
    rating: 5,
    avatar: "BS",
  },
  {
    name: "Dewi Rahayu",
    role: "Pemilik Rumah, Jakarta",
    text: "Renovasi kamar mandi jadi mudah berkat BM TRUSS. Tim konsultannya sangat membantu menentukan material yang tepat sesuai budget.",
    rating: 5,
    avatar: "DR",
  },
  {
    name: "Ahmad Fauzi",
    role: "Arsitek, Bandung",
    text: "Katalog produknya sangat lengkap. Bisa nemuin material premium yang sulit dicari di toko lain. Layanan pelanggannya juga responsif.",
    rating: 5,
    avatar: "AF",
  },
];

export function BrandsSection() {
  return (
    <>
      {/* Brands */}
      <section style={{ background: "#ffffff", padding: "48px 0", fontFamily: "'Inter', sans-serif" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <p
            style={{
              textAlign: "center",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#a8a29e",
              marginBottom: "28px",
            }}
          >
            MEREK RESMI TERPERCAYA
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gap: "12px",
              alignItems: "center",
            }}
            className="max-lg:grid-cols-4 max-sm:grid-cols-4"
          >
            {BRANDS.map((brand) => (
              <button
                key={brand.name}
                style={{
                  background: "#fafaf9",
                  border: "1px solid #e7e5e4",
                  borderRadius: "12px",
                  padding: "16px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  transition: "border-color 0.15s, transform 0.15s",
                  cursor: "pointer",
                }}
                className="hover:border-orange-200 hover:scale-105"
              >
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: brand.color,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {brand.name}
                </span>
                <span style={{ fontSize: "0.6rem", color: "#a8a29e", letterSpacing: "0.04em" }}>
                  {brand.category}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        style={{
          background: "#f5f5f4",
          padding: "56px 0",
          fontFamily: "'Inter', sans-serif",
          borderTop: "1px solid #e7e5e4",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", color: "#ea580c", marginBottom: "6px" }}>
              ULASAN PELANGGAN
            </p>
            <h2
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(1.4rem, 2.5vw, 1.9rem)",
                fontWeight: 800,
                color: "#1c1917",
                letterSpacing: "-0.02em",
              }}
            >
              Dipercaya Ribuan Pelanggan
            </h2>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}
            className="max-md:grid-cols-1"
          >
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e7e5e4",
                  borderRadius: "16px",
                  padding: "28px",
                  transition: "box-shadow 0.2s",
                }}
                className="hover:shadow-md"
              >
                {/* Stars */}
                <div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
                  ))}
                </div>
                <p style={{ fontSize: "0.85rem", color: "#57534e", lineHeight: 1.7, marginBottom: "20px" }}>
                  "{t.text}"
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "#ea580c",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1c1917" }}>{t.name}</p>
                    <p style={{ fontSize: "0.72rem", color: "#a8a29e" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
