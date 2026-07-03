# Project Validator System Specification

> Functional and Business Specification

---

| Property     | Value                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| Project Name | Project Validator System                                                     |
| Alias        | ProjectValidatorSystem                                                       |
| Version      | 1.0.0                                                                        |
| Status       | Approved                                                                     |
| Type         | Project Specification                                                        |
| Audience     | Software Engineers, Software Architects, Product Owners and AI Coding Agents |

---

# Purpose

This document defines the complete functional specification of the Project Validator System.

This specification describes:

* What the system must do
* Business rules
* Functional requirements
* Non-functional requirements
* Acceptance criteria

This document does not define architecture.

Architecture decisions belong to:

* Backend Engineering Handbook
* ADRs

---

# Part I — Project Overview

---

# 1. Project Name

Project Validator System

---

# 2. Alias

ProjectValidatorSystem

---

# 3. Project Description

Project Validator System is a backend application designed to provide simplified project management capabilities.

The application allows organizations to manage projects throughout their lifecycle while automatically evaluating project risk and generating AI-powered project insights.

---

# 4. Primary Goals

The system shall allow users to:

* Create projects
* Update projects
* Retrieve projects
* Delete projects
* Manage project status transitions
* Calculate project risk automatically
* Generate AI-assisted project analysis

---

# 5. Expected Users

The system is intended for:

* Project Managers
* Business Analysts
* Executives
* Technical Teams
* Internal Systems

---

# 6. Project Scope

The scope of this project includes:

✓ Project Management

✓ Risk Classification

✓ Project Lifecycle Management

✓ Artificial Intelligence Analysis

✓ REST API

✓ Authentication

✓ Validation

✓ Documentation

---

# 7. Out of Scope

The following capabilities are intentionally excluded:

✗ User Management

✗ Multi-tenancy

✗ Workflow Automation

✗ File Attachments

✗ Notifications

✗ Audit Dashboard

✗ Reporting Engine

These features may be considered in future versions.

---

# Part II — Business Context

---

# 8. Business Problem

Organizations frequently manage projects without a standardized method for:

* Risk evaluation
* Lifecycle control
* Executive analysis

As a result:

* Risks are identified too late
* Status transitions become inconsistent
* Decision-making becomes difficult

---

# 9. Business Objective

Provide a centralized mechanism for:

* Project registration
* Project tracking
* Risk assessment
* Executive-level project analysis

---

# 10. Business Value

Expected benefits:

* Better visibility
* Standardized project lifecycle
* Faster decision-making
* Consistent risk classification
* Reduced manual analysis effort

---

# 11. Core Concepts

The system revolves around the following concepts:

## Projeto

Represents a business initiative.

---

## Status

Represents the lifecycle stage of a project.

---

## Risk

Represents the calculated project risk level.

---

## Analysis

Represents an AI-generated evaluation of a project.

---

# 12. Business Terminology

| Term      | Meaning                         |
| --------- | ------------------------------- |
| Projeto   | Managed project                 |
| Status    | Current project lifecycle stage |
| Risco     | Calculated risk level           |
| Análise   | AI-generated assessment         |
| Orçamento | Total project budget            |
| Prazo     | Project duration                |

---

# Part III — Functional Requirements

---

# 13. Project Creation

## Requirement ID

FR-001

---

## Description

The system shall allow creation of projects.

---

## Input Data

Required:

* nome
* dataDeInicio
* previsaoDeTermino
* orcamentoTotal
* descricao

---

## System Behavior

Upon creation:

* Generate identifier
* Calculate risk
* Set status to "Em análise"
* Set dtCriacao
* Set dtAtualizacao

---

## Expected Result

Project created successfully.

---

# 14. Project Listing

## Requirement ID

FR-002

---

## Description

The system shall allow project listing.

---

## Pagination

Supported:

```text
?page=1&limit=20
```

Optional:

```text
?offset=0&limit=20
```

---

## Expected Result

