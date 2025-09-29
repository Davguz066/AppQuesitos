import React from 'react';
import CategoryButtons from '../components/CategoryButtons';
import RadarDisplay from '../components/RadarDisplay';
import SonarAudio from '../components/SonarAudio';
import SizeControls from '../components/SizeControls';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { user } = useAuth();
  const [isLargeSize, setIsLargeSize] = React.useState(false);

  const handleToggleSize = () => {
    setIsLargeSize(!isLargeSize);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🧀 Detector de Quesos 🧀
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Detectando los mejores quesitos en tu área
          </p>
          <p className="text-muted-foreground mb-8">
            Please sign in to access the cheese radar
          </p>
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
    <div className="min-h-[calc(100vh-4rem)] bg-background flex flex-col p-4 sm:p-6 lg:p-8">
      <div className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto w-full">
        {/* Header - Responsive */}
        <div className="mb-6 sm:mb-8 lg:mb-12 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
            🧀 Detector de Quesos 🧀
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Detectando los mejores quesitos en tu área
          </p>
        </div>
        
        {/* Status bar y controles - Responsive positioning */}
        <div className="mb-1 sm:mb-1 flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center gap-2 sm:gap-4 px-4 py-2 sm:px-6 sm:py-3 bg-card/80 backdrop-blur-sm rounded-full border border-border">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs sm:text-sm text-muted-foreground">
              Radar activo - Buscando quesitos...
            </span>
          </div>
          
          {/* Controles de tamaño */}
          <div className="flex items-center gap-2">
            <SizeControls 
              isLargeSize={isLargeSize} 
              onToggleSize={handleToggleSize} 
            />
          </div>
        </div>

        {/* Category buttons (commented out) */}
        {/*
        <div className="mb-8 sm:mb-12">
          <CategoryButtons />
        </div>
        */}
        
        {/* Main radar display */}
        <div className="flex-1 flex items-center justify-center w-full">
          <RadarDisplay isLargeSize={isLargeSize} />
        </div>
        
        {/* Botón de sonido debajo del radar */}
        <div className="mt-6 sm:mt-8">
          <SonarAudio />
        </div>
      </div>
    </div>
  );
};

export default Index;
