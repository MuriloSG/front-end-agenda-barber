# MeuBarbeiro - Documentação Front-end

## Autores
- Murilo Santos
- José Junior

## Introdução
O AgendaBarber é uma plataforma web desenvolvida para conectar barbeiros e clientes, oferecendo um sistema de agendamento simples e eficiente. O projeto visa resolver a necessidade de gestão de horários e serviços em barbearias, especialmente em cidades menores, proporcionando uma solução acessível e de fácil adoção. A plataforma permite que barbeiros gerenciem seus serviços e clientes, enquanto os clientes podem agendar horários e acompanhar seu histórico de atendimentos.

## Arquitetura
O projeto utiliza uma arquitetura moderna baseada em componentes, seguindo os princípios do React e Next.js. A estrutura é organizada da seguinte forma:

```
src/
├── app/                    # Páginas e rotas da aplicação
│   ├── dashboard/         # Área restrita (barbeiros e clientes)
│   └── auth/             # Páginas de autenticação
├── components/           # Componentes reutilizáveis
├── lib/                  # Utilitários e configurações
└── validation/          # Schemas de validação
```

## Tecnologias Utilizadas
- **Framework**: Next.js 13+ (App Router)
- **Biblioteca UI**: Shadcn/UI
- **Gerenciamento de Estado**: React Hook Form
- **Validação**: Zod
- **Estilização**: Tailwind CSS
- **Notificações**: Sonner
- **Modais**: SweetAlert2
- **Ícones**: Lucide Icons

## Funcionalidades Implementadas

### Área do Cliente
1. **Perfil do Usuário**
   - Upload de avatar
   - Edição de informações pessoais
   - Seleção de cidade
   - Contador de agendamentos para recompensas

2. **Agendamentos**
   - Agendar Horarios
   - Avaliar Barbeiros
   - Listagem de agendamentos
   - Filtros por barbeiro, status e dia
   - Cancelamento de agendamentos confirmados

### Área do Barbeiro
1. **Perfil Profissional**
   - Upload de avatar
   - Edição de informações profissionais
   - Configuração de cidade

2. **Gestão de Agendamentos**
   - Listagem completa de agendamentos
   - Filtros avançados
   - Confirmação de agendamentos
   - Cancelamento
   - Marcação como concluído

3. **Dashboard**
   - Métricas de atendimentos
   - Estatísticas financeiras
   - Serviços mais populares
   - Próximos agendamentos

## Validações e Feedback
- Validação de formulários com Zod
- Feedback visual de erros
- Notificações toast para ações
- Modais de confirmação para ações críticas
- Indicadores de carregamento


## Segurança
- Autenticação via tokens
- Proteção de rotas
- Validação de dados no front-end

## Próximos Passos
1. Integração com API de WhatsApp para lembretes
2. Integração com pagamentos e escolha de metodos de cobrança
3. 

