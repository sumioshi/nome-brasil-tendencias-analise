# 📊 Melhorias na Apresentação do Projeto - Versão 2.0

## 🎯 Objetivo
Modificação dos slides de apresentação do projeto de análise de tendências de nomes no Brasil para incluir explicações técnicas detalhadas sobre a arquitetura backend-frontend e melhorar a UX/UI para modo apresentação com visual estilo IDE moderna.

## ✨ Principais Melhorias Implementadas - Versão 2.0

### 🔧 **Nova Arquitetura Visual Estilo IDE**
- **Blocos de Código**: Syntax highlighting visual com backgrounds diferenciados
- **Estrutura de Projeto**: Visualização clara dos arquivos e módulos
- **Formatação Monospace**: Destaque para nomes de arquivos e funções
- **Ícones Diferenciados**: Representação visual para componentes, serviços e tipos

### 1. **Página de Apresentação Principal** (`src/pages/Apresentacao.tsx`)

#### 🔧 Funcionalidades Adicionadas:
- **Indicadores de Progresso**: Barra visual mostrando o slide atual e apresentador
- **Navegação Aprimorada**: Botões maiores e mais visíveis para apresentação
- **Contador de Slides**: Indicação clara de "Slide X de Y"
- **Suporte a Teclado**: Navegação com setas ← →
- **Layout Responsivo**: Otimizado para tela cheia/projetor

#### 🎨 Melhorias Visuais:
- Título principal aumentado (text-5xl/6xl)
- Gradientes coloridos para melhor contraste
- Transições suaves entre slides
- Indicadores visuais por apresentador com ícones únicos

### 2. **Slide de Introdução** (`src/components/slides/IntroSlide.tsx`)

#### 📋 Conteúdo:
- **Apresentação da Equipe**: Cards individuais com nomes, matrículas e responsabilidades
- **Stack Tecnológico**: Visualização das tecnologias utilizadas
- **Visão Geral das Funcionalidades**: Resumo das três principais features
- **Design Responsivo**: Layout adaptável para diferentes tamanhos de tela

### 3. **Slide do Rodrigo** (`src/components/slides/RodrigoSlide.tsx`) - VERSÃO 2.0

#### 🔍 Arquitetura Backend-Frontend Detalhada:

**📁 Estrutura de Arquivos:**
```
src/
├── components/NameEvolution.tsx     # Componente React principal
├── services/ibgeService.ts          # Serviços de API
└── services/nameService.ts          # Processamento de dados
```

**⚛️ Frontend Architecture:**
- **Estados React**: `name`, `chartData`, `loading`, `startDecade`, `endDecade`
- **Componente**: `NameEvolution.tsx` com hooks useState
- **Visualização**: Recharts LineChart com dados processados
- **UI Components**: shadcn/ui + Tailwind CSS

**🌐 API & Backend:**
- **Endpoint IBGE**: `/api/v2/censos/nomes/{nome}?periodo=1930[1940,1940[1950...`
- **Função Service**: `getNameFrequencyByPeriod(name: string, period: string)`
- **Estrutura Response**: `NameFrequency[]` com nome, sexo, localidade, res[]
- **Processamento**: `processNameFrequencyData()` para formatação

**🔄 Fluxo de Dados:**
1. **Input**: nome + período →
2. **Service**: getNameFrequencyByPeriod() →
3. **API**: IBGE endpoint →
4. **Processing**: processNameFrequencyData() →
5. **Output**: LineChart

**🎨 Visual Estilo IDE:**
- Blocos de código com syntax highlighting
- Estrutura de arquivos com ícones
- Estados React tipados em TypeScript
- Validações e tratamento de erros

### 4. **Slide do Natanael** (`src/components/slides/NatanaelSlide.tsx`)

#### 🔍 Explicações Técnicas Detalhadas:

**Funcionalidade:**
- Ranking de nomes por estado ou município
- Filtros por período de nascimento
- Seleção de quantidade de resultados (top 3, 5, 10...)
- Dados demográficos regionais detalhados

**Interface React:**
- **Componente**: LocationNames.tsx
- **Tabela**: shadcn/ui Table components
- **Filtros**: Select, RadioGroup, Calendar
- **Estados**: Dados estáticos + API dinâmica

