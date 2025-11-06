import { X } from "lucide-react";

export default function CartDrawer({ open, items, onClose, onUpdateQty, onCheckout }) {
  const total = items.reduce((sum, it) => sum + it.price * it.qty, 0);

  return (
    <div className={`fixed inset-0 z-30 ${open ? "" : "pointer-events-none"}`}>
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Keranjang</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-md">
            <X size={18} />
          </button>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-160px)]">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Belum ada item di keranjang.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex items-center gap-3 border rounded-lg p-3">
                <img src={it.image} alt={it.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{it.name}</p>
                  <p className="text-xs text-gray-500">Rp {it.price.toLocaleString("id-ID")} {it.unit}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQty(it.id, Math.max(1, it.qty - 1))}
                      className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="text-sm w-6 text-center">{it.qty}</span>
                    <button
                      onClick={() => onUpdateQty(it.id, it.qty + 1)}
                      className="w-7 h-7 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">Rp {(it.price * it.qty).toLocaleString("id-ID")}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="p-4 border-t space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-700">
            <span>Total</span>
            <span className="font-semibold">Rp {total.toLocaleString("id-ID")}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full rounded-md bg-green-600 text-white px-4 py-2 font-medium hover:bg-green-700"
            disabled={items.length === 0}
          >
            Lanjutkan Pesanan
          </button>
        </div>
      </aside>
    </div>
  );
}
