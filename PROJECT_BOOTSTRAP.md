# Project Bootstrap Command

You are the Lead Software Architect and Senior Software Engineer responsible for implementing the entire ProjectValidatorSystem.

Before writing any code, perform a complete architecture discovery process.

---

## Project Modeling Decisions

The following decisions are considered final and must be followed exactly.

### Primary Key Strategy

Use UUID as primary keys.

Drizzle implementation:

```ts
uuid("id")
  .primaryKey()
  .defaultRandom()
```

---

### Table Naming Convention

Use snake_case for all database objects.

Example:

```text
projetos
data_de_inicio
previsao_de_termino
orcamento_total
risco_calculado
dt_criacao
dt_atualizacao
```

---

### Entity Naming Convention

Domain entities, DTOs and business objects remain in Portuguese.

Example:

```text
Projeto
ProjetoDto
ProjetoResponseDto
```

Code structure, services, use cases and technical classes remain in English.

Example:

```text
CreateProjectUseCase
ProjectRepository
RiskCalculationService
```

---

### String Length Standards

Use the following standards:

```ts
nome:
varchar("nome", { length: 255 })

status:
varchar("status", { length: 50 })

risco_calculado:
varchar("risco_calculado", { length: 20 })

descricao:
text("descricao")
```

---

### Monetary Values

All monetary values must use:

```ts
numeric("orcamento_total", {
  precision: 18,
  scale: 2
})
```

Never use:

- float
- real
- double precision

for monetary values.

---

### Date Fields

Use:

```ts
date()
```

for:

- data_de_inicio
- previsao_de_termino

Use:

```ts
timestamp({
  withTimezone: true
})
```

for:

- dt_criacao
- dt_atualizacao

---

### Status Strategy

Do NOT use PostgreSQL enums.

Do NOT use Drizzle pgEnum.

Use:

```ts
varchar("status", { length: 50 })
```

combined with:

- Zod validation
- Domain validation
- ProjectStatusPolicy

Allowed values:

- Em análise
- Aprovado
- Em andamento
- Encerrado
- Cancelado

---

### Risk Strategy

Do NOT use PostgreSQL enums.

Use:

```ts
varchar("risco_calculado", { length: 20 })
```

Allowed values:

- Baixo
- Médio
- Alto

Risk is always calculated by the system.

Clients must never provide this value.

---

### Audit Fields

Mandatory:

```ts
dt_criacao
dt_atualizacao
```

Creation:

```ts
defaultNow()
```

Update:

Managed by the application layer.

Database trigger is optional and may only be created if it does not conflict with Drizzle migrations.

---

### Repository Standards

Only one repository is allowed:

```text
ProjectRepository
```

Forbidden:

- GenericRepository
- BaseRepository
- CrudRepository

---

### Validation Source Of Truth

The following chain is mandatory:

Drizzle Schema
↓
drizzle-zod
↓
Zod
↓
Global ZodValidationPipe

Validation must never be duplicated.

---

### AI Response Contract

The AI endpoint must always return:

```json
{
  "resumoDoProjeto": "",
  "pontosDeAtencao": [],
  "recomendacaoExecutiva": ""
}
```

Validate the response using Zod before returning it to clients.

---

### Folder Structure

The official folder structure is defined by ADR-001 and must not be modified.

Do not introduce:

- feature folders
- vertical slices
- CQRS folders
- handlers
- commands
- queries

without a new ADR.

---

### JWT Secret Requirements

Use a cryptographically secure secret.

Minimum length:

64 characters

Example:

openssl rand -base64 64

---

### ENVIRONMENT VARIABLES

The following environment variables must exist:

DATABASE_URL
JWT_SECRET
GEMINI_API_KEY

Credentials must never be hardcoded.

Credentials must never be committed.

Use values from the local .env file.

---

### Environment Loading Rules

Before generating any infrastructure code:

1. Check whether a local .env file exists.
2. If a .env file exists, use its values as the source of truth.
3. Never overwrite existing .env values.
4. Never generate placeholder values when real values already exist in .env.
5. Generate .env.example using placeholders only.
6. Never commit secrets to source control.

