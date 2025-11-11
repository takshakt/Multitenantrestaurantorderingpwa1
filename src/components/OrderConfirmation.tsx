import { CheckCircle, Copy, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

interface OrderConfirmationProps {
  orderNumber: string;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  estimatedTime: string;
  deliveryAddress?: string;
  onTrackOrder: () => void;
  onContinueShopping: () => void;
}

export function OrderConfirmation({
  orderNumber,
  total,
  items,
  estimatedTime,
  deliveryAddress,
  onTrackOrder,
  onContinueShopping
}: OrderConfirmationProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-success/10 mb-4">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>
          <h1 className="mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            We've received your order and will start preparing it shortly
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Order Number</p>
              <p className="font-mono">{orderNumber}</p>
            </div>
            <Button variant="outline" size="sm">
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Estimated Time */}
          <div className="bg-primary/5 rounded-lg p-4 mb-6 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Estimated Arrival
            </p>
            <p className="text-primary text-xl">
              {estimatedTime}
            </p>
          </div>

          {deliveryAddress && (
            <>
              <Separator className="my-6" />
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Delivery Address
                </p>
                <p>{deliveryAddress}</p>
              </div>
            </>
          )}

          <Separator className="my-6" />

          {/* Items */}
          <div>
            <h4 className="mb-3">Order Items</h4>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Total */}
          <div className="flex justify-between">
            <span>Total Paid</span>
            <span className="text-primary">£{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="flex-1" onClick={onTrackOrder}>
            Track Order
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            onClick={onContinueShopping}
          >
            Continue Shopping
          </Button>
        </div>

        <div className="text-center mt-6">
          <Button variant="link" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Receipt
          </Button>
        </div>
      </div>
    </div>
  );
}
