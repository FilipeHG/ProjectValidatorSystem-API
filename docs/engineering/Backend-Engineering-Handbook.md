# Backend Engineering Handbook

> Enterprise Software Engineering Standards for Node.js + NestJS Backends

---

| Property      | Value                                                                           |
| ------------- | ------------------------------------------------------------------------------- |
| Document      | Backend Engineering Handbook                                                    |
| Version       | 1.0.0                                                                           |
| Status        | Approved                                                                        |
| Type          | Engineering Standard                                                            |
| Audience      | Software Engineers, Software Architects, Technical Leaders and AI Coding Agents |
| Scope         | Backend Applications                                                            |
| Primary Stack | Node.js + TypeScript + NestJS                                                   |
| Language      | English                                                                         |
| Last Updated  | 2026-07-02                                                                      |

---

# Table of Contents

1. Engineering Foundation
2. Development Standards
3. Technology Standards
4. Official Architecture
5. Dependency Rules
6. Official Project Structure
7. Layer Responsibilities
8. Design Patterns
9. Backend Standards
10. Database Standards
11. API Standards
12. Testing Standards
13. Security Standards
14. AI Integration Standards
15. Production Standards
16. Architecture Decision Records
17. Decision Trees
18. Anti-Patterns
19. Engineering Checklists
20. Appendices

---

# Preface

## Purpose

This handbook defines the official engineering standards for backend software development.

Its purpose is to establish a consistent way of designing, implementing, testing, documenting, maintaining and evolving backend applications.

This document is intentionally technology-aware but business-agnostic.

Business requirements belong to Project Specifications.

This handbook defines how software is built.

Project Specifications define what software is built.

---

## Philosophy

Software engineering is not the process of creating the largest amount of code possible.

Software engineering is the process of solving business problems while introducing the smallest amount of complexity necessary.

Every abstraction has a cost.

Every dependency has a cost.

Every architectural decision has a cost.

These costs must always be justified.

---

# Part I — Engineering Foundation

---

# 1. Engineering Principles

## 1.1 Simplicity First

Simplicity is the primary engineering principle.

Simple software is easier to:

* understand
* test
* review
* maintain
* evolve

The simplest correct solution should always be preferred.

---

## 1.2 Explicit Over Implicit

The behavior of the system should be visible.

Avoid:

* hidden side effects
* magic behavior
* implicit conventions
* framework-dependent logic

Prefer:

* explicit dependencies
* explicit flows
* explicit contracts
* explicit business rules

---

## 1.3 Business First

Frameworks support business rules.

Business rules do not support frameworks.

The domain should always be the most important part of the application.

---

## 1.4 Framework Independence

Business rules must not depend on:

* NestJS
* Drizzle
* PostgreSQL
* Swagger
* Gemini
* OpenAI

External technologies are implementation details.

---

## 1.5 Composition Over Inheritance

Inheritance creates coupling.

Composition creates flexibility.

Prefer composition whenever possible.

---

## 1.6 Maintainability Over Cleverness

Readable code is preferred over clever code.

Future maintainers must understand the system without needing the original author.

---

# 2. Quality Attributes

Every architectural decision must improve one or more of the following:

## Maintainability

Software should be easy to evolve.

---

## Readability

Code should communicate intent.

---

## Testability

Business rules should be independently testable.

---

## Security

Security is mandatory.

---

## Reliability

Systems should behave predictably.

---

## Scalability

Growth should not require rewrites.

---

## Observability

Production systems must provide visibility.

---

## Evolvability

Architecture should support future changes.

---

# 3. Engineering Manifesto

We value:

* Simplicity over complexity.
* Explicitness over magic.
* Business rules over frameworks.
* Composition over inheritance.
* Readability over brevity.
* Maintainability over premature optimization.
* Architecture over shortcuts.
* Consistency over personal preference.

---

# Part II — Development Standards

---

# 4. Source Code Standards

## 4.1 Language

All source code shall be written in English.

Including:

* folders
* files
* classes
* interfaces
* methods
* variables
* enums
* modules

Business terminology may remain aligned with the project specification when necessary.

---

## 4.2 File Naming

Use kebab-case.

Examples:

create-project.use-case.ts

project.controller.ts

project.repository.ts

risk-calculation.service.ts

---

## 4.3 Class Naming

Use PascalCase.

Examples:

ProjectController

CreateProjectUseCase

ProjectRepository

RiskCalculationService

---

## 4.4 Method Naming

Methods must describe actions.

Good:

create()

update()

delete()

findById()

calculateRisk()

changeStatus()

Bad:

executeLogic()

process()

run()

handle()

---

