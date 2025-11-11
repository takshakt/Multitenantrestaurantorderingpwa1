import { Button } from './ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';

interface DemoNavProps {
  onNavigate: (view: string) => void;
}

export function DemoNav({ onNavigate }: DemoNavProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="lg" className="rounded-full shadow-xl">
            <Menu className="w-5 h-5 mr-2" />
            Demo Navigation
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>OrpRasoi Demo</SheetTitle>
            <SheetDescription>
              Navigate between different pages to explore the platform
            </SheetDescription>
          </SheetHeader>
          
          <div className="mt-6 space-y-3">
            <div>
              <h4 className="mb-2 text-sm">Platform Pages</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('landing')}
                >
                  🏠 Landing Page
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('restaurant')}
                >
                  🍽️ Restaurant Storefront
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('search')}
                >
                  🔍 Search Page
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="mb-2 text-sm">Order Flow</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('checkout')}
                >
                  🛒 Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('confirmation')}
                >
                  ✓ Order Confirmation
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('tracking')}
                >
                  📍 Order Tracking
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="mb-2 text-sm">Account & More</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('account')}
                >
                  👤 Customer Account
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('catering')}
                >
                  🎉 Catering Services
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="mb-2 text-sm">Status Pages</h4>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('coming-soon')}
                >
                  🚧 Coming Soon
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => onNavigate('offline')}
                >
                  ⏸️ Currently Offline
                </Button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
