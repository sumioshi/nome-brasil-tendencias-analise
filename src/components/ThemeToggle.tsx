
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30 border border-white/10 backdrop-blur-sm transition-all duration-300"
    >
      <div className="relative">
        {theme === 'light' ? (
          <Moon className="h-5 w-5 text-slate-700 dark:text-slate-200 transition-all duration-300" />
        ) : (
          <Sun className="h-5 w-5 text-amber-500 transition-all duration-300" />
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;
