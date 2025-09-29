import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import SubscriptionStatus from '@/components/stripe/SubscriptionStatus';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          🧀 Detector de Quesos
        </Link>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <SubscriptionStatus />
              <Button variant="outline" asChild>
                <Link to="/pricing">Pricing</Link>
              </Button>
              <Button variant="ghost" onClick={signOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <div className="space-x-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;