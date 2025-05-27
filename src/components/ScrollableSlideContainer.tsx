import React, { useRef, useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ScrollableSlideContainerProps {
  children: React.ReactNode;
  isFullscreen?: boolean;
}

const ScrollableSlideContainer: React.FC<ScrollableSlideContainerProps> = ({
  children,
  isFullscreen = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicators, setShowScrollIndicators] = useState({
    top: false,
    bottom: false
  });

  // Verificar se há conteúdo para scroll
  const checkScrollability = () => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    setShowScrollIndicators({
      top: scrollTop > 10,
      bottom: scrollTop < scrollHeight - clientHeight - 10
    });
  };

  useEffect(() => {
    checkScrollability();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollability);

      // Verificar novamente após um pequeno delay para garantir que o conteúdo foi renderizado
      const timer = setTimeout(checkScrollability, 100);

      return () => {
        container.removeEventListener('scroll', checkScrollability);
        clearTimeout(timer);
      };
    }
  }, [children]);

  // Função para scroll suave
  const scrollTo = (direction: 'up' | 'down') => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scrollAmount = container.clientHeight * 0.8; // 80% da altura visível

    container.scrollBy({
      top: direction === 'down' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full h-full">
      {/* Container principal com scroll */}
      <div
        ref={containerRef}
        className="scrollable-container w-full h-full overflow-y-auto overflow-x-hidden scroll-smooth"
        style={{
          // Scrollbar customizada
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent',
        }}
      >
        {/* Wrapper para garantir que o conteúdo não seja cortado */}
        <div className="min-h-full w-full">
          {children}
        </div>
      </div>

      {/* Indicador de scroll para cima */}
      {showScrollIndicators.top && (
        <button
          onClick={() => scrollTo('up')}
          className={`absolute top-2 left-1/2 -translate-x-1/2 z-50
            bg-white/90 dark:bg-slate-800/90
            hover:bg-white dark:hover:bg-slate-800
            border border-slate-200 dark:border-slate-600
            rounded-full p-2 shadow-lg hover:shadow-xl
            transition-all duration-200 backdrop-blur-sm
            ${isFullscreen ? 'top-4' : 'top-2'}
          `}
          title="Rolar para cima"
        >
          <ChevronUp className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </button>
      )}

      {/* Indicador de scroll para baixo */}
      {showScrollIndicators.bottom && (
        <button
          onClick={() => scrollTo('down')}
          className={`absolute bottom-2 left-1/2 -translate-x-1/2 z-50
            bg-white/90 dark:bg-slate-800/90
            hover:bg-white dark:hover:bg-slate-800
            border border-slate-200 dark:border-slate-600
            rounded-full p-2 shadow-lg hover:shadow-xl
            transition-all duration-200 backdrop-blur-sm
            animate-bounce
            ${isFullscreen ? 'bottom-4' : 'bottom-2'}
          `}
          title="Rolar para baixo"
        >
          <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        </button>
      )}

      {/* Indicador visual de scroll na lateral */}
      {(showScrollIndicators.top || showScrollIndicators.bottom) && (
        <div className={`absolute right-2 top-1/2 -translate-y-1/2 z-40
          bg-white/70 dark:bg-slate-800/70
          rounded-full px-1 py-2 backdrop-blur-sm
          ${isFullscreen ? 'right-4' : 'right-2'}
        `}>
          <div className="flex flex-col space-y-1">
            <div className={`w-1 h-2 rounded-full transition-all duration-200 ${
              showScrollIndicators.top
                ? 'bg-blue-500'
                : 'bg-slate-300 dark:bg-slate-600'
            }`} />
            <div className={`w-1 h-2 rounded-full transition-all duration-200 ${
              showScrollIndicators.bottom
                ? 'bg-blue-500'
                : 'bg-slate-300 dark:bg-slate-600'
            }`} />
          </div>
        </div>
      )}

      {/* CSS customizado para scrollbar */}
      <style jsx>{`
        div::-webkit-scrollbar {
          width: 8px;
        }

        div::-webkit-scrollbar-track {
          background: transparent;
        }

        div::-webkit-scrollbar-thumb {
          background: rgba(156, 163, 175, 0.5);
          border-radius: 4px;
        }

        div::-webkit-scrollbar-thumb:hover {
          background: rgba(156, 163, 175, 0.7);
        }
      `}</style>
    </div>
  );
};

export default ScrollableSlideContainer;
