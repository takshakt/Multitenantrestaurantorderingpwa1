import { useState, useEffect, useRef } from 'react';
import { Star, Clock, MapPin, Info, ShoppingCart, User, Search, ChevronLeft, Phone, Mail, Tag, Sparkles, X, Copy, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { MenuItemCard } from './MenuItemCard';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Restaurant, MenuItem, CartItem, DiscountCode, SpecialOffering, Review } from '../lib/data';

interface RestaurantStorefrontProps {
  restaurant: Restaurant;
  menuItems: MenuItem[];
  onBack: () => void;
  onCheckout: (cart: CartItem[]) => void;
  discountCodes?: DiscountCode[];
  specialOfferings?: SpecialOffering[];
  reviews?: Review[];
}

export function RestaurantStorefront({
  restaurant,
  menuItems,
  onBack,
  onCheckout,
  discountCodes = [],
  specialOfferings = [],
  reviews = []
}: RestaurantStorefrontProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'collection'>('delivery');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const reviewsContainerRef = useRef<HTMLDivElement>(null);
  
  const categories = Array.from(new Set(menuItems.map(item => item.category)));
  
  // Filter menu items based on search
  const filteredMenuItems = searchQuery.trim()
    ? menuItems.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.searchTags.some(tag => tag.toLowerCase().includes(query)) ||
          item.category.toLowerCase().includes(query) ||
          item.dietaryTags.some(tag => tag.toLowerCase().includes(query)) ||
          item.allergens.some(allergen => allergen.toLowerCase().includes(query))
        );
      })
    : menuItems;
  
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

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      toast.success(`Code ${code} copied to clipboard!`);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (error) {
      // Fallback for when clipboard API is not available
      setCopiedCode(code);
      toast.success(`Code: ${code}`);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  // Auto-scroll reviews
  useEffect(() => {
    if (!reviewsContainerRef.current || reviews.length === 0) return;
    
    const container = reviewsContainerRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame
    
    const autoScroll = () => {
      if (container) {
        scrollPosition += scrollSpeed;
        if (scrollPosition >= container.scrollWidth / 2) {
          scrollPosition = 0;
        }
        container.scrollLeft = scrollPosition;
      }
    };
    
    const intervalId = setInterval(autoScroll, 30);
    
    return () => clearInterval(intervalId);
  }, [reviews]);

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
              
              {/* Logo and Name */}
              <div className="flex items-center gap-3">
                {restaurant.logo && (
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <ImageWithFallback
                      src={restaurant.logo}
                      alt={restaurant.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3>{restaurant.name}</h3>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowSearch(!showSearch)}
              >
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
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground flex-wrap">
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
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-hide">
            <Button
              variant={fulfillmentType === 'delivery' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFulfillmentType('delivery')}
              className="flex-shrink-0"
            >
              🚴 Delivery · {restaurant.deliveryTime} · £{restaurant.deliveryFee.toFixed(2)}
            </Button>
            <Button
              variant={fulfillmentType === 'collection' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFulfillmentType('collection')}
              className="flex-shrink-0"
            >
              🏪 Collection · 15-20 min · Free
            </Button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      {showSearch && (
        <section className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, ingredients, allergens, dietary preferences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-2">
                Found {filteredMenuItems.length} item{filteredMenuItems.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Special Offerings Carousel */}
      {specialOfferings.length > 0 && (
        <section className="bg-background py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <h3>Special Offerings</h3>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {specialOfferings.map((offering) => (
                <Card key={offering.id} className="min-w-[320px] snap-start overflow-hidden">
                  <div className="h-40 bg-muted relative">
                    <ImageWithFallback
                      src={offering.image}
                      alt={offering.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-primary">
                      {offering.validPeriod}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <p className="mb-1">{offering.title}</p>
                    <p className="text-sm text-muted-foreground">{offering.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Discount Codes */}
      {discountCodes.length > 0 && (
        <section className="bg-white border-y border-border py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-5 h-5 text-primary" />
              <h3>Available Offers</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {discountCodes.map((code) => (
                <Card key={code.code} className="border-2 border-dashed border-primary/30 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary text-white border-primary">
                          {code.code}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => handleCopyCode(code.code)}
                        >
                          {copiedCode === code.code ? (
                            <Check className="w-3 h-3 text-success" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                      </div>
                      <span className="text-primary">{code.discount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{code.description}</p>
                    {code.minOrder && (
                      <p className="text-xs text-muted-foreground">
                        Min order: £{code.minOrder.toFixed(2)}
                      </p>
                    )}
                    {code.validUntil && (
                      <p className="text-xs text-muted-foreground">
                        Valid until: {code.validUntil}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Menu */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="mb-8 w-full justify-start overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category}>
                  {category} ({filteredMenuItems.filter(item => item.category === category).length})
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="space-y-4">
                  {filteredMenuItems
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
                  
                  {filteredMenuItems.filter(item => item.category === category).length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No items found matching your search
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="bg-white border-y border-border py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="mb-6">Customer Reviews</h3>
            
            <div 
              ref={reviewsContainerRef}
              className="flex gap-4 overflow-x-hidden"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Duplicate reviews for seamless loop */}
              {[...reviews, ...reviews].map((review, index) => (
                <Card key={`${review.id}-${index}`} className="min-w-[320px] flex-shrink-0">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <p>{review.customerName}</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="text-sm">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Restaurant Info Footer */}
      <section className="bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Opening Hours */}
            <div>
              <h3 className="mb-4">Opening Hours</h3>
              <div className="bg-white rounded-lg border border-border p-6">
                <div className="space-y-3">
                  {restaurant.detailedHours.map((dayHours) => (
                    <div key={dayHours.day} className="flex justify-between items-center">
                      <span className={dayHours.closed ? 'text-muted-foreground' : ''}>
                        {dayHours.day}
                      </span>
                      <span className={dayHours.closed ? 'text-muted-foreground' : 'text-primary'}>
                        {dayHours.closed ? 'Closed' : `${dayHours.open} - ${dayHours.close}`}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="mb-4">Contact Us</h3>
              <div className="bg-white rounded-lg border border-border p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm">Address</p>
                    <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">Phone</p>
                    <p className="text-sm text-muted-foreground">{restaurant.phone}</p>
                  </div>
                  <Button size="sm">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm">Email</p>
                    <p className="text-sm text-muted-foreground">{restaurant.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
