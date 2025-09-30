import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StripeProduct } from '@/stripe-config';
import { supabase } from '@/lib/supabase';
import { toast } from '@/components/ui/sonner';

interface ProductCardProps {
  product: StripeProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('Por favor inicia sesión para realizar una compra');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          price_id: product.priceId,
          success_url: `${window.location.origin}/success`,
          cancel_url: `${window.location.origin}/pricing`,
          mode: product.mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Error al iniciar el proceso de pago');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">{product.name}</CardTitle>
        <CardDescription className="text-sm sm:text-base flex-grow">{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto">
        <Button 
          onClick={handlePurchase} 
          disabled={loading}
          className="w-full text-sm sm:text-base"
        >
          {loading ? 'Procesando...' : 'Comprar'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;