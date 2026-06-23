import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag } from "lucide-react";
import type { Product } from "../data/products";

export interface CartItem {
  product: Product;
  qty: number;
}

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: number, qty: number) => void;
  onRemove: (id: number) => void;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function CartDrawer({ open, onClose, items, onUpdateQty, onRemove }: CartDrawerProps) {
  const subtotal = items.reduce((acc, i) => acc + i.product.price * i.qty, 0);
  const shippingFree = subtotal >= 500000;
  const shipping = shippingFree ? 0 : 35000;
  const total = subtotal + shipping;

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 200,
            backdropFilter: "blur(2px)",
          }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          // gunakan 100dvh agar stabil saat browser mobile mengubah tinggi viewport
          height: "100dvh",
          bottom: "auto",
          width: "min(420px, 100vw)",
          background: "#ffffff",
          zIndex: 201,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Inter', sans-serif",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #f5f5f4",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#ffffff",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ShoppingBag size={20} style={{ color: "#ea580c" }} />
            <h2
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "1.1rem",
                fontWeight: 800,
                color: "#1c1917",
                letterSpacing: "-0.01em",
              }}
            >
              Keranjang Belanja
            </h2>
            {items.length > 0 && (
              <span
                style={{
                  background: "#ea580c",
                  color: "#fff",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  width: "22px",
                  height: "22px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {items.reduce((a, i) => a + i.qty, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              color: "#a8a29e",
              padding: "6px",
              borderRadius: "8px",
              transition: "background 0.15s, color 0.15s",
            }}
            className="hover:bg-stone-100 hover:text-stone-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free shipping progress */}
        {!shippingFree && subtotal > 0 && (
          <div style={{ padding: "12px 24px", background: "#fff7ed", borderBottom: "1px solid #fed7aa", flexShrink: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "0.72rem", color: "#c2410c" }}>
                <Tag size={11} style={{ display: "inline", marginRight: "4px" }} />
                Tambah {formatPrice(500000 - subtotal)} lagi untuk gratis ongkir!
              </span>
            </div>
            <div style={{ background: "#fed7aa", borderRadius: "4px", height: "4px", overflow: "hidden" }}>
              <div
                style={{
                  background: "#ea580c",
                  height: "100%",
                  width: `${Math.min(100, (subtotal / 500000) * 100)}%`,
                  borderRadius: "4px",
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        )}
        {shippingFree && items.length > 0 && (
          <div style={{ padding: "10px 24px", background: "#ecfdf5", borderBottom: "1px solid #a7f3d0", flexShrink: 0 }}>
            <span style={{ fontSize: "0.72rem", color: "#065f46", fontWeight: 600 }}>
              ✓ Selamat! Kamu mendapat gratis ongkir
            </span>
          </div>
        )}

        {/* Items */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 24px",
            paddingBottom: "calc(16px + env(safe-area-inset-bottom))",
          }}
        >
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "12px",
                color: "#a8a29e",
              }}
            >
              <ShoppingBag size={48} style={{ opacity: 0.3 }} />
              <p style={{ fontSize: "0.9rem" }}>Keranjang masih kosong</p>
              <button
                onClick={onClose}
                style={{
                  background: "#ea580c",
                  color: "#fff",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  padding: "10px 20px",
                  borderRadius: "8px",
                  marginTop: "8px",
                }}
              >
                Mulai Belanja
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {items.map(({ product, qty }) => (
                <div
                  key={product.id}
                  style={{
                    display: "flex",
                    gap: "12px",
                    padding: "14px",
                    background: "#fafaf9",
                    border: "1px solid #f5f5f4",
                    borderRadius: "12px",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      flexShrink: 0,
                      background: "#e7e5e4",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.72rem", color: "#ea580c", fontWeight: 600, marginBottom: "2px" }}>
                      {product.brand}
                    </p>
                    <p
                      style={{
                        fontSize: "0.82rem",
                        fontWeight: 500,
                        color: "#292524",
                        marginBottom: "8px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.name}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span
                        style={{
                          fontFamily: "'Barlow', sans-serif",
                          fontSize: "0.95rem",
                          fontWeight: 800,
                          color: "#1c1917",
                        }}
                      >
                        {formatPrice(product.price * qty)}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <button
                          onClick={() => onUpdateQty(product.id, qty - 1)}
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "6px",
                            border: "1px solid #e7e5e4",
                            background: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#57534e",
                            transition: "background 0.12s",
                          }}
                          className="hover:bg-stone-100"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1c1917", minWidth: "20px", textAlign: "center" }}>
                          {qty}
                        </span>
                        <button
                          onClick={() => onUpdateQty(product.id, qty + 1)}
                          style={{
                            width: "26px",
                            height: "26px",
                            borderRadius: "6px",
                            border: "1px solid #e7e5e4",
                            background: "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#57534e",
                            transition: "background 0.12s",
                          }}
                          className="hover:bg-stone-100"
                        >
                          <Plus size={12} />
                        </button>
                        <button
                          onClick={() => onRemove(product.id)}
                          style={{
                            marginLeft: "4px",
                            color: "#dc2626",
                            padding: "4px",
                            borderRadius: "6px",
                            transition: "background 0.12s",
                          }}
                          className="hover:bg-red-50"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / summary */}
        {items.length > 0 && (
          <div
            style={{
              padding: "20px 24px",
              borderTop: "1px solid #f5f5f4",
              background: "#ffffff",
              flexShrink: 0,
              paddingBottom: "calc(20px + env(safe-area-inset-bottom))",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "#57534e" }}>
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: shippingFree ? "#059669" : "#57534e" }}>
                <span>Ongkos Kirim</span>
                <span>{shippingFree ? "GRATIS" : formatPrice(shipping)}</span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#1c1917",
                  paddingTop: "10px",
                  borderTop: "1px solid #f5f5f4",
                }}
              >
                <span>Total</span>
                <span
                  style={{
                    fontFamily: "'Barlow', sans-serif",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {formatPrice(total)}
                </span>
              </div>
            </div>
            <button
              style={{
                width: "100%",
                background: "#ea580c",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "0.03em",
                padding: "14px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "background 0.15s",
              }}
              className="hover:bg-orange-700"
            >
              Lanjut ke Pembayaran <ArrowRight size={16} />
            </button>
            <button
              onClick={onClose}
              style={{
                width: "100%",
                marginTop: "10px",
                color: "#78716c",
                fontSize: "0.8rem",
                fontWeight: 500,
                padding: "8px",
              }}
              className="hover:text-stone-900 transition-colors"
            >
              Lanjut Belanja
            </button>
          </div>
        )}
      </div>
    </>
  );
}
