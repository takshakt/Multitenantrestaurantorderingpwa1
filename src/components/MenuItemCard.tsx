import { Plus, Minus, Flame } from 'lucide-react';
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
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'authentic';
  dietaryTags?: string[];
  specialTags?: string[];
  occasionTags?: string[];
  allergens?: string[];
  calories?: number;
}

const spiceLevelConfig = {
  mild: { color: 'bg-green-100 text-green-800 border-green-200', icon: 1 },
  medium: { color: 'bg-orange-100 text-orange-800 border-orange-200', icon: 2 },
  hot: { color: 'bg-red-100 text-red-800 border-red-200', icon: 3 },
  authentic: { color: 'bg-purple-100 text-purple-800 border-purple-200', icon: 4 }
};

const dietaryTagColors: Record<string, string> = {
  'Vegan': 'bg-emerald-100 text-emerald-800 border-emerald-200',
  'Vegetarian': 'bg-green-100 text-green-800 border-green-200',
  'Non-Veg': 'bg-rose-100 text-rose-800 border-rose-200',
  'Red Meat': 'bg-red-100 text-red-800 border-red-200',
  'Contains Dairy': 'bg-blue-100 text-blue-800 border-blue-200',
  'Gluten-Free': 'bg-amber-100 text-amber-800 border-amber-200'
};

const specialTagColors: Record<string, string> = {
  'Best Seller': 'bg-primary/10 text-primary border-primary/20',
  "Chef's Special": 'bg-amber-100 text-amber-900 border-amber-200',
  'New Item': 'bg-cyan-100 text-cyan-900 border-cyan-200',
  'Seasonal': 'bg-violet-100 text-violet-900 border-violet-200'
};

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
  onDecrement,
  spiceLevel,
  dietaryTags = [],
  specialTags = [],
  occasionTags = [],
  allergens = [],
  calories
}: MenuItemCardProps) {
  return (
    <div className="bg-white rounded-lg border border-border overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex gap-4 p-4">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div className="flex-1">
              <h4 className="mb-1">{name}</h4>
              
              {/* Special Tags Row */}
              {specialTags.length > 0 && (
                <div className="flex gap-1.5 mb-2 flex-wrap">
                  {specialTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className={`text-xs h-5 px-2 rounded-sm ${
                        specialTagColors[tag] || 'bg-muted text-foreground'
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
          
          {/* Tags Section */}
          <div className="space-y-2 mb-3">
            {/* Dietary Tags */}
            {dietaryTags.length > 0 && (
              <div className="flex gap-1.5 flex-wrap">
                {dietaryTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={`text-xs h-5 px-1.5 rounded-sm ${
                      dietaryTagColors[tag] || 'bg-muted text-foreground border-border'
                    }`}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Spice Level & Calories Row */}
            <div className="flex gap-2 items-center flex-wrap">
              {spiceLevel && (
                <Badge
                  variant="outline"
                  className={`text-xs h-5 px-1.5 rounded-sm flex items-center gap-1 ${
                    spiceLevelConfig[spiceLevel].color
                  }`}
                >
                  {Array.from({ length: spiceLevelConfig[spiceLevel].icon }).map((_, i) => (
                    <Flame key={i} className="w-2.5 h-2.5" />
                  ))}
                  <span className="capitalize">{spiceLevel}</span>
                </Badge>
              )}
              
              {calories && (
                <Badge
                  variant="outline"
                  className="text-xs h-5 px-1.5 rounded-sm bg-slate-100 text-slate-700 border-slate-200"
                >
                  {calories} cal
                </Badge>
              )}
            </div>
            
            {/* Allergen Warning */}
            {allergens.length > 0 && (
              <div className="text-xs text-muted-foreground">
                Contains: {allergens.join(', ')}
              </div>
            )}
          </div>
          
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
