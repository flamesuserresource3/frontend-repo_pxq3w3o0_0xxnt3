import { useState } from "react";

export default function ProductUploadForm({ onCreate }) {
  const [form, setForm] = useState({
    name: "",
    unit: "/ kg",
    price: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const price = Number(form.price);
    const stock = Number(form.stock || 0);
    if (!form.name || !price) return;
    onCreate({
      name: form.name.trim(),
      unit: form.unit,
      price,
      stock,
      image:
        form.image ||
        "https://images.unsplash.com/photo-1598188306155-25d47010c27c?q=80&w=1200&auto=format&fit=crop",
      description: form.description || "",
    });
    setForm({ name: "", unit: "/ kg", price: "", stock: "", image: "", description: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border bg-white p-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Nama Produk</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="Contoh: Tomat Organik"
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Satuan</label>
          <input
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="/ kg, / ikat, / 10 butir"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Harga (Rp)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="18000"
            min={0}
            required
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Stok</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="100"
            min={0}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">URL Gambar</label>
          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="https://..."
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm text-gray-600 mb-1">Deskripsi</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            placeholder="Ceritakan kelebihan produk Anda"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="rounded-md bg-green-600 text-white px-4 py-2 text-sm font-medium hover:bg-green-700"
        >
          Unggah Produk
        </button>
      </div>
    </form>
  );
}
