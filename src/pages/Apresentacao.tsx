import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Header from '@/components/Header';
import { ThemeProvider } from '@/contexts/ThemeContext';
import RodrigoSlide from '../components/slides/RodrigoSlide';
import NatanaelSlide from '../components/slides/NatanaelSlide';
import ViniciusSlide from '../components/slides/ViniciusSlide';

const Apresentacao: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-gray-100 to-stone-200 dark:from-slate-900 dark:via-gray-800 dark:to-stone-900">
        <Header />
        
        <main className="flex-1 container mx-auto py-8 px-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-gray-200">
            Apresentação do Projeto: Análise de Nomes
          </h1>
          
          <div className="w-full max-w-4xl flex-1 flex items-center justify-center">
            <Carousel className="w-full h-full max-h-[75vh] flex flex-col items-center justify-center" opts={{ loop: true }}>
              <CarouselContent className="h-full">
                <CarouselItem className="h-full flex items-center justify-center">
                  <RodrigoSlide />
                </CarouselItem>
                <CarouselItem className="h-full flex items-center justify-center">
                  <NatanaelSlide />
                </CarouselItem>
                <CarouselItem className="h-full flex items-center justify-center">
                  <ViniciusSlide />
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100" />
              <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100" />
            </Carousel>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Apresentacao;
