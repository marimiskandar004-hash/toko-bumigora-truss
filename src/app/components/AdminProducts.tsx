import React, { useState, useEffect } from "react";
import { Plus, ArrowLeft, Layers, Trash2 } from "lucide-react"; 
import { AddProduct } from "./AddProduct"; 
import type { User as FirebaseUser } from "firebase/auth";

const API_URL = "http://localhost:8888/api_products.php";
const ADMIN_EMAIL = "mar.imiskandar004@gmail.com";

interface AdminProductsProps {
  onNavigate: (to: string) => void;
  user: FirebaseUser | null | undefined; 
  onLoginClick?: () => void; 
}

export function AdminProducts({ onNavigate, user, onLoginClick }: AdminProductsProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // 1. Efek Pengunci Jalur Privat Admin
  useEffect(() => {
    if (user === null) {
      onLoginClick?.(); 
      onNavigate("/"); 
      return;
    }

    if (user && user.email !== ADMIN_EMAIL) {
      alert("Akses Ditolak! Halaman ini dilindungi secara privat khusus Administrator.");
      onNavigate("/"); 
    }
  }, [user, onNavigate, onLoginClick]);

  // 2. Fungsi Mengambil Data dari Backend
  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Koneksi API bermasalah");
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Gagal mengambil data database lokal:", error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      fetchProducts();
    }
  }, [user]);

  // 3. Fungsi Menyimpan Data Form Baru ke MySQL
  const handleSaveProduct = async (productPayload: any) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productPayload),
      });

      const result = await response.json();
      if (result.success) {
        alert("Produk material berhasil disimpan ke MySQL MAMP!");
        setIsAdding(false); 
        fetchProducts(); 
      } else {
        alert("Gagal menyimpan: " + result.error);
      }
    } catch (error) {
      console.error("Sistem MAMP offline:", error);
      alert("Gagal terhubung ke server MAMP. Pastikan tombol Start Servers di MAMP sudah aktif!");
    }
  };

  // 4. Fungsi Menghapus Data
  const handleDeleteProduct = async (productId: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        const response = await fetch(`${API_URL}?id=${productId}`, { method: "DELETE" });
        const result = await response.json();
        if (result.success) {
          alert("Produk berhasil dihapus!");
          fetchProducts(); 
        } else {
          alert("Gagal menghapus data.");
        }
      } catch (error) {
        console.error("Gagal menghapus:", error);
      }
    }
  };

  // Guard Utama: Cegah Error TypeScript Reading Property dari User null/undefined
  if (user === undefined || !user || user.email !== ADMIN_EMAIL) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50">
        <div className="text-center space-y-3">
          <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-orange-600 mx-auto"></div>
          <p className="text-stone-500 text-xs font-medium">Memeriksa otoritas akses privat...</p>
        </div>
      </div>
    );
  }

  if (isAdding) {
    return <AddProduct onBack={() => setIsAdding(false)} onSave={handleSaveProduct} />;
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="max-w-7xl mx-auto p-6 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b border-stone-200">
        <div>
          <button onClick={() => onNavigate("/")} className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-orange-600 mb-2 cursor-pointer">
            <ArrowLeft size={14} /> Kembali ke Beranda Toko
          </button>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Manajemen Katalog Produk</h1>
          <p className="text-xs text-stone-500 mt-0.5">Sinkronisasi Database Lokal MySQL MAMP</p>
        </div>
        <button onClick={() => setIsAdding(true)} style={{ background: "#ea580c" }} className="flex items-center justify-center gap-2 text-white font-semibold text-sm px-4 py-2.5 rounded-xl shadow-sm hover:bg-orange-600 transition-all cursor-pointer">
          <Plus size={16} /> Tambah Produk Baru
        </button>
      </div>

      {loadingProducts ? (
        <div className="text-center p-12 bg-white rounded-xl border border-stone-200 shadow-sm">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600 mx-auto mb-2"></div>
          <p className="text-xs text-stone-500">Menghubungkan ke MySQL MAMP...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-hidden p-12 text-center">
          <div className="text-4xl mb-3">🛠️</div>
          <h3 className="text-sm font-semibold text-stone-800">Daftar Produk Kosong</h3>
          <p className="text-xs text-stone-500 mt-1">Belum ada material terdaftar di MySQL. Tambahkan produk pertamamu!</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-stone-200 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 text-xs font-semibold uppercase tracking-widerOr">
                <th className="p-4">Produk</th>
                <th className="p-4">Kategori</th>
                <th className="p-4">Harga</th>
                <th className="p-4">Stok</th>
                <th className="p-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-stone-100">
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-stone-50/80 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-stone-100 border border-stone-200 overflow-hidden flex items-center justify-center text-stone-400 shrink-0">
                      {prod.image_url ? <img src={prod.image_url} alt={prod.name} className="w-full h-full object-cover" /> : <Layers size={16} />}
                    </div>
                    <div>
                      <div className="font-semibold text-stone-900">{prod.name}</div>
                      <div className="text-xs text-stone-400">ID: {prod.id}</div>
                    </div>
                  </td>
                  <td className="p-4 text-stone-600 font-medium text-xs">{prod.category}</td>
                  <td className="p-4 font-semibold text-stone-900">Rp {Number(prod.price).toLocaleString("id-ID")}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${prod.stock > 5 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{prod.stock} unit</span>
                  </td>
                  <td className="p-4 text-center">
                    <button onClick={() => handleDeleteProduct(prod.id)} className="p-1.5 text-stone-400 hover:text-red-600 rounded transition-colors cursor-pointer">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}