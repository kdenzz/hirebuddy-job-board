import { useState } from "react";

type Props = {
    onSearch: (query: string) => void;
};

export default function SearchBar({ onSearch }: Props) {
    const [input, setInput] = useState("");

    const handleSearch = () => {
        onSearch(input.trim());
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex w-full max-w-2xl">
            <input
                type="text"
                placeholder="e.g. frontend, intern, remote"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg"
            >
                Search
            </button>
        </div>
    );
}
