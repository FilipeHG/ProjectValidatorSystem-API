# ADR-003 — Drizzle ORM and Persistence Strategy

> Architecture Decision Record

---

| Property        | Value                                    |
| --------------- | ---------------------------------------- |
| ADR             | 003                                      |
| Title           | Drizzle ORM and Persistence Strategy     |
| Status          | Accepted                                 |
| Date            | 2026-07-02                               |
| Decision Makers | ProjectValidatorSystem Architecture Team |
| Supersedes      | None                                     |
| Superseded By   | None                                     |

---

# Context

The Project Validator System requires a persistence strategy that satisfies the following requirements:

* Strong typing
* Explicit database access
* Predictable SQL generation
* Minimal abstraction
* Excellent TypeScript support
* Easy debugging
* Long-term maintainability

The project intentionally avoids ORMs that heavily abstract SQL and database behavior.

The persistence layer must align with:

* ADR-001 Official Architecture
* ADR-002 Technology Stack

---

# Problem Statement

Many ORMs provide productivity benefits but introduce:

* Hidden queries
* Unexpected performance issues
* Complex abstractions
* Difficult debugging
* ORM-specific design constraints

The project requires complete visibility over persistence operations.

---

# Decision

The official persistence strategy shall be:

```text id="adr003a"
Database:
PostgreSQL

Hosting:
Supabase

ORM:
Drizzle ORM

Driver:
postgres.js

Persistence Pattern:
Repository Pattern

Primary Key Strategy:
UUID

Migration Tool:
drizzle-kit
```

---

# Persistence Philosophy

The persistence layer must be:

* Explicit
* Predictable
* Testable
* Replaceable

The database is considered an important architectural component.

Persistence behavior must never be hidden behind excessive abstractions.

---

# Decision 1 — Drizzle ORM

---

## Selected

```text id="adr003b"
Drizzle ORM
```

---

## Why

Benefits:

✓ SQL-first approach

✓ Strong typing

✓ Lightweight

✓ Excellent TypeScript support

✓ Minimal runtime overhead

✓ Explicit query generation

✓ Easy debugging

---

## Consequences

Positive:

* Better SQL visibility
* Better query control
* Easier optimization

Negative:

* Slightly more verbose than Prisma

Acceptable trade-off.

---

# Rejected Alternative — Prisma

---

## Rejected

```text id="adr003c"
Prisma
```

---

## Reason

Prisma introduces:

* Additional abstraction layers
* Hidden query behavior
* Generated client dependency

The project prefers:

```text id="adr003d"
Explicit persistence.
```

---

# Rejected Alternative — TypeORM

---

## Rejected

```text id="adr003e"
TypeORM
```

---

## Reason

TypeORM introduces:

* Heavy decorator usage
* Active Record tendencies
* Hidden persistence behavior

Not aligned with project principles.

---

# Decision 2 — PostgreSQL

---

## Selected

```text id="adr003f"
PostgreSQL
```

---

## Why

Benefits:

✓ Mature

✓ Reliable

✓ ACID compliant

✓ Strong indexing

✓ Excellent SQL support

✓ Enterprise adoption

---

# Decision 3 — Supabase

---

## Selected

```text id="adr003g"
Supabase
```

---

## Why

Benefits:

✓ Managed PostgreSQL

✓ Fast setup

✓ Free tier

✓ Reduced operational effort

✓ Good developer experience

---

## Consequences

Positive:

* Faster project delivery

Negative:

* Vendor dependency

Acceptable for current scope.

---

# Decision 4 — postgres.js Driver

---

## Selected

```text id="adr003h"
postgres.js
```

---

## Why

Benefits:

✓ Official Drizzle recommendation

✓ Lightweight

✓ High performance

✓ Excellent TypeScript support

---

# Connection Standard

Required:

```typescript id="adr003i"
const client = postgres(
  DATABASE_URL,
  {
    prepare: false
  }
);
```

---

# Rationale

Supabase Transaction Pool Mode does not support prepared statements.

Therefore:

```typescript id="adr003j"
prepare: false
```

is mandatory.

---

# Decision 5 — Repository Pattern

---

## Selected

```text id="adr003k"
Repository Pattern
```

---

## Why

Benefits:

