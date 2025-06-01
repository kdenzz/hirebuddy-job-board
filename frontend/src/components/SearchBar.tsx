import { useEffect } from "react";

type Props = {
    onSearch: (query: string) => void;
    value: string; // controlled input value from App
    setValue: (q: string) => void; // send updates back to App
};

export default function SearchBar({ onSearch, value, setValue }: Props) {
    // Debounce logic
    useEffect(() => {
        const delay = setTimeout(() => {
            if (value.trim()) {
                onSearch(value.trim());
            }
        }, 500);
        return () => clearTimeout(delay);
    }, [value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim()) {
            onSearch(value.trim());
        }
    };

    return (
        <div className="flex w-full max-w-2xl">
            <input
                type="text"
                placeholder="e.g. frontend, intern, remote"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                onClick={() => value.trim() && onSearch(value.trim())}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-lg"
                disabled={!value.trim()}
            >
                Search
            </button>
        </div>
    );
}
