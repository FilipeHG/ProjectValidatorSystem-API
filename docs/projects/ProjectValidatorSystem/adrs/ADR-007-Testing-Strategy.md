# ADR-007 — Testing Strategy

> Architecture Decision Record

---

| Property        | Value                                    |
| --------------- | ---------------------------------------- |
| ADR             | 007                                      |
| Title           | Testing Strategy                         |
| Status          | Accepted                                 |
| Date            | 2026-07-02                               |
| Decision Makers | ProjectValidatorSystem Architecture Team |
| Supersedes      | None                                     |
| Superseded By   | None                                     |

---

# Context

The Project Validator System contains critical business rules that must remain stable over time.

Examples include:

* Project lifecycle validation
* Risk calculation engine
* Deletion restrictions
* JWT authentication
* AI analysis orchestration

The project requires a testing strategy capable of providing:

* Confidence during refactoring
* Regression prevention
* Fast feedback cycles
* Reliable deployments
* Support for AI-assisted development

The testing strategy must align with:

* ADR-001 Official Architecture
* ADR-002 Technology Stack
* ADR-003 Persistence Strategy
* ADR-004 Validation Strategy
* ADR-005 Authentication Strategy
* ADR-006 AI Integration Strategy

---

# Problem Statement

Many projects suffer from one or more of the following issues:

* Low test coverage
* Over-reliance on manual testing
* Slow test execution
* Excessive mocking
* Fragile tests
* Missing business rule validation

Without a clear strategy:

* Business rules become difficult to trust
* Refactoring becomes risky
* Deployments become unpredictable

The project requires an official testing standard.

---

# Decision

The Project Validator System shall adopt:

```text id="adr007a"
Testing Pyramid Strategy
```

using:

```text id="adr007b"
Unit Tests

↓

Integration Tests

↓

End-to-End Tests
```

with emphasis on business rule validation.

---

# Testing Philosophy

The goal of testing is:

```text id="adr007c"
Validate behavior.
```

The goal is not:

```text id="adr007d"
Maximize coverage percentage.
```

Coverage is a consequence.

Correct behavior is the objective.

---

# Decision 1 — Official Testing Stack

---

## Selected

```text id="adr007e"
Vitest

Supertest

Faker

Zod
```

---

# Why

Benefits:

✓ Fast execution

✓ Excellent TypeScript support

✓ Strong NestJS integration

✓ Modern ecosystem

---

# Official Responsibilities

| Tool      | Responsibility           |
| --------- | ------------------------ |
| Vitest    | Unit & Integration Tests |
| Supertest | E2E Tests                |
| Faker     | Test Data                |
| Zod       | Contract Validation      |

---

# Decision 2 — Testing Pyramid

---

## Selected

```text id="adr007f"
Unit Tests

↓

Integration Tests

↓

E2E Tests
```

---

# Why

Benefits:

✓ Faster execution

✓ Better defect localization

✓ Lower maintenance cost

✓ Higher confidence

---

# Distribution

Recommended:

```text id="adr007g"
70% Unit Tests

20% Integration Tests

10% E2E Tests
```

---

# Decision 3 — Unit Tests

---

## Selected

Business logic must primarily be validated through:

```text id="adr007h"
Unit Tests
```

---

# Scope

Unit tests validate:

✓ Domain Services

✓ Policies

✓ Use Cases

✓ Business Rules

✓ Calculations

---

# Examples

```text id="adr007i"
RiskCalculationService

ProjectStatusPolicy

DeleteProjectUseCase
```

---

# Restrictions

Unit tests must never access:

```text id="adr007j"
PostgreSQL

Supabase

Gemini

HTTP APIs

External Services
```

---

# Why

Unit tests must remain:

✓ Fast

✓ Deterministic

✓ Isolated

---

# Decision 4 — Integration Tests

---

## Selected

Integration tests validate infrastructure interaction.

---

# Scope

Validate:

✓ Repositories

✓ Drizzle ORM

✓ PostgreSQL

✓ Migrations

✓ Data Mapping

---

# Examples

```text id="adr007k"
ProjectRepository

Database Module

Migration Execution
```

---

# Goal

Validate that infrastructure behaves correctly.

---

# Decision 5 — End-to-End Tests

---

## Selected

E2E tests validate complete request execution.

---

# Scope

Validate:

✓ Controllers

✓ Authentication

✓ Validation

✓ Use Cases

✓ Persistence

✓ HTTP Responses

---

# Example Flow

```text id="adr007l"
HTTP Request

↓

Auth Guard

↓

Validation Pipe

↓

Controller

↓

Use Case

↓

Repository

↓

Response
```

---

# Goal

Validate production-like behavior.

---

# Decision 6 — Business Rule Coverage

---

## Selected

All critical business rules require automated tests.

---

# Mandatory Coverage

The following rules must be tested:

```text id="adr007m"
Risk Calculation

Status Lifecycle

Deletion Restriction

Authentication

Validation

AI Analysis Flow
```

---

# Why

These rules define the business behavior.

---

# Decision 7 — Mocking Strategy

---

## Selected

Mock external dependencies.