Return collection of projects.

---

# 15. Project Retrieval

## Requirement ID

FR-003

---

## Description

The system shall allow retrieval of a project by identifier.

---

## Expected Result

Return requested project.

---

## Error Condition

Return Not Found when identifier does not exist.

---

# 16. Project Update

## Requirement ID

FR-004

---

## Description

The system shall allow partial project updates.

---

## System Behavior

If any of the following change:

* orcamentoTotal
* dataDeInicio
* previsaoDeTermino

The system shall recalculate risk.

---

## Additional Behavior

Update dtAtualizacao.

---

# 17. Project Deletion

## Requirement ID

FR-005

---

## Description

The system shall allow project deletion.

---

## Restriction

Projects with status:

* Em andamento
* Encerrado

cannot be deleted.

---

## Expected Result

Deletion succeeds only when business rules allow it.

---

# 18. Status Change

## Requirement ID

FR-006

---

## Description

The system shall allow status transitions.

---

## Expected Result

Status changes only when transition rules are satisfied.

---

# 19. AI Analysis

## Requirement ID

FR-007

---

## Description

The system shall provide AI-powered project analysis.

---

## Endpoint

```text
GET /projects/:id/ai-analysis
```

---

## Expected Output

* resumoDoProjeto
* pontosDeAtencao
* recomendacaoExecutiva

---

## Provider

Google Gemini

---

# Part IV — Non-Functional Requirements

---

# 20. Availability

## Requirement ID

NFR-001

The system should remain available during normal operational conditions.

---

# 21. Maintainability

## Requirement ID

NFR-002

The system shall follow the official engineering standards.

---

# 22. Testability

## Requirement ID

NFR-003

Business rules must be independently testable.

---

# 23. Security

## Requirement ID

NFR-004

All endpoints must require authentication.

---

# 24. Performance

## Requirement ID

NFR-005

Collection endpoints must support pagination.

---

# 25. Observability

## Requirement ID

NFR-006

The system shall provide:

* Logging
* Error Tracking
* Health Checks

---

# 26. Scalability

## Requirement ID

NFR-007

The architecture shall support future growth without requiring rewrites.

---

# 27. Documentation

## Requirement ID

NFR-008

The API must be fully documented using Swagger/OpenAPI.

---

# 28. Reliability

## Requirement ID

NFR-009

Unexpected failures must be handled gracefully.

---

# 29. Artificial Intelligence Reliability

## Requirement ID

NFR-010

Failures in AI providers must not compromise application stability.

---

# Part V — Domain Model

---

# 30. Domain Overview

The Project Validator System revolves around a single primary business entity:

```text id="wxmf7f"
Projeto
```

All business operations are performed against this entity.

---

# 31. Aggregate Root

## Aggregate

Projeto

---

## Aggregate Root

Projeto

---

## Rationale

The project lifecycle, risk classification and AI analysis are all owned by the Projeto aggregate.

No additional aggregates are required for the initial version of the system.

---

# 32. Main Entity — Projeto

## Description

Represents a business project managed by the organization.

---

## Required Fields

| Field             | Type     | Required |
| ----------------- | -------- | -------- |
| id                | UUID     | Yes      |
| nome              | String   | Yes      |
| dataDeInicio      | Date     | Yes      |
| previsaoDeTermino | Date     | Yes      |
| orcamentoTotal    | Decimal  | Yes      |
| descricao         | String   | Yes      |
| status            | String   | Yes      |
| riscoCalculado    | String   | Yes      |
| dtCriacao         | DateTime | Yes      |
| dtAtualizacao     | DateTime | Yes      |

---

# 33. Field Definitions

## id

Unique project identifier.

Generated automatically.

Immutable.

---

## nome

Project name.

Human-readable identifier.

---

## dataDeInicio

Project planned start date.

---

## previsaoDeTermino

Project expected completion date.

---

## orcamentoTotal

Total planned budget.

Must be greater than zero.

---

