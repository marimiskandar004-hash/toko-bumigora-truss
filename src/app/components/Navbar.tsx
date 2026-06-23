import { useState, useEffect } from "react";
import {
  Search, ShoppingCart, User, Phone, MapPin, Menu, X,
  ChevronDown, Tag, Truck, HardHat, Wrench, Layers, Zap,
  Home, Droplets, Heart, LogOut,
} from "lucide-react";
import type { User as FirebaseUser } from "firebase/auth";
import {
  CATEGORIES,
  CATEGORY_HIGHLIGHT,
  getCategoryNavStyles,
  toPath,
} from "../data/categories";

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
  onNavigate?: (path: string) => void;
  user?: FirebaseUser | null;
  onLoginClick?: () => void;
  onLogout?: () => void;
  categoryPulse: string | null;
  triggerCategoryPulse: (label: string) => void;
  onCategoryNavigate: (label: string) => void;
  isCategoryActive: (label: string) => boolean;
}

export function Navbar({
  cartCount,
  onCartOpen,
  onNavigate,
  user,
  onLoginClick,
  onLogout,
  categoryPulse,
  triggerCategoryPulse,
  onCategoryNavigate,
  isCategoryActive,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("Semua");
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Efek deteksi scroll untuk efek blur & shadow pada header
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu user jika klik di luar area profil
  useEffect(() => {
    const handler = () => setUserMenuOpen(false);
    if (userMenuOpen) document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [userMenuOpen]);

  const navigateToCategory = (label: string, closeMobile = false) => {
    onCategoryNavigate(label);

    if (closeMobile) {
      setMobileOpen(false);
    }
  };

  function handleSearch() {
    if (searchQuery.trim()) {
      onNavigate?.(`/search?q=${encodeURIComponent(searchQuery)}&cat=${encodeURIComponent(searchCategory)}`);
    }
  }

  const userInitial = user?.displayName
    ? user.displayName.charAt(0).toUpperCase()
    : user?.email?.charAt(0).toUpperCase() ?? "U";

  const userName = user?.displayName || user?.email?.split("@")[0] || "User";

  const isRouteActive = isCategoryActive;

  return (
    <>
      {/* Top info bar */}
      <div
        style={{ background: "#1a1a1a", fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", letterSpacing: "0.02em" }}
        className="text-zinc-400 px-4 py-1.5"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5 hover:text-zinc-200 transition-colors cursor-pointer">
              <Phone size={11} />
              0878-8564-3633 (Gratis)
            </span>
            <span className="hidden sm:flex items-center gap-1.5 hover:text-zinc-200 transition-colors cursor-pointer">
              <MapPin size={11} />
              Temukan Toko Terdekat
            </span>
          </div>
          <div className="hidden md:flex items-center gap-5">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Truck size={11} />
              Gratis Kirim min. Rp 500.000
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={11} className="text-orange-400" />
              Promo Hari Ini
            </span>
            <button
              onClick={() => onNavigate?.("/admin/products")}
              style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", fontWeight: 600 }}
              className="hover:text-white transition-colors"
            >
              Admin
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        style={{
          background: scrolled ? "rgba(234, 88, 12, 0.97)" : "#ea580c",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.35)" : "0 2px 8px rgba(0,0,0,0.2)",
          transition: "box-shadow 0.25s ease, background 0.25s ease",
          fontFamily: "'Inter', sans-serif",
        }}
        className="sticky top-0 z-50 py-3 lg:py-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Mengubah layout menjadi kolom vertikal di HP, berjejer horizontal di desktop */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-4 lg:h-[68px]">

            {/* Baris Atas Khusus Layar HP (Logo di kiri, Keranjang & Menu di kanan) */}
            <div className="flex items-center justify-between gap-4 w-full lg:w-auto">
              {/* Logo - Kembali ke Halaman Utama */}
              <button
                onClick={() => {
                  if (onNavigate) {
                    onNavigate("/");
                  } else {
                    window.location.href = "/";
                  }
                }}
                className="flex items-center gap-2.5 shrink-0 select-none"
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
              >
                <div style={{ background: "#ffffff", borderRadius: "6px", padding: "6px 8px" }} className="flex items-center gap-1.5">
                  <HardHat size={16} style={{ color: "#ea580c" }} />
                  <span style={{ fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem", fontWeight: 800, color: "#ea580c", letterSpacing: "-0.02em" }}>
                    BUMIGORA<br />
                    <span style={{ color: "#1c1917" }}>TRUSS</span>
                  </span>
                </div>
                <span
                  style={{ fontSize: "0.60rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", letterSpacing: "0.06em", lineHeight: 1.2, maxWidth: "80px" }}
                  className="hidden md:block uppercase text-left"
                >
                  Toko Material Terlengkap
                </span>
              </button>

              {/* Tombol Keranjang & Hamburger Khusus Tampilan Layar HP */}
              <div className="flex items-center gap-2 lg:hidden">
                {/* Cart Mobile */}
                <button
                  onClick={onCartOpen}
                  style={{
                    background: "#1c1917", borderRadius: "8px", color: "#ffffff",
                    position: "relative", padding: "8px 12px", display: "flex",
                    alignItems: "center", gap: "8px", border: "none", cursor: "pointer",
                  }}
                >
                  <ShoppingCart size={18} />
                  <span
                    style={{
                      position: "absolute", top: "-5px", right: "-5px",
                      background: cartCount > 0 ? "#fbbf24" : "#52525b",
                      color: cartCount > 0 ? "#1c1917" : "#ffffff", 
                      fontSize: "10px", fontWeight: 800, minWidth: "18px",
                      height: "18px", borderRadius: "9px", display: "flex",
                      alignItems: "center", justifyContent: "center",
                    }}
                  >
                    {cartCount}
                  </span>
                </button>

                {/* Hamburger Mobile */}
                <button
                  onClick={() => setMobileOpen((v) => !v)}
                  style={{ color: "rgba(255,255,255,0.85)" }}
                  className="p-1.5 hover:text-white transition-colors"
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>

            {/* Search bar - Melebar penuh di HP, menyesuaikan di desktop */}
            <div className="w-full lg:flex-1 max-w-2xl">
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                className="flex items-stretch h-[42px]"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder='Cari "semen", "keramik", "cat tembok"…'
                  style={{
                    flex: 1,
                    border: "none",
                    outline: "none",
                    fontSize: "0.85rem",
                    color: "#1c1917",
                    paddingLeft: "14px",
                    background: "transparent",
                  }}
                  className="placeholder-stone-400"
                />

                <button
                  onClick={handleSearch}
                  style={{
                    background: "#1c1917",
                    padding: "0 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#ffffff",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    borderRadius: "0 8px 8px 0",
                    flexShrink: 0,
                    transition: "background 0.15s",
                    border: "none",
                    cursor: "pointer",
                  }}
                  className="hover:bg-stone-700"
                >
                  <Search size={15} />
                  <span className="hidden sm:inline">Cari</span>
                </button>
              </div>
            </div>

            {/* Right actions Desktop (Otomatis disembunyikan di HP) */}
            <div className="hidden lg:flex items-center gap-2 shrink-0">
              <button
                style={{ color: "rgba(255,255,255,0.85)" }}
                className="p-1.5 hover:text-white transition-colors"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </button>

              {user ? (
                <div style={{ position: "relative" }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); setUserMenuOpen((v) => !v); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "8px",
                      background: "rgba(255,255,255,0.15)", borderRadius: "8px",
                      padding: "6px 10px", border: "none", cursor: "pointer",
                      color: "#ffffff", transition: "background 0.15s",
                    }}
                    className="hover:bg-white/20"
                  >
                    <div style={{
                      background: "#1c1917", borderRadius: "50%", width: "28px", height: "28px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.75rem", fontWeight: 700, color: "#ea580c", flexShrink: 0,
                    }}>
                      {userInitial}
                    </div>
                    <div style={{ lineHeight: 1.2, textAlign: "left" }}>
                      <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.6)" }}>Halo,</div>
                      <div style={{ fontSize: "0.78rem", fontWeight: 600, maxWidth: "80px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {userName}
                      </div>
                    </div>
                    <ChevronDown size={12} style={{ opacity: 0.7 }} />
                  </button>

                  {userMenuOpen && (
                    <div
                      style={{
                        position: "absolute", top: "calc(100% + 8px)", right: 0,
                        background: "#ffffff", borderRadius: "10px", minWidth: "180px",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.15)", border: "1px solid #e7e5e4",
                        overflow: "hidden", zIndex: 200,
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ padding: "12px 16px", borderBottom: "1px solid #f5f5f4" }}>
                        <div style={{ fontSize: "0.78rem", fontWeight: 600, color: "#1c1917" }}>{userName}</div>
                        <div style={{ fontSize: "0.7rem", color: "#a8a29e", marginTop: "2px" }}>{user.email}</div>
                      </div>
                      <button
                        onClick={() => { onLogout?.(); setUserMenuOpen(false); }}
                        style={{
                          width: "100%", display: "flex", alignItems: "center", gap: "10px",
                          padding: "11px 16px", fontSize: "0.82rem", color: "#dc2626",
                          fontWeight: 500, background: "transparent", border: "none",
                          cursor: "pointer", textAlign: "left",
                        }}
                        className="hover:bg-red-50"
                      >
                        <LogOut size={15} />
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onLoginClick}
                  style={{ color: "rgba(255,255,255,0.85)", fontSize: "0.75rem", fontWeight: 500 }}
                  className="flex flex-col items-center gap-0.5 hover:text-white transition-colors p-1.5"
                >
                  <User size={19} />
                  <span style={{ letterSpacing: "0.02em", lineHeight: 1 }}>Masuk</span>
                </button>
              )}

              {/* Cart Desktop */}
              <button
                onClick={onCartOpen}
                style={{
                  background: "#1c1917", borderRadius: "8px", color: "#ffffff",
                  position: "relative", padding: "8px 14px", display: "flex",
                  alignItems: "center", gap: "8px", transition: "background 0.15s",
                  border: "none", cursor: "pointer",
                }}
                className="hover:bg-stone-700"
              >
                <ShoppingCart size={18} />
                <div className="flex flex-col items-start" style={{ lineHeight: 1.1 }}>
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>KERANJANG</span>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>{cartCount} item</span>
                </div>
              </button>
            </div>

          </div>
        </div>

        {/* Sub-Header Area (Black Bar Nav) */}
        <div 
          style={{ background: "#1c1917", fontFamily: "'Inter', sans-serif" }} 
          className="hidden lg:block relative"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center h-[42px]">
              
              {/* Tombol Pemicu & Navigasi Utama "SEMUA KATEGORI" */}
              <div 
                className="h-full flex items-center"
                onMouseEnter={() => setActiveDropdown("mega-menu")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate("/");
                    } else {
                      window.location.href = "/";
                    }
                    setActiveDropdown(null);
                  }}
                  style={{
                    background: activeDropdown === "mega-menu" ? "#ea580c" : "transparent",
                    color: "#ffffff",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.02em",
                    height: "100%",
                    padding: "0 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    whiteSpace: "nowrap",
                    border: "none",
                    cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                >
                  <Menu size={15} />
                  SEMUA KATEGORI
                  <ChevronDown size={12} className={`transition-transform duration-200 ${activeDropdown === "mega-menu" ? "rotate-180" : ""}`} />
                </button>

                {/* MODERNISED MEGA MENU PANEL */}
                {activeDropdown === "mega-menu" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: "24px",
                      right: "24px",
                      background: "#ffffff",
                      border: "1px solid #e7e5e4",
                      borderTop: "3px solid #ea580c",
                      borderRadius: "0 0 12px 12px",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                      zIndex: 100,
                      padding: "24px",
                    }}
                    className="grid grid-cols-3 gap-6 text-stone-900"
                  >
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <div key={cat.label} className="space-y-2">
                          <button
                            onClick={() => {
                              navigateToCategory(cat.label);
                              setActiveDropdown(null);
                            }}
                            className="flex items-center gap-2 text-stone-950 font-bold text-[0.83rem] hover:text-orange-600 transition-colors w-full text-left"
                          >
                            <Icon size={14} className="text-orange-500" />
                            {cat.label.toUpperCase()}
                          </button>
                          
                          <div className="flex flex-col space-y-1.5 pl-5 border-l border-stone-100">
                            {cat.sub.map((item) => (
                              <button
                                key={item}
                                onClick={() => {
                                  onNavigate?.(toPath(cat.label) + "/" + item.toLowerCase().replace(/&/g, "dan").replace(/\s+/g, "-"));
                                  setActiveDropdown(null);
                                }}
                                className="text-[0.78rem] text-stone-500 hover:text-orange-600 text-left transition-colors font-medium"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Jajaran Menu Horizontal */}
              <div className="flex items-stretch overflow-x-auto h-full">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const active = isRouteActive(cat.label);
                  const pulsing = categoryPulse === cat.label;
                  const highlighted = active || pulsing;
                  const navStyles = getCategoryNavStyles(pulsing, highlighted);
                  
                  return (
                    <div key={cat.label} className="relative flex items-center h-full">
                      <button
                        style={{
                          ...navStyles,
                          color: highlighted ? "#ffffff" : "rgba(231, 229, 228, 0.85)",
                          fontSize: "0.75rem", 
                          fontWeight: highlighted ? 700 : 600, 
                          letterSpacing: "0.02em",
                          height: "100%", 
                          padding: "0 14px", 
                          display: "flex", 
                          alignItems: "center",
                          gap: "5px", 
                          whiteSpace: "nowrap",
                          position: "relative",
                          overflow: "hidden",
                          border: "none",
                          cursor: "pointer",
                        }}
                        className="hover:text-white"
                        onClick={() => navigateToCategory(cat.label)}
                      >
                        {pulsing && <span className="category-switch-ripple" />}
                        <Icon size={13} className={highlighted ? "text-white" : "text-stone-400"} />
                        {cat.label}
                      </button>

                      {/* Batas Indikator Aktif */}
                      {highlighted && (
                        <div 
                          style={{
                            position: "absolute",
                            bottom: 0,
                            left: "14px",
                            right: "14px",
                            height: "3px",
                            background: CATEGORY_HIGHLIGHT.orange,
                            borderRadius: "3px 3px 0 0"
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Aksi Kanan Sub-Header */}
              <div className="ml-auto pl-4 flex gap-2 items-center h-full shrink-0">
                <button
                  onClick={() => onNavigate?.("/material-bangunan")}
                  style={{
                    background: "#ffffff", color: "#1c1917", fontSize: "0.78rem", fontWeight: 700,
                    padding: "5px 12px", borderRadius: "6px", border: "1px solid #eee", cursor: "pointer",
                  }}
                >
                  KATALOG BANGUNAN
                </button>
                <button
                  style={{
                    background: "#fbbf24", color: "#1c1917", fontSize: "0.7rem", fontWeight: 800,
                    letterSpacing: "0.06em", padding: "4px 12px", borderRadius: "4px",
                    display: "flex", alignItems: "center", gap: "5px", border: "none", cursor: "pointer",
                  }}
                >
                  <Tag size={11} />
                  PROMO
                </button>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div
          style={{ background: "#1c1917", fontFamily: "'Inter', sans-serif", position: "sticky", top: "68px", zIndex: 40 }}
          className="lg:hidden"
        >
          {/* Pencarian khusus di dalam menu drawer mobile */}
          <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }} className="flex items-center gap-3 px-6 py-3">
            <Search size={14} style={{ color: "#52525b" }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && { handleSearch, setMobileOpen: () => setMobileOpen(false) }}
              placeholder='Cari "semen", "pipa", "cat"…'
              style={{ background: "transparent", border: "none", outline: "none", fontSize: "0.875rem", color: "#f4f4f5", width: "100%" }}
              className="placeholder-stone-500"
            />
          </div>

          <div className="px-6 py-2 max-h-[60vh] overflow-y-auto">
            {CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              const active = isRouteActive(cat.label);
              const pulsing = categoryPulse === cat.label;
              const highlighted = active || pulsing;

              return (
                <div
                  key={cat.label}
                  style={{ borderBottom: i < CATEGORIES.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
                >
                  <button
                    onClick={() => {
                      triggerCategoryPulse(cat.label);
                      setMobileExpanded((p) => (p === cat.label ? null : cat.label));
                    }}
                    style={{
                      color: highlighted ? "#ffffff" : "#d6d3d1", fontSize: "0.83rem", fontWeight: highlighted ? 700 : 500, width: "100%",
                      display: "flex", alignItems: "center", gap: "10px", padding: "13px 10px",
                      background: highlighted ? CATEGORY_HIGHLIGHT.surfaceBg : "transparent",
                      border: "none", cursor: "pointer", borderRadius: "8px",
                      boxShadow: pulsing ? CATEGORY_HIGHLIGHT.ring : "none",
                      transition: CATEGORY_HIGHLIGHT.transition,
                    }}
                  >
                    <Icon size={15} style={{ color: highlighted ? CATEGORY_HIGHLIGHT.orangeLight : CATEGORY_HIGHLIGHT.orange }} />
                    <span
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        navigateToCategory(cat.label, true);
                      }}
                      className="flex-1 text-left hover:text-orange-400 transition-colors"
                    >
                      {cat.label}
                    </span>
                    <ChevronDown
                      size={14}
                      style={{
                        color: "#78716c",
                        transform: mobileExpanded === cat.label ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.2s",
                      }}
                    />
                  </button>
                  {mobileExpanded === cat.label && (
                    <div className="pb-3 pl-6 flex flex-col">
                      {cat.sub.map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            onNavigate?.(toPath(cat.label) + "/" + item.toLowerCase().replace(/&/g, "dan").replace(/\s+/g, "-"));
                            setMobileOpen(false);
                          }}
                          style={{
                            fontSize: "0.8rem", color: "#a8a29e", padding: "6px 0", display: "flex",
                            alignItems: "center", gap: "8px", transition: "color 0.15s",
                            background: "transparent", border: "none", cursor: "pointer",
                            width: "100%", textAlign: "left",
                          }}
                          className="hover:text-orange-400"
                        >
                          <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#57534e", flexShrink: 0 }} />
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "#141413" }} className="p-4 flex gap-3">
            <button
              onClick={() => { onNavigate?.("/material-bangunan"); setMobileOpen(false); }}
              style={{
                background: "#ffffff", color: "#1c1917", fontSize: "0.85rem", fontWeight: 700,
                borderRadius: "8px", padding: "10px", flex: 1, display: "flex",
                alignItems: "center", justifyContent: "center", border: "none", cursor: "pointer",
              }}
            >
              KATALOG
            </button>

            {user ? (
              <button
                onClick={() => { onLogout?.(); setMobileOpen(false); }}
                style={{
                  background: "#dc2626", color: "#ffffff", fontSize: "0.8rem", fontWeight: 700,
                  borderRadius: "8px", flex: 1, padding: "11px", display: "flex",
                  alignItems: "center", justifyContent: "center", gap: "8px",
                  border: "none", cursor: "pointer",
                }}
              >
                <LogOut size={14} />
                KELUAR
              </button>
            ) : (
              <button
                onClick={() => { onLoginClick?.(); setMobileOpen(false); }}
                style={{
                  background: "#ea580c", color: "#ffffff", fontSize: "0.8rem", fontWeight: 700,
                  borderRadius: "8px", flex: 1, padding: "11px", display: "flex",
                  alignItems: "center", justifyContent: "center", gap: "8px",
                  border: "none", cursor: "pointer",
                }}
              >
                <User size={14} />
                MASUK
              </button>
            )}

            <button
              style={{
                background: "transparent", border: "1px solid rgba(255,255,255,0.12)",
                color: "#a8a29e", fontSize: "0.8rem", fontWeight: 600,
                borderRadius: "8px", flex: 1, padding: "11px", cursor: "pointer",
              }}
            >
              DAFTAR
            </button>
          </div>
        </div>
      )}
    </>
  );
}