// Mock data for the OrpRasoi platform

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
}

export interface CartItem extends MenuItem {
  quantity: number;
  customizations?: string;
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
}

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: 'Spice Garden',
    slug: 'spice-garden',
    cuisine: ['Indian', 'Vegetarian'],
    logo: '',
    cover: 'https://images.unsplash.com/photo-1728910758653-7e990e489cac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjByZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjI3ODc0MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.5,
    reviewCount: 324,
    deliveryTime: '20-30 min',
    deliveryFee: 2.99,
    minimumOrder: 15,
    isOpen: true,
    hours: 'Mon-Sun: 11:00 AM - 10:00 PM'
  },
  {
    id: '2',
    name: 'Urban Grill',
    slug: 'urban-grill',
    cuisine: ['American', 'Burgers'],
    logo: '',
    cover: 'https://images.unsplash.com/photo-1616191358210-1ef9c97757e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBncmlsbCUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzYyODIwMTY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.7,
    reviewCount: 512,
    deliveryTime: '25-35 min',
    deliveryFee: 3.49,
    minimumOrder: 20,
    isOpen: true,
    hours: 'Mon-Sun: 12:00 PM - 11:00 PM'
  },
  {
    id: '3',
    name: 'Sushi Master',
    slug: 'sushi-master',
    cuisine: ['Japanese', 'Sushi'],
    logo: '',
    cover: 'https://images.unsplash.com/photo-1700324806631-adc453ec77db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZHxlbnwxfHx8fDE3NjI3MTMyMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.8,
    reviewCount: 289,
    deliveryTime: '30-40 min',
    deliveryFee: 4.99,
    minimumOrder: 25,
    isOpen: true,
    hours: 'Mon-Sun: 12:00 PM - 10:00 PM'
  },
  {
    id: '4',
    name: 'Mediterranean Kitchen',
    slug: 'mediterranean-kitchen',
    cuisine: ['Mediterranean', 'Healthy'],
    logo: '',
    cover: 'https://images.unsplash.com/photo-1712873069353-87c44687d345?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwaGVhbHRoeSUyMGZvb2R8ZW58MXx8fHwxNzYyNzYxODkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.6,
    reviewCount: 198,
    deliveryTime: '20-30 min',
    deliveryFee: 2.49,
    minimumOrder: 15,
    isOpen: false,
    hours: 'Mon-Sun: 11:00 AM - 9:00 PM'
  },
  {
    id: '5',
    name: 'Thai Fusion',
    slug: 'thai-fusion',
    cuisine: ['Thai', 'Asian'],
    logo: '',
    cover: 'https://images.unsplash.com/photo-1637806930600-37fa8892069d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGFpJTIwYXNpYW4lMjBjdWlzaW5lfGVufDF8fHx8MTc2MjgyMDE2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.4,
    reviewCount: 423,
    deliveryTime: '25-35 min',
    deliveryFee: 3.99,
    minimumOrder: 18,
    isOpen: true,
    hours: 'Mon-Sun: 11:30 AM - 10:30 PM'
  },
  {
    id: '6',
    name: 'Pizza Perfetto',
    slug: 'pizza-perfetto',
    cuisine: ['Italian', 'Pizza'],
    logo: '',
    cover: 'https://images.unsplash.com/photo-1724232865752-4af928d13989?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcGl6emElMjByZXN0YXVyYW50fGVufDF8fHx8MTc2Mjc0ODY0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rating: 4.5,
    reviewCount: 678,
    deliveryTime: '20-30 min',
    deliveryFee: 2.99,
    minimumOrder: 12,
    isOpen: true,
    hours: 'Mon-Sun: 11:00 AM - 11:00 PM'
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
    available: true
  },
  {
    id: '2',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese grilled with bell peppers and onions',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwcGFuZWVyJTIwdmVnZXRhcmlhbnxlbnwxfHx8fDE3NjI4MjAzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Starters',
    dietary: ['V'],
    available: true
  },
  {
    id: '3',
    name: 'Vegetable Biryani',
    description: 'Fragrant basmati rice with mixed vegetables and spices',
    price: 13.49,
    image: 'https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGRpc2h8ZW58MXx8fHwxNzYyNzU2NDk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Main Course',
    dietary: ['VG'],
    available: true
  },
  {
    id: '4',
    name: 'Samosa (2 pcs)',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1697155836252-d7f969108b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBhcHBldGl6ZXJ8ZW58MXx8fHwxNzYyNzcwNTEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Starters',
    dietary: ['VG'],
    available: true
  },
  {
    id: '5',
    name: 'Chicken Tikka Masala',
    description: 'Grilled chicken in rich spiced curry sauce',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1707448829764-9474458021ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWtrYSUyMG1hc2FsYSUyMGN1cnJ5fGVufDF8fHx8MTc2MjgyMDM3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Main Course',
    dietary: [],
    available: true
  },
  {
    id: '6',
    name: 'Garlic Naan',
    description: 'Fresh-baked flatbread with garlic and butter',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1697155406014-04dc649b0953?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYWFuJTIwYnJlYWQlMjBnYXJsaWN8ZW58MXx8fHwxNzYyODIwMzc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Breads',
    dietary: ['V'],
    available: true
  },
  {
    id: '7',
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked with butter and cream',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1586981114766-708f09a71e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWwlMjBsZW50aWwlMjBjdXJyeXxlbnwxfHx8fDE3NjI4MjAzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Main Course',
    dietary: ['V'],
    available: true
  },
  {
    id: '8',
    name: 'Mango Lassi',
    description: 'Refreshing yogurt drink with mango pulp',
    price: 4.49,
    image: 'https://images.unsplash.com/photo-1728777185717-a9d9bc2bd969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nbyUyMGxhc3NpJTIwZHJpbmt8ZW58MXx8fHwxNzYyNzk2ODgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    category: 'Beverages',
    dietary: ['V'],
    available: true
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
    deliveryAddress: '123 Main Street, London, SW1A 1AA'
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
