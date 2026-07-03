# ADR-004 — Validation Strategy

> Architecture Decision Record

---

| Property        | Value                                    |
| --------------- | ---------------------------------------- |
| ADR             | 004                                      |
| Title           | Validation Strategy                      |
| Status          | Accepted                                 |
| Date            | 2026-07-02                               |
| Decision Makers | ProjectValidatorSystem Architecture Team |
| Supersedes      | None                                     |
| Superseded By   | None                                     |

---

# Context

The Project Validator System requires a validation strategy capable of providing:

* Single source of truth
* Strong typing
* Runtime validation
* Reduced duplication
* Predictable behavior
* Excellent TypeScript integration
* Easy maintenance

The project contains multiple layers where validation could potentially occur:

* Database
* DTOs
* Controllers
* Services
* Domain

Without a clear strategy, validation logic tends to become duplicated and inconsistent.

---

# Problem Statement

Many backend applications suffer from:

* Validation duplication
* DTO drift
* Schema inconsistencies
* Divergent business rules
* Multiple validation frameworks

Examples:

```text id="adr004a"
Database Schema

↓

DTO Validation

↓

Service Validation

↓

Business Validation
```

Each layer becomes responsible for validating the same information.

This increases:

* Maintenance cost
* Defect probability
* Cognitive load

---

# Decision

The Project Validator System shall adopt:

```text id="adr004b"
Database-Driven Validation
```

using:

```text id="adr004c"
Drizzle ORM

↓

drizzle-zod

↓

Zod

↓

Global ZodValidationPipe
```

The database schema becomes the primary source of truth.

---

# Validation Philosophy

Validation must occur:

```text id="adr004d"
At system boundaries.
```

The system should reject invalid requests before business execution begins.

Validation should be:

* Centralized
* Predictable
* Reusable
* Explicit

---

# Official Validation Flow

```text id="adr004e"
Drizzle Schema

↓

drizzle-zod

↓

Zod Schema

↓

Global ZodValidationPipe

↓

Use Case

↓

Domain
```

---

# Responsibilities

---

## Database Schema

Owns:

✓ Field structure

✓ Field types

✓ Required fields

✓ Database constraints

---

Examples:

```text id="adr004f"
nome

orcamentoTotal

dataDeInicio

previsaoDeTermino
```

---

## drizzle-zod

Owns:

✓ Schema generation

✓ Validation synchronization

✓ Type consistency

---

Purpose:

Prevent duplication between:

```text id="adr004g"
Database

DTO Validation
```

---

## Zod

Owns:

✓ Runtime validation

✓ Request validation

✓ Input verification

---

Examples:

```text id="adr004h"
String validation

Date validation

Numeric validation

Enum validation
```

---

## Global ZodValidationPipe

Owns:

✓ Request interception

✓ Validation execution

✓ Validation error generation

---

Purpose:

Reject malformed requests before reaching business logic.

---

# Validation Layers

---

## Layer 1 — Structural Validation

Validates:

* Missing fields
* Invalid types
* Invalid formats

Examples:

```text id="adr004i"
Missing nome

Invalid date

Negative budget
```

---

## Layer 2 — Business Validation

Validates:

* Business rules
* Domain constraints
* Lifecycle restrictions

Examples:

```text id="adr004j"
Invalid status transition

Deletion restriction

Risk calculation rules
```

---

# Important Distinction

Structural validation:

```text id="adr004k"
Zod
```

Business validation:

```text id="adr004l"
Domain
```

These responsibilities must never be mixed.

---

# Decision 1 — Zod

---

## Selected

```text id="adr004m"
Zod
```

---

## Why

Benefits:

✓ TypeScript-first

✓ Runtime validation

✓ Excellent developer experience

✓ Excellent NestJS integration

✓ Strong typing

✓ Modern ecosystem

---

# Rejected Alternative — class-validator

---

## Rejected

```text id="adr004n"
class-validator
```

