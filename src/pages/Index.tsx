
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from '@/components/Header';
import NameEvolution from '@/components/NameEvolution';
import LocationNames from '@/components/LocationNames';
import NameComparison from '@/components/NameComparison';

const Index = () => {
  const [activeTab, setActiveTab] = useState<string>("evolution");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <Tabs defaultValue="evolution" value={activeTab} onValueChange={setActiveTab}>
            <div className="mb-8">
              <TabsList className="w-full grid grid-cols-1 sm:grid-cols-3">
                <TabsTrigger value="evolution">Evolução do Nome</TabsTrigger>
                <TabsTrigger value="location">Nomes por Localidade</TabsTrigger>
                <TabsTrigger value="comparison">Comparação de Nomes</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="evolution">
              <NameEvolution />
            </TabsContent>
            
            <TabsContent value="location">
              <LocationNames />
            </TabsContent>
            
            <TabsContent value="comparison">
              <NameComparison />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Sistema de Análise de Tendência de Nomes &copy; {new Date().getFullYear()}
          </p>
          <p className="mt-1">
            Dados fornecidos pela API pública do Instituto Brasileiro de Geografia e Estatística (IBGE)
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
