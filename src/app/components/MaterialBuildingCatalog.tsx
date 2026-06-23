import { useState, useMemo, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import { type Product } from "../data/products";
import { ProductCard } from "./ProductCard";

const MATERIAL_SUBCATEGORIES = [
  "Semua",
  "Bata & Beton",
  "Pasir & Semen",
  "Besi & Baja",
  "Kayu & Triplek",
  "Gypsum & Plafon",
];

const SUBCATEGORY_KEYWORDS: Record<string, string[]> = {
  "Bata & Beton": ["bata", "beton", "batako", "block"],
  "Pasir & Semen": ["semen", "pasir", "portland", "mortir"],
  "Besi & Baja": ["besi", "baja", "profil", "steel"],
  "Kayu & Triplek": ["kayu", "triplek", "multipleks", "papan"],
  "Gypsum & Plafon": ["gypsum", "plafon", "board"],
};

type SortKey = "relevance" | "price-asc" | "price-desc" | "rating";

interface MaterialBuildingCatalogProps {
  onAddToCart?: (product: Product) => void;
  onNavigate?: (path: string) => void;
  currentCategory?: string;
  products?: Product[]; // Menerima pasokan data dari MySQL MAMP
  loading?: boolean;     // Menerima status loading global
}

export function MaterialBuildingCatalog({
  onAddToCart,
  onNavigate,
  currentCategory = "/material-bangunan",
  products = [], // Default di-set array kosong agar tidak crash
  loading = false
}: MaterialBuildingCatalogProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortKey>("relevance");
  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 12;

  const isSearchPage = currentCategory.startsWith("/search");

  function getDatabaseCategory(path: string): string {
    const cleanPath = path.split("?")[0];
    switch (cleanPath) {
      case "/material-bangunan": return "Material Bangunan";
      case "/sanitasi-dan-air": return "Sanitasi & Air";
      case "/kelistrikan": return "Kelistrikan";
      case "/perkakas-dan-alat": return "Perkakas & Alat";
      case "/cat-dan-finishing": return "Cat & Finishing";
      case "/atap-dan-lantai": return "Atap & Lantai";
      default: return "";
    }
  }

  const activeCategoryName = getDatabaseCategory(currentCategory);

  useEffect(() => {
    if (isSearchPage) {
      const searchParams = new URLSearchParams(window.location.search);
      const qParam = searchParams.get("q") || "";
      setSearchQuery(qParam);
    } else {
      setSearchQuery("");
    }
    setSelectedSubcategory("Semua");
    setPage(1);
  }, [currentCategory, isSearchPage]);

  const searchParams = new URLSearchParams(window.location.search);
  const searchCategoryParam = searchParams.get("cat") || "Semua";

  // SUDAH DIUBAH: Sekarang menyaring dari array 'products' bawaan database MySQL MAMP lokal!
  const baseProducts = useMemo(() => {
    return products.filter((product) => {
      if (isSearchPage) {
        if (searchCategoryParam === "Semua") return true;
        return product.category === searchCategoryParam;
      }
      return product.category === activeCategoryName;
    });
  }, [products, isSearchPage, searchCategoryParam, activeCategoryName]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    
    let list = baseProducts.filter((product) => {
      const matchesSearch = 
        q === "" || 
        product.name.toLowerCase().includes(q) || 
        (product.brand && product.brand.toLowerCase().includes(q)) ||
        product.category.toLowerCase().includes(q);

      const matchesSubcategory =
        selectedSubcategory === "Semua" ||
        (SUBCATEGORY_KEYWORDS[selectedSubcategory] &&
          SUBCATEGORY_KEYWORDS[selectedSubcategory].some((kw) => product.name.toLowerCase().includes(kw))) ||
        product.name.toLowerCase().includes(selectedSubcategory.toLowerCase());

      return matchesSearch && matchesSubcategory;
    });

    if (sortBy === "price-asc") {
      list = [...list].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === "price-desc") {
      list = [...list].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === "rating") {
      list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return list;
  }, [baseProducts, searchQuery, selectedSubcategory, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const visibleProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const headerTitle = isSearchPage 
    ? `Hasil Pencarian: "${searchQuery}"` 
    : `Katalog ${activeCategoryName || "Produk"}`;

  const headerSubtitle = isSearchPage
    ? `Menemukan produk pilihan di kategori ${searchCategoryParam}`
    : `Ribuan pilihan material berkualitas untuk proyek Anda`;

  // MENANGANI LOADING: Menampilkan animasi putar estetik saat database memuat data
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#f5f5f4" }}>
        <div style={{ width: "50px", height: "50px", border: "5px solid #e5e7eb", borderTopColor: "#ea580c", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <p style={{ marginTop: "1rem", color: "#666", fontWeight: 500 }}>Sinkronisasi Database MySQL...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f4", padding: "2rem 0" }}>
      {/* Header Bar */}
      <div
        style={{
          background: "linear-gradient(120deg, #1c0a00 0%, #7c2d12 50%, #ea580c 100%)",
          color: "white",
          padding: "3rem 1rem",
          textAlign: "center",
          marginBottom: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            fontWeight: 800,
            margin: "0 0 0.5rem 0",
            fontFamily: "'Barlow', sans-serif",
          }}
        >
          {headerTitle}
        </h1>
        <p style={{ margin: 0, opacity: 0.9, fontSize: "1.1rem" }}>
          {headerSubtitle}
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input Filter & Sort */}
        <div
          style={{
            marginBottom: "2rem",
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: "250px",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "white",
              border: "1px solid #ddd",
              borderRadius: "0.5rem",
              padding: "0.75rem 1rem",
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <Search size={20} style={{ color: "#999" }} />
            <input
              aria-label="Cari produk"
              type="text"
              placeholder="Cari produk lebih spesifik di halaman ini..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              style={{
                border: "none",
                outline: "none",
                flex: 1,
                fontSize: "1rem",
                background: "transparent",
              }}
            />
          </div>
          
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <label htmlFor="sort-select" style={{ display: "none" }}>Urutkan</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setPage(1);
              }}
              style={{
                padding: "0.6rem 0.8rem",
                borderRadius: "8px",
                border: "1px solid #ddd",
                background: "white",
                fontSize: "0.95rem",
              }}
            >
              <option value="relevance">Relevansi</option>
              <option value="price-asc">Harga: Terendah</option>
              <option value="price-desc">Harga: Tertinggi</option>
              <option value="rating">Rating</option>
            </select>

            <button
              aria-label="Filter"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.65rem 0.9rem",
                background: "#ea580c",
                color: "white",
                border: "none",
                borderRadius: "0.5rem",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Subcategory Filter Options */}
        {activeCategoryName === "Material Bangunan" && (
          <div
            style={{
              marginBottom: "2rem",
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
            }}
          >
            {MATERIAL_SUBCATEGORIES.map((subcat) => (
              <button
                key={subcat}
                onClick={() => {
                  setSelectedSubcategory(subcat);
                  setPage(1);
                }}
                style={{
                  padding: "0.65rem 1.25rem",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  background: selectedSubcategory === subcat ? "#ea580c" : "white",
                  color: selectedSubcategory === subcat ? "white" : "#333",
                  cursor: "pointer",
                  fontWeight: selectedSubcategory === subcat ? 600 : 500,
                  fontSize: "0.9rem",
                  transition: "all 0.2s",
                }}
                onMouseOver={(e) => {
                  if (selectedSubcategory !== subcat) {
                    (e.target as HTMLButtonElement).style.borderColor = "#ea580c";
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedSubcategory !== subcat) {
                    (e.target as HTMLButtonElement).style.borderColor = "#ddd";
                  }
                }}
              >
                {subcat}
              </button>
            ))}
          </div>
        )}

        {/* Main Product Display Area */}
        {visibleProducts.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: "1.5rem",
              marginBottom: "3rem",
            }}
          >
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart ?? (() => {})}
                onView={(id) => onNavigate?.(`/product/${id}`)}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1rem",
              background: "white",
              borderRadius: "0.75rem",
              color: "#666",
              marginBottom: "2rem",
            }}
          >
            <p style={{ fontSize: "1.1rem", margin: 0 }}>
              Tidak ada produk yang sesuai dengan pencarian Anda
            </p>
            <p style={{ fontSize: "0.95rem", margin: "0.5rem 0 0 0" }}>
              Coba gunakan kata kunci pencarian lainnya yang lebih umum
            </p>
          </div>
        )}

        {/* Bottom Pagination Buttons */}
        <div style={{ display: "flex", justifyContent: "center", margin: "1.25rem 0" }}>
          <button
            aria-label="Previous page"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            style={{
              padding: "0.5rem 0.9rem",
              borderRadius: "6px",
              border: "1px solid #eee",
              background: page <= 1 ? "#fafafa" : "white",
              cursor: page <= 1 ? "default" : "pointer",
              marginRight: "0.5rem",
            }}
          >
            ‹ Prev
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.5rem 0.75rem" }}>
            <span style={{ color: "#666" }}>Halaman</span>
            <strong>{page}</strong>
            <span style={{ color: "#666" }}>/ {totalPages}</span>
          </div>
          <button
            aria-label="Next page"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            style={{
              padding: "0.5rem 0.9rem",
              borderRadius: "6px",
              border: "1px solid #eee",
              background: page >= totalPages ? "#fafafa" : "white",
              cursor: page >= totalPages ? "default" : "pointer",
              marginLeft: "0.5rem",
            }}
          >
            Next ›
          </button>
        </div>

        {/* Bottom Filter Info Summary */}
        <div
          style={{
            background: "white",
            padding: "1.5rem",
            borderRadius: "0.75rem",
            border: "1px solid #eee",
            textAlign: "center",
            color: "#666",
          }}
        >
          <p style={{ margin: 0 }}>
            Menampilkan <strong>{filteredProducts.length}</strong> produk hasil filter
          </p>
        </div>
      </div>
    </div>
  );
}