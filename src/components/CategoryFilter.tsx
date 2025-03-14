
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Check if container is scrollable on mount and window resize
  useEffect(() => {
    const checkScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };
    
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [categories]);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left' 
        ? current.scrollLeft - scrollAmount 
        : current.scrollLeft + scrollAmount;
      
      current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="relative mb-6 md:mb-8">
      {isScrollable && (
        <>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-md hidden md:flex"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white shadow-md hidden md:flex"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}
      
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto py-1 hide-scrollbar md:px-8"
      >
        <div className="flex space-x-2 py-1 min-w-max">
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
    </div>
  );
};

export default CategoryFilter;
