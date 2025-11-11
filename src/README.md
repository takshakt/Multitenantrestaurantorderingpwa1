# OrpRasoi - Professional Multi-Tenant Restaurant Ordering Platform

A modern, minimalistic Progressive Web App (PWA) for multi-tenant restaurant ordering, built with React, TypeScript, and Tailwind CSS.

## Features

### Platform Level (orprasoi.com)
- **Landing Page**: Clean hero section with location search
- **Restaurant Marketplace**: Browse multiple restaurants with filters
- **Feature Showcase**: Fast delivery, secure payments, order tracking
- **Professional Footer**: Links, social media, legal information

### Restaurant Level (subdomain.orprasoi.com)
- **Restaurant Storefront**: Customizable hero banner and branding
- **Menu System**: Categorized menu with dietary badges (V, VG, GF)
- **Cart Management**: Real-time cart updates with quantity controls
- **Fulfillment Options**: Delivery or collection toggle

### Order Flow
- **Multi-Step Checkout**: Progressive cart → details → payment flow
- **Payment Options**: Card (Stripe), Cash on Delivery, Digital Wallets
- **Promo Codes**: Apply discount codes during checkout
- **Order Summary**: Live price breakdown with fees

### Order Management
- **Order Confirmation**: Success screen with order details
- **Real-time Tracking**: Live order status with progress timeline
- **Order History**: View past orders and reorder with one click

### Customer Account
- **Profile Management**: View and edit account details
- **Saved Addresses**: Manage delivery locations
- **Payment Methods**: Saved cards and payment options
- **Order History**: Complete order records with status

## Design System

### Colors
- **Primary**: #6366F1 (Indigo)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Orange)
- **Danger**: #EF4444 (Red)
- **Dark**: #1F2937
- **Gray**: #6B7280
- **Light Gray**: #F3F4F6

### Typography
- **Font Family**: Inter, SF Pro Display/Text
- **Headings**: Medium weight (500)
- **Body**: Normal weight (400)
- **Scale**: 12/14/16/18/20/24/32/40px

### Spacing
- **Base Unit**: 4px
- **Scale**: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80px

### Shadows
- **XS**: `0 1px 2px rgba(0,0,0,0.05)`
- **SM**: `0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)`
- **MD**: `0 4px 6px rgba(0,0,0,0.07)`
- **LG**: `0 10px 25px rgba(0,0,0,0.1)`
- **XL**: `0 20px 40px rgba(0,0,0,0.15)`

## Technology Stack

- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first styling
- **Shadcn/UI**: High-quality component library
- **Lucide React**: Modern icon system
- **PWA**: Progressive web app capabilities

## Demo Navigation

Use the floating "Demo Navigation" button in the bottom-right corner to explore all pages:

1. **Landing Page**: Platform homepage with restaurant listings
2. **Restaurant Storefront**: Menu browsing and cart management
3. **Checkout**: Multi-step order placement
4. **Order Confirmation**: Success screen
5. **Order Tracking**: Real-time order status
6. **Customer Account**: Order history and profile management

## Multi-Tenant Architecture

The platform supports two modes:

### Platform Mode (orprasoi.com)
- Shows multiple restaurants
- Location-based search
- Restaurant comparison
- Centralized marketplace

### Restaurant Mode (restaurant.orprasoi.com)
- Individual restaurant branding
- Custom color themes
- Dedicated menu
- Restaurant-specific information

## Mobile-First Design

- **Responsive**: Works on all screen sizes
- **Touch-Optimized**: 44px minimum touch targets
- **Progressive**: Enhanced features on capable devices
- **Offline Support**: Basic menu browsing when offline
- **Install Prompt**: Add to home screen

## Conversion Optimization

- **Minimal Friction**: Streamlined checkout flow
- **Trust Indicators**: Security badges, verified merchants
- **Progress Tracking**: Clear order status updates
- **Quick Reorder**: One-click reordering from history
- **Saved Details**: Addresses and payment methods

## Accessibility

- **WCAG 2.1 AA Compliant**
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: Meets AA standards

## Performance Targets

- **First Contentful Paint**: <1.8s
- **Time to Interactive**: <3.9s
- **Cumulative Layout Shift**: <0.1
- **Lazy Loading**: Images and routes
- **Code Splitting**: Optimized bundle size

## Future Enhancements (Requires Backend)

This is currently a frontend demonstration. For production deployment, consider integrating:

- **Supabase**: User authentication, database, real-time features
- **Stripe**: Payment processing
- **Google Maps**: Location services and delivery tracking
- **Push Notifications**: Order updates
- **Analytics**: User behavior tracking
- **Email**: Order confirmations and receipts

## Getting Started

The application is ready to run. Simply open it and use the Demo Navigation to explore all features.

## License

Professional food ordering platform demonstration © 2024 OrpRasoi
