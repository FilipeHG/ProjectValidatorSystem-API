# Project Validator System Database Standards

> Database Design, Persistence and Data Access Standards

---

| Property | Value                                                        |
| -------- | ------------------------------------------------------------ |
| Document | Project Validator System Database Standards                  |
| Version  | 1.0.0                                                        |
| Status   | Approved                                                     |
| Type     | Database Standard                                            |
| Audience | Software Engineers, Software Architects and AI Coding Agents |

---

# Purpose

This document defines the official database standards for Project Validator System.

Its purpose is to guarantee:

* Data consistency
* Predictable persistence behavior
* Explicit database access
* Maintainable repository design
* Scalable schema evolution

---

# Part I — Database Overview

---

# 1. Official Database

The official database is:

```text id="l9w7z3"
PostgreSQL
```

Hosted on:

```text id="t5d1k7"
Supabase
```

---

# 2. Persistence Philosophy

The database is part of the architecture.

Persistence should be:

* Explicit
* Predictable
* Testable
* Maintainable

---

# 3. ORM Standard

Official ORM:

```text id="p4r8n2"
Drizzle ORM
```

---

# 4. Forbidden ORMs

The project must not use:

```text id="v8j3c6"
Prisma

TypeORM
```

Reason:

The project intentionally prioritizes:

* Explicit SQL generation
* Predictable behavior
* Minimal abstraction

---

# Part II — Connection Standards

---

# 5. Connection Library

Official driver:

```text id="d1m6x8"
postgres.js
```

---

# 6. Connection Configuration

Required configuration:

```typescript id="q9n2v4"
const client = postgres(connectionString, {
  prepare: false
});
```

---

# 7. Rationale

Supabase Transaction Pool Mode does not support prepared statements.

Therefore:

```typescript id="k4s7e1"
prepare: false
```

is mandatory.

---

# 8. Environment Variable

Official variable:

```text id="u3f5w9"
DATABASE_URL
```

---

# 9. Connection Ownership

Database connection must be centralized.

A single database module should own:

* Connection creation
* Drizzle initialization
* Configuration

---

# Part III — Schema Standards

---

# 10. Schema Ownership

Database schema is the source of truth.

All DTO validation must originate from the schema.

---

# 11. Schema Location

Official location:

```text id="a6h2q5"
src/infrastructure/database/schema/
```

---

# 12. Naming Convention

Tables:

```text id="b4z8r3"
snake_case
```

---

Columns:

```text id="e7v1y6"
snake_case
```

---

# 13. Main Table

Official table:

```text id="m8c4t2"
projetos
```

---

# 14. Required Columns

```text id="n2j7p5"
id

nome

data_de_inicio

previsao_de_termino

orcamento_total

descricao

status

risco_calculado

dt_criacao

dt_atualizacao
```

---

# 15. Column Mapping

| Database            | Domain            |
| ------------------- | ----------------- |
| data_de_inicio      | dataDeInicio      |
| previsao_de_termino | previsaoDeTermino |
| orcamento_total     | orcamentoTotal    |
| risco_calculado     | riscoCalculado    |
| dt_criacao          | dtCriacao         |
| dt_atualizacao      | dtAtualizacao     |

---

# Part IV — Primary Key Standards

---

# 16. Primary Key Strategy

Official strategy:

```text id="x4d7g2"
UUID
```

---

# 17. UUID Ownership

The application generates identifiers.

The database stores them.

---

# 18. UUID Benefits

* Globally unique
* Safer for distributed systems
* Future-proof

---

# Part V — Audit Standards

---

# 19. Audit Fields

Every project record must contain:

```text id="j8n3m7"
dt_criacao

dt_atualizacao
```

---

# 20. Creation Rule

On insert:

```text id="y2p6r1"
dt_criacao = now()

dt_atualizacao = now()
```

---

# 21. Update Rule

On update:

```text id="c5t8w4"
dt_atualizacao = now()
```

---

# 22. Immutability Rule

The field:

```text id="g1h9q3"
dt_criacao
```

must never be modified.

---

# Part VI — Repository Standards

---

# 23. Repository Philosophy

Repositories exist only for persistence.

Repositories do not contain business rules.

---

# 24. Repository Ownership

Repositories own:

* Selects
* Inserts
* Updates
* Deletes

Repositories do not own:

* Risk calculation
* Status validation
* AI analysis

---

# 25. Official Repository

