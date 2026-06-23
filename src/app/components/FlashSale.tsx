import { useState, useEffect } from "react";
import { Zap, ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { FLASH_SALE_PRODUCTS } from "../data/products";
import type { Product } from "../data/products";

interface FlashSaleProps {
  onAddToCart: (product: Product) => void;
  products?: Product[];
}

function useCountdown(targetHours = 5) {
  const [time, setTime] = useState(() => {
    const now = new Date();
    const end = new Date(now);
    end.setHours(end.getHours() + targetHours, 0, 0, 0);
    return Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
  });

  useEffect(() => {
    const id = setInterval(() => setTime((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const h = String(Math.floor(time / 3600)).padStart(2, "0");
  const m = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
  const s = String(time % 60).padStart(2, "0");
  return { h, m, s };
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          background: "#1c1917",
          color: "#ffffff",
          fontFamily: "'Barlow', sans-serif",
          fontSize: "1.4rem",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          width: "48px",
          height: "48px",
          borderRadius: "8px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <p style={{ fontSize: "0.6rem", color: "#a8a29e", marginTop: "4px", letterSpacing: "0.06em" }}>
        {label}
      </p>
    </div>
  );
}

export function FlashSale({ onAddToCart, products = [] }: FlashSaleProps) {
  const { h, m, s } = useCountdown(4);

  return (
    <section
      style={{
        background: "linear-gradient(135deg, #1c0a00 0%, #431407 100%)",
        padding: "56px 0",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div
              style={{
                background: "#dc2626",
                borderRadius: "10px",
                padding: "8px 16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Zap size={18} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
              <span
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "0.02em",
                }}
              >
                FLASH SALE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>Berakhir dalam</span>
              <div className="flex items-center gap-1.5">
                <TimeBlock value={h} label="JAM" />
                <span style={{ color: "#dc2626", fontSize: "1.2rem", fontWeight: 800, marginBottom: "16px" }}>:</span>
                <TimeBlock value={m} label="MENIT" />
                <span style={{ color: "#dc2626", fontSize: "1.2rem", fontWeight: 800, marginBottom: "16px" }}>:</span>
                <TimeBlock value={s} label="DETIK" />
              </div>
            </div>
          </div>

          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "#fbbf24",
              fontSize: "0.82rem",
              fontWeight: 600,
            }}
            className="hover:gap-2 transition-all"
          >
            Lihat Semua <ArrowRight size={15} />
          </button>
        </div>

        {/* Products */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
          className="max-lg:grid-cols-2 max-sm:grid-cols-1"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}
