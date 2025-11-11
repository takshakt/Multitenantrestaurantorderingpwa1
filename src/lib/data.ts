// Mock data for the OrpRasoi platform

export interface DayHours {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
}

export interface Restaurant {
  id: string;
  name: string;
  slug: string;
  cuisine: string[];
  logo: string;
  cover: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  hours: string;
  detailedHours: DayHours[];
  phone: string;
  email: string;
  address: string;
}

export interface DiscountCode {
  code: string;
  description: string;
  discount: string;
  minOrder?: number;
  validUntil?: string;
}

export interface SpecialOffering {
  id: string;
  title: string;
  description: string;
  image: string;
  validPeriod: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  dietary: string[];
  available: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'authentic';
  dietaryTags: string[];
  specialTags: string[];
  occasionTags: string[];
  allergens: string[];
  calories?: number;
  searchTags: string[];
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizations?: string;
}

export interface OrderMessage {
  id: string;
  sender: 'customer' | 'restaurant';
  message: string;
  timestamp: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  restaurantName: string;
  date: string;
  total: number;
  status: 'placed' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered';
  items: CartItem[];
  deliveryAddress?: string;
  messages?: OrderMessage[];
}

export const mockDiscountCodes: DiscountCode[] = [
  {
    code: 'WELCOME20',
    description: 'Get 20% off on your first order',
    discount: '20% off',
    minOrder: 15
  },
  {
    code: 'FREESHIP',
    description: 'Free delivery on orders over £25',
    discount: 'Free Delivery',
    minOrder: 25
  },
  {
    code: 'WEEKEND15',
    description: 'Weekend special - 15% off all orders',
    discount: '15% off',
    validUntil: '2025-11-15'
  }
];

