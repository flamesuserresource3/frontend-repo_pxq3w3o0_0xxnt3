import ProductCard from "./ProductCard";

const sampleProducts = [
  {
    id: 1,
    name: "Tomat Organik",
    unit: "/ kg",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1546470427-e26264be0b18?q=80&w=1200&auto=format&fit=crop",
    description: "Tomat segar langsung dari kebun, tanpa pestisida kimia.",
  },
  {
    id: 2,
    name: "Cabai Merah",
    unit: "/ kg",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1598188306155-25d47010c27c?q=80&w=1200&auto=format&fit=crop",
    description: "Cabai merah pedas, cocok untuk sambal dan masakan harian.",
  },
  {
    id: 3,
    name: "Beras Pandan Wangi",
    unit: "/ 5kg",
    price: 78000,
    image:
      "https://images.unsplash.com/photo-1513861810402-53342bf5bd97?q=80&w=1200&auto=format&fit=crop",
    description: "Beras wangi pulen kualitas premium dari petani lokal.",
  },
  {
    id: 4,
    name: "Telur Kampung",
    unit: "/ 10 butir",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1572590274177-c36d3151992a?q=80&w=1200&auto=format&fit=crop",
    description: "Telur kampung sehat, kuning telur lebih pekat.",
  },
];

export default function ProductsGrid({ onAdd }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Produk Terbaru</h2>
          <p className="text-gray-500 text-sm">Langsung dari kebun dan peternakan</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sampleProducts.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </section>
  );
}
