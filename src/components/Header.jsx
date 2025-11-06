import { ShoppingCart, Sprout } from "lucide-react";

export default function Header({ cartCount, onCartToggle }) {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-green-100 text-green-700">
            <Sprout size={24} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">PanenMarket</h1>
            <p className="text-xs text-gray-500 -mt-1">Jual beli hasil tani langsung dari petani</p>
          </div>
        </div>
        <button
          onClick={onCartToggle}
          className="relative inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
        >
          <ShoppingCart size={18} />
          <span className="text-sm font-medium">Keranjang</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 grid place-items-center">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
