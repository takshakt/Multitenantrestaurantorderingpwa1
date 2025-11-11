import { useState } from 'react';
import { Search, X, ChevronLeft, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';
import { RestaurantCard } from './RestaurantCard';
import { MenuItem, Restaurant } from '../lib/data';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SearchPageProps {
  restaurants: Restaurant[];
  menuItems: MenuItem[];
  onBack: () => void;
  onRestaurantSelect: (restaurantSlug: string) => void;
}

export function SearchPage({
  restaurants,
  menuItems,
  onBack,
  onRestaurantSelect
}: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  // Search across restaurants and menu items
  const searchResults = searchQuery.trim() ? {
    restaurants: restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    menuItems: menuItems.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.searchTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.dietaryTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.allergens.some(allergen => allergen.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  } : { restaurants: [], menuItems: [] };

  const popularSearches = [
    'Pizza', 'Sushi', 'Burger', 'Indian', 'Vegan', 'Spicy', 'Healthy', 'Dessert'
  ];

  const dietaryFilters = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'
  ];

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search restaurants, dishes, cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
                autoFocus
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
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!searchQuery ? (
          <>
            {/* Popular Searches */}
            <section className="mb-8">
              <h3 className="mb-4">Popular Searches</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <Button
                    key={term}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(term)}
                    className="rounded-full"
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </section>

            {/* Dietary Filters */}
            <section className="mb-8">
              <h3 className="mb-4">Dietary Preferences</h3>
              <div className="flex flex-wrap gap-2">
                {dietaryFilters.map((filter) => (
                  <Badge
                    key={filter}
                    variant={selectedFilters.includes(filter) ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2 rounded-full"
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Browse by Cuisine */}
            <section>
              <h3 className="mb-4">Browse by Cuisine</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Indian', 'Italian', 'Japanese', 'American', 'Thai', 'Mediterranean', 'Chinese', 'Mexican'].map((cuisine) => (
                  <Card
                    key={cuisine}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSearchQuery(cuisine)}
                  >
                    <CardContent className="p-6 text-center">
                      <p>{cuisine}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Search Results */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                Found {searchResults.restaurants.length} restaurant{searchResults.restaurants.length !== 1 ? 's' : ''} and {searchResults.menuItems.length} dish{searchResults.menuItems.length !== 1 ? 'es' : ''}
              </p>
            </div>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">
                  All ({searchResults.restaurants.length + searchResults.menuItems.length})
                </TabsTrigger>
                <TabsTrigger value="restaurants">
                  Restaurants ({searchResults.restaurants.length})
                </TabsTrigger>
                <TabsTrigger value="dishes">
                  Dishes ({searchResults.menuItems.length})
                </TabsTrigger>
              </TabsList>

              {/* All Results */}
              <TabsContent value="all" className="space-y-8">
                {searchResults.restaurants.length > 0 && (
                  <section>
                    <h3 className="mb-4">Restaurants</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.restaurants.map((restaurant) => (
                        <RestaurantCard
                          key={restaurant.id}
                          {...restaurant}
                          onClick={() => onRestaurantSelect(restaurant.slug)}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {searchResults.menuItems.length > 0 && (
                  <section>
                    <h3 className="mb-4">Dishes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResults.menuItems.map((item) => (
                        <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                          <div className="flex gap-4 p-4">
                            <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                              <ImageWithFallback
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <p>{item.name}</p>
                                {item.specialTags.length > 0 && (
                                  <Badge variant="outline" className="text-xs">
                                    {item.specialTags[0]}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                {item.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-primary">£{item.price.toFixed(2)}</span>
                                <div className="flex gap-1">
                                  {item.dietaryTags.slice(0, 2).map((tag) => (
                                    <Badge key={tag} variant="secondary" className="text-xs">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </section>
                )}

                {searchResults.restaurants.length === 0 && searchResults.menuItems.length === 0 && (
                  <div className="text-center py-12">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or browse by cuisine
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Restaurants Only */}
              <TabsContent value="restaurants">
                {searchResults.restaurants.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {searchResults.restaurants.map((restaurant) => (
                      <RestaurantCard
                        key={restaurant.id}
                        {...restaurant}
                        onClick={() => onRestaurantSelect(restaurant.slug)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No restaurants found</p>
                  </div>
                )}
              </TabsContent>

              {/* Dishes Only */}
              <TabsContent value="dishes">
                {searchResults.menuItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {searchResults.menuItems.map((item) => (
                      <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="flex gap-4 p-4">
                          <div className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <p>{item.name}</p>
                              {item.specialTags.length > 0 && (
                                <Badge variant="outline" className="text-xs">
                                  {item.specialTags[0]}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {item.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-primary">£{item.price.toFixed(2)}</span>
                              <div className="flex gap-1">
                                {item.dietaryTags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No dishes found</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
}
