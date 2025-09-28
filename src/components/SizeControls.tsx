import React from 'react';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface SizeControlsProps {
  isLargeSize: boolean;
  onToggleSize: () => void;
}

const SizeControls: React.FC<SizeControlsProps> = ({ isLargeSize, onToggleSize }) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={onToggleSize}
        variant="outline"
        size="sm"
        className="bg-background/80 backdrop-blur-sm border-green-500/40 hover:border-green-500/60 hover:bg-green-500/10 text-white"
        title={isLargeSize ? 'Reducir tamaño de fotos' : 'Aumentar tamaño de fotos'}
      >
        {isLargeSize ? (
          <>
            <ZoomOut className="h-4 w-4 mr-2" />
            Reducir
          </>
        ) : (
          <>
            <ZoomIn className="h-4 w-4 mr-2" />
            Ampliar
          </>
        )}
      </Button>
    </div>
  );
};

export default SizeControls;