export const mockSpecialOfferings: SpecialOffering[] = [
  {
    id: '1',
    title: 'Weekend Special Menu',
    description: 'Try our exclusive weekend tandoori platter with complimentary dessert',
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW5kb29yaSUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzYyODIwMzc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    validPeriod: 'Fri-Sun'
  },
  {
    id: '2',
    title: 'Festive Diwali Special',
    description: 'Celebrate with our special festive menu featuring traditional sweets',
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzd2VldHMlMjBmZXN0aXZlfGVufDF8fHx8MTc2MjgyMDM3NXww&ixlib=rb-4.1.0&q=80&w=1080',
    validPeriod: 'Nov 1-15'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    customerName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely amazing! The butter chicken was authentic and delicious. Will definitely order again.',
    date: '2025-11-08'
  },
  {
    id: '2',
    customerName: 'Michael Chen',
    rating: 4,
    comment: 'Great food and fast delivery. The paneer tikka was perfectly spiced.',
    date: '2025-11-07'
  },
  {
    id: '3',
    customerName: 'Emma Williams',
    rating: 5,
    comment: 'Best Indian restaurant in town! Fresh ingredients and generous portions.',
    date: '2025-11-06'
  },
  {
    id: '4',
    customerName: 'David Brown',
    rating: 5,
    comment: 'The biryani is to die for! Authentic flavors and perfect spice level.',
    date: '2025-11-05'
  },
  {
    id: '5',
    customerName: 'Lisa Anderson',
    rating: 4,
    comment: 'Wonderful vegetarian options. The dal makhani was creamy and flavorful.',
    date: '2025-11-04'
  }
];

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Spice Garden',
    slug: 'spice-garden',
    cuisine: ['Indian', 'Vegetarian'],
    logo: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbG9nb3xlbnwxfHx8fDE3NjI4MjAzNzV8MA&ixlib=rb-4.1.0&q=80&w=200',
    cover: 'https://images.unsplash.com/photo-1728910758653-7e990e489cac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjI3ODc0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.5,
    reviewCount: 324,
    deliveryTime: '20-30 min',
    deliveryFee: 2.99,
    minimumOrder: 15,
    isOpen: true,
    hours: 'Mon-Sun: 11:00 AM - 10:00 PM',
    detailedHours: [
      { day: 'Monday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Tuesday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Wednesday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Thursday', open: '11:00 AM', close: '10:00 PM' },
      { day: 'Friday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Saturday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Sunday', open: '12:00 PM', close: '10:00 PM' }
    ],
    phone: '+44 20 1234 5678',
    email: 'hello@spicegarden.com',
    address: '123 Curry Lane, London, SW1A 1AA'
  },
  {
    id: '2',
    name: 'Urban Grill',
    slug: 'urban-grill',
    cuisine: ['American', 'Burgers'],
    logo: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbG9nb3xlbnwxfHx8fDE3NjI4MjAzNzV8MA&ixlib=rb-4.1.0&q=80&w=200',
    cover: 'https://images.unsplash.com/photo-1616191358210-1ef9c97757e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBncmlsbCUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYyODIwMTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviewCount: 512,
    deliveryTime: '25-35 min',
    deliveryFee: 3.49,
    minimumOrder: 20,
    isOpen: true,
    hours: 'Mon-Sun: 12:00 PM - 11:00 PM',
    detailedHours: [
      { day: 'Monday', open: '12:00 PM', close: '11:00 PM' },
      { day: 'Tuesday', open: '12:00 PM', close: '11:00 PM' },
      { day: 'Wednesday', open: '12:00 PM', close: '11:00 PM' },
      { day: 'Thursday', open: '12:00 PM', close: '11:00 PM' },
      { day: 'Friday', open: '12:00 PM', close: '11:00 PM' },
      { day: 'Saturday', open: '12:00 PM', close: '11:00 PM' },
      { day: 'Sunday', open: '12:00 PM', close: '11:00 PM' }
    ],
    phone: '+44 20 9876 5432',
    email: 'info@urbangrill.com',
    address: '456 Burger Street, London, W1A 1AB'
  },
  {
    id: '3',
    name: 'Sushi Master',
    slug: 'sushi-master',
    cuisine: ['Japanese', 'Sushi'],
    logo: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbG9nb3xlbnwxfHx8fDE3NjI4MjAzNzV8MA&ixlib=rb-4.1.0&q=80&w=200',
    cover: 'https://images.unsplash.com/photo-1700324806631-adc453ec77db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NjI3MTMyMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviewCount: 289,
    deliveryTime: '30-40 min',
    deliveryFee: 4.99,
    minimumOrder: 25,
    isOpen: true,
    hours: 'Mon-Sun: 12:00 PM - 10:00 PM',
    detailedHours: [
      { day: 'Monday', open: '12:00 PM', close: '10:00 PM' },
      { day: 'Tuesday', open: '12:00 PM', close: '10:00 PM' },
      { day: 'Wednesday', open: '12:00 PM', close: '10:00 PM' },
      { day: 'Thursday', open: '12:00 PM', close: '10:00 PM' },
      { day: 'Friday', open: '12:00 PM', close: '10:00 PM' },
      { day: 'Saturday', open: '12:00 PM', close: '10:00 PM' },
      { day: 'Sunday', closed: true, open: '', close: '' }
    ],
    phone: '+44 20 5555 1234',
    email: 'contact@sushimaster.com',
    address: '789 Sushi Street, London, E1 6AN'
  },
  {
    id: '4',
    name: 'Mediterranean Kitchen',
    slug: 'mediterranean-kitchen',
    cuisine: ['Mediterranean', 'Healthy'],
    logo: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbG9nb3xlbnwxfHx8fDE3NjI4MjAzNzV8MA&ixlib=rb-4.1.0&q=80&w=200',
    cover: 'https://images.unsplash.com/photo-1712873069353-87c44687d345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwaGVhbHRoeSUyMGZvb2R8ZW58MXx8fHwxNzYyNzYxODkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    reviewCount: 198,
    deliveryTime: '20-30 min',
    deliveryFee: 2.49,
    minimumOrder: 15,
    isOpen: false,
    hours: 'Mon-Sun: 11:00 AM - 9:00 PM',
    detailedHours: [
      { day: 'Monday', open: '11:00 AM', close: '9:00 PM' },
      { day: 'Tuesday', open: '11:00 AM', close: '9:00 PM' },
      { day: 'Wednesday', open: '11:00 AM', close: '9:00 PM' },
      { day: 'Thursday', open: '11:00 AM', close: '9:00 PM' },
      { day: 'Friday', open: '11:00 AM', close: '9:00 PM' },
      { day: 'Saturday', open: '11:00 AM', close: '9:00 PM' },
      { day: 'Sunday', open: '11:00 AM', close: '9:00 PM' }
    ],
    phone: '+44 20 7777 8888',
    email: 'info@medkitchen.com',
    address: '321 Mediterranean Ave, London, NW1 2FB'
  },
  {
    id: '5',
    name: 'Thai Fusion',
    slug: 'thai-fusion',
    cuisine: ['Thai', 'Asian'],
    logo: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbG9nb3xlbnwxfHx8fDE3NjI4MjAzNzV8MA&ixlib=rb-4.1.0&q=80&w=200',
    cover: 'https://images.unsplash.com/photo-1637806930600-37fa8892069d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwYXNpYW4lMjBjdWlzaW5lfGVufDF8fHx8MTc2MjgyMDE2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.4,
    reviewCount: 423,
    deliveryTime: '25-35 min',
    deliveryFee: 3.99,
    minimumOrder: 18,
    isOpen: true,
    hours: 'Mon-Sun: 11:30 AM - 10:30 PM',
    detailedHours: [
      { day: 'Monday', open: '11:30 AM', close: '10:30 PM' },
      { day: 'Tuesday', open: '11:30 AM', close: '10:30 PM' },
      { day: 'Wednesday', open: '11:30 AM', close: '10:30 PM' },
      { day: 'Thursday', open: '11:30 AM', close: '10:30 PM' },
      { day: 'Friday', open: '11:30 AM', close: '10:30 PM' },
      { day: 'Saturday', open: '11:30 AM', close: '10:30 PM' },
      { day: 'Sunday', open: '11:30 AM', close: '10:30 PM' }
    ],
    phone: '+44 20 3333 4444',
    email: 'hello@thaifusion.com',
    address: '654 Thai Road, London, SE1 9SG'
  },
  {
    id: '6',
    name: 'Pizza Perfetto',
    slug: 'pizza-perfetto',
    cuisine: ['Italian', 'Pizza'],
    logo: 'https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwbG9nb3xlbnwxfHx8fDE3NjI4MjAzNzV8MA&ixlib=rb-4.1.0&q=80&w=200',
    cover: 'https://images.unsplash.com/photo-1724232865752-4af928d13989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGl6emElMjByZXN0YXVyYW50fGVufDF8fHx8MTc2Mjc0ODY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.5,
    reviewCount: 678,
    deliveryTime: '20-30 min',
    deliveryFee: 2.99,
    minimumOrder: 12,
    isOpen: true,
    hours: 'Mon-Sun: 11:00 AM - 11:00 PM',
    detailedHours: [
      { day: 'Monday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Tuesday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Wednesday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Thursday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Friday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Saturday', open: '11:00 AM', close: '11:00 PM' },
      { day: 'Sunday', open: '11:00 AM', close: '11:00 PM' }
    ],
    phone: '+44 20 6666 7777',
    email: 'ciao@pizzaperfetto.com',
    address: '987 Pizza Plaza, London, WC2N 5DU'
  }
];

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken in creamy tomato sauce with aromatic spices',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBjaGlja2VuJTIwY3Vycnl8ZW58MXx8fHwxNzYyNzcwMzk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Main Course',
    dietary: [],
    available: true,
    spiceLevel: 'medium',
    dietaryTags: ['Non-Veg', 'Contains Dairy'],
    specialTags: ['Best Seller', "Chef's Special"],
    occasionTags: ['Dinner', 'Family Meal'],
    allergens: ['Dairy', 'Nuts'],
    calories: 485,
    searchTags: ['butter chicken', 'curry', 'chicken', 'indian', 'creamy', 'spicy']
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese grilled with bell peppers and onions',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwcGFuZWVyJTIwdmVnZXRhcmlhbnxlbnwxfHx8fDE3NjI4MjAzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Starters',
    dietary: ['V'],
    available: true,
    spiceLevel: 'medium',
    dietaryTags: ['Vegetarian', 'Contains Dairy'],
    specialTags: ['Best Seller'],
    occasionTags: ['Appetizer', 'Party'],
    allergens: ['Dairy'],
    calories: 320,
    searchTags: ['paneer', 'tikka', 'starter', 'grilled', 'vegetarian', 'cheese']
  },
  {
    id: '3',
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice with mixed vegetables and spices',
    price: 13.49,
    image: 'https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzYyNzU2NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Main Course',
    dietary: ['VG'],
    available: true,
    spiceLevel: 'mild',
    dietaryTags: ['Vegan', 'Gluten-Free'],
    specialTags: ['Seasonal'],
    occasionTags: ['Lunch', 'Dinner'],
    allergens: [],
    calories: 395,
    searchTags: ['biryani', 'rice', 'vegan', 'vegetables', 'indian', 'aromatic']
  },
  {
    id: '4',
    name: 'Samosa (2 pcs)',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBhcHBldGl6ZXJ8ZW58MXx8fHwxNzYyNzcwNTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Starters',
    dietary: ['VG'],
    available: true,
    spiceLevel: 'mild',
    dietaryTags: ['Vegan'],
    specialTags: ['Best Seller'],
    occasionTags: ['Snack', 'Tea Time'],
    allergens: ['Gluten'],
    calories: 262,
    searchTags: ['samosa', 'fried', 'snack', 'potato', 'vegan', 'crispy']
  },
  {
    id: '5',
    name: 'Chicken Tikka Masala',
    description: 'Grilled chicken in rich spiced curry sauce',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1707448829764-9474458021ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWtrYSUyMG1hc2FsYSUyMGN1cnJ5fGVufDF8fHx8MTc2MjgyMDM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Main Course',
    dietary: [],
    available: true,
    spiceLevel: 'hot',
    dietaryTags: ['Non-Veg', 'Contains Dairy'],
    specialTags: ["Chef's Special", 'Best Seller'],
    occasionTags: ['Dinner', 'Date Night'],
    allergens: ['Dairy'],
    calories: 520,
    searchTags: ['tikka masala', 'chicken', 'curry', 'spicy', 'indian', 'grilled']
  },
  {
    id: '6',
    name: 'Garlic Naan',
    description: 'Fresh-baked flatbread with garlic and butter',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1697155406014-04dc649b0953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWFuJTIwYnJlYWQlMjBnYXJsaWN8ZW58MXx8fHwxNzYyODIwMzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Breads',
    dietary: ['V'],
    available: true,
    dietaryTags: ['Vegetarian', 'Contains Dairy'],
    specialTags: [],
    occasionTags: [],
    allergens: ['Gluten', 'Dairy'],
    calories: 285,
    searchTags: ['naan', 'bread', 'garlic', 'flatbread', 'indian bread']
  },
  {
    id: '7',
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked with butter and cream',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1586981114766-708f09a71e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWwlMjBsZW50aWwlMjBjdXJyeXxlbnwxfHx8fDE3NjI4MjAzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Main Course',
    dietary: ['V'],
    available: true,
    spiceLevel: 'mild',
    dietaryTags: ['Vegetarian', 'Contains Dairy'],
    specialTags: ['New Item'],
    occasionTags: ['Comfort Food', 'Family Meal'],
    allergens: ['Dairy'],
    calories: 340,
    searchTags: ['dal', 'lentils', 'curry', 'vegetarian', 'creamy', 'protein']
  },
  {
    id: '8',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink with mango pulp',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1728777185717-a9d9bc2bd969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nbyUyMGxhc3NpJTIwZHJpbmt8ZW58MXx8fHwxNzYyNzk2ODgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Beverages',
    dietary: ['V'],
    available: true,
    dietaryTags: ['Vegetarian', 'Contains Dairy'],
    specialTags: ['Best Seller'],
    occasionTags: ['Refreshing', 'Summer'],
    allergens: ['Dairy'],
    calories: 180,
    searchTags: ['lassi', 'mango', 'drink', 'beverage', 'yogurt', 'sweet']
  },
  {
    id: '9',
    name: 'Lamb Vindaloo',
    description: 'Fiery Goan curry with tender lamb and vinegar-based sauce',
    price: 17.99,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW5kb29yaSUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzYyODIwMzc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Main Course',
    dietary: [],
    available: true,
    spiceLevel: 'authentic',
    dietaryTags: ['Non-Veg', 'Red Meat'],
    specialTags: ["Chef's Special"],
    occasionTags: ['Special Occasion', 'Adventurous'],
    allergens: [],
    calories: 595,
    searchTags: ['vindaloo', 'lamb', 'spicy', 'curry', 'goan', 'hot']
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001234',
    restaurantName: 'Spice Garden',
    date: '2024-11-10',
    total: 42.47,
    status: 'delivered',
    items: [
      { ...mockMenuItems[0], quantity: 2 },
      { ...mockMenuItems[5], quantity: 2 }
    ],
    deliveryAddress: '123 Main Street, London, SW1A 1AA',
    messages: [
      {
        id: '1',
        sender: 'customer',
        message: 'Please add extra spice',
        timestamp: '2024-11-10T14:30:00Z'
      },
      {
        id: '2',
        sender: 'restaurant',
        message: 'Sure! We will make it extra spicy for you.',
        timestamp: '2024-11-10T14:32:00Z'
      }
    ]
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-001235',
    restaurantName: 'Pizza Perfetto',
    date: '2024-11-09',
    total: 28.99,
    status: 'delivered',
    items: [
      { ...mockMenuItems[1], quantity: 1 },
      { ...mockMenuItems[3], quantity: 2 }
    ],
    deliveryAddress: '123 Main Street, London, SW1A 1AA'
  }
];