## 4.5 Variable Naming

Names must communicate intent.

Good:

project

currentStatus

riskLevel

analysisResult

Bad:

tmp

obj

res

data

---

## 4.6 Boolean Naming

Booleans should answer questions.

Examples:

isApproved

isActive

hasPermission

canDelete

shouldRecalculate

---

# 5. Documentation Standards

Documentation should explain:

WHY

Code should explain:

HOW

Avoid comments that describe obvious behavior.

Bad:

// increment counter

Good:

// Business rule: approved projects become immutable.

---

# 6. Dependency Standards

Before adding a dependency ask:

1. Does the platform already solve this?
2. Does an existing dependency already solve this?
3. Is this dependency actively maintained?
4. Is this dependency widely adopted?
5. Is this dependency necessary?

Dependencies increase maintenance costs.

---

# Part III — Technology Standards

---

# 7. Official Technology Stack

## Language

TypeScript

---

## Runtime

Node.js LTS

---

## Framework

NestJS

---

## Database

PostgreSQL

---

## ORM

Drizzle ORM

---

## Validation

Zod

drizzle-zod

---

## Authentication

JWT

---

## Documentation

Swagger / OpenAPI

---

## Unit Testing

Vitest

---

## Integration Testing

Supertest

---

## Mock Data

Faker

---

## Formatting

Prettier

---

## Lint

ESLint

---

## Package Manager

pnpm (preferred)

---

# 8. ORM Standard

Official ORM:

Drizzle ORM

Reasons:

* Explicit SQL generation
* Excellent TypeScript support
* Lightweight architecture
* Predictable behavior
* High performance
* Minimal abstraction

Repositories own persistence.

Business rules must never depend on Drizzle.

---

# 9. Validation Standard

All external input must be validated.

Validation should happen before business execution.

Official validation stack:

Database Schema

↓

drizzle-zod

↓

Zod Schema

↓

DTO Validation

This creates a single source of truth.

---

# 10. Authentication Standard

Official mechanism:

JWT

Authentication must remain independent from business logic.

Authorization belongs to Application or Presentation layers.

---

# 11. AI Integration Standard

AI providers are infrastructure concerns.

Business rules must never directly depend on:

* Gemini
* OpenAI
* Claude
* Azure OpenAI

Provider replacement must be simple.

---

# Part IV — Official Architecture

---

# ADR-001 — Official Architecture

## Status

Accepted

---

## Decision

This handbook adopts:

Pragmatic Layered Clean Architecture

---

## Inspired By

* Clean Architecture
* Onion Architecture
* Hexagonal Architecture
* Domain-Driven Design

---

## Goal

Adopt useful concepts.

Avoid unnecessary complexity.

---

# 12. Official Layers

Every backend project shall contain four layers.

Presentation

↓

Application

↓

Domain

↑

Infrastructure

---

# 13. Presentation Layer

Responsibilities:

* HTTP
* Controllers
* Pipes
* Guards
* Filters
* Swagger
* Authentication

Presentation must not contain business rules.

---

# 14. Application Layer

Responsibilities:

* Use Cases
* Transactions
* Orchestration
* DTO Mapping
* Authorization

Application coordinates.

Application does not own business rules.

---

# 15. Domain Layer

Responsibilities:

* Entities
* Policies
* Domain Services
* Value Objects
* Enums
* Domain Exceptions

The Domain Layer is the heart of the application.

---

# 16. Infrastructure Layer

Responsibilities:

* Database
* Drizzle ORM
* External APIs
* AI Providers
* Storage
* Cache
* Logging
* Authentication Implementations

Infrastructure implements technical concerns.

---

# Part V — Dependency Rules

---

# 17. Dependency Direction

Dependencies always point toward the Domain.

Allowed:

Presentation

↓

Application

↓

Domain

Infrastructure

↓

Application

Infrastructure

↓

Domain Interfaces

Forbidden:

Domain

✗ Infrastructure

Domain

✗ NestJS

Domain

✗ HTTP

Domain

✗ Drizzle

Domain

✗ PostgreSQL

---

# 18. Framework Independence

If replacing NestJS requires rewriting business rules,

the architecture has failed.

If replacing Drizzle requires changing domain logic,

the architecture has failed.

Frameworks are implementation details.

Business rules are the product.

---

# Part VI — Official Project Structure

---

# 19. Official Project Structure

## Purpose

Folder structures are not organizational preferences.

Folder structures communicate architecture.

A developer should understand the architecture of a project simply by reading the project tree.

---

# 20. Root Structure

Every backend project shall adopt the following root structure.

