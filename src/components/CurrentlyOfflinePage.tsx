import { Moon, Clock, Phone, ArrowLeft, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DayHours } from '../lib/data';

interface CurrentlyOfflinePageProps {
  restaurantName: string;
  restaurantLogo?: string;
  openingHours: DayHours[];
  phone?: string;
  onBack?: () => void;
  nextOpeningTime?: string;
}

export function CurrentlyOfflinePage({ 
  restaurantName, 
  restaurantLogo, 
  openingHours,
  phone,
  onBack,
  nextOpeningTime = "Today at 5:00 PM"
}: CurrentlyOfflinePageProps) {
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
        <div className="max-w-2xl w-full space-y-8">
          {/* Restaurant Logo and Status */}
          <div className="text-center space-y-6">
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
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                <Moon className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>

            {/* Heading */}
            <div className="space-y-3">
              <h1>{restaurantName}</h1>
              <h2>Currently Closed</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                We're not accepting orders at the moment. Please check our opening hours below 
                or come back during our business hours.
              </p>
            </div>

            {/* Next Opening */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-full">
              <Clock className="w-5 h-5" />
              <span>Opens {nextOpeningTime}</span>
            </div>
          </div>

          {/* Opening Hours Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-primary" />
                <h3>Opening Hours</h3>
              </div>
              
              <div className="space-y-3">
                {openingHours.map((day, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-muted-foreground">{day.day}</span>
                      {day.closed ? (
                        <span className="text-muted-foreground">Closed</span>
                      ) : (
                        <span>{day.open} - {day.close}</span>
                      )}
                    </div>
                    {index < openingHours.length - 1 && <Separator />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          {phone && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <h4>Need to place an urgent order?</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Give us a call and we'll do our best to help you
                </p>
                <Button variant="outline" size="lg" asChild>
                  <a href={`tel:${phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call {phone}
                  </a>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Back to Home */}
          {onBack && (
            <div className="text-center">
              <Button variant="link" onClick={onBack}>
                ← Back to Restaurants
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
