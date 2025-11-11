import { useState } from 'react';
import { PlatformHeader } from './components/PlatformHeader';
import { PlatformLanding } from './components/PlatformLanding';
import { RestaurantStorefront } from './components/RestaurantStorefront';
import { CheckoutFlow } from './components/CheckoutFlow';
import { OrderConfirmation } from './components/OrderConfirmation';
import { OrderTracking } from './components/OrderTracking';
import { CustomerAccount } from './components/CustomerAccount';
import { DemoNav } from './components/DemoNav';
import { mockRestaurants, mockMenuItems, mockOrders, CartItem } from './lib/data';
import { Toaster } from './components/ui/sonner';

type View = 
  | { type: 'landing' }
  | { type: 'restaurant'; slug: string }
  | { type: 'checkout'; restaurantSlug: string; cart: CartItem[] }
  | { type: 'confirmation'; orderData: any }
  | { type: 'tracking'; orderNumber: string }
  | { type: 'account' };

export default function App() {
  const [view, setView] = useState<View>({ type: 'landing' });
  const [lastOrderNumber, setLastOrderNumber] = useState('ORD-2024-001236');

  const handleRestaurantClick = (slug: string) => {
    setView({ type: 'restaurant', slug });
  };

  const handleCheckout = (restaurantSlug: string, cart: CartItem[]) => {
    setView({ type: 'checkout', restaurantSlug, cart });
  };

  const handleConfirmOrder = (orderData: any) => {
    setView({ type: 'confirmation', orderData });
  };

  const handleTrackOrder = () => {
    setView({ type: 'tracking', orderNumber: lastOrderNumber });
  };

  const handleBackToLanding = () => {
    setView({ type: 'landing' });
  };

  const handleViewAccount = () => {
    setView({ type: 'account' });
  };

  const handleViewOrder = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      setView({ type: 'tracking', orderNumber: order.orderNumber });
    }
  };

  const handleReorder = (orderId: string) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order) {
      // Find restaurant from order
      const restaurant = mockRestaurants.find(r => r.name === order.restaurantName);
      if (restaurant) {
        setView({ type: 'checkout', restaurantSlug: restaurant.slug, cart: order.items });
      }
    }
  };

  const handleDemoNavigate = (viewName: string) => {
    switch (viewName) {
      case 'landing':
        setView({ type: 'landing' });
        break;
      case 'restaurant':
        setView({ type: 'restaurant', slug: 'spice-garden' });
        break;
      case 'checkout':
        setView({
          type: 'checkout',
          restaurantSlug: 'spice-garden',
          cart: [
            { ...mockMenuItems[0], quantity: 2 },
            { ...mockMenuItems[5], quantity: 1 }
          ]
        });
        break;
      case 'confirmation':
        setView({
          type: 'confirmation',
          orderData: {
            total: 42.47,
            items: [
              { ...mockMenuItems[0], quantity: 2 },
              { ...mockMenuItems[5], quantity: 1 }
            ],
            formData: { address: '123 Main Street, London, SW1A 1AA' }
          }
        });
        break;
      case 'tracking':
        setView({ type: 'tracking', orderNumber: 'ORD-2024-001236' });
        break;
      case 'account':
        setView({ type: 'account' });
        break;
    }
  };

  // Render based on current view
  if (view.type === 'landing') {
    return (
      <>
        <PlatformHeader />
        <PlatformLanding
          restaurants={mockRestaurants}
          onRestaurantClick={handleRestaurantClick}
        />
        <DemoNav onNavigate={handleDemoNavigate} />
        <Toaster />
      </>
    );
  }

  if (view.type === 'restaurant') {
    const restaurant = mockRestaurants.find(r => r.slug === view.slug);
    if (!restaurant) {
      return <div>Restaurant not found</div>;
    }

    return (
      <>
        <RestaurantStorefront
          restaurant={restaurant}
          menuItems={mockMenuItems}
          onBack={handleBackToLanding}
          onCheckout={(cart) => handleCheckout(view.slug, cart)}
        />
        <DemoNav onNavigate={handleDemoNavigate} />
        <Toaster />
      </>
    );
  }

  if (view.type === 'checkout') {
    const restaurant = mockRestaurants.find(r => r.slug === view.restaurantSlug);
    if (!restaurant) {
      return <div>Restaurant not found</div>;
    }

    return (
      <>
        <CheckoutFlow
          cart={view.cart}
          restaurantName={restaurant.name}
          onBack={() => setView({ type: 'restaurant', slug: view.restaurantSlug })}
          onConfirm={handleConfirmOrder}
        />
        <DemoNav onNavigate={handleDemoNavigate} />
        <Toaster />
      </>
    );
  }

  if (view.type === 'confirmation') {
    const orderNumber = lastOrderNumber;
    return (
      <>
        <OrderConfirmation
          orderNumber={orderNumber}
          total={view.orderData.total}
          items={view.orderData.items}
          estimatedTime="25-30 minutes"
          deliveryAddress={view.orderData.formData.address}
          onTrackOrder={handleTrackOrder}
          onContinueShopping={handleBackToLanding}
        />
        <DemoNav onNavigate={handleDemoNavigate} />
        <Toaster />
      </>
    );
  }

  if (view.type === 'tracking') {
    return (
      <>
        <OrderTracking
          orderNumber={view.orderNumber}
          restaurantName="Spice Garden"
          status="preparing"
          estimatedTime="20 minutes"
          onBack={handleBackToLanding}
        />
        <DemoNav onNavigate={handleDemoNavigate} />
        <Toaster />
      </>
    );
  }

  if (view.type === 'account') {
    return (
      <>
        <CustomerAccount
          orders={mockOrders}
          onBack={handleBackToLanding}
          onViewOrder={handleViewOrder}
          onReorder={handleReorder}
        />
        <DemoNav onNavigate={handleDemoNavigate} />
        <Toaster />
      </>
    );
  }

  return null;
}
