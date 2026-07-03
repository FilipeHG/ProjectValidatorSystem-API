# Project Validator System Context

> AI Quick Context Reference

---

| Property     | Value                                                        |
| ------------ | ------------------------------------------------------------ |
| Project Name | Project Validator System                                     |
| Alias        | ProjectValidatorSystem                                       |
| Version      | 1.0.0                                                        |
| Status       | Approved                                                     |
| Type         | Project Context                                              |
| Audience     | AI Coding Agents, Software Engineers and Software Architects |

---

# Purpose

This document provides a concise summary of the Project Validator System.

Its purpose is to allow AI Coding Agents and developers to quickly understand the project before consulting the complete specification.

This document is not a replacement for the Project Specification.

It is a high-level context document.

---

# Project Overview

## Name

Project Validator System

---

## Alias

ProjectValidatorSystem

---

## Description

Backend API for simplified project management.

The system allows users to:

* Create projects
* Update projects
* List projects
* Remove projects
* Manage project status transitions
* Automatically calculate project risk
* Generate AI-powered project analysis

---

# Business Objective

Provide a simple and maintainable project management API while demonstrating:

* Backend architecture
* Business rule implementation
* Automated risk assessment
* Artificial Intelligence integration
* Production-grade engineering practices

---

# Primary Technology Stack

## Runtime

Node.js

---

## Language

TypeScript

---

## Framework

NestJS

---

## Database

PostgreSQL

Supabase

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

## Testing

Vitest

Supertest

Faker

---

## AI Provider

Google Gemini 1.5 Flash

SDK:

```text id="h8vlmb"
@google/generative-ai
```

---

# Official Architecture

The project follows:

```text id="zq7bdn"
Pragmatic Layered Clean Architecture
```

Inspired by:

* Clean Architecture
* Onion Architecture
* Hexagonal Architecture
* DDD

---

# Architectural Layers

```text id="mwf66j"
Presentation

↓

Application

↓

Domain

↑

Infrastructure
```

---

# Folder Strategy

Official organization:

```text id="bpkdwq"
src/

presentation/

application/

domain/

infrastructure/

shared/

config/
```

No alternative structure should be introduced without an ADR.

---

# Main Business Entity

## Projeto

The system revolves around a single primary entity:

Projeto

---

## Required Fields

```text id="m6y4j6"
id

nome

dataDeInicio

previsaoDeTermino

orcamentoTotal

descricao

status

riscoCalculado

dtCriacao

dtAtualizacao
```

---

# Project Lifecycle

Allowed statuses:

```text id="i1bg95"
Em análise

Aprovado

Em andamento

Encerrado

Cancelado
```

---

## Initial Status

Every project starts as:

```text id="2e6hyq"
Em análise
```

---

## Allowed Transitions

```text id="ebif2s"
Em análise

↓

Aprovado

↓

Em andamento

↓

Encerrado
```

---

Cancellation is allowed from any status.

```text id="m5h6e5"
Any Status

↓

Cancelado
```

---

## Forbidden Transitions

Examples:

```text id="ub0n8q"
Em análise

↓

Em andamento
```

---

```text id="42j1h0"
Aprovado

↓

Encerrado
```

---

Status validation is mandatory.

---

# Deletion Rules

Projects cannot be deleted when status is:

```text id="sm4b3r"
Em andamento

Encerrado
```

Attempting deletion must return a business rule violation.

---

# Risk Calculation

Risk is calculated automatically.

Risk must be recalculated whenever:

* Project is created
* Budget changes
* Start date changes
* End date changes

---

# Risk Levels

## Baixo

Budget:

≤ 100.000

AND

Duration:

≤ 3 months

---

## Médio

Budget:

100.001 - 500.000

OR

Duration:

> 3 months and ≤ 6 months

---

## Alto

Budget:

> 500.000

OR

Duration:

> 6 months

---

# Risk Resolution Rule

When multiple rules match:

The highest risk always wins.

---

# Required Endpoints

```text id="a6dnx5"
POST   /projects

GET    /projects

GET    /projects/:id

PATCH  /projects/:id

DELETE /projects/:id

PATCH  /projects/:id/status

GET    /projects/:id/ai-analysis
```

---

# Pagination

Collection endpoints must support:

```text id="0yb4rb"
?page=1&limit=20
```

Optional:

```text id="kkntca"
?offset=0&limit=20
```

---

# Authentication Strategy

Official mechanism:

JWT

---

## Token Characteristics

Single static token.

Long-term expiration.

Project payload includes:

```json id="1qhj87"
{
  "project": "ProjectValidatorSystem",
  "user": "FilipeHG",
  "email": "filipeh.goncalves@gmail.com"
}
```

---

# Validation Strategy

Official validation stack:

```text id="d4b1ml"
Drizzle Schema

↓

drizzle-zod

↓

Zod Schema

↓

Global ZodValidationPipe

↓

Use Cases
```

---

# Error Handling Strategy

Official standard:

RFC7807

---

## Error Categories

* Validation Errors
* Authentication Errors
* Authorization Errors
* Business Rule Violations
* Not Found Errors
* Infrastructure Errors
* Unexpected Errors

---

# AI Analysis Feature

The project contains a dedicated AI analysis endpoint.

```text id="jlwmfe"
GET /projects/:id/ai-analysis
```

---

# AI Objective

Generate:

* Project Summary
* Attention Points
* Executive Recommendation

---

# AI Architecture

Required structure:

```text id="8m7j0e"
AiAnalysisService

↓

ProjectAnalysisPromptBuilder

↓

AiClient

↓

Google Gemini
```

---

## Rules

AI calls must never occur inside:

* Controllers
* Entities
* Domain Services

AI belongs to Infrastructure.

---

# Testing Strategy

Official stack:

```text id="zv1ww0"
Vitest

Supertest

Faker
```

---

## Unit Tests

Must validate:

* Risk calculation
* Status transitions
* Business rules

No external dependencies.

---

## Integration Tests

Must validate:

* Repository behavior
* Database interaction

---

## E2E Tests

Must validate:

* Controllers
* Validation
* Authentication
* Full request flow

---

# Environment Variables

Minimum required variables:

```text id="b6s8dc"
DATABASE_URL

JWT_SECRET

JWT_ISSUER

JWT_AUDIENCE

GEMINI_API_KEY
```

---

# Non-Functional Requirements

The system must be:

* Maintainable
* Testable
* Secure
* Observable
* Production Ready

---

# Explicitly Forbidden

Never introduce:

```text id="w57tdh"
GenericRepository

BaseRepository

CrudRepository

GodService

FatController

Circular Dependencies

Framework Leakage

Infrastructure Leakage
```

---

# Success Criteria

The project is considered successful when:

* Business rules are implemented correctly
* Architecture remains consistent
* Tests pass
* Documentation is complete
* AI integration functions correctly
* Production standards are satisfied

---

# References

Read in the following order:

1. Engineering Rules
2. Backend Engineering Handbook
3. Project Specification
4. ADRs
5. API Standards
6. Database Standards
7. Testing Standards

---

# End of Project Validator System Context

Version: 1.0.0

Status: Approved

Document Type: Project Context
