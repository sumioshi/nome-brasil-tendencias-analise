
import React from 'react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="relative w-full bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950 text-white py-6 px-6 shadow-2xl overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="container mx-auto relative z-10 flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent mb-2">
            Sistema de Análise de Tendência de Nomes
          </h1>
          <p className="text-sm md:text-base text-slate-300 font-medium">
            Dados fornecidos pela API do IBGE
          </p>
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
