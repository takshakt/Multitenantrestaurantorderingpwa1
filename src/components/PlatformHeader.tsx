import { ShoppingCart, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface PlatformHeaderProps {
  cartItemCount?: number;
  onAccountClick?: () => void;
  onCartClick?: () => void;
}

export function PlatformHeader({ cartItemCount = 0, onAccountClick, onCartClick }: PlatformHeaderProps) {
  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <h1 className="text-primary cursor-pointer">OrpRasoi</h1>
            
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Restaurants
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                How it Works
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Support
              </a>
            </nav>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onAccountClick}>
              <User className="w-5 h-5" />
              <span className="hidden sm:inline ml-2">Account</span>
            </Button>
            <Button variant="ghost" size="sm" onClick={onCartClick} className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 px-1 text-xs">
                  {cartItemCount}
                </Badge>
              )}
              <span className="hidden sm:inline ml-2">Cart</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
