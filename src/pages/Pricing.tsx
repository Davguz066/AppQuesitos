import React from 'react';
import { stripeProducts } from '@/stripe-config';
import ProductCard from '@/components/stripe/ProductCard';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-muted-foreground mb-6">Please sign in to continue</p>
          <div className="space-x-4">
            <Button asChild>
              <Link to="/login">Sign In</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground">
            Support the creators and get exclusive radars
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {stripeProducts.map((product) => (
            <ProductCard key={product.priceId} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/">Back to Radar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;