```text id="m4v2k9"
ProjectRepository
```

---

# 26. Required Operations

```text id="r8w6p1"
findById

findAll

create

update

delete
```

---

# 27. Forbidden Repositories

Do not create:

```text id="t9q4h7"
GenericRepository

BaseRepository

CrudRepository
```

---

# 28. Query Ownership

SQL belongs only inside repositories.

Never inside:

* Controllers
* Use Cases
* Domain Services

---

# Part VII — Migration Standards

---

# 29. Migration Philosophy

Schema evolution must be controlled.

---

# 30. Migration Tool

Official tool:

```text id="s7y3n5"
drizzle-kit
```

---

# 31. Migration Location

```text id="u8f2c4"
drizzle/migrations/
```

---

# 32. Migration Requirements

Every schema change requires:

✓ Migration

✓ Review

✓ Version control

---

# 33. Manual Changes

Manual production changes are forbidden.

---

# Part VIII — Validation Integration

---

# 34. Validation Strategy

Database schema is the single source of truth.

---

# 35. Validation Flow

```text id="x1v5e7"
Drizzle Schema

↓

drizzle-zod

↓

Zod Schema

↓

Validation Pipe
```

---

# 36. Duplication Rule

Validation rules should not be duplicated.

---

# 37. Ownership

Drizzle owns:

Database structure

---

drizzle-zod owns:

Validation generation

---

Zod owns:

Runtime validation

---

# Part IX — Query Standards

---

# 38. Query Philosophy

Queries should be:

* Explicit
* Predictable
* Efficient

---

# 39. Select Queries

Prefer:

Explicit projections.

---

Avoid:

```sql id="q6z4d8"
SELECT *
```

when unnecessary.

---

# 40. Pagination Queries

Collection endpoints must support:

```text id="n7h1r2"
LIMIT

OFFSET
```

---

# 41. Filtering

Filtering should be explicit.

Never build dynamic SQL through string concatenation.

---

# 42. Parameterization

All queries must use parameterized execution.

---

# 43. SQL Injection Prevention

Forbidden:

```typescript id="m3f7w8"
`SELECT * FROM projetos WHERE id = '${id}'`
```

---

# Part X — Index Standards

---

# 44. Index Philosophy

Indexes exist to optimize known access patterns.

---

# 45. Required Indexes

Recommended:

```text id="v5g2k1"
id

status
```

---

# 46. Optional Indexes

Evaluate:

```text id="a2y8t4"
dt_criacao

dt_atualizacao
```

based on usage.

---

# 47. Index Review

Indexes should be reviewed periodically.

---

# Part XI — Transaction Standards

---

# 48. Transaction Philosophy

Transactions protect consistency.

---

# 49. Transaction Ownership

Transactions belong to:

```text id="q8c5e2"
Application Layer
```

---

# 50. Repository Rule

Repositories should not orchestrate business transactions.

---

# 51. Transaction Scope

Transactions should be:

* Small
* Focused
* Predictable

---

# Part XII — Performance Standards

---

# 52. Query Performance

Queries should avoid:

✗ Full table scans

✗ N+1 queries

✗ Unnecessary joins

---

# 53. Pagination Requirement

Large collections must always be paginated.

---

# 54. Connection Usage

Connections must be reused.

Avoid creating connections per request.

---

# 55. Future Scaling

Future versions may introduce:

* Read replicas
* Redis cache
* Query caching

No implementation required in v1.

---

# Part XIII — Backup & Recovery

---

# 56. Backup Responsibility

Backups are mandatory in production.

---

# 57. Recovery Responsibility

Recovery procedures must be documented.

---

# 58. Backup Validation

Backups should be tested periodically.

A backup that has never been restored is unverified.

---

# Part XIV — Acceptance Rules

---

# 59. Database Compliance

The database layer is compliant only when:

✓ Drizzle ORM used

✓ PostgreSQL used

✓ Repositories implemented

✓ Migrations implemented

✓ Validation integrated

---

# 60. Repository Compliance

A repository is compliant only when:

✓ Persistence only

✓ No business rules

✓ No AI logic

✓ No HTTP logic

---

# 61. Schema Compliance

A schema is compliant only when:

✓ Naming conventions respected

✓ Audit fields present

✓ Validation generated from schema

---

# End of Project Validator System Database Standards

Version: 1.0.0

Status: Approved

Document Type: Database Standard
