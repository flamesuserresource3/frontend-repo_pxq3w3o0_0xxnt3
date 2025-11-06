import { Sprout } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-green-100 text-green-700">
            <Sprout size={24} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-800">PanenMarket</h1>
            <p className="text-xs text-gray-500 -mt-1">Platform penjualan untuk petani</p>
          </div>
        </div>
      </div>
    </header>
  );
}
