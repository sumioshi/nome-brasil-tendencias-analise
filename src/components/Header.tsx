
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-primary text-white py-4 px-6 shadow-md">
      <div className="container mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold">
          Sistema de Análise de Tendência de Nomes no Brasil
        </h1>
        <p className="text-sm md:text-base mt-1">
          Dados fornecidos pela API do IBGE
        </p>
      </div>
    </header>
  );
};

export default Header;