---

## Phase 1 - Documentation Discovery

Read and analyze ALL markdown files in this repository.

Mandatory reading order:

1. .ai/system-prompt.md
2. .ai/engineering-rules.md
3. docs/engineering/Backend-Engineering-Handbook.md
4. docs/engineering/Engineering-Checklist.md
5. docs/engineering/Production-Readiness.md
6. docs/projects/ProjectValidatorSystem/Project-ProjectValidatorSystem-Context.md
7. docs/projects/ProjectValidatorSystem/Project-ProjectValidatorSystem-Specification.md
8. docs/projects/ProjectValidatorSystem/Project-ProjectValidatorSystem-API-Standards.md
9. docs/projects/ProjectValidatorSystem/Project-ProjectValidatorSystem-Database-Standards.md
10. docs/projects/ProjectValidatorSystem/Project-ProjectValidatorSystem-Testing-Standards.md
11. docs/projects/ProjectValidatorSystem/Project-ProjectValidatorSystem-Deployment-Guide.md
12. docs/projects/ProjectValidatorSystem/adrs/ADR-001-Official-Architecture.md
13. docs/projects/ProjectValidatorSystem/adrs/ADR-002-Technology-Stack.md
14. docs/projects/ProjectValidatorSystem/adrs/ADR-003-Drizzle-ORM.md
15. docs/projects/ProjectValidatorSystem/adrs/ADR-004-Validation-Strategy.md
16. docs/projects/ProjectValidatorSystem/adrs/ADR-005-JWT-Authentication.md
17. docs/projects/ProjectValidatorSystem/adrs/ADR-006-AI-Integration.md
18. docs/projects/ProjectValidatorSystem/adrs/ADR-007-Testing-Strategy.md
19. docs/projects/ProjectValidatorSystem/adrs/ADR-008-Error-Handling.md

Do not start implementation before reading every document.

---

## Phase 2 - Architecture Validation

After reading all documents:

Produce a complete architecture summary containing:

* Official Architecture
* Layer Responsibilities
* Folder Structure
* Dependency Direction
* Domain Model
* API Contracts
* Persistence Strategy
* Validation Strategy
* Authentication Strategy
* AI Strategy
* Testing Strategy
* Error Handling Strategy

Verify that no architectural contradictions exist.

If contradictions exist:

Stop and list them.

Otherwise continue.

---

## Phase 3 - Implementation Plan

Generate a complete implementation plan.

Break the project into milestones:

* Foundation
* Infrastructure
* Database
* Domain
* Application
* API
* Authentication
* Validation
* AI Integration
* Testing
* Documentation

For each milestone:

* Objectives
* Files
* Dependencies
* Acceptance Criteria

---

## Phase 4 - Project Generation

Generate the complete project using the architecture defined in ADR-001.

Mandatory rules:

* TypeScript
* NestJS
* PostgreSQL
* Supabase
* Drizzle ORM
* drizzle-zod
* Zod
* JWT
* Swagger
* Vitest
* Supertest
* Google Gemini

Architecture must follow:

Pragmatic Layered Clean Architecture

Do NOT introduce:

* CQRS
* Prisma
* TypeORM
* GenericRepository
* BaseRepository
* CrudRepository

Do NOT violate any ADR.

---

## Phase 5 - Continuous Verification

After each generated file:

Verify compliance against:

* Specification
* API Standards
* Database Standards
* Testing Standards
* Deployment Guide
* ADR-001 through ADR-008

Whenever a violation is found:

Correct it immediately.

---

## Phase 6 - Final Validation

Before declaring the project complete:

Verify:

✓ Build compiles

✓ Architecture follows ADR-001

✓ Persistence follows ADR-003

✓ Validation follows ADR-004

✓ Authentication follows ADR-005

✓ AI follows ADR-006

✓ Tests follow ADR-007

✓ Error handling follows ADR-008

✓ Swagger is complete

✓ README is complete

✓ .env.example exists

Output a final compliance report.