```text
project/

├── src/
├── test/
├── docs/
├── scripts/
├── drizzle/
├── .ai/
├── .github/

├── package.json
├── tsconfig.json
├── README.md
└── .env.example
```

---

# 21. Source Structure

```text
src/

├── presentation/
├── application/
├── domain/
├── infrastructure/
├── shared/
└── config/
```

These folders represent the official architecture.

No additional top-level folders should be introduced without architectural justification.

---

# 22. Presentation Structure

```text
presentation/

├── controllers/
├── guards/
├── filters/
├── pipes/
├── middlewares/
├── decorators/
└── swagger/
```

Purpose:

Receive requests.

Return responses.

Nothing else.

---

# 23. Application Structure

```text
application/

├── use-cases/
├── dto/
├── interfaces/
├── mappers/
├── services/
└── ports/
```

Purpose:

Coordinate execution.

Orchestrate business flows.

---

# 24. Domain Structure

```text
domain/

├── entities/
├── services/
├── policies/
├── value-objects/
├── enums/
├── interfaces/
└── exceptions/
```

Purpose:

Represent business knowledge.

---

# 25. Infrastructure Structure

```text
infrastructure/

├── database/
├── repositories/
├── providers/
├── auth/
├── ai/
├── cache/
├── logger/
├── storage/
└── config/
```

Purpose:

Implement technical concerns.

---

# 26. Shared Structure

```text
shared/

├── errors/
├── constants/
├── models/
├── types/
└── utils/
```

Use sparingly.

The shared folder should remain small.

A growing shared folder is often a sign of architectural degradation.

---

# 27. Config Structure

```text
config/

application.config.ts

database.config.ts

jwt.config.ts

swagger.config.ts

ai.config.ts

environment.config.ts
```

No business logic belongs here.

---

# Part VII — Layer Responsibility Matrix

---

# 28. Responsibility Matrix

| Concern        | Presentation | Application | Domain    | Infrastructure |
| -------------- | ------------ | ----------- | --------- | -------------- |
| HTTP           | ✓            | ✗           | ✗         | ✗              |
| Controllers    | ✓            | ✗           | ✗         | ✗              |
| DTOs           | ✓            | ✓           | ✗         | ✗              |
| Validation     | ✓            | ✓           | ✗         | ✗              |
| Authorization  | ✓            | ✓           | ✗         | ✗              |
| Use Cases      | ✗            | ✓           | ✗         | ✗              |
| Business Rules | ✗            | ✗           | ✓         | ✗              |
| Policies       | ✗            | ✗           | ✓         | ✗              |
| Value Objects  | ✗            | ✗           | ✓         | ✗              |
| Repositories   | ✗            | Interface   | Interface | ✓              |
| SQL            | ✗            | ✗           | ✗         | ✓              |
| Drizzle        | ✗            | ✗           | ✗         | ✓              |
| PostgreSQL     | ✗            | ✗           | ✗         | ✓              |
| AI Providers   | ✗            | ✗           | ✗         | ✓              |
| Logging        | ✗            | ✗           | ✗         | ✓              |
| Cache          | ✗            | ✗           | ✗         | ✓              |

---

# 29. Golden Rule

When unsure where code belongs:

Ask:

"Is this business knowledge?"

If yes:

Domain.

If no:

It probably belongs elsewhere.

---

# Part VIII — Design Patterns

---

# 30. Repository Pattern

## Purpose

Abstract persistence.

Repositories represent business persistence operations.

---

## Good Example

```text
ProjectRepository

findById()

create()

update()

delete()
```

---

## Forbidden

```text
GenericRepository<T>

BaseRepository

CrudRepository
```

Repositories should model the business.

Not generic database operations.

---

# 31. Use Case Pattern

## Purpose

Represent business actions.

Each use case represents a single intention.

Examples:

```text
CreateProjectUseCase

UpdateProjectUseCase

DeleteProjectUseCase

ChangeProjectStatusUseCase

GenerateProjectAnalysisUseCase
```

---

## Rule

One use case.

One responsibility.

---

# 32. Domain Service Pattern

Use Domain Services only when:

A business rule involves multiple entities.

Example:

```text
RiskCalculationService
```

---

Do not create Domain Services for CRUD operations.

---

# 33. Policy Pattern

Policies encapsulate business rules.

Example:

```text
ProjectStatusPolicy
```

---

Policies answer:

"Is this allowed?"

---

# 34. Value Object Pattern

Use when representing:

* Money
* Email
* Percentage
* Period
* Duration
* Currency

Characteristics:

* immutable
* equality by value
* no identity

---

# 35. Provider Pattern

Use for external systems.

Examples:

