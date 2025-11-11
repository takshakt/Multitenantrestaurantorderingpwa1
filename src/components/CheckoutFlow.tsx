import { useState } from 'react';
import { ChevronLeft, Plus, Minus, X, Tag, Lock, CreditCard, Smartphone, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CartItem, DiscountCode } from '../lib/data';

interface CheckoutFlowProps {
  cart: CartItem[];
  restaurantName: string;
  onBack: () => void;
  onConfirm: (orderData: any) => void;
  discountCodes?: DiscountCode[];
}

export function CheckoutFlow({
  cart,
  restaurantName,
  onBack,
  onConfirm,
  discountCodes = []
}: CheckoutFlowProps) {
  const [step, setStep] = useState(1);
  const [fulfillmentType, setFulfillmentType] = useState<'delivery' | 'collection'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showOffers, setShowOffers] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    postcode: '',
    instructions: ''
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = fulfillmentType === 'delivery' ? 2.99 : 0;
  const serviceFee = 1.49;
  const total = subtotal + deliveryFee + serviceFee - discount;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setDiscount(subtotal * 0.1);
    }
  };

  const handlePlaceOrder = () => {
    onConfirm({
      items: cart,
      fulfillmentType,
      formData,
      paymentMethod,
      total
    });
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setPromoCode(code);
    toast.success(`Code ${code} copied and applied!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const progressValue = (step / 3) * 100;

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
              <h3>Checkout</h3>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-2 text-sm">
            <span className={step >= 1 ? 'text-primary' : 'text-muted-foreground'}>
              Cart
            </span>
            <span className={step >= 2 ? 'text-primary' : 'text-muted-foreground'}>
              Details
            </span>
            <span className={step >= 3 ? 'text-primary' : 'text-muted-foreground'}>
              Payment
            </span>
          </div>
          <Progress value={progressValue} className="h-1" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {step === 1 && (
              <>
                {/* Cart Items */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <h3 className="mb-4">Your Order from {restaurantName}</h3>
                  
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <ImageWithFallback
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="mb-1">{item.name}</h4>
                          {item.customizations && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {item.customizations}
                            </p>
                          )}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="text-sm">{item.quantity}</span>
                              <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <span className="text-primary">
                              £{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button variant="link" className="mt-4 p-0 h-auto">
                    Add more items
                  </Button>
                </div>

                <Button size="lg" className="w-full" onClick={() => setStep(2)}>
                  Continue to Details
                </Button>
              </>
            )}

            {step === 2 && (
              <>
                {/* Fulfillment Type */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <h3 className="mb-4">Fulfillment Method</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant={fulfillmentType === 'delivery' ? 'default' : 'outline'}
                      className="h-auto py-4 flex flex-col"
                      onClick={() => setFulfillmentType('delivery')}
                    >
                      <span className="text-xl mb-1">🚴</span>
                      <span>Delivery</span>
                      <span className="text-xs opacity-80">20-30 min · £2.99</span>
                    </Button>
                    
                    <Button
                      variant={fulfillmentType === 'collection' ? 'default' : 'outline'}
                      className="h-auto py-4 flex flex-col"
                      onClick={() => setFulfillmentType('collection')}
                    >
                      <span className="text-xl mb-1">🏪</span>
                      <span>Collection</span>
                      <span className="text-xs opacity-80">15-20 min · Free</span>
                    </Button>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <h3 className="mb-4">Contact Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+44 7700 900000"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Address */}
                {fulfillmentType === 'delivery' && (
                  <div className="bg-white rounded-lg border border-border p-6">
                    <h3 className="mb-4">Delivery Address</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          placeholder="123 Main Street"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="postcode">Postcode</Label>
                        <Input
                          id="postcode"
                          value={formData.postcode}
                          onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                          placeholder="SW1A 1AA"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                        <Input
                          id="instructions"
                          value={formData.instructions}
                          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                          placeholder="Ring the bell, leave at door..."
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button size="lg" className="flex-1" onClick={() => setStep(3)}>
                    Continue to Payment
                  </Button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                {/* Payment Method */}
                <div className="bg-white rounded-lg border border-border p-6">
                  <h3 className="mb-4">Payment Method</h3>
                  
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 border border-border rounded-lg p-4 cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="w-5 h-5" />
                          <span>Card Payment</span>
                          <span className="text-sm text-muted-foreground ml-auto">
                            Secure via Stripe
                          </span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 border border-border rounded-lg p-4 cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex items-center gap-2 cursor-pointer flex-1">
                          💵
                          <span>Cash on Delivery</span>
                        </Label>
                      </div>
                      
                      <div className="flex items-center space-x-3 border border-border rounded-lg p-4 cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="wallet" id="wallet" />
                        <Label htmlFor="wallet" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="w-5 h-5" />
                          <span>Digital Wallet</span>
                          <span className="text-sm text-muted-foreground ml-auto">
                            Apple Pay / Google Pay
                          </span>
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Card Details */}
                {paymentMethod === 'card' && (
                  <div className="bg-white rounded-lg border border-border p-6">
                    <h4 className="mb-4">Card Details</h4>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM / YY"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button size="lg" className="flex-1" onClick={handlePlaceOrder}>
                    Place Order · £{total.toFixed(2)}
                  </Button>
                </div>
              </>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <h3 className="mb-4">Order Summary</h3>
              
              {/* Promo Code */}
              <div className="mb-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Button variant="outline" onClick={handleApplyPromo}>
                    Apply
                  </Button>
                </div>
                {discount > 0 && (
                  <p className="text-sm text-success mt-2">
                    ✓ Promo code applied!
                  </p>
                )}
                
                {/* Available Offers */}
                {discountCodes.length > 0 && (
                  <div className="mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowOffers(!showOffers)}
                      className="w-full justify-between h-auto p-0 hover:bg-transparent"
                    >
                      <span className="text-sm text-primary">
                        {discountCodes.length} offer{discountCodes.length > 1 ? 's' : ''} available
                      </span>
                      {showOffers ? (
                        <ChevronUp className="w-4 h-4 text-primary" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-primary" />
                      )}
                    </Button>
                    
                    {showOffers && (
                      <div className="mt-3 space-y-2">
                        {discountCodes.map((code) => (
                          <div
                            key={code.code}
                            className="border border-dashed border-primary/30 bg-primary/5 rounded-md p-3"
                          >
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className="bg-primary text-white border-primary text-xs">
                                  {code.code}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-5 w-5 p-0"
                                  onClick={() => handleCopyCode(code.code)}
                                >
                                  {copiedCode === code.code ? (
                                    <Check className="w-3 h-3 text-success" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </Button>
                              </div>
                              <span className="text-xs text-primary">{code.discount}</span>
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{code.description}</p>
                            {code.minOrder && (
                              <p className="text-xs text-muted-foreground">
                                Min order: £{code.minOrder.toFixed(2)}
                              </p>
                            )}
                            {code.validUntil && (
                              <p className="text-xs text-muted-foreground">
                                Valid until: {code.validUntil}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <Separator className="my-4" />
              
              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>£{subtotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Discount</span>
                    <span>-£{discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span>£{deliveryFee.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>£{serviceFee.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg">
                  <span>Total</span>
                  <span className="text-primary">£{total.toFixed(2)}</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Estimated Time */}
              <div className="text-sm text-center text-muted-foreground">
                <p>Estimated {fulfillmentType === 'delivery' ? 'delivery' : 'collection'} time</p>
                <p className="text-primary mt-1">20-30 minutes</p>
              </div>
              
              <Separator className="my-4" />
              
              {/* Trust Indicators */}
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  ✓
                  <span>Verified merchant</span>
                </div>
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Powered by Stripe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
