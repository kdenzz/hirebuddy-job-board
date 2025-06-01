
import { useState, useEffect } from "react";

type Props = {
    value: string;
    setValue: (v: string) => void;
    onSearch: (q: string) => void;
};

export default function SearchBar({ value, setValue, onSearch }: Props) {
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            if (value.trim() !== "") setDebouncedQuery(value.trim());
        }, 500);
        return () => clearTimeout(timer);
    }, [value]);

    useEffect(() => {
        if (debouncedQuery) onSearch(debouncedQuery);
    }, [debouncedQuery]);

    return (
        <input
            type="text"
            placeholder="Search job titles, companies, or locations"
            className="border border-gray-300 rounded-md p-3 w-full max-w-xl"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") onSearch(value.trim());
            }}
        />
    );
}