```text
GeminiProvider

OpenAiProvider

StorageProvider

EmailProvider
```

Providers belong to Infrastructure.

---

# 36. Mapper Pattern

Create mappers only when translating between different models.

Examples:

Entity

↓

DTO

Database

↓

Domain

AI Response

↓

Domain

Do not create mappers unnecessarily.

---

# Part IX — Module Design

---

# 37. Business Modules

Modules should represent business capabilities.

Examples:

```text
Project

User

Authentication

Notification

Audit
```

---

Not:

```text
Controllers

Services

Repositories
```

Business-first organization.

---

# 38. Module Cohesion

Everything related to a business capability should evolve together.

Avoid scattering responsibilities across unrelated modules.

---

# 39. Module Independence

Modules should communicate through contracts.

Direct coupling should be minimized.

---

# Part X — Decision Trees

---

# 40. Should I Create a New Class?

```text
New behavior?

↓

No

↓

Reuse existing code.

↓

Yes

↓

Existing responsibility?

↓

Yes

↓

Extend existing class.

↓

No

↓

Create new class.
```

---

# 41. Should I Create a Domain Service?

```text
Business rule?

↓

No

↓

Not Domain.

↓

Yes

↓

Uses multiple entities?

↓

No

↓

Entity method.

↓

Yes

↓

Domain Service.
```

---

# 42. Should I Create a Value Object?

```text
Represents a concept?

↓

No

↓

Primitive.

↓

Yes

↓

Immutable?

↓

No

↓

Entity.

↓

Yes

↓

Value Object.
```

---

# 43. Should I Create a Repository?

```text
Need persistence?

↓

No

↓

No Repository.

↓

Yes

↓

Repository.
```

---

# 44. Should I Create an Interface?

```text
More than one implementation?

↓

No

↓

Avoid interface.

↓

Yes

↓

Create interface.
```

---

# 45. Should I Create a Mapper?

```text
Different object models?

↓

No

↓

No Mapper.

↓

Yes

↓

Mapper.
```

---

# 46. Should I Create a New Folder?

```text
New responsibility?

↓

No

↓

Do not create folder.

↓

Yes

↓

Multiple files?

↓

No

↓

Keep existing structure.

↓

Yes

↓

Create folder.
```

---

# ADR-002 — Official Project Structure

## Status

Accepted

---

## Decision

All backend projects shall adopt the structure defined by this handbook.

---

## Motivation

* Consistency
* Predictability
* Faster onboarding
* Better code reviews
* Better AI code generation

---

## Consequences

Positive:

✓ Easier navigation

✓ Easier maintenance

✓ Faster onboarding

✓ Architectural consistency

Negative:

Requires discipline.

Requires periodic reviews.

---

# Part XI — Error Handling Standards

---

# 47. Error Handling Philosophy

Errors are expected.

Unexpected errors are not.

A well-designed application treats failures as first-class citizens.

Error handling must be:

* Predictable
* Consistent
* Observable
* Testable

---

# 48. Error Categories

All errors belong to one of the following categories.

## Validation Errors

Invalid user input.

Examples:

* Missing fields
* Invalid formats
* Invalid payloads

Response:

HTTP 400

---

## Authentication Errors

Identity could not be verified.

Examples:

* Missing token
* Invalid token
* Expired token

Response:

HTTP 401

---

## Authorization Errors

Identity is valid.

Permissions are not.

Response:

HTTP 403

---

## Business Rule Errors

A domain rule was violated.

Examples:

* Invalid status transition
* Project cannot be deleted
* Duplicate business operation

Response:

HTTP 409

---

## Not Found Errors

Requested resource does not exist.

Response:

HTTP 404

---

## Infrastructure Errors

Database.

Storage.

Network.

External API.

Response:

HTTP 503

---

## Unexpected Errors

Unhandled exceptions.

Response:

HTTP 500

---

# 49. RFC7807 Standard

All errors shall follow RFC7807.

Official format:

```json
{
  "type": "https://api.example.com/errors/business-rule",
  "title": "Business Rule Violation",
  "status": 409,
  "detail": "Project cannot be deleted while active.",
  "instance": "/projects/123"
}
```

---

# 50. Domain Exceptions

Business exceptions belong to Domain.

Examples:

```text
ProjectNotFoundException

ProjectDeletionNotAllowedException

InvalidProjectStatusTransitionException
```

---

# 51. Global Exception Filter

NestJS Global Exception Filters are mandatory.

Responsibilities:

* Standardize responses
* Log failures
* Apply RFC7807
* Hide internal details

---

# Part XII — API Standards

---

# 52. REST Principles

Every API shall follow REST principles.

