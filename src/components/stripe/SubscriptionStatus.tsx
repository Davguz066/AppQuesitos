import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { stripeProducts } from '@/stripe-config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SubscriptionStatus: React.FC = () => {
  const { subscription, loading } = useSubscription();

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-sm">Subscription Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="secondary">No Active Subscription</Badge>
        </CardContent>
      </Card>
    );
  }

  const product = stripeProducts.find(p => p.priceId === subscription.price_id);
  const productName = product?.name || 'Unknown Plan';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'trialing':
        return 'secondary';
      case 'past_due':
        return 'destructive';
      case 'canceled':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-sm">Subscription Status</CardTitle>
        <CardDescription>{productName}</CardDescription>
      </CardHeader>
      <CardContent>
        <Badge variant={getStatusColor(subscription.subscription_status)}>
          {(subscription.subscription_status || '').replace('_', ' ').toUpperCase()}
        </Badge>
        {subscription.current_period_end && (
          <p className="text-sm text-muted-foreground mt-2">
            {subscription.cancel_at_period_end ? 'Expires' : 'Renews'} on{' '}
            {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionStatus;