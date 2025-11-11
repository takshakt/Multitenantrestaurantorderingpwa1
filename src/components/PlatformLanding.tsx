import { Search, Clock, Shield, MapPin, Package, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { RestaurantCard } from './RestaurantCard';
import { Restaurant } from '../lib/data';

interface PlatformLandingProps {
  restaurants: Restaurant[];
  onRestaurantClick: (slug: string) => void;
}

export function PlatformLanding({ restaurants, onRestaurantClick }: PlatformLandingProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-background py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4">Order from Local Restaurants</h1>
          <p className="text-muted-foreground mb-8">
            Fast delivery • Great prices • Trusted by thousands
          </p>
          
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Enter your postcode or address"
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg" className="h-12 px-8">
                Find Restaurants
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Get your food delivered in 30 minutes or less
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-success/10 text-success mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Secure Payments</h3>
              <p className="text-muted-foreground text-sm">
                Safe and secure checkout powered by Stripe
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-warning/10 text-warning mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Order Tracking</h3>
              <p className="text-muted-foreground text-sm">
                Track your order in real-time from kitchen to door
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary mb-4">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Multiple Restaurants</h3>
              <p className="text-muted-foreground text-sm">
                Choose from hundreds of local restaurants
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-success/10 text-success mb-4">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Saved Addresses</h3>
              <p className="text-muted-foreground text-sm">
                Save your favorite delivery locations
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-warning/10 text-warning mb-4">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="mb-2">Quick Reorder</h3>
              <p className="text-muted-foreground text-sm">
                Reorder your favorites with just one click
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Restaurants */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="mb-2">Popular Restaurants</h2>
            <p className="text-muted-foreground">
              Explore our most loved restaurants
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                {...restaurant}
                onClick={() => onRestaurantClick(restaurant.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="mb-2">How It Works</h2>
            <p className="text-muted-foreground">
              Order food in three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4">
                1
              </div>
              <h3 className="mb-2">Choose Restaurant</h3>
              <p className="text-muted-foreground text-sm">
                Browse menus from your favorite local restaurants
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4">
                2
              </div>
              <h3 className="mb-2">Select Items</h3>
              <p className="text-muted-foreground text-sm">
                Add items to your cart and customize as needed
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4">
                3
              </div>
              <h3 className="mb-2">Track Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Sit back and track your order in real-time
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Restaurants</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQs</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-4">Follow Us</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">Facebook</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 OrpRasoi. Professional food ordering platform.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
