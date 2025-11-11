import { Star, Clock, Bike } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RestaurantCardProps {
  name: string;
  cuisine: string[];
  cover: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minimumOrder: number;
  isOpen: boolean;
  onClick?: () => void;
}

export function RestaurantCard({
  name,
  cuisine,
  cover,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  minimumOrder,
  isOpen,
  onClick
}: RestaurantCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-lg border border-border"
      style={{ boxShadow: 'var(--shadow-sm)' }}
    >
      <div className="relative h-48 bg-muted">
        <ImageWithFallback
          src={cover}
          alt={name}
          className="w-full h-full object-cover"
        />
        {!isOpen && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-white px-4 py-2 rounded-md bg-black/40">
              Currently Closed
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="mb-2">{name}</h3>
        
        <div className="flex gap-2 mb-3 flex-wrap">
          {cuisine.map((c) => (
            <Badge key={c} variant="secondary" className="rounded-full">
              {c}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warning text-warning" />
            <span>{rating}</span>
            <span>({reviewCount})</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{deliveryTime}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Bike className="w-4 h-4" />
            <span>£{deliveryFee.toFixed(2)}</span>
          </div>
          <span className="text-muted-foreground">
            Min: £{minimumOrder.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
