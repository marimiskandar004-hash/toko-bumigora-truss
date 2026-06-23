import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const SLIDES = [
  {
    id: 1,
    tag: "PROMO RAMADAN",
    title: "Material Bangunan\nDiskon s/d 40%",
    subtitle: "Semen, bata, besi, dan ribuan produk lainnya dengan harga terbaik.",
    cta: "Belanja Sekarang",
    ctaSecondary: "Lihat Semua Promo",
    bg: "linear-gradient(120deg, #1c0a00 0%, #7c2d12 50%, #ea580c 100%)",
    accent: "#fbbf24",
    image: "https://images.unsplash.com/photo-1574757987642-5755f0839101?w=800&h=600&fit=crop&auto=format",
    imageAlt: "Pekerja konstruksi menuang semen",
    badge: "Hemat hingga Rp 500rb",
  },
  {
    id: 2,
    tag: "KOLEKSI PERKAKAS",
    title: "Peralatan Profesional\nHarga Terjangkau",
    subtitle: "Bor, gerinda, gergaji, dan alat tangan berkualitas untuk proyek Anda.",
    cta: "Lihat Perkakas",
    ctaSecondary: "Panduan Memilih Alat",
    bg: "linear-gradient(120deg, #0f172a 0%, #1e3a5f 50%, #1d4ed8 100%)",
    accent: "#38bdf8",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&h=600&fit=crop&auto=format",
    imageAlt: "Bor DEWALT profesional",
    badge: "Garansi 1 Tahun",
  },
  {
    id: 3,
    tag: "CAT & FINISHING",
    title: "Warnai Rumah Anda\ndengan Ribuan Pilihan",
    subtitle: "Cat interior, eksterior, dan waterproofing dari merek-merek terpercaya.",
    cta: "Pilih Warna",
    ctaSecondary: "Konsultasi Gratis",
    bg: "linear-gradient(120deg, #1a1a1a 0%, #2d4a3e 50%, #16a34a 100%)",
    accent: "#86efac",
    image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=800&h=600&fit=crop&auto=format",
    imageAlt: "Cat roller berbagai warna",
    badge: "1.000+ Pilihan Warna",
  },
];

export function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => go(1), 5000);
    return () => clearInterval(timer);
  }, [current]);

  function go(dir: number) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((c: number) => (c + dir + SLIDES.length) % SLIDES.length);
      setAnimating(false);
    }, 200);
  }

  const slide = SLIDES[current];

  return (
    <section
      style={{
        background: slide.bg,
        transition: "background 0.6s ease",
        fontFamily: "'Inter', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
      className="max-md:overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "0",
            minHeight: "420px",
            alignItems: "center",
          }}
          className="max-md:grid-cols-1 max-md:min-h-[min(380px,70vh)]"
        >
          {/* Text side */}
          <div
            style={{
              padding: "56px 0 56px",
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(10px)" : "translateY(0)",
              transition: "opacity 0.25s, transform 0.25s",
            }}
          >
            <span
              style={{
                background: slide.accent,
                color: "#1c1917",
                fontSize: "0.68rem",
                fontWeight: 800,
                letterSpacing: "0.1em",
                padding: "4px 12px",
                borderRadius: "4px",
                display: "inline-block",
                marginBottom: "20px",
              }}
            >
              {slide.tag}
            </span>
            <h1
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
                whiteSpace: "pre-line",
                marginBottom: "16px",
              }}
            >
              {slide.title}
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.92rem",
                lineHeight: 1.65,
                maxWidth: "400px",
                marginBottom: "32px",
              }}
            >
              {slide.subtitle}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                style={{
                  background: slide.accent,
                  color: "#1c1917",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  letterSpacing: "0.03em",
                  padding: "12px 24px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "transform 0.15s, box-shadow 0.15s",
                }}
                className="hover:scale-105 hover:shadow-lg"
              >
                {slide.cta} <ArrowRight size={16} />
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "rgba(255,255,255,0.8)",
                  fontWeight: 500,
                  fontSize: "0.85rem",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  transition: "background 0.15s",
                }}
                className="hover:bg-white/20"
              >
                {slide.ctaSecondary}
              </button>
            </div>

            {/* Badge */}
            <div
              style={{
                marginTop: "28px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: "100px",
                padding: "6px 14px",
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: slide.accent,
                  flexShrink: 0,
                }}
              />
              {slide.badge}
            </div>
          </div>

          {/* Image side */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "32px 0",
            }}
            className="max-md:hidden"
          >
            <div
              style={{
                width: "100%",
                maxWidth: "460px",
                aspectRatio: "4/3",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 32px 64px rgba(0,0,0,0.4)",
                opacity: animating ? 0 : 1,
                transform: animating ? "scale(0.97)" : "scale(1)",
                transition: "opacity 0.3s, transform 0.3s",
                background: "#1c1917",
              }}
            >
              <img
                src={slide.image}
                alt={slide.imageAlt}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
        }}
        className="absolute bottom-[20px] left-1/2 -translate-x-1/2 max-md:static max-md:mt-6 max-md:left-auto max-md:transform-none"
      >
        <button
          onClick={() => go(-1)}
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s",
          }}
          className="hover:bg-white/25"
        >
          <ChevronLeft size={16} />
        </button>
        <div className="flex gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === current ? "#ffffff" : "rgba(255,255,255,0.3)",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => go(1)}
          style={{
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.15s",
          }}
          className="hover:bg-white/25"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
}