## descricao

Detailed project description.

---

## status

Current lifecycle stage.

---

## riscoCalculado

Calculated risk classification.

Generated automatically.

Must never be manually modified.

---

## dtCriacao

Creation timestamp.

Generated automatically.

Immutable.

---

## dtAtualizacao

Last modification timestamp.

Automatically updated.

---

# 34. Status Enumeration

Allowed values:

```text id="brx4rn"
Em análise

Aprovado

Em andamento

Encerrado

Cancelado
```

No additional statuses are allowed.

---

# 35. Risk Enumeration

Allowed values:

```text id="0f0kmy"
Baixo

Médio

Alto
```

No additional risk levels are allowed.

---

# 36. Domain Invariants

The following rules must always remain true.

---

## Invariant 1

Every project must have a valid name.

---

## Invariant 2

Every project must have a valid start date.

---

## Invariant 3

Every project must have a valid end date.

---

## Invariant 4

End date must be greater than start date.

---

## Invariant 5

Budget must be greater than zero.

---

## Invariant 6

Every project must have a valid status.

---

## Invariant 7

Every project must have a calculated risk.

---

## Invariant 8

Every project must have creation timestamp.

---

## Invariant 9

Every project must have update timestamp.

---

# Part VI — Business Rules

---

# 37. Business Rules Overview

All business rules must be implemented inside the Domain Layer.

Business rules must never be implemented:

* Inside Controllers
* Inside Repositories
* Inside Infrastructure

---

# 38. Rule Categories

The system contains:

* Lifecycle Rules
* Deletion Rules
* Risk Rules
* AI Analysis Rules

---

# 39. Lifecycle Rules

Lifecycle rules govern project status transitions.

---

# 40. Rule BR-001

## Name

Initial Status

---

## Description

Every project must be created with status:

```text id="ikstaj"
Em análise
```

---

## Priority

Critical

---

# 41. Rule BR-002

## Name

Status Transition Validation

---

## Description

Projects may only move through approved transitions.

---

## Priority

Critical

---

# 42. Rule BR-003

## Name

Cancellation Rule

---

## Description

Projects may be cancelled from any status.

---

## Priority

High

---

# 43. Rule BR-004

## Name

Risk Recalculation

---

## Description

Risk must be recalculated whenever:

* Project is created
* Budget changes
* Start date changes
* End date changes

---

## Priority

Critical

---

# 44. Rule BR-005

## Name

Deletion Restriction

---

## Description

Projects cannot be deleted when status is:

```text id="ytd6pi"
Em andamento

Encerrado
```

---

## Priority

Critical

---

# 45. Rule BR-006

## Name

Timestamp Management

---

## Description

dtAtualizacao must be updated whenever the project changes.

---

## Priority

High

---

# Part VII — Project Lifecycle

---

# 46. Lifecycle Overview

Every project follows a predefined lifecycle.

The lifecycle exists to maintain business consistency.

---

# 47. Lifecycle Diagram

```text id="6q3d1o"
Em análise

↓

Aprovado

↓

Em andamento

↓

Encerrado
```

---

Cancellation:

```text id="0dgsau"
Any Status

↓

Cancelado
```

---

# 48. Initial State

Every project begins as:

```text id="d8dj89"
Em análise
```

---

# 49. State Description

## Em análise

Project is being evaluated.

---

## Aprovado

Project has been approved.

---

## Em andamento

Project execution has started.

---

## Encerrado

Project completed successfully.

---

## Cancelado

Project terminated before completion.

---

# 50. Allowed Transitions

| Current      | Next         |
| ------------ | ------------ |
| Em análise   | Aprovado     |
| Em análise   | Cancelado    |
| Aprovado     | Em andamento |
| Aprovado     | Cancelado    |
| Em andamento | Encerrado    |
| Em andamento | Cancelado    |

---

# 51. Forbidden Transitions

Examples:

| Current    | Next         |
| ---------- | ------------ |
| Em análise | Em andamento |
| Em análise | Encerrado    |
| Aprovado   | Encerrado    |
| Encerrado  | Em andamento |
| Encerrado  | Aprovado     |
| Cancelado  | Em andamento |

---

# 52. Transition Validation

Every transition attempt must be validated.

Invalid transitions must generate:

```text id="2z6nbv"
Business Rule Violation
```

---

# 53. Recommended Implementation

Preferred implementation:

```text id="b6f02z"
State Pattern
```

Alternative:

```text id="k6l7n7"
XState
```

---

# Part VIII — Risk Calculation Engine

---

# 54. Overview

The system automatically calculates project risk.

The objective is to classify projects according to:

* Budget
* Duration

---

# 55. Duration Calculation

Duration is calculated using:

```text id="zhw72m"
previsaoDeTermino

-

dataDeInicio
```

Measured in months.

---

# 56. Risk Levels

Available levels:

```text id="jl6ch3"
Baixo

Médio

Alto
```

---

# 57. Low Risk Rule

## Identifier

RISK-001

---

## Conditions

Budget:

≤ 100.000

AND

Duration:

≤ 3 months

---

## Result

```text id="aewn9m"
Baixo
```

---

# 58. Medium Risk Rule

## Identifier

RISK-002

---

## Conditions

Budget:

100.001 – 500.000

OR

Duration:

> 3 months and ≤ 6 months

---

## Result

```text id="7ezb7v"
Médio
```

---

# 59. High Risk Rule

## Identifier

RISK-003

---

## Conditions

Budget:

> 500.000

OR

Duration:

> 6 months

---

## Result

```text id="dhf5o0"
Alto
```

---

# 60. Conflict Resolution

When multiple rules apply:

The highest risk always wins.

---

# Examples

Budget:

750.000

Duration:

2 months

Result:

```text id="zl73aj"
Alto
```

---

Budget:

50.000

Duration:

8 months

Result:

```text id="iv71vc"
Alto
```

---

Budget:

250.000

Duration:

2 months

Result:

```text id="xw58n4"
Médio
```

---

# 61. Domain Ownership

Risk calculation belongs to Domain Layer.

Recommended implementation:

```text id="d4rj5l"
RiskCalculationService
```

---

# 62. Domain Responsibility

The RiskCalculationService must:

* Calculate duration
* Evaluate risk rules
* Resolve conflicts
* Return final classification

The service must not:

* Access database
* Perform HTTP calls
* Access AI providers

---

# Part IX — API Requirements

---

# 63. API Overview

The Project Validator System exposes a REST API.

The API is responsible for:

* Project Management
* Project Lifecycle Management
* Risk Evaluation
* AI Analysis

---

# 64. Base URL

Example:

```text id="z8m7k4"
/api/v1
```

All endpoints should be versioned.

---

# 65. Content Type

Requests:

```text id="8bwrm6"
application/json
```

Responses:

```text id="7zy9cx"
application/json
```

---

# 66. Authentication Requirement

All endpoints require authentication.

No anonymous endpoints exist in the initial version.

Exception:

```text id="m5u6x1"
/health
```

may be publicly accessible.

---

# 67. Endpoint Catalog

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | /projects                 |
| GET    | /projects                 |
| GET    | /projects/:id             |
| PATCH  | /projects/:id             |
| DELETE | /projects/:id             |
| PATCH  | /projects/:id/status      |
| GET    | /projects/:id/ai-analysis |

---

# 68. Create Project

## Endpoint

```text id="3tzt7n"
POST /projects
```

---

## Purpose

Create a new project.

---

## Request Body

```json id="mbw7w6"
{
  "nome": "ERP Migration",
  "dataDeInicio": "2026-01-01",
  "previsaoDeTermino": "2026-06-01",
  "orcamentoTotal": 250000,
  "descricao": "Migration of ERP platform."
}
```

---

## Expected Response

HTTP:

