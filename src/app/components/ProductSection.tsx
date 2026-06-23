import { useState, useEffect } from "react";
import { ShoppingCart, Eye } from "lucide-react";

interface ProductSectionProps {
  title?: string;
  limit?: number;
  onAddToCart: (product: any) => void;
  onNavigate: (to: string) => void;
  categoryFilter?: string;
}

export function ProductSection({
  title = "Rekomendasi Produk Terbaik",
  limit = 4,
  onAddToCart,
  onNavigate,
  categoryFilter,
}: ProductSectionProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8888/api_products.php")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          let filtered = data;
          if (categoryFilter) {
            filtered = data.filter((p) => p.category === categoryFilter);
          }
          setProducts(filtered.slice(0, limit));
        }
      })
      .catch((err) => console.error("Gagal memuat data seksi produk:", err))
      .finally(() => setLoading(false));
  }, [limit, categoryFilter]);

  const formatRupiah = (price: any) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Number(price));
  };

  if (loading) {
    return (
      <div style={{ padding: "2rem", textAlign: "center", color: "#666" }}>
        <p style={{ fontWeight: 500 }}>Memuat produk unggulan...</p>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div style={{ padding: "3rem 0", background: "#f5f5f4" }}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Judul Seksi */}
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 800,
            color: "#1c1917",
            marginBottom: "1.5rem",
            borderLeft: "5px solid #ea580c",
            paddingLeft: "0.75rem",
          }}
        >
          {title}
        </h2>

        {/* Grid Layout Produk */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                background: "white",
                borderRadius: "8px",
                border: "1px solid #e7e5e4",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              {/* Gambar / Thumbnail */}
              <div
                style={{
                  height: "160px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  background: "#fafafa",
                  borderRadius: "6px",
                  marginBottom: "1rem",
                  overflow: "hidden",
                }}
              >
                <img
                  src={product.image || product.image_url || "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=500"}
                  alt={product.name}
                  style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
              </div>

              {/* Konten Teks */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "#ea580c", fontWeight: 600, textTransform: "uppercase" }}>
                    {product.category}
                  </span>
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: "#292524",
                      margin: "0.25rem 0",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      minHeight: "2.6rem",
                    }}
                  >
                    {product.name}
                  </h3>
                  <div style={{ fontWeight: 800, color: "#ea580c", fontSize: "1.1rem", marginBottom: "1rem" }}>
                    {formatRupiah(product.price)}
                  </div>
                </div>

                {/* Grouping Tombol Aksi */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => onNavigate(`/product/${product.id}`)}
                    style={{
                      flex: 1,
                      background: "#f5f5f4",
                      border: "1px solid #d6d3d1",
                      borderRadius: "6px",
                      padding: "0.5rem",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    title="Lihat Detail"
                  >
                    <Eye size={16} color="#57534e" />
                  </button>
                  <button
                    onClick={() => onAddToCart(product)}
                    style={{
                      flex: 3,
                      background: "#ea580c",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      padding: "0.5rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "0.25rem",
                      fontSize: "0.85rem",
                    }}
                  >
                    <ShoppingCart size={16} /> + Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}