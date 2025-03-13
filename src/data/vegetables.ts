
export interface VegetableItem {
  id: string;
  name: string;
  price: number; // price per kg or per unit
  image: string;
  category: string;
  unit: 'kg' | 'g' | 'piece'; // unit of measurement
  inStock: boolean;
  description?: string;
}

export const vegetables: VegetableItem[] = [
  {
    id: "001",
    name: "Tomatoes",
    price: 40,
    image: "https://images.unsplash.com/photo-1592924357177-827de628f228?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, ripe tomatoes."
  },
  {
    id: "002",
    name: "Potatoes",
    price: 30,
    image: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality potatoes."
  },
  {
    id: "003",
    name: "Onions",
    price: 25,
    image: "https://images.unsplash.com/photo-1620574387735-3624d80152ca?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality onions."
  },
  {
    id: "004",
    name: "Carrots",
    price: 35,
    image: "https://images.unsplash.com/photo-1598170845043-d1f6477524da?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality carrots."
  },
  {
    id: "005",
    name: "Cabbage",
    price: 30,
    image: "https://images.unsplash.com/photo-1603049830228-f2e7ade9c2ad?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "piece",
    inStock: true,
    description: "Fresh, quality cabbage."
  },
  {
    id: "006",
    name: "Cauliflower",
    price: 40,
    image: "https://images.unsplash.com/photo-1613743795529-27be2a604230?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "piece",
    inStock: true,
    description: "Fresh, quality cauliflower."
  },
  {
    id: "007",
    name: "Cucumber",
    price: 30,
    image: "https://images.unsplash.com/photo-1604541528847-eab72677c449?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality cucumber."
  },
  {
    id: "008",
    name: "Green Beans",
    price: 50,
    image: "https://images.unsplash.com/photo-1567375921130-944a280eac2d?q=80&w=500&auto=format&fit=crop",
    category: "Seasonal Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality green beans."
  },
  {
    id: "009",
    name: "Spinach",
    price: 30,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=500&auto=format&fit=crop",
    category: "Leafy Greens",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality spinach."
  },
  {
    id: "010",
    name: "Bell Peppers",
    price: 60,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=500&auto=format&fit=crop",
    category: "Seasonal Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality bell peppers."
  },
  {
    id: "011",
    name: "Broccoli",
    price: 50,
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=500&auto=format&fit=crop",
    category: "Seasonal Vegetables",
    unit: "piece",
    inStock: true,
    description: "Fresh, quality broccoli."
  },
  {
    id: "012",
    name: "Eggplant",
    price: 40,
    image: "https://images.unsplash.com/photo-1605196560602-cc8b5599278d?q=80&w=500&auto=format&fit=crop",
    category: "Seasonal Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality eggplant."
  },
  {
    id: "013",
    name: "Radish",
    price: 25,
    image: "https://images.unsplash.com/photo-1585844723073-a34564c63c73?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality radish."
  },
  {
    id: "014",
    name: "Coriander",
    price: 15,
    image: "https://images.unsplash.com/photo-1615485925547-5166bbfea8e5?q=80&w=500&auto=format&fit=crop",
    category: "Herbs",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality coriander."
  },
  {
    id: "015",
    name: "Mint",
    price: 15,
    image: "https://images.unsplash.com/photo-1556116358-c3421fa9db7a?q=80&w=500&auto=format&fit=crop",
    category: "Herbs",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality mint."
  }
];

export const categories = [...new Set(vegetables.map(veg => veg.category))];
