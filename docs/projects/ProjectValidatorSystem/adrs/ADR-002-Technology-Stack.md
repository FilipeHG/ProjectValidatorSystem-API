# ADR-002 — Technology Stack

> Architecture Decision Record

---

| Property        | Value                                    |
| --------------- | ---------------------------------------- |
| ADR             | 002                                      |
| Title           | Technology Stack                         |
| Status          | Accepted                                 |
| Date            | 2026-07-02                               |
| Decision Makers | ProjectValidatorSystem Architecture Team |
| Supersedes      | None                                     |
| Superseded By   | None                                     |

---

# Context

The Project Validator System requires a modern backend technology stack capable of providing:

* Maintainability
* Simplicity
* Strong typing
* High productivity
* Excellent developer experience
* Long-term support
* Strong testing capabilities
* AI integration support

The selected stack must align with the architectural principles defined in:

```text id="adr002a"
ADR-001
Official Architecture
```

The project intentionally prioritizes:

```text id="adr002b"
Pragmatism over trend adoption.
```

The stack should be easy to understand, easy to maintain, and highly compatible with AI-assisted development.

---

# Decision

The official technology stack shall be:

```text id="adr002c"
Runtime:
Node.js

Language:
TypeScript

Framework:
NestJS

Database:
PostgreSQL

Database Hosting:
Supabase

ORM:
Drizzle ORM

Validation:
Zod + drizzle-zod

Authentication:
JWT

Testing:
Vitest + Supertest + Faker

Documentation:
Swagger/OpenAPI

Artificial Intelligence:
Google Gemini 1.5 Flash
```

---

# Technology Overview

| Category          | Technology  |
| ----------------- | ----------- |
| Runtime           | Node.js     |
| Language          | TypeScript  |
| Framework         | NestJS      |
| Database          | PostgreSQL  |
| Cloud Database    | Supabase    |
| ORM               | Drizzle ORM |
| Validation        | Zod         |
| Schema Generation | drizzle-zod |
| Authentication    | JWT         |
| Documentation     | Swagger     |
| Unit Testing      | Vitest      |
| E2E Testing       | Supertest   |
| Fake Data         | Faker       |
| AI Provider       | Gemini      |

---

# Decision 1 — Node.js

---

## Selected

```text id="adr002d"
Node.js
```

---

## Why

Benefits:

✓ Mature ecosystem

✓ Excellent TypeScript support

✓ Fast development

✓ Large community

✓ Vast package ecosystem

✓ Excellent cloud compatibility

---

## Consequences

Positive:

* Rapid development
* Excellent tooling
* Strong community support

Negative:

* Single-threaded runtime
* CPU-heavy workloads require special handling

Acceptable for current scope.

---

# Decision 2 — TypeScript

---

## Selected

```text id="adr002e"
TypeScript
```

---

## Why

Benefits:

✓ Strong typing

✓ Better maintainability

✓ Better refactoring support

✓ Better AI-generated code quality

✓ Reduced runtime errors

---

## Rejected Alternative

```text id="adr002f"
JavaScript
```

---

## Reason

Insufficient type safety.

The project benefits significantly from static typing.

---

# Decision 3 — NestJS

---

## Selected

```text id="adr002g"
NestJS
```

---

## Why

Benefits:

✓ Dependency Injection

✓ Modular architecture

✓ Enterprise adoption

✓ Excellent TypeScript integration

✓ Native Swagger support

✓ Guards

✓ Pipes

✓ Interceptors

✓ Exception Filters

---

## Rejected Alternatives

```text id="adr002h"
Express

Fastify (standalone)

Koa

Hapi
```

---

## Reason

Although lighter, they require additional architectural conventions.

NestJS already provides the structure required by ADR-001.

---

# Decision 4 — PostgreSQL

---

## Selected

```text id="adr002i"
PostgreSQL
```

---

## Why

Benefits:

✓ Mature

✓ Reliable

✓ ACID compliant

✓ Excellent indexing

✓ Strong SQL support

✓ Open source

✓ Industry standard

---

## Rejected Alternatives

```text id="adr002j"
MySQL

MongoDB

SQLite
```

---

## Reason

PostgreSQL provides the best balance of:

* Features
* Reliability
* Flexibility

for this project.

---

# Decision 5 — Supabase

---

## Selected

```text id="adr002k"
Supabase
```

---

## Why

Benefits:

✓ Managed PostgreSQL

✓ Excellent developer experience

✓ Easy setup

✓ Generous free tier

✓ Fast project onboarding

---

## Consequences

Positive:

* Reduced infrastructure effort

Negative:

* Vendor dependency

Acceptable for project scope.

---

