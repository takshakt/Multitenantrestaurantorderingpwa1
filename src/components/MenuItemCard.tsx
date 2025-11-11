import { Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MenuItemCardProps {
  name: string;
  description: string;
  price: number;
  image: string;
  dietary: string[];
  available: boolean;
  quantity?: number;
  onAdd: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function MenuItemCard({
  name,
  description,
  price,
  image,
  dietary,
  available,
  quantity = 0,
  onAdd,
  onIncrement,
  onDecrement
}: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4>{name}</h4>
            {dietary.length > 0 && (
              <div className="flex gap-1 flex-shrink-0">
                {dietary.map((d) => (
                  <Badge
                    key={d}
                    variant="outline"
                    className="text-xs h-5 px-1.5 rounded-sm bg-success/10 text-success border-success/20"
                  >
                    {d}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-primary">
              £{price.toFixed(2)}
            </span>
            
            {!available ? (
              <span className="text-sm text-muted-foreground">Unavailable</span>
            ) : quantity === 0 ? (
              <Button
                size="sm"
                onClick={onAdd}
                className="h-8 px-3"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={onDecrement}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  size="sm"
                  onClick={onIncrement}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
          <ImageWithFallback
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