Resources must be nouns.

Actions must be HTTP verbs.

---

# 53. Resource Naming

Good:

```text
/projects

/users

/notifications
```

Bad:

```text
/createProject

/getProjects

/deleteProject
```

---

# 54. HTTP Verbs

POST

Create

---

GET

Read

---

PATCH

Partial Update

---

PUT

Full Update

---

DELETE

Removal

---

# 55. Status Codes

200 OK

Successful operation.

---

201 Created

Resource created.

---

204 No Content

Successful operation with no body.

---

400 Bad Request

Validation failure.

---

401 Unauthorized

Authentication failure.

---

403 Forbidden

Authorization failure.

---

404 Not Found

Resource not found.

---

409 Conflict

Business rule violation.

---

500 Internal Server Error

Unexpected failure.

---

503 Service Unavailable

Infrastructure unavailable.

---

# 56. Pagination Standard

All collection endpoints should support pagination.

Preferred format:

```text
?page=1&limit=20
```

Optional:

```text
?offset=0&limit=20
```

---

# 57. Empty Collections

Empty collections are not errors.

Return:

```json
[]
```

HTTP 200.

Never return 404 for empty collections.

---

# 58. API Versioning

Versioning should be introduced only when necessary.

Preferred format:

```text
/api/v1/projects
```

---

# 59. Swagger Standard

Every endpoint must be documented.

Required:

* Summary
* Description
* Request DTO
* Response DTO
* Error Responses

---

# Part XIII — Database Standards

---

# 60. Database Philosophy

The database is part of the architecture.

Poor database design creates long-term technical debt.

---

# 61. Official Database

PostgreSQL

---

# 62. Naming Conventions

Tables:

snake_case

Examples:

```text
projects

users

project_status_history
```

Columns:

snake_case

Examples:

```text
project_id

created_at

updated_at
```

---

# 63. Primary Keys

Preferred:

UUID

Allowed:

BIGINT

Decision should be documented.

---

# 64. Audit Fields

Every business table should contain:

```text
created_at

updated_at
```

Optional:

```text
deleted_at
```

---

# 65. Indexes

Indexes are mandatory for:

* Foreign keys
* Search fields
* Frequently filtered columns

Indexes should be justified.

Do not create speculative indexes.

---

# 66. Migrations

Schema changes must occur through migrations.

Never modify production databases manually.

---

# 67. Transactions

Transactions belong to Application Layer orchestration.

Repositories should not control business transactions.

---

# Part XIV — Dependency Injection Standards

---

# 68. Dependency Injection Philosophy

Dependency Injection exists to reduce coupling.

Not to increase abstraction.

---

# 69. Constructor Injection

Official approach:

Constructor Injection.

Example:

```typescript
constructor(
    private readonly repository: ProjectRepository
) {}
```

---

# 70. Service Locator

Forbidden.

Dependencies must be explicit.

---

# 71. Interface Usage

Interfaces should only exist when:

* Multiple implementations exist
* Infrastructure replacement is expected
* Testing benefits are clear

Do not create interfaces automatically.

---

# 72. Lifetime Rules

Services should be stateless.

Avoid storing mutable state inside services.

---

# Part XV — Testing Standards

---

# 73. Testing Philosophy

Testing validates behavior.

Not implementation details.

---

# 74. Testing Pyramid

Priority:

1. Unit Tests
2. Integration Tests
3. End-to-End Tests

---

# 75. Unit Tests

Must be:

* Fast
* Isolated
* Deterministic

No database.

No network.

No external APIs.

---

# 76. Integration Tests

Validate:

* Repository behavior
* Infrastructure integrations
* Database interaction

---

# 77. End-to-End Tests

Validate:

* Controllers
* Validation
* Authentication
* Full request flow

---

# 78. Naming Convention

Preferred:

```text
should_create_project_when_valid_data_is_provided

should_reject_invalid_status_transition

should_return_404_when_project_does_not_exist
```

---

# 79. Test Structure

AAA Pattern

Arrange

Act

Assert

---

# 80. Coverage

Coverage is important.

Coverage alone does not indicate quality.

Behavior coverage is more important than percentage.

---

# ADR-003 — Testing Strategy

## Decision

Official testing stack:

* Vitest
* Supertest
* Faker

## Motivation

Fast.

Modern.

TypeScript-friendly.

Low configuration.

---

# Part XVI — Security Standards

---

# 81. Security Philosophy

Security is not a feature.

Security is a requirement.

Every system must be designed assuming:

* Requests are malicious until validated.
* External systems can fail.
* Credentials can leak.
* Attackers exist.

Security should be incorporated from the beginning.

