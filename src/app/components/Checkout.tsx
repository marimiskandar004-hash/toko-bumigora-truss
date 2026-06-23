import { useState } from "react";
import type { CartItem } from "./CartDrawer";

interface CheckoutProps {
  items: CartItem[];
  onPlaceOrder: (payload: { name: string; address: string }) => void;
  onNavigate?: (path: string) => void;
}

export function Checkout({ items, onPlaceOrder, onNavigate }: CheckoutProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <button onClick={() => onNavigate?.("/")}>← Kembali</button>
      <h2>Checkout</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24, marginTop: 12 }}>
        <div>
          <h3>Alamat Pengiriman</h3>
          <form onSubmit={(e) => { e.preventDefault(); onPlaceOrder({ name, address }); }} style={{ display: "grid", gap: 8 }}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama penerima" required />
            <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat lengkap" required />
            <button type="submit" style={{ background: "#ea580c", color: "white", padding: "10px 14px", borderRadius: 8 }}>Place Order</button>
          </form>
        </div>
        <div style={{ background: "white", padding: 12, borderRadius: 8, border: "1px solid #eee" }}>
          <h3>Ringkasan Pesanan</h3>
          <ul>
            {items.map((it) => (
              <li key={it.product.id} style={{ padding: "8px 0", borderBottom: "1px solid #f3f3f3" }}>
                {it.product.name} x{it.qty} — Rp{(it.product.price * it.qty).toLocaleString("id-ID")}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 8, fontWeight: 800 }}>Total: Rp{total.toLocaleString("id-ID")}</div>
        </div>
      </div>
    </div>
  );
}
