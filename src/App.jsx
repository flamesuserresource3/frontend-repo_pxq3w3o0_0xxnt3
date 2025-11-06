import { useState } from "react";
import Header from "./components/Header";
import ProductUploadForm from "./components/ProductUploadForm";
import FarmerDashboard from "./components/FarmerDashboard";
import Tabs from "./components/Tabs";

function App() {
  // State khusus penjual
  const [farmerProducts, setFarmerProducts] = useState([]);
  const [orders] = useState([]); // mock orders bila diperlukan untuk metrik

  // State untuk edit produk
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    unit: "/ kg",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleCreateProduct = (data) => {
    const id = Date.now();
    setFarmerProducts((prev) => [{ id, ...data }, ...prev]);
  };

  const startEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name || "",
      unit: product.unit || "/ kg",
      price: product.price ?? "",
      stock: typeof product.stock === "number" ? product.stock : "",
      image: product.image || "",
      description: product.description || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", unit: "/ kg", price: "", stock: "", image: "", description: "" });
  };

  const saveEdit = (id) => {
    const price = Number(editForm.price);
    const stockVal = editForm.stock === "" ? undefined : Number(editForm.stock);
    if (!editForm.name || isNaN(price)) return;

    setFarmerProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              name: editForm.name.trim(),
              unit: editForm.unit,
              price,
              stock: typeof stockVal === "number" && !isNaN(stockVal) ? stockVal : p.stock,
              image:
                editForm.image ||
                "https://images.unsplash.com/photo-1598188306155-25d47010c27c?q=80&w=1200&auto=format&fit=crop",
              description: editForm.description || "",
            }
          : p
      )
    );
    cancelEdit();
  };

  const deleteProduct = (id) => {
    setFarmerProducts((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) cancelEdit();
  };

  const tabs = [
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
                    {editingId === p.id ? (
                      <div className="space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            value={editForm.name}
                            onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Nama"
                          />
                          <input
                            value={editForm.unit}
                            onChange={(e) => setEditForm((f) => ({ ...f, unit: e.target.value }))}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Satuan"
                          />
                          <input
                            type="number"
                            value={editForm.price}
                            onChange={(e) => setEditForm((f) => ({ ...f, price: e.target.value }))}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Harga"
                            min={0}
                          />
                          <input
                            type="number"
                            value={editForm.stock}
                            onChange={(e) => setEditForm((f) => ({ ...f, stock: e.target.value }))}
                            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Stok"
                            min={0}
                          />
                          <input
                            value={editForm.image}
                            onChange={(e) => setEditForm((f) => ({ ...f, image: e.target.value }))}
                            className="col-span-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            placeholder="URL Gambar"
                          />
                          <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm((f) => ({ ...f, description: e.target.value }))}
                            rows={3}
                            className="col-span-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                            placeholder="Deskripsi"
                          />
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            onClick={() => cancelEdit()}
                            className="px-3 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Batal
                          </button>
                          <button
                            onClick={() => saveEdit(p.id)}
                            className="px-3 py-2 text-sm rounded-md bg-green-600 text-white hover:bg-green-700"
                          >
                            Simpan
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
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
                        <div className="flex justify-end gap-2 pt-3">
                          <button
                            onClick={() => startEdit(p)}
                            className="px-3 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteProduct(p.id)}
                            className="px-3 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
                          >
                            Hapus
                          </button>
                        </div>
                      </>
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
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Tabs tabs={tabs} />
      </div>

      <footer className="border-t bg-white/70 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} PanenMarket — Alat bantu penjualan untuk petani.
        </div>
      </footer>
    </div>
  );
}

export default App;
