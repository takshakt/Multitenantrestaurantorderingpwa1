import { ChevronLeft, MapPin, CreditCard, User, Clock, Package } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Order } from '../lib/data';

interface CustomerAccountProps {
  orders: Order[];
  onBack: () => void;
  onViewOrder: (orderId: string) => void;
  onReorder: (orderId: string) => void;
}

export function CustomerAccount({
  orders,
  onBack,
  onViewOrder,
  onReorder
}: CustomerAccountProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-success';
      case 'on-the-way':
        return 'bg-primary';
      case 'preparing':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

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
              <h3>My Account</h3>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p>John Doe</p>
                  <p className="text-sm text-muted-foreground">john@example.com</p>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl text-primary">{orders.length}</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl text-primary">2</p>
                  <p className="text-xs text-muted-foreground">Addresses</p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Profile Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="w-4 h-4 mr-2" />
                  Saved Addresses
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payment Methods
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="addresses">Addresses</TabsTrigger>
                <TabsTrigger value="payments">Payment Methods</TabsTrigger>
              </TabsList>

              {/* Order History */}
              <TabsContent value="orders" className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-lg border border-border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-mono text-sm">{order.orderNumber}</p>
                          <Badge className={getStatusColor(order.status)}>
                            {getStatusLabel(order.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.restaurantName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-primary">£{order.total.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-2 mb-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.quantity}x {item.name}
                          </span>
                          <span>£{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => onViewOrder(order.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => onReorder(order.id)}
                      >
                        Reorder
                      </Button>
                    </div>
                  </div>
                ))}

                {orders.length === 0 && (
                  <div className="bg-white rounded-lg border border-border p-12 text-center">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-2">No orders yet</p>
                    <p className="text-sm text-muted-foreground">
                      Start ordering from your favorite restaurants
                    </p>
                  </div>
                )}
              </TabsContent>

              {/* Saved Addresses */}
              <TabsContent value="addresses" className="space-y-4">
                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="mb-1">Home</p>
                        <p className="text-sm text-muted-foreground">
                          123 Main Street, London, SW1A 1AA
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Default</Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
                    <div>
                      <p className="mb-1">Work</p>
                      <p className="text-sm text-muted-foreground">
                        456 Business Road, London, EC1A 1BB
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <MapPin className="w-4 h-4 mr-2" />
                  Add New Address
                </Button>
              </TabsContent>

              {/* Payment Methods */}
              <TabsContent value="payments" className="space-y-4">
                <div className="bg-white rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded flex items-center justify-center text-white text-xs">
                        VISA
                      </div>
                      <div>
                        <p>•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Default</Badge>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm">Remove</Button>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add New Card
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