Not added later.

---

# 82. Authentication

Official mechanism:

JWT

Requirements:

* Signed tokens
* Secret stored externally
* Expiration configured
* Validation centralized

Business rules must never validate JWT directly.

---

# 83. Authorization

Authentication identifies.

Authorization permits.

These concerns must remain separate.

---

# 84. Secret Management

Secrets must never exist in:

* Source code
* Repositories
* Documentation
* Test fixtures

Secrets belong only to:

Environment Variables

Secret Managers

Vault Systems

---

# 85. Input Validation

All external input must be validated.

Sources:

* HTTP
* Queue Messages
* File Uploads
* External APIs

Validation must occur at application boundaries.

---

# 86. SQL Injection Protection

Official rule:

Always use parameterized queries.

Never concatenate SQL strings manually.

Forbidden:

```sql
SELECT * FROM projects WHERE id = '${id}'
```

---

# 87. Sensitive Data

Sensitive information should never be logged.

Examples:

* Passwords
* JWT Tokens
* API Keys
* Credit Cards
* Personal Documents

---

# 88. Security Headers

Production applications should use:

* Helmet
* CORS
* CSP (when applicable)

---

# 89. Rate Limiting

Public APIs should support rate limiting.

Protect:

* Authentication endpoints
* AI endpoints
* Expensive operations

---

# 90. Dependency Security

Dependencies should be reviewed periodically.

Remove unused dependencies.

Monitor vulnerabilities.

---

# Part XVII — Observability Standards

---

# 91. Observability Philosophy

A system that cannot be observed cannot be maintained.

Production systems must provide visibility.

---

# 92. Observability Pillars

Three pillars:

* Logs
* Metrics
* Traces

---

# 93. Logging

Every application must provide structured logs.

Preferred format:

JSON

Required levels:

* Debug
* Information
* Warning
* Error
* Critical

---

# 94. Logging Rules

Logs should answer:

What happened?

When?

Where?

Why?

Impact?

---

# 95. Correlation ID

Every request should receive a Correlation ID.

The Correlation ID must travel across:

* Controllers
* Services
* Providers
* External APIs

---

# 96. Error Logging

Every unexpected failure must be logged.

Logs should contain:

* Timestamp
* Context
* Error Type
* Stack Trace
* Correlation ID

---

# 97. Health Checks

Every backend should expose:

```text
/health
```

Purpose:

Operational monitoring.

Not business validation.

---

# 98. Metrics

Metrics should be collected for:

* Request Count
* Error Rate
* Latency
* Throughput
* External Calls

---

# Part XVIII — Performance Standards

---

# 99. Performance Philosophy

Performance matters.

Premature optimization does not.

Measure before optimizing.

---

# 100. Performance Hierarchy

Priority:

Correctness

↓

Security

↓

Maintainability

↓

Performance

---

# 101. Pagination

Collection endpoints must support pagination.

Never return unbounded collections.

---

# 102. Database Queries

Avoid:

* N+1 Queries
* Full Table Scans
* Excessive Joins

Prefer:

* Explicit Queries
* Proper Indexes
* Query Analysis

---

# 103. Caching

Use caching only when justified.

Examples:

* Expensive Queries
* External APIs
* AI Responses

Caching introduces complexity.

Use responsibly.

---

# 104. Memory Usage

Avoid loading unnecessary data.

Process only what is needed.

---

# 105. Async Operations

Long-running operations should execute asynchronously when appropriate.

Examples:

* Email
* Notifications
* AI Analysis
* Reports

---

# Part XIX — Production Standards

---

# 106. Production Philosophy

Software is only complete when it can safely operate in production.

---

# 107. Environment Separation

Mandatory environments:

* Development
* Test
* Staging
* Production

Configurations must be isolated.

---

# 108. Configuration Management

Configuration must be externalized.

No hardcoded environment values.

---

# 109. Versioning

Applications should follow Semantic Versioning.

Format:

```text
MAJOR.MINOR.PATCH
```

Example:

```text
1.4.2
```

---

# 110. Deployment Readiness

Before deployment:

✓ Tests passing

✓ Lint passing

✓ Build passing

✓ Documentation updated

✓ Environment validated

---

# 111. Rollback Strategy

Every deployment should support rollback.

Deployment without rollback is incomplete.

---

# 112. Database Deployment

Database migrations must be:

* Versioned
* Reviewed
* Repeatable

---

# 113. Backups

Production databases require backup strategies.

Backups must be periodically tested.

---

# 114. Monitoring

Production applications should be monitored continuously.

Monitor:

* Availability
* Errors
* Latency
* Resource Usage

---

