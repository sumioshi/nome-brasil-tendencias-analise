import React from 'react';

const ViniciusSlide: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="modern-card rounded-2xl p-8 relative overflow-hidden w-full max-w-2xl">
        {/* Card background gradient (similar to other slides, perhaps with a new color variant) */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-yellow-50/50 to-orange-50/50 dark:from-slate-800/90 dark:via-slate-700/50 dark:to-slate-600/50 -z-10"></div>
        
        <h1 className="text-3xl font-bold mb-4 text-orange-600 dark:text-orange-400">
          Comparação de Dois Nomes (Nacional)
        </h1>
        
        <p className="text-lg mb-6 text-slate-700 dark:text-slate-300">
          Apresentador: Vinicius
        </p>
        
        <div className="space-y-4 text-slate-600 dark:text-slate-400">
          <p>
            Esta funcionalidade permite comparar a popularidade de dois nomes ao longo das décadas em nível nacional.
          </p>
          <p>
            O usuário insere os dois nomes que deseja comparar.
          </p>
          <p>
            O sistema então analisa e exibe a trajetória de popularidade de ambos os nomes em todo o Brasil, desde a década de 1930 até a década mais recente para a qual existem dados disponíveis. Essa comparação é visualizada por meio de um gráfico, facilitando a compreensão das tendências e da performance relativa de cada nome ao longo do tempo.
          </p>
          <p className="mt-4 pt-4 border-t border-slate-300 dark:border-slate-700">
            <strong>Comunicação com o Backend:</strong><br />
            No backend, para realizar a comparação, o sistema envia os dois nomes para um serviço dedicado. Este serviço consulta a base de dados nacional, coleta os dados de popularidade de ambos os nomes ao longo das décadas e os retorna para o frontend. A comunicação ocorre através de uma API REST, utilizando um endpoint como: <code>GET /api/comparacao/nacional?nome1={'{nomeA}'}&nome2={'{nomeB}'}</code>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViniciusSlide;