```text id="h5s8be"
201 Created
```

---

# 69. List Projects

## Endpoint

```text id="4u0l6e"
GET /projects
```

---

## Query Parameters

Optional:

```text id="mim1pb"
?page=1

&limit=20
```

Optional:

```text id="5d70ua"
?offset=0

&limit=20
```

---

## Response

Collection of projects.

---

## Empty State

Return:

```json id="9nm0or"
[]
```

HTTP:

```text id="rbg84v"
200 OK
```

---

# 70. Get Project By Id

## Endpoint

```text id="9ohjnn"
GET /projects/:id
```

---

## Success Response

```text id="mkog74"
200 OK
```

---

## Failure Response

```text id="kpbv7s"
404 Not Found
```

---

# 71. Update Project

## Endpoint

```text id="ajzy7w"
PATCH /projects/:id
```

---

## Purpose

Partial update.

---

## Business Behavior

If modified fields include:

```text id="o08klw"
orcamentoTotal

dataDeInicio

previsaoDeTermino
```

The risk must be recalculated.

---

## Success Response

```text id="k5zpr4"
200 OK
```

---

# 72. Delete Project

## Endpoint

```text id="q4h2q5"
DELETE /projects/:id
```

---

## Restrictions

Deletion forbidden when status:

```text id="nlj83s"
Em andamento

Encerrado
```

---

## Success Response

```text id="v6d8x4"
204 No Content
```

---

## Failure Response

```text id="f6h0m3"
409 Conflict
```

---

# 73. Change Project Status

## Endpoint

```text id="m5wszy"
PATCH /projects/:id/status
```

---

## Purpose

Execute lifecycle transition.

---

## Request Example

```json id="h9o7a7"
{
  "status": "Aprovado"
}
```

---

## Validation

Status transition rules must be enforced.

---

## Success Response

```text id="0e0zhf"
200 OK
```

---

## Failure Response

```text id="7dkbcl"
409 Conflict
```

---

# 74. AI Analysis Endpoint

## Endpoint

```text id="dx5szv"
GET /projects/:id/ai-analysis
```

---

## Purpose

Generate AI-powered analysis.

---

## Success Response

```json id="vkfrqk"
{
  "resumoDoProjeto": "...",
  "pontosDeAtencao": [
    "..."
  ],
  "recomendacaoExecutiva": "..."
}
```

---

# 75. Standard Error Format

All failures should follow RFC7807.

Example:

```json id="dk6l9z"
{
  "type": "https://project-validator-system/errors/business-rule",
  "title": "Business Rule Violation",
  "status": 409,
  "detail": "Project cannot be deleted while active."
}
```

---

# Part X — Authentication & Security

---

# 76. Authentication Overview

The API uses JWT authentication.

---

# 77. Authentication Strategy

A single static token is sufficient for the initial version.

Purpose:

Protect endpoints.

Validate requests.

Demonstrate authentication architecture.

---

# 78. JWT Claims

The token payload must contain:

```json id="fy4nlq"
{
  "project": "ProjectValidatorSystem",
  "user": "FilipeHG",
  "email": "filipeh.goncalves@gmail.com"
}
```

---

# 79. Token Expiration

Configured for:

```text id="o9vpmk"
100 years
```

Purpose:

Project simplification.

Production systems would use shorter durations.

---

# 80. Required Environment Variables

```text id="0ngjlwm"
JWT_SECRET

JWT_ISSUER

JWT_AUDIENCE
```

---

# 81. Authorization

The initial version does not implement roles.

All authenticated users possess the same permissions.

---

# 82. Input Validation

All request bodies must be validated.

Validation stack:

```text id="6g0m8o"
Drizzle Schema

↓

drizzle-zod

↓

Zod

↓

Global Validation Pipe
```

---

# 83. Security Requirements

The system must:

✓ Validate JWT

✓ Validate payloads

✓ Protect endpoints

✓ Externalize secrets

✓ Prevent malformed requests

