import { useState } from "react";

export default function ProductCard({ product, onAdd }) {
  const [qty, setQty] = useState(1);

  return (
    <div className="group rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.unit}</p>
          </div>
          <span className="text-green-700 font-semibold">
            Rp {product.price.toLocaleString("id-ID")}
          </span>
        </div>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center gap-3">
          <input
            type="number"
            min={1}
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-16 rounded-md border border-gray-300 px-2 py-1 text-sm"
          />
          <button
            onClick={() => onAdd(product, qty)}
            className="flex-1 rounded-md bg-green-600 text-white px-3 py-2 text-sm font-medium hover:bg-green-700"
          >
            Tambah
          </button>
        </div>
      </div>
    </div>
  );
}
