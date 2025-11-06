import { useState } from "react";

export default function Tabs({ tabs, initial = 0, onChange }) {
  const [active, setActive] = useState(initial);

  const handleClick = (idx) => {
    setActive(idx);
    onChange && onChange(idx);
  };

  return (
    <div>
      <div className="flex gap-2 border-b">
        {tabs.map((t, idx) => (
          <button
            key={t.key}
            onClick={() => handleClick(idx)}
            className={`px-4 py-2 text-sm font-medium rounded-t-md border-x border-t -mb-px ${
              idx === active
                ? "bg-white border-gray-200 text-gray-900"
                : "bg-gray-50 border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="rounded-b-md border border-gray-200 bg-white">
        {tabs[active]?.content}
      </div>
    </div>
  );
}