---

# Part XI — AI Analysis Module

---

# 84. Overview

The system provides AI-assisted project analysis.

---

# 85. Objective

Generate executive-level project insights.

---

# 86. AI Provider

Official provider:

```text id="dnsy8j"
Google Gemini 1.5 Flash
```

---

## SDK

```text id="2rnscx"
@google/generative-ai
```

---

# 87. Endpoint

```text id="hyhxrm"
GET /projects/:id/ai-analysis
```

---

# 88. Inputs

The AI receives:

* nome
* descricao
* orcamentoTotal
* status
* riscoCalculado
* dataDeInicio
* previsaoDeTermino

---

# 89. Expected Output

The AI must return:

```json id="wfjlwm"
{
  "resumoDoProjeto": "",
  "pontosDeAtencao": [],
  "recomendacaoExecutiva": ""
}
```

---

# 90. Structured Outputs

Structured Outputs (JSON Mode) must be used.

Free-form text responses are not allowed.

---

# 91. Required Architecture

```text id="w88o1y"
AiAnalysisService

↓

ProjectAnalysisPromptBuilder

↓

AiClient

↓

Gemini SDK
```

---

# 92. Responsibilities

## ProjectAnalysisPromptBuilder

Build prompt only.

---

## AiClient

Communicate with provider.

---

## AiAnalysisService

Orchestrate workflow.

---

# 93. Provider Isolation

The provider must remain replaceable.

Future migration examples:

```text id="opg2uv"
Gemini

↓

OpenAI

Claude

Azure OpenAI
```

Should require changes only inside:

```text id="sm5fyo"
AiClient
```

---

# 94. AI Failure Handling

AI failures must not crash the application.

Failures should:

* Be logged
* Return controlled errors
* Preserve API stability

---

# Part XII — Database Requirements

---

# 95. Database Overview

Official database:

PostgreSQL

Hosted on:

Supabase

---

# 96. ORM

Official ORM:

Drizzle ORM

---

# 97. ORM Philosophy

The project intentionally avoids:

```text id="9pcg8u"
TypeORM

Prisma
```

Purpose:

Explicit SQL generation.

Predictable behavior.

---

# 98. Connection Strategy

Use:

```text id="ljzv7o"
postgres.js
```

with:

```typescript id="f3vhyi"
prepare: false
```

Required by Supabase Transaction Pool Mode.

---

# 99. Main Table

```text id="gr4goh"
projetos
```

---

# 100. Columns

```text id="r4ejd2"
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

# 101. Audit Requirements

Every project record must contain:

```text id="8x6x5h"
dt_criacao

dt_atualizacao
```

---

# 102. Creation Rules

On insert:

```text id="lb8lyz"
dt_criacao = now()

dt_atualizacao = now()
```

---

# 103. Update Rules

On update:

```text id="yb13i3"
dt_atualizacao = now()
```

---

# 104. Migration Strategy

All schema changes must occur through migrations.

Manual production changes are forbidden.

---

# 105. Repository Ownership

Database access belongs exclusively to repositories.

Controllers and Domain must never access Drizzle directly.

---

# Part XIII — Validation Requirements

---

# 106. Validation Philosophy

Validation is the first line of defense of the system.

The system must reject invalid requests before business execution begins.

Validation must occur at application boundaries.

Business rules are not validation rules.

Validation verifies data structure.

Business rules verify business behavior.

---

# 107. Official Validation Stack

The official validation flow is:

```text id="m0m6i7"
Drizzle Schema

↓

drizzle-zod

↓

Zod Schema

↓

Global ZodValidationPipe

↓

Use Cases

↓

Domain
```

This ensures a single source of truth.

---

# 108. Required Field Validation

The following fields are mandatory during project creation:

```text id="x8e7ol"
nome

dataDeInicio

previsaoDeTermino

orcamentoTotal

