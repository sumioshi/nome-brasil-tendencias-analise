import React, { useState, useEffect, useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Presentation, Users, BarChart3, Home } from "lucide-react";
import Header from '@/components/Header';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useFullscreen } from '@/hooks/useFullscreen';
import FullscreenButton from '@/components/FullscreenButton';
import ScrollableSlideContainer from '@/components/ScrollableSlideContainer';
import IntroSlide from '../components/slides/IntroSlide';
import RodrigoSlide from '../components/slides/RodrigoSlide';
import NatanaelSlide from '../components/slides/NatanaelSlide';
import ViniciusSlide from '../components/slides/ViniciusSlide';

const Apresentacao: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const presentationRef = useRef<HTMLDivElement>(null);

  const {
    isFullscreen,
    toggleFullscreen,
    isSupported: isFullscreenSupported
  } = useFullscreen(presentationRef.current || undefined);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Navegação por teclado melhorada
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!api) return;

      // Função para encontrar o container de scroll ativo
      const getActiveScrollContainer = () => {
        const activeCarouselItem = document.querySelector('[data-carousel-item="active"]');
        return activeCarouselItem?.querySelector('.scrollable-container') as HTMLElement;
      };

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          api.scrollPrev();
          break;
        case 'ArrowRight':
          event.preventDefault();
          api.scrollNext();
          break;
        case 'ArrowUp':
          event.preventDefault();
          // Scroll para cima no slide atual
          const containerUp = getActiveScrollContainer();
          if (containerUp) {
            containerUp.scrollBy({ top: -100, behavior: 'smooth' });
          }
          break;
        case 'ArrowDown':
          event.preventDefault();
          // Scroll para baixo no slide atual
          const containerDown = getActiveScrollContainer();
          if (containerDown) {
            containerDown.scrollBy({ top: 100, behavior: 'smooth' });
          }
          break;
        case 'Home':
          event.preventDefault();
          api.scrollTo(0);
          break;
        case 'End':
          event.preventDefault();
          api.scrollTo(api.scrollSnapList().length - 1);
          break;
        case 'PageUp':
          event.preventDefault();
          // Scroll para cima no slide atual (mais rápido)
          const currentSlideUp = getActiveScrollContainer();
          if (currentSlideUp) {
            currentSlideUp.scrollBy({ top: -window.innerHeight * 0.8, behavior: 'smooth' });
          }
          break;
        case 'PageDown':
          event.preventDefault();
          // Scroll para baixo no slide atual (mais rápido)
          const currentSlideDown = getActiveScrollContainer();
          if (currentSlideDown) {
            currentSlideDown.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [api]);

  const slides = [
    {
      title: "Introdução",
      presenter: "Visão Geral",
      icon: Home,
      color: "from-indigo-500 to-purple-500"
    },
    {
      title: "Evolução do Ranking",
      presenter: "Rodrigo Sumioshi",
      icon: BarChart3,
      color: "from-blue-500 to-purple-500"
    },
    {
      title: "Nomes por Localidade",
      presenter: "Natanael Balbo",
      icon: Users,
      color: "from-green-500 to-teal-500"
    },
    {
      title: "Comparação de Nomes",
      presenter: "Vinicius Santa Rosa",
      icon: Presentation,
      color: "from-orange-500 to-red-500"
    },
  ];

  return (
    <ThemeProvider>
      <div
        ref={presentationRef}
        className={`min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-gray-100 to-stone-200 dark:from-slate-900 dark:via-gray-800 dark:to-stone-900 ${
          isFullscreen ? 'relative' : ''
        }`}
      >
        {/* Header - oculto em fullscreen */}
        {!isFullscreen && <Header />}

        {/* Botão Fullscreen */}
        <FullscreenButton
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          isSupported={isFullscreenSupported}
          className={isFullscreen ? 'top-4 right-4' : 'top-20 right-4'}
        />

        <main className={`flex-1 container mx-auto flex flex-col ${
          isFullscreen
            ? 'py-4 px-2 sm:px-4 h-screen'
            : 'py-6 px-4'
        }`}>
          {/* Título Principal - Otimizado para Apresentação */}
          {!isFullscreen && (
            <div className="text-center mb-4 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight">
                Sistema de Análise de Tendências de Nomes
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-700 dark:text-gray-300 font-medium">
                Dados fornecidos pela API do IBGE
              </p>
            </div>
          )}

          {/* Indicador de Progresso */}
          <div className={`flex flex-wrap justify-center items-center gap-2 sm:gap-3 lg:gap-4 px-2 ${
            isFullscreen ? 'mb-2 sm:mb-3' : 'mb-4 sm:mb-6'
          }`}>
            {slides.map((slide, index) => {
              const IconComponent = slide.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-full transition-all duration-300 ${
                    current === index + 1
                      ? `bg-gradient-to-r ${slide.color} text-white shadow-lg scale-105`
                      : 'bg-white/70 dark:bg-slate-700/70 text-gray-600 dark:text-gray-300'
                  } ${isFullscreen ? 'text-xs' : ''}`}
                >
                  <IconComponent className={`flex-shrink-0 ${
                    isFullscreen
                      ? 'w-3 h-3 sm:w-4 sm:h-4'
                      : 'w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5'
                  }`} />
                  <span className={`font-medium whitespace-nowrap ${
                    isFullscreen
                      ? 'text-xs sm:text-sm'
                      : 'text-xs sm:text-sm lg:text-base'
                  }`}>{slide.presenter}</span>
                </div>
              );
            })}
          </div>

          {/* Carousel Principal */}
          <div className="flex-1 flex items-center justify-center min-h-0">
            <div className="w-full max-w-7xl h-full">
              <Carousel
                setApi={setApi}
                className="w-full h-full"
                opts={{ loop: true }}
              >
                <CarouselContent className={
                  isFullscreen
                    ? "h-[calc(100vh-8rem)] sm:h-[calc(100vh-6rem)]"
                    : "h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh]"
                }>
                  <CarouselItem className="h-full flex items-start justify-center">
                    <ScrollableSlideContainer isFullscreen={isFullscreen}>
                      <IntroSlide />
                    </ScrollableSlideContainer>
                  </CarouselItem>
                  <CarouselItem className="h-full flex items-start justify-center">
                    <ScrollableSlideContainer isFullscreen={isFullscreen}>
                      <RodrigoSlide />
                    </ScrollableSlideContainer>
                  </CarouselItem>
                  <CarouselItem className="h-full flex items-start justify-center">
                    <ScrollableSlideContainer isFullscreen={isFullscreen}>
                      <NatanaelSlide />
                    </ScrollableSlideContainer>
                  </CarouselItem>
                  <CarouselItem className="h-full flex items-start justify-center">
                    <ScrollableSlideContainer isFullscreen={isFullscreen}>
                      <ViniciusSlide />
                    </ScrollableSlideContainer>
                  </CarouselItem>
                </CarouselContent>

                {/* Botões de Navegação Melhorados */}
                <CarouselPrevious className={`absolute top-1/2 -translate-y-1/2 z-40 bg-white/90 dark:bg-slate-700/90 hover:bg-white dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 ${
                  isFullscreen
                    ? 'left-4 w-10 h-10 sm:w-12 sm:h-12'
                    : 'left-2 sm:left-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12'
                }`} />
                <CarouselNext className={`absolute top-1/2 -translate-y-1/2 z-40 bg-white/90 dark:bg-slate-700/90 hover:bg-white dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100 shadow-lg hover:shadow-xl transition-all duration-200 ${
                  isFullscreen
                    ? 'right-4 w-10 h-10 sm:w-12 sm:h-12'
                    : 'right-2 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12'
                }`} />
              </Carousel>
            </div>
          </div>

          {/* Navegação por Teclado - Instruções */}
          <div className={`text-center px-2 ${isFullscreen ? 'mt-1 sm:mt-2' : 'mt-2 sm:mt-4'}`}>
            <p className={`text-gray-500 dark:text-gray-400 ${
              isFullscreen ? 'text-xs' : 'text-xs sm:text-sm'
            }`}>
              <span className="font-medium">Navegação:</span> ← → (slides) • ↑ ↓ (scroll) • PgUp/PgDn (scroll rápido)
              {isFullscreen && ' • ESC (sair do modo cinema)'}
            </p>
            <div className={`flex justify-center items-center space-x-2 ${
              isFullscreen ? 'mt-1' : 'mt-1 sm:mt-2'
            }`}>
              <span className={`font-medium text-gray-600 dark:text-gray-300 ${
                isFullscreen ? 'text-xs' : 'text-xs sm:text-sm'
              }`}>
                Slide {current} de {count}
              </span>
            </div>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Apresentacao;
