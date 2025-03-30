# MeuBarbeiro - Documentação Front-end

## Autores
- Murilo Santos
- José Junior

## Sobre o Projeto
O MeuBarbeiro é uma plataforma web desenvolvida para conectar barbeiros e clientes, oferecendo um sistema de agendamento simples e eficiente. O projeto visa resolver a necessidade de gestão de horários e serviços em barbearias, especialmente em cidades menores, proporcionando uma solução acessível e de fácil adoção.

### Objetivos
- Facilitar o agendamento de serviços em barbearias
- Melhorar a gestão de horários para barbeiros
- Proporcionar uma experiência digital moderna para clientes
- Reduzir no-shows e melhorar a organização
- Gerar métricas e insights para os barbeiros

### Público-Alvo
- Barbeiros autônomos e donos de barbearias
- Clientes que buscam praticidade no agendamento
- Barbearias em cidades menores
- Profissionais que querem expandir seu negócio digitalmente

## Tecnologias Utilizadas
- **Framework**: Next.js 13+ (App Router)
- **Biblioteca UI**: Shadcn/UI
- **Gerenciamento de Estado**: React Hook Form
- **Validação**: Zod
- **Estilização**: Tailwind CSS
- **Notificações**: Sonner
- **Modais**: SweetAlert2
- **Ícones**: Lucide Icons
- **Gerenciamento de Cookies**: js-cookie
- **Formatação de Datas**: date-fns

## Arquitetura
O projeto utiliza uma arquitetura moderna baseada em componentes, seguindo os princípios do React e Next.js. A estrutura é organizada da seguinte forma:

```
src/
├── app/                    # Páginas e rotas da aplicação
│   ├── dashboard/         # Área restrita (barbeiros e clientes)
│   │   ├── barbers/      # Área específica para barbeiros
│   │   └── customers/    # Área específica para clientes
│   ├── auth/             # Páginas de autenticação
│   └── api/              # Rotas da API
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes base (shadcn)
│   └── shared/          # Componentes compartilhados
├── lib/                  # Utilitários e configurações
│   ├── api/             # Funções de API
│   └── utils/           # Funções utilitárias
└── validation/          # Schemas de validação
```

## Funcionalidades Implementadas

### Área do Cliente
1. **Perfil do Usuário**
   - Upload de avatar
   - Edição de informações pessoais
   - Seleção de cidade
   - Contador de agendamentos para recompensas

2. **Agendamentos**
   - Busca de barbeiros por nome
   - Visualização de serviços disponíveis
   - Seleção de data e horário
   - Confirmação de agendamento
   - Avaliação de serviços
   - Listagem de agendamentos
   - Filtros por barbeiro, status e dia
   - Cancelamento de agendamentos confirmados
   - Notificações por WhatsApp

3. **Avaliações**
   - Sistema de estrelas

### Área do Barbeiro
1. **Perfil Profissional**
   - Upload de avatar
   - Edição de informações profissionais
   - Configuração de cidade
   - Configuração de horários de trabalho
   - Gestão de serviços e preços
   - Configuração de chave PIX e local de atendimento

2. **Gestão de Horários**
   - Cadastro de dias de trabalho
   - Edição de dias disponíveis
   - Exclusão de dias de trabalho
   - Cálculo automático de horários disponíveis
   - Configuração de intervalo entre atendimentos
   - Definição de horário de início e fim
   - Visualização de agenda semanal

3. **Gestão de Agendamentos**
   - Listagem completa de agendamentos
   - Filtros avançados por status e data
   - Confirmação de agendamentos
   - Cancelamento
   - Marcação como concluído
   - Histórico de atendimentos

4. **Dashboard**
   - Métricas de atendimentos
   - Estatísticas financeiras
   - Serviços mais populares
   - Próximos agendamentos
   - Total de avaliações
   - Média de avaliações

5. **Serviços**
   - Cadastro de serviços
   - Definição de preços
   - Upload de imagens
   - Descrições detalhadas
   - Disponibilidade por dia

## Validações e Feedback
- Validação de formulários com Zod
- Feedback visual de erros
- Notificações toast para ações
- Modais de confirmação para ações críticas
- Indicadores de carregamento
- Mensagens de sucesso e erro
- Validação de campos obrigatórios
- Formatação automática de campos

## Segurança
- Autenticação via tokens
- Proteção de rotas
- Validação de dados no front-end
- Validação de permissões


## Próximos Passos
1. Integração com API de WhatsApp para lembretes
2. Integração com pagamentos e escolha de métodos de cobrança

## Instalação e Execução

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Git

### Passos para Instalação
1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/meubarbeiro.git
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

4. Execute o projeto:
```bash
npm run dev
# ou
yarn dev
```

## Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

