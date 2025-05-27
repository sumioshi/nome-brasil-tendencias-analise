
import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="relative w-full header-enhanced text-white py-8 px-6 shadow-2xl overflow-hidden">
      {/* Background decorative elements with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 dark:from-blue-400/10 dark:via-purple-400/10 dark:to-pink-400/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300"></div>
      
      <div className="container mx-auto relative z-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-200 dark:via-purple-200 dark:to-pink-200 bg-clip-text text-transparent mb-2">
            Sistema de Análise de Tendência de Nomes
          </h1>
          <p className="text-base md:text-lg text-slate-200 dark:text-slate-300 font-medium">
            Dados fornecidos pela API do IBGE
          </p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
