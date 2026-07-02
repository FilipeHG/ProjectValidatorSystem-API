# 🚀 ProjectValidatorSystem-API

> Project Validator System — API para gerenciamento simplificado de projetos.

---

## 📋 Overview

O Project Validator System é uma API REST desenvolvida em Node.js + NestJS para gerenciamento simplificado de projetos corporativos.

Principais funcionalidades:

- Cadastro de projetos
- Consulta paginada
- Atualização
- Exclusão controlada por regras de negócio
- Workflow de status
- Cálculo automático de risco
- Análise Inteligente com IA
- Swagger/OpenAPI
- JWT Authentication
- Testes Unitários e E2E
- PostgreSQL / Supabase

---

## 🏗 Arquitetura

Arquitetura oficial:

**Pragmatic Layered Clean Architecture**

Camadas:

```text
Presentation
    ↓
Application
    ↓
Domain
    ↓
Infrastructure
```

Princípios adotados:

- SOLID
- Dependency Injection
- Clean Architecture
- DDD Lite
- Repository Pattern
- Separation of Concerns

---

## 🛠 Stack Tecnológica

### Backend

- Node.js 22 LTS
- NestJS 11
- TypeScript 5

### Banco de Dados

- PostgreSQL
- Supabase

### ORM

- Drizzle ORM
- drizzle-zod

### Validação

- Zod
- Global ZodValidationPipe

### Testes

- Vitest
- Supertest
- Faker.js

### IA

- OpenAI GPT-4.1-mini
- Google Gemini API
- Mock AI Provider

### Documentação

- Swagger/OpenAPI

---

## 🌳 Git Flow

Branches oficiais:

| Branch | Objetivo |
|----------|----------|
| master | Produção |
| develop | Desenvolvimento / Homologação |

Fluxo obrigatório:

```text
feature/*
    ↓
develop
    ↓
Pull Request
    ↓
master
```

Nunca desenvolver diretamente em:

```text
master
```

---

## ⚙️ Instalação

### Clonar projeto

```bash
git clone https://github.com/FilipeHG/ProjectValidatorSystem-API.git

cd ProjectValidatorSystem-API
```

### Instalar dependências

```bash
npm install
```

---

## 🔧 Configuração do Ambiente

Criar:

```text
.env
```

Exemplo:

```env
NODE_ENV=development

PORT=3000

DATABASE_URL=postgresql://postgres:[PASSWORD]@aws-1-sa-east-1.pooler.supabase.com:6543/postgres

JWT_SECRET=secret

AI_PROVIDER=mock

OPENAI_API_KEY=change-me
OPENAI_MODEL=gpt-4.1-mini

GEMINI_API_KEY=change-me
GEMINI_MODEL=gemini-2.0-flash
```

---

## 🤖 AI Providers

O sistema suporta múltiplos provedores de IA.

### Mock

```env
AI_PROVIDER=mock
```

Não consome créditos.

Ideal para desenvolvimento.

---

### OpenAI

```env
AI_PROVIDER=openai
```

Necessário:

```env
OPENAI_API_KEY=
```

Modelo padrão:

```env
OPENAI_MODEL=gpt-4.1-mini
```

---

### Gemini

```env
AI_PROVIDER=gemini
```

Necessário:

```env
GEMINI_API_KEY=
```

Modelo padrão:

```env
GEMINI_MODEL=gemini-2.0-flash
```

---

## 🧠 Serviço de Análise Inteligente

Endpoint:

```http
GET /api/projects/{id}/ai-analysis
```

Retorno:

```json
{
  "resumoDoProjeto": "",
  "pontosDeAtencao": [],
  "recomendacaoExecutiva": ""
}
```

A implementação segue:

```text
AiAnalysisService
    ↓
AiProviderFactory
        ↓
        ├── OpenAiProvider
        ├── GeminiAiProvider
        └── MockAiProvider
```

---

## 🔐 JWT Authentication

Todas as rotas protegidas exigem:

```http
Authorization: Bearer TOKEN
```

Token utilizado para avaliação do projeto:

```text
Bearer eyJhbGciOiJIUzI1NiIs...
```

Exceções:

```http
GET /api/health
```

---

## 🗄 Banco de Dados

Banco utilizado:

- PostgreSQL
- Supabase

ORM:

- Drizzle ORM

Tabela principal:

```text
projetos
```

Campos de rastreabilidade:

```text
dt_criacao
dt_atualizacao
```

---

## 🚀 Criar Estrutura do Banco

Gerar migration:

```bash
npm run db:generate
```

Executar migration:

```bash
npm run db:migrate
```

Ver banco:

```bash
npm run db:studio
```

Introspecção:

```bash
npm run db:introspect
```

---

## ▶️ Executar Localmente

### Watch Mode

```bash
npm run start:dev
```

### Debug Mode

```bash
npm run start:debug
```

### Produção

```bash
npm run build

npm run start:prod
```

---

## 📚 Swagger

Swagger UI:

```text
http://localhost:3000/swagger
```

OpenAPI JSON:

```text
http://localhost:3000/swagger-json
```

OpenAPI YAML:

```text
http://localhost:3000/swagger-yaml
```

---

## 🔌 Endpoints

### Health

```http
GET /api/health
```

---

### Projects

```http
POST   /api/projects

GET    /api/projects

GET    /api/projects/{id}

PATCH  /api/projects/{id}

DELETE /api/projects/{id}

PATCH  /api/projects/{id}/status

GET    /api/projects/{id}/ai-analysis
```

---

## 🧪 Testes

### Unitários

```bash
npm run test
```

Executa:

- Domain
- Services
- Rules
- Validators

---

### Watch

```bash
npm run test:watch
```

---

### Cobertura

```bash
npm run test:cov
```

Relatório gerado:

```text
coverage/
```

Abrir:

```text
coverage/index.html
```

Visualização:

```bash
start coverage/index.html
```

ou abrir manualmente no navegador.

---

### E2E

```bash
npm run test:e2e
```

Valida:

- Controllers
- Middleware
- JWT
- Zod
- API Contracts

---

## 📊 Cobertura de Testes

Cobertura atual:

```text
100%
```

Cobertura validada para:

- Controllers
- Services
- Domain
- Repositories
- Risk Engine
- Status Workflow
- AI Analysis
- JWT Authentication

---

## 📁 Estrutura do Projeto

```text
src/

├── presentation
├── application
├── domain
├── infrastructure
```

---

## ❤️ Desenvolvido com

- Node.js
- NestJS
- PostgreSQL
- Supabase
- Drizzle ORM
- Zod
- Vitest
- OpenAI
- Gemini