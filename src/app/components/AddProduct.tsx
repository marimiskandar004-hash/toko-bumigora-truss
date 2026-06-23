import React, { useState, useEffect } from "react";
import { PlusCircle, Image, ArrowLeft, Save, Loader2 } from "lucide-react";

// Struktur data kategori utama dan sub-kategori yang sinkron dengan Navbar
const CATEGORIES = [
  { label: "Material Bangunan", sub: ["Bata & Beton", "Pasir & Semen", "Besi & Baja", "Kayu & Triplek", "Gypsum & Plafon"] },
  { label: "Sanitasi & Air", sub: ["Pipa PVC", "Kran & Fitting", "Pompa Air", "Kloset & Wastafel", "Shower & Bathtub"] },
  { label: "Kelistrikan", sub: ["Kabel Listrik", "Stop Kontak", "Lampu & Fitting", "Panel & MCB", "Genset"] },
  { label: "Perkakas & Alat", sub: ["Palu & Gergaji", "Bor & Gerinda", "Kunci & Tang", "Alat Ukur", "Perlengkapan Las"] },
  { label: "Cat & Finishing", sub: ["Cat Tembok", "Cat Kayu & Besi", "Waterproofing", "Plamir & Primer", "Kuas & Roller"] },
  { label: "Atap & Lantai", sub: ["Genteng", "Keramik Lantai", "Vinyl & Parquet", "Baja Ringan", "Talang Air"] },
];

interface AddProductProps {
  onBack?: () => void;
  onSave?: (productData: any) => Promise<void>;
}

export function AddProduct({ onBack, onSave }: AddProductProps) {
  // State untuk melacak status loading saat tombol simpan diklik
  const [loading, setLoading] = useState(false);

  // State utama untuk menampung seluruh inputan form dari admin
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    subCategory: "",
    price: "",
    stock: "",
    description: "",
    imageUrl: "",
  });

  // State bantuan untuk menampung daftar sub-kategori yang sesuai secara dinamis
  const [availableSubCategories, setAvailableSubCategories] = useState<string[]>([]);

  // Efek Otomatis: Berjalan setiap kali nilai 'formData.category' berubah
  useEffect(() => {
    const selectedCat = CATEGORIES.find((c) => c.label === formData.category);
    if (selectedCat) {
      setAvailableSubCategories(selectedCat.sub);
      setFormData((prev) => ({ ...prev, subCategory: "" })); // Reset sub-kategori ke kosong jika kategori utama diganti
    } else {
      setAvailableSubCategories([]);
    }
  }, [formData.category]);

  // Fungsi untuk menangkap setiap ketikan/pilihan user di form secara real-time
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi saat form disubmit (Tombol simpan diklik)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi dasar di sisi client
    if (!formData.name || !formData.category || !formData.price || !formData.stock) {
      alert("Mohon lengkapi data wajib (Nama, Kategori, Harga, dan Stok)!");
      return;
    }

    setLoading(true);
    try {
      // Mengubah tipe data String dari input HTML menjadi Number murni untuk Harga dan Stok
      const productPayload = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        createdAt: new Date().toISOString(),
      };

      if (onSave) {
        await onSave(productPayload);
        alert("Produk baru berhasil ditambahkan!");
        
        // Reset form kembali kosong agar siap menerima input produk berikutnya
        setFormData({
          name: "",
          sku: "",
          category: "",
          subCategory: "",
          price: "",
          stock: "",
          description: "",
          imageUrl: "",
        });
      }
    } catch (error) {
      console.error("Gagal menambahkan produk:", error);
      alert("Terjadi kesalahan saat menyimpan produk.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="max-w-4xl mx-auto p-6 bg-stone-50 min-h-screen">
      
      {/* Bagian Atas / Header Form */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-stone-200 rounded-lg text-stone-600 transition-colors"
            type="button"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-stone-900 tracking-tight">Tambah Produk Baru</h1>
            <p className="text-xs text-stone-500 mt-0.5">Kelola dan input material bangunan ke katalog Bumigora Truss</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs bg-orange-50 text-orange-700 px-3 py-1.5 rounded-md font-medium border border-orange-200">
          <PlusCircle size={14} />
          Mode Admin
        </div>
      </div>

      {/* Area Utama Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Kolom Kiri & Tengah: Berisi Informasi Detail Produk */}
        <div className="md:col-span-2 space-y-5">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-stone-800 border-l-4 border-orange-500 pl-2 mb-2">Informasi Utama</h2>
            
            {/* Input Nama */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Nama Produk <span className="text-red-500">*</span></label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Contoh: Semen Tiga Roda 40kg, Baja Ringan C75"
                className="w-full text-sm px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                required
              />
            </div>

            {/* Dropdown Kategori & Sub-Kategori */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Kategori Utama <span className="text-red-500">*</span></label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full text-sm px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  required
                >
                  <option value="">-- Pilih Kategori --</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.label} value={cat.label}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Sub-Kategori</label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  disabled={!formData.category}
                  className="w-full text-sm px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all disabled:bg-stone-100 disabled:text-stone-400"
                >
                  <option value="">-- Pilih Sub-Kategori --</option>
                  {availableSubCategories.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input Deskripsi */}
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Deskripsi Produk</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Spesifikasi ukuran, ketebalan, keunggulan material..."
                className="w-full text-sm px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all resize-none"
              />
            </div>
          </div>

          {/* Bagian Pengaturan Harga & Stok */}
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-stone-800 border-l-4 border-orange-500 pl-2 mb-2">Harga & Stok</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Kode SKU / Item</label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="BGT-001"
                  className="w-full text-sm px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Harga Satuan (Rp) <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="75000"
                  className="w-full text-sm px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Jumlah Stok <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="50"
                  className="w-full text-sm px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Berisi Upload Gambar & Tombol Utama */}
        <div className="md:col-span-1 space-y-5">
          <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-stone-800 border-l-4 border-orange-500 pl-2 mb-2">Foto Produk</h2>
            
            {/* Real-time Preview Box */}
            <div className="border-2 border-dashed border-stone-300 rounded-xl h-44 flex flex-col items-center justify-center bg-stone-50 overflow-hidden group relative">
              {formData.imageUrl ? (
                <>
                  <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-medium">
                    Gambar Terpasang
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <Image size={32} className="mx-auto text-stone-400 mb-2" />
                  <p className="text-xs text-stone-500">Pratinjau gambar akan otomatis muncul setelah tautan dimasukkan</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">URL Gambar Produk</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full text-xs px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all text-stone-600"
              />
            </div>
          </div>

          {/* Tombol Eksekusi Aksi */}
          <div className="space-y-2">
            <button
              type="submit"
              disabled={loading}
              style={{ background: "#ea580c" }}
              className="w-full text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-md hover:bg-orange-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:bg-stone-400 disabled:scale-100 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Simpan ke Katalog
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={onBack}
              className="w-full bg-white border border-stone-300 text-stone-700 font-semibold text-sm py-2.5 px-4 rounded-xl hover:bg-stone-100 transition-all text-center cursor-pointer"
            >
              Batal
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}