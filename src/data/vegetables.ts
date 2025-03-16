
export interface VegetableItem {
  id: string;
  name: string;
  price: number; // price per kg or per unit
  image: string;
  category: string;
  unit: 'kg' | 'g' | 'piece'; // unit of measurement
  inStock: boolean;
  description?: string;
  options?: ('kg' | 'g' | 'piece')[];
}

// Helper function to group vegetables by categories
const categorizeVegetables = (items: VegetableItem[]) => {
  const categorized: Record<string, VegetableItem[]> = {};
  
  items.forEach(item => {
    if (!categorized[item.category]) {
      categorized[item.category] = [];
    }
    categorized[item.category].push(item);
  });
  
  return categorized;
};

export const vegetables: VegetableItem[] = [
  {
    id: "001",
    name: "ટામેટાં",
    price: 30,
    image: "https://images.unsplash.com/photo-1592924357177-827de628f228?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, ripe tomatoes.",
    options: ['kg', 'g']
  },
  {
    id: "002",
    name: "ફુલાવર",
    price: 50,
    image: "https://images.unsplash.com/photo-1613743795529-27be2a604230?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality cauliflower.",
    options: ['kg', 'g']
  },
  {
    id: "003",
    name: "દેશી કોબીજ",
    price: 30,
    image: "https://images.unsplash.com/photo-1603049830228-f2e7ade9c2ad?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality cabbage.",
    options: ['kg', 'g']
  },
  {
    id: "004",
    name: "ભીંડા",
    price: 90,
    image: "https://images.unsplash.com/photo-1644677999499-dc75507fc34f?q=80&w=500&auto=format&fit=crop",
    category: "Seasonal Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality okra.",
    options: ['kg', 'g']
  },
  {
    id: "005",
    name: "વટાણા",
    price: 50,
    image: "https://images.unsplash.com/photo-1567375921130-944a280eac2d?q=80&w=500&auto=format&fit=crop",
    category: "Legumes",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality peas.",
    options: ['kg', 'g']
  },
  {
    id: "006",
    name: "કાચા કેળા",
    price: 50,
    image: "https://images.unsplash.com/photo-1543218650-43b2bf9441db?q=80&w=500&auto=format&fit=crop",
    category: "Fruits",
    unit: "kg",
    inStock: true,
    description: "Fresh, raw bananas.",
    options: ['kg', 'g']
  },
  {
    id: "007",
    name: "દૂધી",
    price: 50,
    image: "https://images.unsplash.com/photo-1594282486552-05a6f9a1e7b7?q=80&w=500&auto=format&fit=crop",
    category: "Gourds",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality bottle gourd.",
    options: ['kg', 'g']
  },
  {
    id: "008",
    name: "દેશી દૂધી",
    price: 80,
    image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?q=80&w=500&auto=format&fit=crop",
    category: "Gourds",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality native bottle gourd.",
    options: ['kg', 'g']
  },
  {
    id: "009",
    name: "તુરીયું",
    price: 80,
    image: "https://images.unsplash.com/photo-1625435426329-421c8b304e07?q=80&w=500&auto=format&fit=crop",
    category: "Gourds",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality ridge gourd.",
    options: ['kg', 'g']
  },
  {
    id: "010",
    name: "કારેલા",
    price: 80,
    image: "https://images.unsplash.com/photo-1603207040778-2661d5e9da05?q=80&w=500&auto=format&fit=crop",
    category: "Gourds",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality bitter gourd.",
    options: ['kg', 'g']
  },
  {
    id: "011",
    name: "ટિંડોળા",
    price: 120,
    image: "https://images.unsplash.com/photo-1608442430688-a5a625fbcdd2?q=80&w=500&auto=format&fit=crop",
    category: "Gourds",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality ivy gourd.",
    options: ['kg', 'g']
  },
  {
    id: "012",
    name: "ચોળી",
    price: 130,
    image: "https://images.unsplash.com/photo-1641932361495-553eb6149dda?q=80&w=500&auto=format&fit=crop",
    category: "Legumes",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality black-eyed peas.",
    options: ['kg', 'g']
  },
  {
    id: "013",
    name: "પાપડી",
    price: 160,
    image: "https://images.unsplash.com/photo-1515192767919-6c18839c53b4?q=80&w=500&auto=format&fit=crop",
    category: "Legumes",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality flat beans.",
    options: ['kg', 'g']
  },
  {
    id: "014",
    name: "તુવેર",
    price: 130,
    image: "https://images.unsplash.com/photo-1612257999868-02378ebfd8ff?q=80&w=500&auto=format&fit=crop",
    category: "Legumes",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality pigeon peas.",
    options: ['kg', 'g']
  },
  {
    id: "015",
    name: "દેશી કાકડી",
    price: 80,
    image: "https://images.unsplash.com/photo-1604541528847-eab72677c449?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality native cucumber.",
    options: ['kg', 'g']
  },
  {
    id: "016",
    name: "ગવાર",
    price: 120,
    image: "https://images.unsplash.com/photo-1567356260295-96e9aee486de?q=80&w=500&auto=format&fit=crop",
    category: "Legumes",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality cluster beans.",
    options: ['kg', 'g']
  },
  {
    id: "017",
    name: "મેથી",
    price: 40,
    image: "https://images.unsplash.com/photo-1631119462025-9a839057b1a5?q=80&w=500&auto=format&fit=crop",
    category: "Leafy Greens",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality fenugreek leaves.",
    options: ['kg', 'g']
  },
  {
    id: "018",
    name: "ચોલિયા ની ભાજી",
    price: 80,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=500&auto=format&fit=crop",
    category: "Leafy Greens",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality amaranth leaves.",
    options: ['kg', 'g']
  },
  {
    id: "019",
    name: "મકાઈ",
    price: 40,
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality corn.",
    options: ['kg', 'g']
  },
  {
    id: "020",
    name: "લીંબુ",
    price: 80,
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?q=80&w=500&auto=format&fit=crop",
    category: "Citrus",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality lemons.",
    options: ['kg', 'g']
  },
  {
    id: "021",
    name: "કેપ્સિકમ",
    price: 60,
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality bell peppers.",
    options: ['kg', 'g']
  },
  {
    id: "022",
    name: "કોથમીર",
    price: 60,
    image: "https://images.unsplash.com/photo-1615485925547-5166bbfea8e5?q=80&w=500&auto=format&fit=crop",
    category: "Herbs",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality coriander.",
    options: ['kg', 'g']
  },
  {
    id: "023",
    name: "આમળા",
    price: 80,
    image: "https://images.unsplash.com/photo-1610569244414-5e9752781cc9?q=80&w=500&auto=format&fit=crop",
    category: "Seasonal Vegetables",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality Indian gooseberry.",
    options: ['kg', 'g']
  },
  {
    id: "024",
    name: "ફણસી",
    price: 0,
    image: "https://images.unsplash.com/photo-1581375234833-a22344f2a5fe?q=80&w=500&auto=format&fit=crop",
    category: "Seasonal Vegetables",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality jackfruit.",
    options: ['kg', 'g']
  },
  {
    id: "025",
    name: "લાલ મોગરી",
    price: 0,
    image: "https://images.unsplash.com/photo-1576460283274-ea19109bed33?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality red radish.",
    options: ['kg', 'g']
  },
  {
    id: "026",
    name: "લીલી મોગરી",
    price: 0,
    image: "https://images.unsplash.com/photo-1553175005-a1129d5c188c?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality green radish.",
    options: ['kg', 'g']
  },
  {
    id: "027",
    name: "રેગ્યુલર મરચા",
    price: 70,
    image: "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?q=80&w=500&auto=format&fit=crop",
    category: "Spices",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality regular chilies.",
    options: ['kg', 'g']
  },
  {
    id: "028",
    name: "મોરા મરચા",
    price: 100,
    image: "https://images.unsplash.com/photo-1588280183581-5d5436084674?q=80&w=500&auto=format&fit=crop",
    category: "Spices",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality Mora chilies.",
    options: ['kg', 'g']
  },
  {
    id: "029",
    name: "લાલ મરચા",
    price: 120,
    image: "https://images.unsplash.com/photo-1589466725882-f47191467734?q=80&w=500&auto=format&fit=crop",
    category: "Spices",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality red chilies.",
    options: ['kg', 'g']
  },
  {
    id: "030",
    name: "લવીંગ્યા મરચા",
    price: 70,
    image: "https://images.unsplash.com/photo-1599666632698-234e3966c5ab?q=80&w=500&auto=format&fit=crop",
    category: "Spices",
    unit: "kg",
    inStock: true,
    description: "Fresh, quality clove chilies.",
    options: ['kg', 'g']
  },
  {
    id: "031",
    name: "કાચી કેરી",
    price: 180,
    image: "https://images.unsplash.com/photo-1601493700590-4593b32c3ced?q=80&w=500&auto=format&fit=crop",
    category: "Fruits",
    unit: "kg",
    inStock: true,
    description: "Fresh, raw mangoes.",
    options: ['kg', 'g']
  },
  {
    id: "032",
    name: "પરવર",
    price: 0,
    image: "https://images.unsplash.com/photo-1587334207526-9554fa413d69?q=80&w=500&auto=format&fit=crop",
    category: "Seasonal Vegetables",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality pointed gourd.",
    options: ['kg', 'g']
  },
  {
    id: "033",
    name: "ફુદિનો",
    price: 0,
    image: "https://images.unsplash.com/photo-1556116358-c3421fa9db7a?q=80&w=500&auto=format&fit=crop",
    category: "Herbs",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality mint.",
    options: ['kg', 'g']
  },
  {
    id: "034",
    name: "મીઠો લીંમડો",
    price: 0,
    image: "https://images.unsplash.com/photo-1563417595724-2cd8c6614cdb?q=80&w=500&auto=format&fit=crop",
    category: "Herbs",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality curry leaves.",
    options: ['kg', 'g']
  },
  {
    id: "035",
    name: "બ્રોકલી",
    price: 0,
    image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?q=80&w=500&auto=format&fit=crop",
    category: "Seasonal Vegetables",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality broccoli.",
    options: ['kg', 'g']
  },
  {
    id: "036",
    name: "જુગની",
    price: 0,
    image: "https://images.unsplash.com/photo-1599464214847-6f7f3c260a7e?q=80&w=500&auto=format&fit=crop",
    category: "Legumes",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality Jugni beans.",
    options: ['kg', 'g']
  },
  {
    id: "037",
    name: "બેબીકોન",
    price: 0,
    image: "https://images.unsplash.com/photo-1596103019639-48f90717b720?q=80&w=500&auto=format&fit=crop",
    category: "Seasonal Vegetables",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality baby corn.",
    options: ['kg', 'g']
  },
  {
    id: "038",
    name: "બેસિલ પત્તા",
    price: 0,
    image: "https://images.unsplash.com/photo-1609981134793-75bfa7e4c2d3?q=80&w=500&auto=format&fit=crop",
    category: "Herbs",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality basil leaves.",
    options: ['kg', 'g']
  },
  {
    id: "039",
    name: "લાલ કેપ્સિકમ",
    price: 0,
    image: "https://images.unsplash.com/photo-1608030609295-945969c3cd11?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality red bell peppers.",
    options: ['kg', 'g']
  },
  {
    id: "040",
    name: "પીળું કેપ્સિકમ",
    price: 0,
    image: "https://images.unsplash.com/photo-1618512496518-b7b7bf67d900?q=80&w=500&auto=format&fit=crop",
    category: "Everyday Vegetables",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality yellow bell peppers.",
    options: ['kg', 'g']
  },
  {
    id: "041",
    name: "લીલી ચા",
    price: 0,
    image: "https://images.unsplash.com/photo-1582793988951-9aed5f8eac6d?q=80&w=500&auto=format&fit=crop",
    category: "Herbs",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality green tea leaves.",
    options: ['kg', 'g']
  },
  {
    id: "042",
    name: "સફરજન",
    price: 0,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=500&auto=format&fit=crop",
    category: "Fruits",
    unit: "kg",
    inStock: false,
    description: "Fresh, quality apples.",
    options: ['kg', 'g']
  }
];

// Filter out vegetables that are not in stock
export const availableVegetables = vegetables.filter(veg => veg.inStock);

// Extract unique categories
export const categories = [...new Set(vegetables.map(veg => veg.category))];

// Group vegetables by category
export const vegetablesByCategory = categorizeVegetables(vegetables);