---

## Reason

Introduces:

* Decorator-heavy design
* Validation duplication
* Additional maintenance effort

Not aligned with project goals.

---

# Rejected Alternative — Joi

---

## Rejected

```text id="adr004o"
Joi
```

---

## Reason

Strong validation framework.

However:

* Inferior TypeScript integration
* Separate schema ownership

---

# Rejected Alternative — Yup

---

## Rejected

```text id="adr004p"
Yup
```

---

## Reason

Less suitable for backend-first validation.

---

# Decision 2 — Single Source of Truth

---

## Selected

```text id="adr004q"
Database Schema
```

---

# Why

Benefits:

✓ No duplicated field definitions

✓ Better consistency

✓ Easier maintenance

✓ Reduced drift

---

# Example

Avoid:

```text id="adr004r"
Database Schema

↓

DTO Definition

↓

Validation Schema
```

maintained separately.

---

Prefer:

```text id="adr004s"
Database Schema

↓

Generated Validation Schema
```

---

# Decision 3 — Global Validation Pipe

---

## Selected

```text id="adr004t"
Global ZodValidationPipe
```

---

# Why

Benefits:

✓ Centralized validation

✓ Consistent behavior

✓ Less boilerplate

✓ Better maintainability

---

# Validation Execution Point

Validation should happen:

```text id="adr004u"
Before Controller Execution
```

---

# Result

Controllers receive only validated data.

---

# DTO Strategy

---

## DTO Purpose

DTOs represent API contracts.

DTOs do not own validation logic.

---

## DTO Responsibilities

✓ Request shape

✓ Response shape

✓ Documentation support

---

DTOs should not duplicate:

```text id="adr004v"
Validation Rules
```

already defined elsewhere.

---

# Error Handling

---

# Validation Failures

Validation errors should produce:

```text id="adr004w"
400 Bad Request
```

---

# Error Format

Official standard:

```text id="adr004x"
RFC7807
```

---

# Example

```json id="adr004y"
{
  "type": "validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "orcamentoTotal must be greater than zero."
}
```

---

# Domain Validation

---

# Ownership

Business rules belong to:

```text id="adr004z"
Domain Layer
```

---

# Examples

Not Zod responsibilities:

```text id="adr004aa"
Status transitions

Deletion restrictions

Risk calculation
```

---

These belong to:

```text id="adr004ab"
ProjectStatusPolicy

RiskCalculationService

DeleteProjectUseCase
```

---

# Validation Examples

---

## Structural Validation

Allowed:

```text id="adr004ac"
nome required

nome string

budget positive

valid dates
```

---

## Business Validation

Allowed:

```text id="adr004ad"
Can project be deleted?

Can project move to status X?

What is the project risk?
```

---

# Consequences

Positive:

✓ Single source of truth

✓ Reduced duplication

✓ Easier maintenance

✓ Better type safety

✓ Better developer experience

✓ Better AI-generated code consistency

---

Negative:

✓ Additional dependency on drizzle-zod

✓ Slight learning curve

These trade-offs are acceptable.

---

# Compliance Rules

Every endpoint must:

✓ Use Zod validation

✓ Use generated schemas

✓ Use Global Validation Pipe

✓ Follow RFC7807

---

The following are forbidden:

```text id="adr004ae"
class-validator

Joi

Yup

Manual validation duplication

Validation inside Controllers
```

---

# Final Decision

The official validation strategy of Project Validator System is:

```text id="adr004af"
Drizzle Schema

↓

drizzle-zod

↓

Zod

↓

Global ZodValidationPipe
```

with business validation remaining exclusively inside the Domain Layer.

This decision is accepted and becomes part of the architectural baseline.

---

# References

* ADR-001 Official Architecture
* ADR-002 Technology Stack
* ADR-003 Persistence Strategy
* Project Specification
* Project API Standards

---

# End of ADR-004

Status: Accepted

Decision: Validation Strategy Established
