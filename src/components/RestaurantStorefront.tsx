import { useState } from 'react';
import { Star, Clock, MapPin, Info, ShoppingCart, User, Search, ChevronLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { MenuItemCard } from './MenuItemCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Restaurant, MenuItem, CartItem } from '../lib/data';

interface RestaurantStorefrontProps {
  restaurant: Restaurant;
  menuItems: MenuItem[];
  onBack: () => void;
  onCheckout: (cart: CartItem[]) => void;
}

export function RestaurantStorefront({
  restaurant,
  menuItems,
  onBack,
  onCheckout
}: RestaurantStorefrontProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'collection'>('delivery');
  
  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  
  const handleAddToCart = (item: MenuItem) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };
  
  const handleIncrement = (itemId: string) => {
    setCart(cart.map(item =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };
  
  const handleDecrement = (itemId: string) => {
    const item = cart.find(i => i.id === itemId);
    if (item && item.quantity === 1) {
      setCart(cart.filter(i => i.id !== itemId));
    } else {
      setCart(cart.map(i =>
        i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
      ));
    }
  };
  
  const getItemQuantity = (itemId: string) => {
    const item = cart.find(i => i.id === itemId);
    return item ? item.quantity : 0;
  };
  
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h3>{restaurant.name}</h3>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                onClick={() => cart.length > 0 && onCheckout(cart)}
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="relative h-64 bg-muted">
        <ImageWithFallback
          src={restaurant.cover}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </section>

      {/* Restaurant Info */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <h2>{restaurant.name}</h2>
                <Badge
                  variant={restaurant.isOpen ? 'default' : 'secondary'}
                  className={restaurant.isOpen ? 'bg-success' : ''}
                >
                  {restaurant.isOpen ? 'Open' : 'Closed'}
                </Badge>
              </div>
              
              <div className="flex gap-2 mb-3 flex-wrap">
                {restaurant.cuisine.map((c) => (
                  <Badge key={c} variant="secondary" className="rounded-full">
                    {c}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-warning text-warning" />
                  <span>{restaurant.rating}</span>
                  <span>({restaurant.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <span>Min: £{restaurant.minimumOrder.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Info className="w-4 h-4 mr-2" />
                Info
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Action Bar */}
      <section className="bg-white border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant={fulfillmentType === 'delivery' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFulfillmentType('delivery')}
            >
              🚴 Delivery · {restaurant.deliveryTime} · £{restaurant.deliveryFee.toFixed(2)}
            </Button>
            <Button
              variant={fulfillmentType === 'collection' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFulfillmentType('collection')}
            >
              🏪 Collection · 15-20 min · Free
            </Button>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="mb-8 w-full justify-start overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category} ({menuItems.filter(item => item.category === category).length})
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-4">
                  {menuItems
                    .filter(item => item.category === category)
                    .map((item) => (
                      <MenuItemCard
                        key={item.id}
                        {...item}
                        quantity={getItemQuantity(item.id)}
                        onAdd={() => handleAddToCart(item)}
                        onIncrement={() => handleIncrement(item.id)}
                        onDecrement={() => handleDecrement(item.id)}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Sticky Cart Footer */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {cartItemCount} item{cartItemCount !== 1 ? 's' : ''}
              </p>
              <p className="text-primary">
                £{cartTotal.toFixed(2)}
              </p>
            </div>
            <Button size="lg" onClick={() => onCheckout(cart)}>
              View Cart & Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
