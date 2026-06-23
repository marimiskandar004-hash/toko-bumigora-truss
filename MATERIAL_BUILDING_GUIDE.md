# Fitur Katalog Material Bangunan

## Deskripsi
Komponen `MaterialBuildingCatalog` menampilkan katalog lengkap produk material bangunan dengan fitur pencarian dan filter.

## Lokasi File
- Komponen: `src/app/components/MaterialBuildingCatalog.tsx`

## Fitur
✅ **Listing Produk** - Menampilkan semua produk material bangunan dari database  
✅ **Search** - Pencarian produk berdasarkan nama  
✅ **Filter Subcategory** - Filter berdasarkan sub-kategori:
   - Bata & Beton
   - Pasir & Semen
   - Besi & Baja
   - Kayu & Triplek
   - Gypsum & Plafon

✅ **Responsive Design** - Grid yang responsif di semua ukuran layar  
✅ **Add to Cart** - Tombol tambah ke keranjang  

## Cara Menggunakan

### 1. Import Komponen
```typescript
import { MaterialBuildingCatalog } from "./components/MaterialBuildingCatalog";
```

### 2. Gunakan di Component (contoh di App.tsx)
```typescript
import { MaterialBuildingCatalog } from "./components/MaterialBuildingCatalog";
import type { Product } from "./data/products";

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
  }

  return (
    <div>
      {/* Tampilkan katalog dengan callback ke addToCart */}
      <MaterialBuildingCatalog onAddToCart={addToCart} />
    </div>
  );
}
```

### 3. Tampilkan di Route (Opsional - jika menggunakan React Router)
```typescript
import { MaterialBuildingCatalog } from "./components/MaterialBuildingCatalog";

<Route path="/material-bangunan" element={<MaterialBuildingCatalog />} />
```

## Props
```typescript
interface MaterialBuildingCatalogProps {
  onAddToCart?: (product: Product) => void;  // Callback saat tombol "Tambah ke Keranjang" diklik
}
```

## Styling & Customization

Komponen menggunakan inline styles yang dapat disesuaikan:
- **Header Background**: Gradient orange-brown (tema BangunJaya)
- **Search Bar**: Input dengan icon search
- **Filter Buttons**: Toggle subcategory
- **Product Grid**: Responsive dengan gap 1.5rem
- **Empty State**: Pesan saat tidak ada hasil

## Data Source
Komponen menggunakan data dari `src/app/data/products.ts` dan memfilter produk dengan `category === "Material Bangunan"`.

## Catatan Penting
⚠️ **Tidak ada file yang dimodifikasi** - komponen ini berdiri sendiri  
✅ Kompatibel dengan `ProductCard` yang sudah ada  
✅ Menggunakan styling yang konsisten dengan design yang sudah ada  

## Troubleshooting

**Q: Produk tidak tampil?**
A: Pastikan produk di `products.ts` memiliki `category: "Material Bangunan"`

**Q: Filter tidak bekerja?**
A: Pastikan nama produk mengandung text sub-kategori (contoh: "Semen Portland Tipe I" untuk "Pasir & Semen")

**Q: Ingin menambah sub-kategori baru?**
A: Edit array `MATERIAL_SUBCATEGORIES` di file komponen

## Contoh Penggunaan Lengkap
Lihat file `MaterialBuildingCatalogExample.tsx` untuk contoh implementasi lengkap.