**API IBGE:**
- **Endpoint**: `/api/v2/censos/nomes/ranking`
- **Parâmetro**: `?localidade={código_IBGE}`
- **Códigos**: UF (2 dígitos) ou Município (7 dígitos)
- **Retorno**: Array com ranking e frequências

**Recursos Avançados:**
- Filtros por período de nascimento
- Cobertura de todos os 26 estados + DF
- 5.570 municípios brasileiros
- Dados regionais agregados

### 5. **Slide do Vinicius** (`src/components/slides/ViniciusSlide.tsx`)

#### 🔍 Explicações Técnicas Detalhadas:

**Funcionalidade:**
- Comparação lado a lado de dois nomes
- Análise temporal desde 1930 até presente
- Visualização em gráfico de barras
- Dados nacionais agregados do Brasil

**Interface React:**
- **Componente**: NameComparison.tsx
- **Gráfico**: Recharts (BarChart)
- **Inputs**: Dois campos de texto para nomes
- **Processamento**: Promise.all para requisições paralelas

**API IBGE:**
- **Endpoint**: `/api/v2/censos/nomes/{nome}`
- **Estratégia**: Duas requisições simultâneas
- **Escopo**: Dados nacionais (sem filtro de localidade)
- **Período**: Todas as décadas disponíveis

**Algoritmo de Merge:**
1. **Promise.all**: Requisições paralelas
2. **processNameFrequencyData**: Normalização individual
3. **forEach + find**: Merge por período
4. **BarChart**: Renderização final

## 🎨 Melhorias de UX/UI para Apresentação

### Tipografia e Legibilidade:
- **Títulos**: Aumentados para text-4xl/5xl
- **Texto**: Tamanhos otimizados para visualização à distância
- **Contraste**: Melhorado para modo claro e escuro
- **Gradientes**: Aplicados em títulos para melhor destaque

### Layout e Navegação:
- **Cards Expandidos**: max-w-6xl para melhor aproveitamento do espaço
- **Botões de Navegação**: Aumentados (w-12 h-12) com melhor contraste
- **Indicadores**: Progresso visual com ícones e cores por apresentador
- **Responsividade**: Grid layouts adaptativos

### Cores e Temas:
- **Rodrigo**: Azul/Roxo (Blue-Purple gradient)
- **Natanael**: Verde/Teal (Green-Teal gradient)
- **Vinicius**: Laranja/Vermelho (Orange-Red gradient)
- **Introdução**: Índigo/Roxo (Indigo-Purple gradient)

## 🚀 Como Usar

1. **Iniciar o servidor**:
   ```bash
   npm run dev
   ```

2. **Acessar a apresentação**:
   ```
   http://localhost:8080/apresentacao
   ```

3. **Navegação**:
   - **Setas do teclado**: ← → para navegar
   - **Botões**: Clique nos botões laterais
   - **Indicadores**: Visualize o progresso na barra superior

## 📁 Estrutura de Arquivos

```
src/
├── pages/
│   └── Apresentacao.tsx          # Página principal da apresentação
├── components/
│   └── slides/
│       ├── IntroSlide.tsx        # Slide de introdução
│       ├── RodrigoSlide.tsx      # Slide do Rodrigo (Evolução)
│       ├── NatanaelSlide.tsx     # Slide do Natanael (Localidade)
│       └── ViniciusSlide.tsx     # Slide do Vinicius (Comparação)
└── index.css                     # Estilos globais otimizados
```

## 🎯 Benefícios das Melhorias

1. **Apresentação Profissional**: Layout otimizado para projetores e telas grandes
2. **Explicações Técnicas**: Detalhamento completo da arquitetura e implementação
3. **Navegação Intuitiva**: Controles claros e indicadores visuais
4. **Responsividade**: Funciona bem em diferentes dispositivos
5. **Acessibilidade**: Melhor contraste e legibilidade
6. **Organização**: Cada apresentador tem sua seção bem definida

## 🔧 Tecnologias Utilizadas nas Melhorias

- **React 18**: Hooks (useState, useEffect)
- **TypeScript**: Tipagem forte
- **Tailwind CSS**: Estilização responsiva
- **shadcn/ui**: Componentes de UI
- **Lucide React**: Ícones
- **Embla Carousel**: Sistema de slides

---

**Desenvolvido por**: Rodrigo Sumioshi, Natanael Balbo, Vinicius Santa Rosa
**Data**: Dezembro 2024
