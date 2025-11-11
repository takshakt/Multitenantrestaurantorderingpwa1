import { useState, useEffect } from 'react';
import { ChevronLeft, Phone, AlertCircle, CheckCircle, Clock, Package, Bike, Home, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { OrderMessage } from '../lib/data';

interface OrderTrackingProps {
  orderNumber: string;
  restaurantName: string;
  status: 'placed' | 'confirmed' | 'preparing' | 'on-the-way' | 'delivered';
  estimatedTime: string;
  onBack: () => void;
  messages?: OrderMessage[];
}

const statusSteps = [
  { id: 'placed', label: 'Order Placed', icon: CheckCircle },
  { id: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { id: 'preparing', label: 'Preparing', icon: Package },
  { id: 'on-the-way', label: 'On the Way', icon: Bike },
  { id: 'delivered', label: 'Delivered', icon: Home }
];

export function OrderTracking({
  orderNumber,
  restaurantName,
  status,
  estimatedTime,
  onBack,
  messages = []
}: OrderTrackingProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newMessage, setNewMessage] = useState('');
  const [conversationMessages, setConversationMessages] = useState<OrderMessage[]>(messages);
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  const currentStepIndex = statusSteps.findIndex(step => step.id === status);
  const progressValue = ((currentStepIndex + 1) / statusSteps.length) * 100;

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message: OrderMessage = {
      id: Date.now().toString(),
      sender: 'customer',
      message: newMessage,
      timestamp: new Date().toISOString()
    };
    
    setConversationMessages([...conversationMessages, message]);
    setNewMessage('');
    
    // Simulate restaurant response (in real app, this would come from server)
    setTimeout(() => {
      const autoReply: OrderMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'restaurant',
        message: 'Thank you for your message! We have received your request and will address it shortly.',
        timestamp: new Date().toISOString()
      };
      setConversationMessages(prev => [...prev, autoReply]);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <h3>Track Order</h3>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Order Info Card */}
        <div className="bg-white rounded-lg border border-border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Order Number</p>
              <p className="font-mono">{orderNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Restaurant</p>
              <p>{restaurantName}</p>
            </div>
          </div>

          {/* Estimated Time */}
          <div className="bg-primary/5 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Estimated Arrival
            </p>
            <p className="text-primary text-2xl">
              {estimatedTime}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {currentTime.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="bg-white rounded-lg border border-border p-6 mb-6">
          <h3 className="mb-6">Order Status</h3>
          
          <div className="space-y-6">
            {statusSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.id} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        isCompleted
                          ? 'bg-primary text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={`w-0.5 h-12 ${
                          isCompleted ? 'bg-primary' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                  
                  <div className="flex-1 pb-8">
                    <p className={isCompleted ? 'text-foreground' : 'text-muted-foreground'}>
                      {step.label}
                    </p>
                    {isCurrent && (
                      <p className="text-sm text-muted-foreground mt-1">
                        In progress...
                      </p>
                    )}
                    {isCompleted && !isCurrent && (
                      <p className="text-sm text-muted-foreground mt-1">
                        Completed
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Messages Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Order Messages</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Message History */}
            {conversationMessages.length > 0 && (
              <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
                {conversationMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sender === 'customer' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.sender === 'customer'
                          ? 'bg-primary text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      <p className="text-sm mb-1">{msg.message}</p>
                      <p
                        className={`text-xs ${
                          msg.sender === 'customer'
                            ? 'text-primary-foreground/70'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {new Date(msg.timestamp).toLocaleTimeString()} · {msg.sender === 'customer' ? 'You' : restaurantName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {conversationMessages.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4 mb-4">
                No messages yet. Send a message to the restaurant if you have any special requests.
              </p>
            )}

            <Separator className="my-4" />

            {/* New Message Input */}
            <div className="space-y-3">
              <Textarea
                placeholder="Send a message to the restaurant (e.g., special requests, delivery instructions)..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Live Updates */}
        {status === 'on-the-way' && (
          <div className="bg-white rounded-lg border border-border p-6 mb-6">
            <h3 className="mb-4">Delivery Details</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Driver Name</span>
                <span>John Smith</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vehicle</span>
                <span>🏍️ Motorcycle</span>
              </div>
              <Separator />
              <Button variant="outline" className="w-full">
                <Phone className="w-4 h-4 mr-2" />
                Contact Driver
              </Button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h3 className="mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button variant="outline">
              <Phone className="w-4 h-4 mr-2" />
              Contact Restaurant
            </Button>
            <Button variant="outline">
              <AlertCircle className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
