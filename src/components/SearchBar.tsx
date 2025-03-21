
import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Search vegetables..." }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = e.target.value;
      setQuery(value);
      // Check if onSearch is a function before calling it
      if (typeof onSearch === 'function') {
        onSearch(value);
      }
    } catch (error) {
      console.error("Error in search handler:", error);
      // Don't propagate the error to prevent app crash
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto mb-6">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
        <Search className="h-5 w-5" />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleSearch}
        className="pl-10 w-full"
      />
    </div>
  );
};

export default SearchBar;
