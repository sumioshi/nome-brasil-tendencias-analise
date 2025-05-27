import React from 'react';
import { Maximize, Minimize, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  isSupported: boolean;
  className?: string;
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({
  isFullscreen,
  onToggleFullscreen,
  isSupported,
  className = '',
}) => {
  if (!isSupported) return null;

  return (
    <Button
      onClick={onToggleFullscreen}
      variant="ghost"
      size="sm"
      className={`
        absolute top-3 right-3 z-50 
        bg-white/80 dark:bg-slate-800/80 
        hover:bg-white dark:hover:bg-slate-800 
        border border-slate-200 dark:border-slate-600
        shadow-lg hover:shadow-xl
        transition-all duration-200
        backdrop-blur-sm
        ${className}
      `}
      title={isFullscreen ? 'Sair do modo cinema (ESC)' : 'Modo cinema (tela cheia)'}
    >
      {isFullscreen ? (
        <div className="flex items-center space-x-1">
          <X className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">ESC</span>
        </div>
      ) : (
        <div className="flex items-center space-x-1">
          <Maximize className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">Cinema</span>
        </div>
      )}
    </Button>
  );
};

export default FullscreenButton;