descricao
```

---

# 109. Name Validation

Rules:

* Required
* String
* Not empty
* Trim whitespace

---

# 110. Date Validation

Rules:

```text id="x4m4z0"
dataDeInicio

previsaoDeTermino
```

Must:

* Be valid dates
* Use ISO format
* Respect business constraints

---

# 111. Date Consistency Validation

Rule:

```text id="k0c0s3"
previsaoDeTermino

>

dataDeInicio
```

Violation should generate validation failure.

---

# 112. Budget Validation

Rules:

```text id="sjr6o2"
orcamentoTotal
```

Must:

* Be numeric
* Be greater than zero
* Support decimal values

---

# 113. Status Validation

Only the following values are allowed:

```text id="jl0j6u"
Em análise

Aprovado

Em andamento

Encerrado

Cancelado
```

Any other value is invalid.

---

# 114. Risk Validation

Risk is calculated automatically.

Client applications must never provide:

```text id="zg4zff"
riscoCalculado
```

during creation or update.

---

# 115. Audit Field Validation

The following fields are managed internally:

```text id="j2jv6f"
dtCriacao

dtAtualizacao
```

External clients cannot define these values.

---

# Part XIV — Error Handling Requirements

---

# 116. Error Handling Philosophy

Errors must be:

* Predictable
* Standardized
* Traceable

All failures should follow a common format.

---

# 117. Error Standard

Official format:

RFC7807

---

# 118. Validation Errors

HTTP:

```text id="uh0e3s"
400 Bad Request
```

Examples:

* Missing fields
* Invalid types
* Invalid dates
* Invalid payloads

---

# 119. Authentication Errors

HTTP:

```text id="if3j6k"
401 Unauthorized
```

Examples:

* Missing token
* Invalid token
* Expired token

---

# 120. Authorization Errors

HTTP:

```text id="rf0lgo"
403 Forbidden
```

Examples:

* Insufficient permissions

---

# 121. Not Found Errors

HTTP:

```text id="ch3g7d"
404 Not Found
```

Examples:

* Project does not exist

---

# 122. Business Rule Violations

HTTP:

```text id="x5pjj0"
409 Conflict
```

Examples:

* Invalid status transition
* Deletion not allowed
* Lifecycle violation

---

# 123. Infrastructure Errors

HTTP:

```text id="a2y5ng"
503 Service Unavailable
```

Examples:

* Database unavailable
* AI provider unavailable
* External dependency unavailable

---

# 124. Unexpected Errors

HTTP:

```text id="cw8w9m"
500 Internal Server Error
```

Examples:

* Unhandled exceptions
* Programming errors

---

# 125. Error Payload

Example:

```json id="s5h6nq"
{
  "type": "https://project-validator-system/errors/business-rule",
  "title": "Business Rule Violation",
  "status": 409,
  "detail": "Project cannot be deleted while active.",
  "instance": "/projects/123"
}
```

---

# Part XV — Testing Requirements

---

# 126. Testing Philosophy

All business rules must be validated through automated tests.

Testing is mandatory.

---

# 127. Official Testing Stack

```text id="b1b7hy"
Vitest

Supertest