# Part XX — Anti-Patterns Catalog

---

# 115. Anti-Pattern Philosophy

Anti-patterns are common solutions that create long-term problems.

This handbook explicitly discourages them.

---

# 116. God Service

Symptoms:

* Hundreds of lines
* Multiple responsibilities
* Multiple repositories
* Multiple providers

Solution:

Split responsibilities.

---

# 117. Fat Controller

Controllers should orchestrate requests.

Controllers should not contain:

* Business Rules
* SQL
* Complex Logic

---

# 118. Generic Repository

Forbidden by default.

Examples:

```text
GenericRepository<T>

BaseRepository

CrudRepository
```

Repositories represent business persistence.

Not generic CRUD abstractions.

---

# 119. Helper Hell

Folders:

```text
helpers/

utils/

misc/

common/
```

often indicate architectural problems.

Always identify ownership first.

---

# 120. Anemic Domain

Entities containing only:

* getters
* setters

and no business behavior.

Business rules belong close to the business model.

---

# 121. Service Explosion

Creating dozens of tiny services that merely forward calls.

Symptoms:

CreateProjectService

UpdateProjectService

DeleteProjectService

ValidateProjectService

without meaningful business behavior.

---

# 122. Framework Leakage

NestJS code inside Domain.

Forbidden.

---

# 123. Infrastructure Leakage

Drizzle inside Domain.

Forbidden.

SQL inside Controllers.

Forbidden.

---

# 124. Circular Dependencies

Modules depending on each other.

Forbidden.

Circular dependencies are architecture failures.

---

# 125. Premature Abstraction

Creating abstractions before a second implementation exists.

Avoid speculative design.

---

# 126. Premature Optimization

Optimizing before measuring.

Always measure first.

---

# ADR-004 — Security & Production Standards

## Status

Accepted

---

## Decision

All backend applications must follow the Security, Observability, Performance and Production standards defined by this handbook.

---

## Motivation

Production quality must be predictable.

Operational excellence should be standardized.

---

## Consequences

Positive:

✓ Safer systems

✓ Easier maintenance

✓ Better monitoring

✓ Faster troubleshooting

Negative:

Requires discipline.

Requires continuous review.

---

# Part XXI — Refactoring Guidelines

---

# 127. Refactoring Philosophy

Refactoring is the process of improving internal structure without changing observable behavior.

Refactoring is not rewriting.

Refactoring is not feature development.

Refactoring is architecture maintenance.

---

# 128. Goals of Refactoring

Refactoring should improve:

* Readability
* Maintainability
* Testability
* Simplicity
* Cohesion
* Coupling

Refactoring should not introduce new business behavior.

---

# 129. Refactoring Triggers

Refactoring should be considered when:

* Methods exceed reasonable size
* Classes accumulate responsibilities
* Duplication appears repeatedly
* Dependencies become difficult to understand
* Tests become difficult to write
* Architectural rules are violated

---

# 130. Safe Refactoring Process

Recommended sequence:

1. Understand behavior
2. Add tests
3. Refactor incrementally
4. Run tests
5. Validate behavior
6. Commit frequently

---

# 131. Refactoring Priorities

Priority order:

1. Business critical modules
2. Frequently modified modules
3. High defect modules
4. Legacy modules

Avoid refactoring stable modules without clear value.

---

# 132. Technical Debt

Technical debt should be documented.

Every identified debt should include:

* Description
* Impact
* Risk
* Proposed solution

Technical debt should be intentional.

Not accidental.

---

# Part XXII — Architecture Evolution

---

# 133. Architecture Philosophy

Architecture is not static.

Architecture evolves.

However, evolution must be intentional.

Uncontrolled evolution becomes architecture erosion.

---

# 134. Architecture Erosion

Common symptoms:

* Layer violations
* Circular dependencies
* Growing shared folders
* Business rules in controllers
* Framework leakage
* Generic abstractions

These symptoms must be addressed early.

---

# 135. Architecture Reviews

Projects should perform periodic architecture reviews.

Recommended frequency:

Quarterly

or

At major releases.

---

# 136. Architectural Changes

Significant architectural changes require an ADR.

Examples:

* New persistence strategy
* New messaging system
* New authentication mechanism
* New architectural style
* New deployment model

---

# 137. Backwards Compatibility

Breaking changes should be avoided whenever possible.

When unavoidable:

* Document
* Version
* Communicate

---

# 138. Architectural Fitness Functions

Architecture should be validated continuously.

Examples:

* Dependency rules
* Folder structure validation
* Naming conventions
* Forbidden dependency detection

Whenever possible automate these checks.

---

# Part XXIII — Engineering Governance

