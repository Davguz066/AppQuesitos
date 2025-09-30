import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { stripeProducts } from '@/stripe-config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SubscriptionStatus: React.FC = () => {
  const { subscription, loading } = useSubscription();

  if (loading) {
    return (
      <div className="hidden sm:block">
        <Card className="w-full max-w-xs">
          <CardContent className="p-3 sm:p-4">
            <div className="animate-pulse">
              <div className="h-3 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-2 bg-muted rounded w-1/2"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!subscription || subscription.subscription_status === 'not_started') {
    return (
      <div className="hidden sm:block">
        <Card className="w-full max-w-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs">Estado de suscripción</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Badge variant="secondary" className="text-xs">Sin suscripción activa</Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  const product = stripeProducts.find(p => p.priceId === subscription.price_id);
  const productName = product?.name || 'Plan desconocido';

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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'ACTIVA';
      case 'trialing':
        return 'PRUEBA';
      case 'past_due':
        return 'VENCIDA';
      case 'canceled':
        return 'CANCELADA';
      case 'incomplete':
        return 'INCOMPLETA';
      case 'incomplete_expired':
        return 'EXPIRADA';
      case 'unpaid':
        return 'NO PAGADA';
      case 'paused':
        return 'PAUSADA';
      default:
        return status.toUpperCase();
    }
  };

  return (
    <div className="hidden sm:block">
      <Card className="w-full max-w-xs">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs">Estado de suscripción</CardTitle>
          <CardDescription className="text-xs">{productName}</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Badge variant={getStatusColor(subscription.subscription_status || '')} className="text-xs">
            {getStatusText(subscription.subscription_status || '')}
          </Badge>
          {subscription.current_period_end && (
            <p className="text-xs text-muted-foreground mt-2">
              {subscription.cancel_at_period_end ? 'Expira' : 'Se renueva'} el{' '}
              {new Date(subscription.current_period_end * 1000).toLocaleDateString('es-ES')}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionStatus;