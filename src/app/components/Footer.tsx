import {
  HardHat,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
} from "lucide-react";

const LINKS = {
  Produk: ["Material Bangunan", "Perkakas & Alat", "Sanitasi & Air", "Kelistrikan", "Cat & Finishing", "Atap & Lantai"],
  Layanan: ["Pengiriman & Instalasi", "Sewa Alat Berat", "Konsultasi Teknis", "Program Kontraktor", "Pembelian Grosir"],
  Perusahaan: ["Tentang Kami", "Karir", "Blog & Tips", "Press Release", "Hubungi Kami"],
};

const STORES = [
  { city: "Mataram", addr: "Jl. Panji Anom. 123, Mataram 83111" },
  { city: "Montong Tangi", addr: "Jl. Hassanudin No. 45, Montong Tangi 83674" },
  { city: "Bandung", addr: "Jl. Soekarno Hatta No. 78, Bandung 40223" },
];

export function Footer() {
  return (
    <footer
      style={{
        background: "#0c0c0b",
        fontFamily: "'Inter', sans-serif",
        color: "#a8a29e",
      }}
    >
      {/* Newsletter */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          padding: "40px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "24px",
            }}
            className="max-md:flex-col max-md:items-start"
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  color: "#f5f5f4",
                  letterSpacing: "-0.02em",
                  marginBottom: "4px",
                }}
              >
                Dapatkan Promo Eksklusif
              </h3>
              <p style={{ fontSize: "0.82rem", color: "#78716c" }}>
                Daftar newsletter dan hemat hingga 30% untuk pembelian pertama.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                background: "#1c1917",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                overflow: "hidden",
                minWidth: "min(380px, 100%)",
              }}
            >
              <input
                type="email"
                placeholder="Masukkan email kamu…"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: "12px 16px",
                  fontSize: "0.85rem",
                  color: "#f5f5f4",
                }}
                className="placeholder-stone-600"
              />
              <button
                style={{
                  background: "#ea580c",
                  color: "#fff",
                  padding: "0 20px",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "background 0.15s",
                  flexShrink: 0,
                }}
                className="hover:bg-orange-700"
              >
                Daftar <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div style={{ padding: "56px 0 40px" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.5fr repeat(3, 1fr)",
              gap: "40px",
            }}
            className="max-lg:grid-cols-2 max-sm:grid-cols-1"
          >
            {/* Brand col */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
                <div
                  style={{
                    background: "#ea580c",
                    borderRadius: "8px",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <HardHat size={18} color="#fff" />
                </div>
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    color: "#f5f5f4",
                    letterSpacing: "-0.02em",
                  }}
                >
                  BM TRUSS
                </span>
              </div>
              <p style={{ fontSize: "0.82rem", lineHeight: 1.75, marginBottom: "20px", maxWidth: "280px" }}>
                Toko material bangunan terlengkap dengan lebih dari 50.000 produk. Melayani pelanggan personal, kontraktor, dan perusahaan konstruksi sejak 2005.
              </p>

              {/* Stores */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                {STORES.map((s) => (
                  <div key={s.city} style={{ display: "flex", gap: "8px" }}>
                    <MapPin size={14} style={{ color: "#ea580c", marginTop: "2px", flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#d6d3d1" }}>{s.city}</p>
                      <p style={{ fontSize: "0.72rem", color: "#78716c" }}>{s.addr}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact */}
              <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
                <a href="tel:087885643633" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#a8a29e", transition: "color 0.15s" }} className="hover:text-orange-400">
                  <Phone size={13} /> 0878-8564-3633 (Gratis)
                </a>
                <a href="mailto:halo@BMTRUSS.id" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#a8a29e", transition: "color 0.15s" }} className="hover:text-orange-400">
                  <Mail size={13} /> halo@BMTRUSS.id
                </a>
              </div>

              {/* Social */}
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Youtube, label: "YouTube" },
                ].map(({ Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#78716c",
                      transition: "background 0.15s, color 0.15s",
                    }}
                    className="hover:bg-orange-500/20 hover:text-orange-400"
                  >
                    <Icon size={16} />
                  </button>
                ))}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(LINKS).map(([title, links]) => (
              <div key={title}>
                <p
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    color: "#f5f5f4",
                    marginBottom: "16px",
                  }}
                >
                  {title.toUpperCase()}
                </p>
                <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        style={{ fontSize: "0.82rem", color: "#78716c", transition: "color 0.15s" }}
                        className="hover:text-orange-400"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          padding: "20px 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              fontSize: "0.75rem",
            }}
            className="max-sm:flex-col max-sm:text-center"
          >
            <p style={{ color: "#57534e" }}>
              © 2026 BM TRUSS. Hak Cipta Dilindungi.
            </p>
            <div style={{ display: "flex", gap: "20px" }}>
              {["Syarat & Ketentuan", "Kebijakan Privasi", "Kebijakan Pengembalian"].map((t) => (
                <a key={t} href="#" style={{ color: "#57534e", transition: "color 0.15s" }} className="hover:text-orange-400">
                  {t}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
