import { useMemo } from "react";

export default function FarmerDashboard({ products = [], orders = [] }) {
  // Derive simple metrics. Orders are a list of {productId, qty, price} for demo only.
  const metrics = useMemo(() => {
    const soldByProduct = {};
    let revenue = 0;

    for (const o of orders) {
      soldByProduct[o.productId] = (soldByProduct[o.productId] || 0) + o.qty;
      revenue += o.qty * o.price;
    }

    const withStats = products.map((p) => {
      const sold = soldByProduct[p.id] || 0;
      const remaining = typeof p.stock === "number" ? Math.max(0, p.stock - sold) : undefined;
      return { ...p, sold, remaining };
    });

    const totalSold = withStats.reduce((sum, p) => sum + (p.sold || 0), 0);

    return { revenue, totalSold, items: withStats };
  }, [products, orders]);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Dasbor Petani</h2>
          <p className="text-gray-500 text-sm">Pantau penjualan dan stok Anda</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Produk Terjual</p>
          <p className="text-2xl font-semibold text-gray-800">{metrics.totalSold}</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Pendapatan</p>
          <p className="text-2xl font-semibold text-gray-800">Rp {metrics.revenue.toLocaleString("id-ID")}</p>
        </div>
        <div className="rounded-xl border bg-white p-5">
          <p className="text-sm text-gray-500">Jumlah Produk</p>
          <p className="text-2xl font-semibold text-gray-800">{metrics.items.length}</p>
        </div>
      </div>

      <div className="rounded-xl border bg-white overflow-hidden">
        <div className="grid grid-cols-12 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
          <div className="col-span-5">Produk</div>
          <div className="col-span-2 text-right">Harga</div>
          <div className="col-span-2 text-right">Terjual</div>
          <div className="col-span-3 text-right">Sisa Stok</div>
        </div>
        {metrics.items.map((p) => (
          <div key={p.id} className="grid grid-cols-12 items-center px-4 py-3 border-t text-sm">
            <div className="col-span-5 flex items-center gap-3">
              <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded" />
              <div>
                <p className="font-medium text-gray-800">{p.name}</p>
                <p className="text-xs text-gray-500">{p.unit}</p>
              </div>
            </div>
            <div className="col-span-2 text-right">Rp {p.price.toLocaleString("id-ID")}</div>
            <div className="col-span-2 text-right">{p.sold || 0}</div>
            <div className="col-span-3 text-right">{typeof p.remaining === "number" ? p.remaining : "-"}</div>
          </div>
        ))}
        {metrics.items.length === 0 && (
          <div className="px-4 py-6 text-sm text-gray-500">Belum ada produk. Tambahkan produk terlebih dahulu.</div>
        )}
      </div>
    </section>
  );
}
