import { useMemo, useState } from "react";
import Header from "./components/Header";
import ProductsGrid from "./components/ProductsGrid";
import CartDrawer from "./components/CartDrawer";
import ProductUploadForm from "./components/ProductUploadForm";
import FarmerDashboard from "./components/FarmerDashboard";
import Tabs from "./components/Tabs";

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState([]);

  // Local demo state for farmer products and mock orders
  const [farmerProducts, setFarmerProducts] = useState([]);
  const [orders] = useState([
    // mock orders to demonstrate dashboard metrics
    // { productId: 1, qty: 2, price: 18000 },
  ]);

  const cartCount = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);

  const handleAdd = (product, qty) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { ...product, qty }];
    });
  };

  const handleUpdateQty = (id, qty) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  const handleCheckout = () => {
    alert("Pesanan diterima! Kami akan menghubungi Anda untuk konfirmasi.");
    setCartOpen(false);
  };

  const handleCreateProduct = (data) => {
    // Assign a simple incremental id for demo
    const id = Date.now();
    setFarmerProducts((prev) => [{ id, ...data }, ...prev]);
  };

  const tabs = [
    {
      key: "market",
      label: "Belanja",
      content: (
        <div>
          <section className="max-w-6xl mx-auto px-4 pt-8">
            <div className="rounded-2xl bg-green-600 text-white p-8 flex flex-col lg:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-3xl lg:text-4xl font-semibold leading-tight">Jual Hasil Tani Lebih Mudah</h2>
                <p className="mt-3 text-white/90">Temukan pembeli langsung tanpa perantara. Harga adil, transaksi aman, dukungan untuk petani lokal.</p>
                <div className="mt-5 flex gap-3">
                  <a href="#produk" className="px-4 py-2 rounded-md bg-white text-green-700 font-medium">Jelajahi Produk</a>
                  <a href="#unggah" className="px-4 py-2 rounded-md border border-white/60 text-white font-medium">Unggah Produk</a>
                </div>
              </div>
              <img
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1200&auto=format&fit=crop"
                alt="Petani memanen"
                className="w-full max-w-md rounded-xl shadow-lg object-cover"
              />
            </div>
          </section>

          <div id="produk">
            <ProductsGrid onAdd={handleAdd} />
          </div>
        </div>
      ),
    },
    {
      key: "sell",
      label: "Jual",
      content: (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div id="unggah" className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Unggah Produk Anda</h3>
            <ProductUploadForm onCreate={handleCreateProduct} />
          </div>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Produk Anda</h3>
          {farmerProducts.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada produk. Tambahkan melalui formulir di atas.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmerProducts.map((p) => (
                <div key={p.id} className="rounded-xl border bg-white overflow-hidden">
                  <img src={p.image} alt={p.name} className="h-40 w-full object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-gray-800">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.unit}</p>
                      </div>
                      <span className="text-green-700 font-semibold">Rp {p.price.toLocaleString("id-ID")}</span>
                    </div>
                    {typeof p.stock === "number" && (
                      <p className="text-xs text-gray-500 mt-1">Stok: {p.stock}</p>
                    )}
                    {p.description && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{p.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      key: "dashboard",
      label: "Dasbor",
      content: <FarmerDashboard products={farmerProducts} orders={orders} />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <Header cartCount={cartCount} onCartToggle={() => setCartOpen(true)} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs tabs={tabs} />
      </div>

      <section id="cara-kerja" className="max-w-6xl mx-auto px-4 pb-12">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Cara Kerja</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">1</p>
            <p className="font-medium text-gray-800 mt-1">Petani unggah produk</p>
            <p className="text-sm text-gray-600 mt-2">Masukkan foto, deskripsi, stok, dan harga terbaik.</p>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">2</p>
            <p className="font-medium text-gray-800 mt-1">Pembeli pesan langsung</p>
            <p className="text-sm text-gray-600 mt-2">Pembeli dapat menambah ke keranjang dan membuat pesanan.</p>
          </div>
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-600">3</p>
            <p className="font-medium text-gray-800 mt-1">Antar atau ambil di kebun</p>
            <p className="text-sm text-gray-600 mt-2">Pilih metode pengiriman sesuai kesepakatan.</p>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} PanenMarket — Mendukung kesejahteraan petani lokal.
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        items={items}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onCheckout={handleCheckout}
      />
    </div>
  );
}

export default App;
