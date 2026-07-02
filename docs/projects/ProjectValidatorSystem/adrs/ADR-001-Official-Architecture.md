# ADR-001 — Official Architecture

> Architecture Decision Record

---

| Property        | Value                                    |
| --------------- | ---------------------------------------- |
| ADR             | 001                                      |
| Title           | Official Architecture                    |
| Status          | Accepted                                 |
| Date            | 2026-07-02                               |
| Decision Makers | ProjectValidatorSystem Architecture Team |
| Supersedes      | None                                     |
| Superseded By   | None                                     |

---

# Context

The Project Validator System requires a backend architecture that satisfies the following requirements:

* Maintainability
* Simplicity
* Testability
* Clear separation of responsibilities
* Long-term evolution
* Support for AI-assisted development
* Support for automated testing
* Support for infrastructure replacement

Several architectural styles were considered:

* Traditional Layered Architecture
* Clean Architecture
* Onion Architecture
* Hexagonal Architecture
* Domain Driven Design (DDD)
* Vertical Slice Architecture
* CQRS

Each approach provides benefits.

However, combining multiple architectures without clear boundaries frequently results in:

* Responsibility confusion
* Excessive abstraction
* Layer leakage
* Maintenance difficulties
* Increased cognitive load

The project intentionally prioritizes:

```text id="adr001a"
Simplicity over purity.
```

---

# Decision

The Project Validator System shall adopt:

```text id="adr001b"
Pragmatic Layered Clean Architecture
```

This architecture combines:

* Layered Architecture
* Selected Clean Architecture principles
* Selected Onion Architecture principles
* Lightweight DDD concepts

while intentionally avoiding excessive complexity.

---

# Architecture Overview

Official dependency flow:

```text id="adr001c"
Presentation

↓

Application

↓

Domain

↑

Infrastructure
```

---

# Layer Definitions

---

## Presentation Layer

Responsibilities:

* Controllers
* HTTP Requests
* HTTP Responses
* Authentication Guards
* Swagger

Examples:

```text id="adr001d"
ProjectsController

AuthGuard

HealthController
```

---

Presentation must never contain:

✗ Business Rules

✗ SQL

✗ AI Calls

✗ Risk Calculation

---

## Application Layer

Responsibilities:

* Use Cases
* Orchestration
* Transactions
* DTO Mapping

Examples:

```text id="adr001e"
CreateProjectUseCase

UpdateProjectUseCase

DeleteProjectUseCase

GenerateProjectAnalysisUseCase
```

---

Application must never contain:

✗ SQL

✗ HTTP Concerns

✗ Framework-Specific Logic

---

## Domain Layer

Responsibilities:

* Entities
* Domain Services
* Policies
* Business Rules
* Value Objects
* Domain Exceptions

Examples:

```text id="adr001f"
Projeto

RiskCalculationService

ProjectStatusPolicy
```

---

Domain is the heart of the application.

Domain must never depend on:

✗ NestJS

✗ Drizzle

✗ PostgreSQL

✗ Gemini

✗ HTTP

---

## Infrastructure Layer

Responsibilities:

* Database
* Drizzle ORM
* Supabase
* AI Providers
* External Services
* Logging

Examples:

```text id="adr001g"
ProjectRepository

DrizzleDatabaseModule

GeminiClient
```

---

Infrastructure may depend on:

✓ External Vendors

✓ Frameworks

✓ SDKs

---

# Folder Structure Decision

Official structure:

```text id="adr001h"
src/

presentation/
├── controllers/
├── dto/
├── guards/

application/
├── use-cases/
├── contracts/

domain/
├── entities/
├── services/
├── policies/
├── exceptions/

infrastructure/
├── database/
├── repositories/
├── ai/
├── providers/

shared/
├── constants/
├── utils/

config/
```

---

# Why This Structure Was Chosen

Benefits:

✓ Easy to understand

✓ Easy onboarding

✓ Explicit responsibilities

✓ Good testability

✓ Good maintainability

✓ Supports future growth

✓ Compatible with NestJS

✓ Compatible with AI-generated code

---

# Architectural Decisions

---

## Decision A

Controllers remain thin.

Controllers only:

* Receive requests
* Call Use Cases
* Return responses

---

## Decision B

Business Rules belong to Domain.

Never:

```text id="adr001i"
Controller

Repository

Infrastructure
```

---

## Decision C

Repositories are persistence only.

Repositories:

✓ Read

✓ Write

✓ Query

Repositories:

✗ Calculate Risk

✗ Validate Status

✗ Call AI

---

## Decision D

Use Cases orchestrate execution.

Use Cases are application workflows.

---

## Decision E

AI Integration is Infrastructure.

Gemini is not part of the Domain.

Future providers must be replaceable.

---

# Explicitly Rejected Alternatives

---

## Alternative 1

Pure Clean Architecture

Rejected because:

* Excessive abstractions
* Excessive interfaces
* Increased complexity

Not justified for project size.

---

## Alternative 2

Pure Onion Architecture

Rejected because:

* Similar benefits already achieved
* Additional complexity unnecessary

---

## Alternative 3

Pure Hexagonal Architecture

Rejected because:

* Additional ports/adapters complexity
* Limited practical benefit for current scope

---

## Alternative 4

CQRS

Rejected because:

* Read complexity does not justify separation
* Project size does not require it
* Increased cognitive load

---

## Alternative 5

Vertical Slice Architecture

Rejected because:

* Domain is small
* Benefits do not outweigh organizational cost

---

# Architectural Principles

The architecture must prioritize:

1. Maintainability
2. Simplicity
3. Testability
4. Readability
5. Evolvability

---

# Forbidden Practices

Never introduce:

```text id="adr001j"
GenericRepository

BaseRepository

CrudRepository

GodService

FatController

Circular Dependency

Framework Leakage

Infrastructure Leakage
```

---

# Consequences

Positive:

✓ Clear architecture

✓ Predictable structure

✓ Easier onboarding

✓ Easier testing

✓ Easier AI-assisted development

✓ Lower maintenance cost

---

Negative:

✓ Slightly more files than a simple MVC solution

✓ Additional discipline required to preserve boundaries

These trade-offs are acceptable.

---

# Compliance Rules

All new code must comply with this ADR.

Any architectural change affecting:

* Layers
* Dependency Direction
* Folder Structure
* Architectural Style

requires creation of a new ADR.

---

# Final Decision

The official architecture of Project Validator System is:

```text id="adr001k"
Pragmatic Layered Clean Architecture
```

This decision is accepted and becomes the architectural baseline of the project.

---

# References

* ADRs capture architectural decisions, rationale and consequences.
* ADRs should document context, decision and consequences.

---

# End of ADR-001

Status: Accepted

Decision: Official Architecture Established
