// frontend/src/components/SearchBar.tsx
import { useState } from "react";

interface SearchBarProps {
    onSearch: (q: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
    const [value, setValue] = useState("");

    return (
        <div className="flex w-full max-w-2xl">
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search by title, keywords, or company..."
                className="
          flex-1 px-4 py-3 border border-gray-300 rounded-l-lg
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
            />
            <button
                onClick={() => onSearch(value)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-r-lg"
            >
                Search
            </button>
        </div>
    );
}
