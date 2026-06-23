import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { Navbar } from "./components/Navbar";
import { CategoryGrid } from "./components/CategoryGrid";
import { PromoBanner } from "./components/PromoBanner";
import { ProductSection } from "./components/ProductSection";
import { FlashSale } from "./components/FlashSale";
import { BrandsSection } from "./components/BrandsSection";
import { Footer } from "./components/Footer";
import { CartDrawer, type CartItem } from "./components/CartDrawer";
import { AuthModal } from "./components/AuthModal";
import type { Product } from "./data/products";
import { MaterialBuildingCatalog } from "./components/MaterialBuildingCatalog";
import { ProductDetail } from "./components/ProductDetail";
import { AdminProducts } from "./components/AdminProducts";
import { Checkout } from "./components/Checkout";
import { auth } from "../lib/firebase";
import { HeroBanner } from "./components/HeroBanner";
import { getProductById } from "./utils/productStore"; // Dikembalikan untuk menjaga kestabilan data dummy lawas
import { useCategoryPulse } from "./hooks/useCategoryPulse";
import { CATEGORY_PATHS } from "./data/categories";

// Alamat Jembatan API MAMP lokal kamu
const API_URL = "http://localhost:8888/api_products.php";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [path, setPath] = useState(() => window.location.pathname || "/");

  // State untuk data produk riil dari MySQL MAMP khusus halaman kategori
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // State untuk auth Firebase
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  const {
    categoryPulse,
    triggerCategoryPulse,
    navigateToCategory,
    isRouteActive,
  } = useCategoryPulse(path);

  const handleCategoryNavigate = (label: string) => {
    navigateToCategory(label, navigate);
  };

  const CART_KEY = "cart_v1";

  // 1. Ambil Data Produk dari Database MySQL secara Realtime
  const fetchGlobalProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Gagal memuat database");
      const data = await response.json();
      setDbProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal sinkronisasi data katalog MySQL:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchGlobalProducts();
  }, [path]);

  // Pantau status login Firebase secara realtime
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  // 2. Mengembalikan fungsi load keranjang belanja bawaan asli agar tidak error tipe data
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (!raw) return;
      const parsed = jsonParseSafe(raw) as Array<{ id: number; qty: number }>;
      const rehydrated: CartItem[] = parsed
        .map((p) => {
          const product = getProductById(p.id);
          if (!product) return null;
          return { product, qty: p.qty } as CartItem;
        })
        .filter(Boolean) as CartItem[];
      if (rehydrated.length > 0) setCartItems(rehydrated);
    } catch (e) {}
  }, []);

  // Simpan cart ke localStorage
  useEffect(() => {
    try {
      const payload = cartItems.map((i) => ({ id: i.product.id, qty: i.qty }));
      localStorage.setItem(CART_KEY, JSON.stringify(payload));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname || "/");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  function navigate(to: string) {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function addToCart(product: Product) {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  }

  function updateQty(id: number, qty: number) {
    if (qty < 1) { removeItem(id); return; }
    setCartItems((prev) =>
      prev.map((i) => (i.product.id === id ? { ...i, qty } : i))
    );
  }

  function removeItem(id: number) {
    setCartItems((prev) => prev.filter((i) => i.product.id !== id));
  }

  async function handleLogout() {
    await signOut(auth);
  }

  function getCategoryName(p: string): string {
    return p
      .replace("/", "")
      .replace(/-/g, " ")
      .replace(/\bdan\b/g, "&")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function jsonParseSafe(str: string) {
    try { return JSON.parse(str); } catch (e) { return []; }
  }

  const isSubCategory =
    !path.startsWith("/product/") &&
    !path.startsWith("/admin") &&
    !path.startsWith("/checkout") &&
    path !== "/" &&
    !CATEGORY_PATHS.includes(path) &&
    path.split("/").length === 3;

  const totalCartCount = cartItems.reduce((a, i) => a + i.qty, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f4" }}>
      <Navbar
        cartCount={totalCartCount}
        onCartOpen={() => setCartOpen(true)}
        onNavigate={navigate}
        user={user}
        onLoginClick={() => setAuthOpen(true)}
        onLogout={handleLogout}
        categoryPulse={categoryPulse}
        triggerCategoryPulse={triggerCategoryPulse}
        onCategoryNavigate={handleCategoryNavigate}
        isCategoryActive={isRouteActive}
      />

      {path.startsWith("/product/") ? (
        (() => {
          const id = Number(path.replace("/product/", ""));
          // AMAN: Menghapus passing database produk yang bikin error tipe data
          return <ProductDetail id={id} onAddToCart={addToCart} onNavigate={navigate} />;
        })()
      ) : path === "/admin/products" ? (
        <AdminProducts 
          onNavigate={navigate} 
          user={user} 
          onLoginClick={() => setAuthOpen(true)} 
        />
      ) : path === "/checkout" ? (
        <Checkout
          items={cartItems}
          onPlaceOrder={({ name }) => {
            setCartItems([]);
            navigate("/");
            alert(`Pesanan berhasil dibuat untuk ${name}`);
          }}
          onNavigate={navigate}
        />
      ) : path.startsWith("/search") || CATEGORY_PATHS.includes(path) ? (
        /* KUNCI UTAMA: Hanya jalankan sinkronisasi database MySQL ke halaman katalog kategori */
        <MaterialBuildingCatalog 
          onAddToCart={addToCart} 
          onNavigate={navigate} 
          currentCategory={path}
          products={dbProducts} 
          loading={loadingProducts}
        />
      ) : isSubCategory ? (
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div style={{ fontSize: "4rem" }}>📦</div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1c1917", marginTop: "16px" }}>
            {getCategoryName(path.split("/")[2])}
          </h1>
          <p style={{ color: "#78716c", marginTop: "4px" }}>Halaman ini sedang dalam pengembangan.</p>
          <button
            onClick={() => navigate("/" + path.split("/")[1])}
            style={{
              marginTop: "24px", background: "#ea580c", color: "#fff",
              padding: "10px 24px", borderRadius: "8px", fontWeight: 600,
              border: "none", cursor: "pointer",
            }}
          >
            Kembali ke {getCategoryName("/" + path.split("/")[1])}
          </button>
        </main>
      ) : (
        <main>
          <HeroBanner />
          <PromoBanner />
          <CategoryGrid
            categoryPulse={categoryPulse}
            onCategoryNavigate={handleCategoryNavigate}
            isCategoryActive={isRouteActive}
          /> 
          {/* AMAN: Mengembalikan beranda menggunakan data bawaan asli tanpa memicu error prop */}
          <FlashSale onAddToCart={addToCart} />
          <ProductSection onAddToCart={addToCart}
          onNavigate={navigate} />
          <BrandsSection />
        </main>
      )}

      <Footer />

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />

      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} />}
    </div>
  );
}