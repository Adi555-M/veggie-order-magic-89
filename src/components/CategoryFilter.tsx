
import { useState } from 'react';
import { Button } from "@/components/ui/button";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const [isScrollable, setIsScrollable] = useState(false);
  
  // Check if container is scrollable on mount and window resize
  return (
    <div className="mb-6 md:mb-8 overflow-x-auto hide-scrollbar">
      <div className="flex space-x-2 py-1">
        <Button
          variant={activeCategory === 'All' ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange('All')}
          className="rounded-full whitespace-nowrap bg-opacity-90 backdrop-blur-sm transition-all"
        >
          All Vegetables
        </Button>
        
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category)}
            className="rounded-full whitespace-nowrap bg-opacity-90 backdrop-blur-sm transition-all"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