# Decision 6 — Drizzle ORM

---

## Selected

```text id="adr002l"
Drizzle ORM
```

---

## Why

Benefits:

✓ SQL-first approach

✓ Type safety

✓ Lightweight

✓ Explicit behavior

✓ Minimal magic

✓ Excellent TypeScript support

---

## Rejected Alternative

```text id="adr002m"
Prisma
```

---

## Reason

Prisma introduces additional abstraction layers.

The project explicitly prefers:

```text id="adr002n"
SQL visibility
```

and predictable persistence behavior.

---

## Rejected Alternative

```text id="adr002o"
TypeORM
```

---

## Reason

Excessive ORM magic.

Hidden behavior.

Decorator-heavy design.

Not aligned with project philosophy.

---

# Decision 7 — Zod

---

## Selected

```text id="adr002p"
Zod
```

---

## Why

Benefits:

✓ TypeScript-first

✓ Runtime validation

✓ Excellent developer experience

✓ Easy schema composition

✓ AI-friendly patterns

---

## Rejected Alternatives

```text id="adr002q"
Joi

Yup

class-validator
```

---

## Reason

Zod integrates better with modern TypeScript ecosystems.

---

# Decision 8 — drizzle-zod

---

## Selected

```text id="adr002r"
drizzle-zod
```

---

## Why

Benefits:

✓ Single source of truth

✓ Reduced duplication

✓ Schema synchronization

✓ Reduced maintenance cost

---

# Decision 9 — JWT

---

## Selected

```text id="adr002s"
JWT
```

---

## Why

Benefits:

✓ Stateless

✓ Simple

✓ Widely adopted

✓ Easy API protection

---

## Project Scope

A single static token is sufficient for version 1.

---

# Decision 10 — Swagger/OpenAPI

---

## Selected

```text id="adr002t"
Swagger
```

---

## Why

Benefits:

✓ Self-documenting APIs

✓ Standardized contracts

✓ Faster onboarding

✓ Easier testing

---

# Decision 11 — Vitest

---

## Selected

```text id="adr002u"
Vitest
```

---

## Why

Benefits:

✓ Fast execution

✓ Modern architecture

✓ Native ESM support

✓ Excellent TypeScript support

---

## Rejected Alternative

```text id="adr002v"
Jest
```

---

## Reason

Jest remains popular but Vitest provides:

* Faster execution
* Better modern tooling integration

for this project.

---

# Decision 12 — Supertest

---

## Selected

```text id="adr002w"
Supertest
```

---

## Why

Benefits:

✓ Industry standard

✓ Excellent NestJS integration

✓ Full HTTP testing support

---

# Decision 13 — Faker

---

## Selected

```text id="adr002x"
@faker-js/faker
```

---

## Why

Benefits:

✓ Realistic test data

✓ Improved test readability

✓ Better test coverage

---

# Decision 14 — Google Gemini

---

## Selected

```text id="adr002y"
Gemini 1.5 Flash
```

---

## SDK

```text id="adr002z"
@google/generative-ai
```

---

## Why

Benefits:

✓ Generous free tier

✓ Structured Outputs support

✓ Good performance

✓ Easy integration

✓ Large context window

---

## Project Benefits

Allows implementation of:

```text id="adr002aa"
GET /projects/:id/ai-analysis
```

with minimal infrastructure complexity.

---

# Rejected AI Alternatives

---

## OpenAI

Rejected because:

* Higher operational cost
* Not required for current scope

---

## Claude

Rejected because:

* Additional provider complexity
* No significant benefit for current requirements

---

# Technology Selection Principles

The selected stack prioritizes:

1. Simplicity
2. Maintainability
3. Type Safety
4. Explicitness
5. Developer Experience
6. AI Compatibility

---

# Consequences

Positive:

✓ Fast development

✓ Excellent maintainability

✓ Strong typing

✓ Predictable persistence

✓ Strong testing ecosystem

✓ AI integration support

---

Negative:

✓ More opinionated framework (NestJS)

✓ Slight learning curve for Drizzle

✓ Vendor dependency on Supabase

These trade-offs are acceptable.

---

# Compliance Rules

All implementations must follow the official technology stack.

Technology replacement requires:

* New ADR
* Technical justification
* Architecture review

---

# Final Decision

The official technology stack of Project Validator System is:

```text id="adr002ab"
Node.js
TypeScript
NestJS
PostgreSQL
Supabase
Drizzle ORM
Zod
drizzle-zod
JWT
Swagger
Vitest
Supertest
Faker
Google Gemini
```

This decision is accepted and becomes part of the architectural baseline of the project.

---

# End of ADR-002

Status: Accepted

Decision: Technology Stack Established
