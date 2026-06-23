
import { ArrowRight } from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_HIGHLIGHT,
  getCategoryCardStyles,
} from "../data/categories";

interface CategoryGridProps {
  categoryPulse: string | null;
  onCategoryNavigate: (label: string) => void;
  isCategoryActive: (label: string) => boolean;
}

export function CategoryGrid({
  categoryPulse,
  onCategoryNavigate,
  isCategoryActive,
}: CategoryGridProps) {
  return (
    <section
      style={{ background: "#f5f5f4", fontFamily: "'Inter', sans-serif", padding: "56px 0" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: CATEGORY_HIGHLIGHT.orange,
                marginBottom: "6px",
              }}
            >
              TELUSURI
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
              Kategori Produk
            </h2>
          </div>
          <button
            onClick={() => onCategoryNavigate("Material Bangunan")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: CATEGORY_HIGHLIGHT.orange,
              fontSize: "0.82rem",
              fontWeight: 600,
              transition: "gap 0.15s",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
            className="hidden sm:flex hover:gap-2"
          >
            Semua Kategori <ArrowRight size={15} />
          </button>
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          }}
          className="max-md:grid-cols-2 max-sm:grid-cols-1"
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = isCategoryActive(cat.label);
            const pulsing = categoryPulse === cat.label;
            const highlighted = active || pulsing;
            const cardStyles = getCategoryCardStyles(pulsing, highlighted);

            return (
              <button
                key={cat.label}
                onClick={() => onCategoryNavigate(cat.label)}
                style={{
                  ...cardStyles,
                  borderRadius: "12px",
                  overflow: "hidden",
                  textAlign: "left",
                  position: "relative",
                  cursor: "pointer",
                }}
                className="hover:-translate-y-1 hover:shadow-lg hover:border-orange-200 group"
              >
                {pulsing && <span className="category-switch-ripple" />}
                {/* Image */}
                <div
                  style={{
                    height: "140px",
                    overflow: "hidden",
                    background: cat.bg,
                    position: "relative",
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    className="group-hover:scale-105"
                  />
                  {/* overlay */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 60%)",
                    }}
                  />
                  {/* Icon badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: highlighted ? CATEGORY_HIGHLIGHT.orange : cat.color,
                      borderRadius: "8px",
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: CATEGORY_HIGHLIGHT.transition,
                    }}
                  >
                    <Icon size={18} color="#ffffff" />
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "14px 16px 16px" }}>
                  <p
                    style={{
                      fontFamily: "'Barlow', sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: highlighted ? CATEGORY_HIGHLIGHT.orange : "#1c1917",
                      marginBottom: "3px",
                      transition: CATEGORY_HIGHLIGHT.transition,
                    }}
                  >
                    {cat.label}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#78716c", marginBottom: "10px" }}>
                    {cat.desc}
                  </p>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: highlighted ? CATEGORY_HIGHLIGHT.orange : cat.color,
                      letterSpacing: "0.04em",
                      transition: CATEGORY_HIGHLIGHT.transition,
                    }}
                  >
                    {cat.count}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