✓ Persistence isolation

✓ Easier testing

✓ Clear ownership

✓ Better maintainability

---

# Repository Responsibilities

Repositories own:

✓ Selects

✓ Inserts

✓ Updates

✓ Deletes

✓ Persistence Mapping

---

Repositories do not own:

✗ Business Rules

✗ Risk Calculation

✗ Status Validation

✗ AI Analysis

✗ Authentication

---

# Official Repository

```text id="adr003l"
ProjectRepository
```

---

# Required Methods

```text id="adr003m"
findById()

findAll()

create()

update()

delete()
```

---

# Decision 6 — No Generic Repository

---

## Explicit Decision

The project rejects:

```text id="adr003n"
GenericRepository

BaseRepository

CrudRepository
```

---

## Reason

Generic repositories frequently introduce:

* Leaky abstractions
* Reduced clarity
* Domain ambiguity

Repositories should represent business persistence.

---

# Decision 7 — UUID Strategy

---

## Selected

```text id="adr003o"
UUID
```

---

## Why

Benefits:

✓ Globally unique

✓ Distributed-system friendly

✓ Future-proof

✓ Safer external exposure

---

# Rejected Alternative

```text id="adr003p"
Serial Integer
```

---

## Reason

Although simpler, UUID provides better long-term flexibility.

---

# Decision 8 — Audit Fields

---

## Selected

Every project record must contain:

```text id="adr003q"
dt_criacao

dt_atualizacao
```

---

# Ownership

Application Layer owns timestamp assignment.

---

# Rules

On Create:

```text id="adr003r"
dt_criacao = now()

dt_atualizacao = now()
```

---

On Update:

```text id="adr003s"
dt_atualizacao = now()
```

---

# Decision 9 — Schema as Source of Truth

---

## Selected

Database schema becomes the primary source of truth.

---

# Validation Flow

```text id="adr003t"
Drizzle Schema

↓

drizzle-zod

↓

Zod Schema

↓

Validation Pipe
```

---

# Benefits

✓ Reduced duplication

✓ Reduced maintenance

✓ Consistent validation

---

# Decision 10 — Migrations

---

## Selected

```text id="adr003u"
drizzle-kit
```

---

# Migration Strategy

Every schema change requires:

✓ Migration

✓ Code Review

✓ Version Control

---

# Explicit Rule

Manual production schema changes are forbidden.

---

# Decision 11 — Query Philosophy

---

## Selected

Queries should be:

* Explicit
* Predictable
* Optimized

---

# Allowed

```typescript id="adr003v"
db
  .select({
    id: projetos.id,
    nome: projetos.nome
  })
  .from(projetos);
```

---

# Discouraged

```sql id="adr003w"
SELECT *
```

when unnecessary.

---

# Decision 12 — Transaction Ownership

---

## Selected

Transactions belong to:

```text id="adr003x"
Application Layer
```

---

# Why

Use Cases coordinate business workflows.

Repositories should remain focused on persistence.

---

# Example

Allowed:

```text id="adr003y"
CreateProjectUseCase

↓

Transaction

↓

ProjectRepository
```

---

Discouraged:

```text id="adr003z"
Repository

↓

Transaction

↓

Business Logic
```

---

# Consequences

Positive:

✓ Predictable persistence

✓ Easier testing

✓ Better SQL visibility

✓ Better maintainability

✓ Simpler debugging

✓ Strong typing

---

Negative:

✓ Slightly more verbose than Prisma

✓ Requires understanding SQL concepts

These trade-offs are acceptable.

---

# Compliance Rules

All database access must comply with this ADR.

Any change affecting:

* ORM
* Driver
* Repository Pattern
* Migration Strategy
* Primary Key Strategy

requires a new ADR.

---

# Final Decision

The official persistence strategy of Project Validator System is:

```text id="adr003aa"
PostgreSQL

Supabase

Drizzle ORM

postgres.js

Repository Pattern

UUID

drizzle-kit
```

This decision is accepted and becomes part of the architectural baseline.

---

# References

* ADR-001 Official Architecture
* ADR-002 Technology Stack
* Project Database Standards
* Project Specification

---

# End of ADR-003

Status: Accepted

Decision: Persistence Strategy Established