Faker
```

---

# 128. Unit Test Requirements

Unit tests must validate:

✓ Risk calculation

✓ Status transitions

✓ Deletion rules

✓ Domain services

✓ Validation rules

---

# 129. Unit Test Restrictions

Unit tests must not access:

✗ Database

✗ Gemini

✗ HTTP APIs

✗ External services

---

# 130. Integration Test Requirements

Integration tests must validate:

✓ Repository behavior

✓ Database interaction

✓ Persistence logic

✓ Drizzle integration

---

# 131. E2E Test Requirements

E2E tests must validate:

✓ Authentication

✓ Controllers

✓ Validation

✓ Error handling

✓ Request lifecycle

---

# 132. Faker Requirements

Faker must generate:

* Project names
* Descriptions
* Dates
* Budgets

Purpose:

Provide realistic test data.

---

# 133. Coverage Expectations

Critical business rules must be fully tested.

Priority:

1. Lifecycle
2. Risk Engine
3. Deletion Rules
4. AI Analysis Flow

---

# Part XVI — Acceptance Criteria

---

# AC-001 — Create Project

## Given

A valid request.

---

## When

The client creates a project.

---

## Then

The system must:

✓ Create project

✓ Calculate risk

✓ Set status to "Em análise"

✓ Set audit fields

---

# AC-002 — List Projects

## Given

Existing projects.

---

## When

The client requests project listing.

---

## Then

The system returns projects.

---

# AC-003 — Empty Listing

## Given

No projects exist.

---

## When

The client requests project listing.

---

## Then

The system returns:

```json id="kp3nnz"
[]
```

with:

```text id="yzhx5h"
200 OK
```

---

# AC-004 — Update Project

## Given

An existing project.

---

## When

Budget or dates change.

---

## Then

Risk must be recalculated.

---

# AC-005 — Delete Project

## Given

Project status:

```text id="1m5m5d"
Em análise

or

Aprovado
```

---

## Then

Deletion succeeds.

---

# AC-006 — Delete Active Project

## Given

Project status:

```text id="8v9u3f"
Em andamento
```

or

```text id="ztu3m5"
Encerrado
```

---

## Then

Deletion must fail.

---

# AC-007 — Status Transition

## Given

Valid lifecycle transition.

---

## Then

Status changes successfully.

---

# AC-008 — Invalid Transition

## Given

Invalid lifecycle transition.

---

## Then

Business rule violation occurs.

---

# AC-009 — AI Analysis

## Given

Existing project.

---

## When

Client requests AI analysis.

---

## Then

The system returns:

* resumoDoProjeto
* pontosDeAtencao
* recomendacaoExecutiva

---

# Part XVII — Definition of Done

---

# 134. Functional Completion

All functional requirements implemented.

---

# 135. Business Rules Completion

All business rules implemented.

---

# 136. Validation Completion

All validation requirements implemented.

---

# 137. Security Completion

Authentication implemented.

Secrets externalized.

---

# 138. Testing Completion

Unit Tests passing.

Integration Tests passing.

E2E Tests passing.

---

# 139. Documentation Completion

Swagger updated.

README updated.

Environment variables documented.

---

# 140. Production Readiness Completion

Logging implemented.

Error handling implemented.

Health endpoint implemented.

---

# Part XVIII — Technical Constraints

---

# 141. Mandatory Technologies

The project must use:

```text id="n3yuzv"
Node.js

TypeScript

NestJS

PostgreSQL

Drizzle ORM

Zod

Vitest

Supertest
```

---

# 142. Mandatory AI Provider

Official provider:

```text id="ux0n4s"
Google Gemini 1.5 Flash
```

---

# 143. Forbidden Technologies

The project must not use:

```text id="5g0tbm"
CQRS

TypeORM

Prisma

GenericRepository

BaseRepository

CrudRepository
```

---

# 144. Architectural Constraint

The project must follow:

```text id="x5k48c"
Pragmatic Layered Clean Architecture
```

defined by the ADRs.

---

# Part XIX — Future Evolution Considerations

---

# 145. Future Enhancements

Potential future versions may include:

* User Management
* Role-Based Access Control
* Audit Trail
* Notifications
* Reporting
* Dashboard
* Multi-Tenant Support

---

# 146. AI Evolution

Future AI providers may include:

* OpenAI
* Claude
* Azure OpenAI

Provider replacement must not require business rule changes.

---

# 147. Scalability Evolution

Future versions may introduce:

* Redis Cache
* Message Brokers
* Background Processing
* Horizontal Scaling

---

# 148. Architectural Evolution

Future architecture decisions must be documented through ADRs.

No major architectural change should occur without documentation.

---

# End of Project Validator System Specification

Version: 1.0.0

Status: Approved

Document Type: Functional Specification

Project Status: COMPLETE
