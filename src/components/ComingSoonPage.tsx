import { Clock, Mail, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ComingSoonPageProps {
  restaurantName: string;
  restaurantLogo?: string;
  onBack?: () => void;
}

export function ComingSoonPage({ restaurantName, restaurantLogo, onBack }: ComingSoonPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button variant="ghost" size="sm" onClick={onBack}>
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              )}
              <h3>OrpRasoi</h3>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Restaurant Logo */}
          {restaurantLogo && (
            <div className="flex justify-center">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-4 border-white shadow-lg">
                <ImageWithFallback
                  src={restaurantLogo}
                  alt={restaurantName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Clock className="w-10 h-10 text-primary" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <h1 className="text-primary">{restaurantName}</h1>
            <h2>We're Getting Ready!</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Our team is working hard to bring you an amazing dining experience. We're currently 
              updating our menu and preparing everything to serve you better.
            </p>
          </div>

          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full">
            <Clock className="w-5 h-5" />
            <span>Opening Soon</span>
          </div>

          {/* Email Notification */}
          <div className="bg-white rounded-lg border border-border p-8 space-y-4">
            <div className="flex items-center justify-center gap-2 text-primary">
              <Mail className="w-5 h-5" />
              <h3>Get Notified</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Be the first to know when we launch. Enter your email and we'll notify you!
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="your@email.com"
                className="flex-1"
              />
              <Button>Notify Me</Button>
            </div>
          </div>

          {/* Additional Info */}
          <div className="pt-8 space-y-2">
            <p className="text-sm text-muted-foreground">
              Have questions? Contact us at
            </p>
            <p className="text-sm">
              <a href="mailto:support@orprasoi.com" className="text-primary hover:underline">
                support@orprasoi.com
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