---

# 139. Governance Purpose

Governance ensures architectural consistency across time.

Governance is not bureaucracy.

Governance protects maintainability.

---

# 140. Engineering Ownership

Every system must have:

* Technical ownership
* Architectural ownership

Ownership prevents architectural drift.

---

# 141. Decision Documentation

Important decisions must be documented.

Preferred mechanism:

Architecture Decision Records (ADRs)

---

# 142. Code Reviews

All code should be reviewed.

Reviews should focus on:

* Correctness
* Simplicity
* Maintainability
* Architecture

Not personal preferences.

---

# 143. Engineering Standards

This handbook represents the official engineering standard.

Exceptions require justification.

---

# 144. Continuous Improvement

Engineering standards should evolve.

Suggested review frequency:

Every 6 months.

---

# Part XXIV — Engineering Checklists

---

# 145. Pre-Development Checklist

Before implementation:

□ Requirement understood

□ Business rules identified

□ Existing solution evaluated

□ Architecture impact evaluated

□ Dependencies evaluated

□ Simpler alternatives considered

---

# 146. Development Checklist

During implementation:

□ Layer responsibilities respected

□ Naming conventions respected

□ Dependency direction respected

□ Validation implemented

□ Error handling implemented

□ Logging implemented

□ Tests implemented

---

# 147. Pull Request Checklist

Before opening a PR:

□ Build passing

□ Tests passing

□ Lint passing

□ Documentation updated

□ No dead code

□ No commented code

□ No TODOs

□ No forbidden dependencies

---

# 148. Release Checklist

Before deployment:

□ Version updated

□ Changelog updated

□ Migrations reviewed

□ Rollback strategy validated

□ Monitoring configured

□ Secrets validated

---

# 149. Production Checklist

Before production:

□ Security reviewed

□ Performance reviewed

□ Logging reviewed

□ Health checks available

□ Alerts configured

□ Documentation available

---

# Part XXV — AI Integration Standards

---

# 150. AI Philosophy

Artificial Intelligence is a supporting capability.

Business rules remain deterministic.

AI should assist decisions.

Not own decisions.

---

# 151. AI Isolation

AI integrations must remain isolated.

Recommended structure:

```text id="zqmx4u"
infrastructure/

ai/

providers/

prompts/
```

---

# 152. AI Provider Independence

Business logic must never depend on:

* Gemini
* OpenAI
* Claude
* Azure OpenAI

Depend on contracts.

Not vendors.

---

# 153. Prompt Ownership

Prompts should be versioned.

Prompts are application assets.

Treat them like source code.

---

# 154. Structured Outputs

Whenever supported:

Use structured outputs.

Prefer:

JSON

Over:

Free-form text.

---

# 155. AI Error Handling

AI failures should not compromise application stability.

Implement:

* Timeouts
* Retries
* Fallbacks
* Logging

---

# 156. AI Cost Awareness

AI calls have cost.

Avoid unnecessary requests.

Cache when appropriate.

---

# Part XXVI — Appendix

---

# 157. Engineering Principles Summary

Always prefer:

✓ Simplicity

✓ Explicitness

✓ Readability

✓ Testability

✓ Maintainability

✓ Consistency

✓ Security

✓ Observability

---

# 158. Architecture Principles Summary

Always:

✓ Respect layers

✓ Respect dependency direction

✓ Keep business rules inside Domain

✓ Keep Infrastructure replaceable

✓ Keep Controllers thin

✓ Keep Use Cases focused

✓ Keep Repositories persistence-only

---

# 159. Forbidden Practices Summary

Never:

✗ Business logic in Controllers

✗ SQL in Controllers

✗ Frameworks inside Domain

✗ Generic Repositories

✗ God Services

✗ Circular Dependencies

✗ Helper Hell

✗ Premature Optimization

✗ Premature Abstraction

✗ Uncontrolled Shared Folders

---

# 160. Definition of Done

A feature is complete only when:

* Requirements are implemented
* Architecture remains consistent
* Tests pass
* Documentation is updated
* Security requirements are met
* Observability requirements are met
* Production standards are satisfied

Software is not complete when code is written.

Software is complete when it is maintainable, observable, secure and ready for production.

---

# Closing Statement

This handbook defines the official engineering standards for backend development.

Its purpose is to ensure that software remains:

* Understandable
* Maintainable
* Testable
* Scalable
* Reliable

Technology will evolve.

Frameworks will change.

Languages will change.

Infrastructure will change.

Good engineering principles endure.

---

# End of Backend Engineering Handbook

Version: 1.0.0

Status: Approved

Document Type: Engineering Standard