---

# Allowed Mocks

```text id="adr007n"
Repositories

AiClient

External APIs
```

---

# Unit Tests

Repositories must be mocked.

---

# AI Tests

Gemini must always be mocked during unit tests.

---

# Why

External systems introduce:

* Latency
* Instability
* Non-determinism

---

# Decision 8 — Builder Pattern

---

## Selected

Test data should be created through:

```text id="adr007o"
Builders
```

---

# Example

```typescript id="adr007p"
ProjectBuilder
  .create()
  .withHighRisk()
  .build();
```

---

# Why

Benefits:

✓ Readability

✓ Reusability

✓ Reduced duplication

---

# Decision 9 — Faker Strategy

---

## Selected

```text id="adr007q"
@faker-js/faker
```

---

# Usage

Generate:

✓ Names

✓ Descriptions

✓ Dates

✓ Budgets

---

# Goal

Create realistic test scenarios.

---

# Decision 10 — AI Testing

---

## Selected

AI integration must be tested separately.

---

# Prompt Builder Tests

Validate:

✓ Prompt generation

✓ Project mapping

✓ Context formatting

---

# AiClient Tests

Validate:

✓ Request creation

✓ Response parsing

✓ Failure handling

---

# AiAnalysisService Tests

Validate:

✓ Orchestration

✓ Provider failures

✓ Invalid responses

✓ Successful responses

---

# Why

AI integration introduces additional complexity.

---

# Decision 11 — Contract Testing

---

## Selected

API contracts must be verified.

---

# Scope

Validate:

✓ Request DTOs

✓ Response DTOs

✓ Validation behavior

✓ Error formats

---

# Goal

Prevent contract regressions.

---

# Decision 12 — Validation Testing

---

## Selected

Validation behavior requires dedicated tests.

---

# Validate

✓ Required fields

✓ Invalid types

✓ Invalid dates

✓ Invalid budgets

✓ Invalid status values

---

# Why

Validation is a critical system boundary.

---

# Decision 13 — Authentication Testing

---

## Selected

Authentication must be tested in E2E.

---

# Scenarios

Validate:

✓ Valid Token

✓ Invalid Token

✓ Missing Token

✓ Invalid Claims

---

# Goal

Guarantee endpoint protection.

---

# Decision 14 — Error Handling Testing

---

## Selected

Error responses require automated validation.

---

# Validate

✓ RFC7807 structure

✓ HTTP status codes

✓ Business exceptions

✓ Validation exceptions

✓ Authentication failures

---

# Why

Error contracts are part of the API.

---

# Decision 15 — Coverage Philosophy

---

## Selected

Coverage is a metric.

Behavior is the goal.

---

# Recommended Targets

```text id="adr007r"
Unit Tests > 90%

Integration Tests > 80%

Critical E2E Flows 100%
```

---

# Important

Coverage alone does not indicate quality.

---

# Decision 16 — Continuous Integration

---

## Selected

All tests execute automatically in CI.

---

# Pipeline

```text id="adr007s"
Install

↓

Build

↓

Lint

↓

Unit Tests

↓

Integration Tests

↓

E2E Tests
```

---

# Merge Rules

Code cannot be merged when:

```text id="adr007t"
Build Fails

Tests Fail

Lint Fails
```

---

# Decision 17 — Test Naming Convention

---

## Selected

Use:

```text id="adr007u"
Given

When

Then
```

---

# Example

```text id="adr007v"
Given project status is "Em análise"

When status changes to "Aprovado"

Then transition succeeds
```

---

# Why

Benefits:

✓ Readability

✓ Documentation

✓ Business alignment

---

# Decision 18 — Definition of Tested

---

## Selected

A feature is tested only when:

✓ Happy Path validated

✓ Failure Paths validated

✓ Business Rules validated

✓ Edge Cases validated

✓ Automated Tests passing

---

# Manual Testing

Manual testing alone is insufficient.

---

# Consequences

Positive:

✓ Safer refactoring

✓ Better reliability

✓ Faster defect detection

✓ More predictable releases

✓ Better AI-assisted development

---

Negative:

✓ Additional development effort

✓ Additional maintenance effort

These trade-offs are acceptable.

---

# Compliance Rules

Every feature must include:

✓ Unit Tests

✓ Business Rule Tests

✓ Validation Tests

---

Critical features must include:

✓ Integration Tests

✓ E2E Tests

---

The following are forbidden:

```text id="adr007w"
Production Database in Unit Tests

Real Gemini Calls in Unit Tests

Manual-Only Validation

Untested Business Rules
```

---

# Final Decision

The official testing strategy of Project Validator System is:

```text id="adr007x"
Vitest

+

Supertest

+

Faker

+

Testing Pyramid

+

Business Rule Coverage First
```

This decision is accepted and becomes part of the architectural baseline.

---

# References

* ADR-001 Official Architecture
* ADR-002 Technology Stack
* ADR-004 Validation Strategy
* ADR-006 AI Integration Strategy
* Project Testing Standards
* Project Specification

---

# End of ADR-007

Status: Accepted

Decision: Testing Strategy Established
