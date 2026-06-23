import React from "react";
import { ShoppingCart, Star, Heart } from "lucide-react";
import type { Product } from "../data/products";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onView?: (id: number) => void;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}rb`;
  return String(n);
}

export function ProductCard({ product, onAddToCart, onView }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e7e5e4",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
        cursor: "pointer",
      }}
      className="hover:-translate-y-1 hover:shadow-lg hover:border-orange-200 group"
      onClick={() => onView?.(product.id)}
    >
      {/* Image */}
      <div style={{ position: "relative", background: "#f5f5f4", aspectRatio: "1" }}>
        <img
          src={product.image}
          alt={product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
          className="group-hover:scale-105"
        />
        {product.badge && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: product.badgeColor || "#ea580c",
              color: "#fff",
              fontSize: "0.62rem",
              fontWeight: 800,
              letterSpacing: "0.06em",
              padding: "3px 8px",
              borderRadius: "4px",
            }}
          >
            {product.badge}
          </span>
        )}
        {discount > 0 && (
          <span
            style={{
              position: "absolute",
              top: product.badge ? "34px" : "10px",
              left: "10px",
              background: "#fef2f2",
              color: "#dc2626",
              fontSize: "0.62rem",
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: "4px",
              border: "1px solid #fecaca",
            }}
          >
            -{discount}%
          </span>
        )}
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(255,255,255,0.9)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0,
            transition: "opacity 0.15s",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
          className="group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart size={15} style={{ color: "#ea580c" }} />
        </button>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 14px 0", flex: 1 }}>
        <p
          style={{
            fontSize: "0.68rem",
            fontWeight: 600,
            color: "#ea580c",
            letterSpacing: "0.04em",
            marginBottom: "4px",
          }}
        >
          {product.brand}
        </p>
        <p
          style={{
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "#292524",
            lineHeight: 1.4,
            marginBottom: "8px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </p>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
          <Star size={12} style={{ fill: "#fbbf24", color: "#fbbf24" }} />
          <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#292524" }}>
            {product.rating}
          </span>
          <span style={{ fontSize: "0.72rem", color: "#a8a29e" }}>
            ({formatCount(product.reviews)}) &bull; {formatCount(product.sold)} terjual
          </span>
        </div>

        {/* Price */}
        <div>
          <p
            style={{
              fontFamily: "'Barlow', sans-serif",
              fontSize: "1.05rem",
              fontWeight: 800,
              color: "#1c1917",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            {formatPrice(product.price)}
            <span style={{ fontSize: "0.7rem", color: "#a8a29e", fontFamily: "'Inter', sans-serif", fontWeight: 400, marginLeft: "4px" }}>
              /{product.unit}
            </span>
          </p>
          {product.originalPrice && (
            <p style={{ fontSize: "0.72rem", color: "#a8a29e", textDecoration: "line-through", marginTop: "2px" }}>
              {formatPrice(product.originalPrice)}
            </p>
          )}
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "12px 14px 14px" }}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          style={{
            width: "100%",
            background: "#1c1917",
            color: "#ffffff",
            fontSize: "0.78rem",
            fontWeight: 700,
            letterSpacing: "0.03em",
            padding: "9px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "7px",
            transition: "background 0.15s",
          }}
          className="hover:bg-orange-600"
        >
          <ShoppingCart size={14} />
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
