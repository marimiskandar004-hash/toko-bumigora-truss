import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";

interface ProductDetailProps {
  id: number;
  onAddToCart: (product: any) => void; // Menggunakan 'any' agar fleksibel menerima tipe produk dari DB
  onNavigate: (to: string) => void;
  products?: any[]; // Menggunakan 'any[]' agar kebal dari validasi strict cetak biru lokal
}

export function ProductDetail({ id, onAddToCart, onNavigate, products = [] }: ProductDetailProps) {
  const [product, setProduct] = useState<any | null>(null); // State di-set 'any' untuk menampung deskripsi, brand, dll
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    
    // 1. Cari produk di dalam array pasokan data MySQL MAMP terlebih dahulu
    let foundProduct = products.find((p) => Number(p.id) === Number(id));

    // 2. Jika tidak ketemu (atau halaman di-refresh), lakukan fetch mandiri langsung ke API MAMP
    if (!foundProduct) {
      fetch("http://localhost:8888/api_products.php")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            const liveProduct = data.find((p) => Number(p.id) === Number(id));
            if (liveProduct) setProduct(liveProduct);
          }
        })
        .catch((err) => console.error("Gagal memuat detail produk dari MySQL:", err))
        .finally(() => setLoading(false));
    } else {
      setProduct(foundProduct);
      setLoading(false);
    }
  }, [id, products]);

  if (loading) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid #f3f4f6", borderTopColor: "#ea580c", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "2rem" }}>
        <p style={{ fontSize: "1.2rem", color: "#666", fontWeight: 600 }}>Waduh, Produk Tidak Ditemukan!</p>
        <button 
          onClick={() => onNavigate("/")}
          style={{ marginTop: "1rem", background: "#ea580c", color: "white", padding: "0.5rem 1.5rem", borderRadius: "6px", border: "none", cursor: "pointer" }}
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Format harga Rupiah konvensional
  const formatRupiah = (price: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(Number(price));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f4", padding: "2rem 0" }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Tombol Kembali */}
        <button
          onClick={() => window.history.back()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "transparent",
            border: "none",
            color: "#4b5563",
            cursor: "pointer",
            fontWeight: 600,
            marginBottom: "1.5rem",
          }}
        >
          <ArrowLeft size={20} /> Kembali
        </button>

        {/* Kotak Utama Detail */}
        <div
          style={{
            background: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2.5rem",
            padding: "2.5rem",
          }}
        >
          {/* Sisi Kiri: Gambar Produk */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#fafafa", borderRadius: "8px", padding: "1rem" }}>
            <img
              src={product.image || product.image_url || "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=500"}
              alt={product.name}
              style={{ maxWidth: "100%", maxHeight: "400px", objectFit: "contain", borderRadius: "8px" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=500";
              }}
            />
          </div>

          {/* Sisi Kanan: Informasi Konten Produk */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ background: "#ffedd5", color: "#ea580c", padding: "0.25rem 0.75rem", borderRadius: "9999px", fontSize: "0.85rem", fontWeight: 600 }}>
                {product.category}
              </span>
              
              <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#1c1917", margin: "0.75rem 0 0.5rem 0" }}>
                {product.name}
              </h1>

              <p style={{ color: "#78716c", fontSize: "1rem", margin: "0 0 1rem 0" }}>
                Merek: <strong style={{ color: "#444" }}>{product.brand || "Generik"}</strong>
              </p>

              {/* Rating Bintang */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginBottom: "1.5rem" }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.floor(product.rating || 4.5) ? "#eab308" : "none"}
                    color={i < Math.floor(product.rating || 4.5) ? "#eab308" : "#d1d5db"}
                  />
                ))}
                <span style={{ marginLeft: "0.5rem", fontWeight: 600, color: "#444" }}>
                  {product.rating || "4.5"}
                </span>
              </div>

              {/* Tempat Tampilan Harga */}
              <div style={{ fontSize: "2.2rem", fontWeight: 800, color: "#ea580c", background: "#fff7ed", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem" }}>
                {formatRupiah(product.price)}
              </div>

              <p style={{ color: "#57534e", lineHeight: 1.6, margin: "0 0 2rem 0" }}>
                {product.description || "Bahan material bangunan premium pilihan berstandar nasional Indonesia (SNI). Sangat kokoh dan cocok untuk kebutuhan konstruksi bangunan hunian maupun proyek skala besar Anda."}
              </p>
            </div>

            {/* Tombol Keranjang & Fitur Utama Toko */}
            <div>
              <button
                onClick={() => onAddToCart(product)}
                style={{
                  width: "100%",
                  background: "#ea580c",
                  color: "white",
                  padding: "1rem",
                  borderRadius: "8px",
                  border: "none",
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "0.75rem",
                  boxShadow: "0 4px 10px rgba(234, 88, 12, 0.2)",
                  transition: "background 0.2s",
                }}
                onMouseOver={(e) => ((e.target as HTMLButtonElement).style.background = "#c2410c")}
                onMouseOut={(e) => ((e.target as HTMLButtonElement).style.background = "#ea580c")}
              >
                <ShoppingCart size={22} /> Masukkan ke Keranjang
              </button>

              {/* Badges Jaminan Kepercayaan */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.5rem", marginTop: "1.5rem", paddingTop: "1.5rem", borderTop: "1px solid #e7e5e4", textAlign: "center", fontSize: "0.8rem", color: "#78716c" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                  <ShieldCheck size={20} style={{ color: "#16a34a" }} />
                  <span>Produk Asli / SNI</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                  <Truck size={20} style={{ color: "#2563eb" }} />
                  <span>Kirim via Armada Toko</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
                  <RotateCcw size={20} style={{ color: "#dc2626" }} />
                  <span>Retur Rusak 2x24 Jam</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}