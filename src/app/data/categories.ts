import { Layers, Droplets, Zap, Wrench, Home, HardHat } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Category {
  label: string;
  icon: LucideIcon;
  sub: string[];
  desc: string;
  color: string;
  bg: string;
  count: string;
  image: string;
}

export const CATEGORIES: Category[] = [
  {
    label: "Material Bangunan",
    icon: Layers,
    sub: ["Bata & Beton", "Pasir & Semen", "Besi & Baja", "Kayu & Triplek", "Gypsum & Plafon"],
    desc: "Semen, bata, besi, pasir",
    color: "#ea580c",
    bg: "#fff7ed",
    count: "2.400+ produk",
    image: "https://images.unsplash.com/photo-1685464196387-854858ce0f4f?w=400&h=300&fit=crop&auto=format",
  },
  {
    label: "Sanitasi & Air",
    icon: Droplets,
    sub: ["Pipa PVC", "Kran & Fitting", "Pompa Air", "Kloset & Wastafel", "Shower & Bathtub"],
    desc: "Pipa, kran, pompa, wastafel",
    color: "#0284c7",
    bg: "#f0f9ff",
    count: "1.200+ produk",
    image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?w=400&h=300&fit=crop&auto=format",
  },
  {
    label: "Kelistrikan",
    icon: Zap,
    sub: ["Kabel Listrik", "Stop Kontak", "Lampu & Fitting", "Panel & MCB", "Genset"],
    desc: "Kabel, panel, lampu, MCB",
    color: "#d97706",
    bg: "#fffbeb",
    count: "980+ produk",
    image: "https://images.unsplash.com/photo-1645651964715-d200ce0939cc?w=400&h=300&fit=crop&auto=format",
  },
  {
    label: "Perkakas & Alat",
    icon: Wrench,
    sub: ["Palu & Gergaji", "Bor & Gerinda", "Kunci & Tang", "Alat Ukur", "Perlengkapan Las"],
    desc: "Bor, gergaji, kunci, tang",
    color: "#7c3aed",
    bg: "#f5f3ff",
    count: "3.100+ produk",
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400&h=300&fit=crop&auto=format",
  },
  {
    label: "Cat & Finishing",
    icon: Home,
    sub: ["Cat Tembok", "Cat Kayu & Besi", "Waterproofing", "Plamir & Primer", "Kuas & Roller"],
    desc: "Cat tembok, kayu, waterproofing",
    color: "#059669",
    bg: "#ecfdf5",
    count: "760+ produk",
    image: "https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=400&h=300&fit=crop&auto=format",
  },
  {
    label: "Atap & Lantai",
    icon: HardHat,
    sub: ["Genteng", "Keramik Lantai", "Vinyl & Parquet", "Baja Ringan", "Talang Air"],
    desc: "Genteng, keramik, parquet",
    color: "#dc2626",
    bg: "#fef2f2",
    count: "1.850+ produk",
    image: "https://images.unsplash.com/photo-1570881826833-ad7b98b7dffe?w=400&h=300&fit=crop&auto=format",
  },
];

export const CATEGORY_PATHS = CATEGORIES.map((cat) => toPath(cat.label));

export const CATEGORY_PULSE_MS = 430;

export const CATEGORY_HIGHLIGHT = {
  gradient: "linear-gradient(135deg, #ea580c 0%, #f97316 100%)",
  orange: "#ea580c",
  orangeLight: "#f97316",
  glow: "0 0 18px rgba(234, 88, 12, 0.45)",
  glowInset: "inset 0 -2px 0 rgba(255,255,255,0.55), 0 0 18px rgba(234,88,12,0.45)",
  pulseTransform: "translateY(-1px) scale(1.03)",
  surfaceBg: "rgba(234, 88, 12, 0.18)",
  ring: "0 0 0 3px rgba(234,88,12,0.22)",
  transition: "color 0.18s ease, background 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease",
} as const;

export function toPath(label: string): string {
  const cleanLabel = label.toLowerCase().replace(/&/g, "dan").replace(/\s+/g, " ").trim();
  return "/" + cleanLabel.replace(/\s/g, "-");
}

export function isCategoryRouteActive(label: string, currentPath: string): boolean {
  const activePath = currentPath.toLowerCase();
  const targetPath = toPath(label).toLowerCase();
  return activePath === targetPath || activePath.startsWith(targetPath + "/");
}

export function getCategoryNavStyles(pulsing: boolean, highlighted: boolean) {
  return {
    background: highlighted ? CATEGORY_HIGHLIGHT.gradient : "transparent",
    boxShadow: highlighted ? CATEGORY_HIGHLIGHT.glowInset : "none",
    transform: pulsing ? CATEGORY_HIGHLIGHT.pulseTransform : "translateY(0) scale(1)",
    transition: CATEGORY_HIGHLIGHT.transition,
  };
}

export function getCategoryCardStyles(pulsing: boolean, highlighted: boolean) {
  return {
    background: highlighted ? CATEGORY_HIGHLIGHT.surfaceBg : "#ffffff",
    border: highlighted ? `2px solid ${CATEGORY_HIGHLIGHT.orange}` : "1px solid #e7e5e4",
    boxShadow: highlighted ? CATEGORY_HIGHLIGHT.glow : undefined,
    transform: pulsing ? CATEGORY_HIGHLIGHT.pulseTransform : undefined,
    transition: CATEGORY_HIGHLIGHT.transition,
  };
}
