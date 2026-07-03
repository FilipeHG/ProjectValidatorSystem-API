# Project Validator System Testing Standards

> Testing Strategy, Quality Assurance and Verification Standards

---

| Property | Value                                                                      |
| -------- | -------------------------------------------------------------------------- |
| Document | Project Validator System Testing Standards                                 |
| Version  | 1.0.0                                                                      |
| Status   | Approved                                                                   |
| Type     | Testing Standard                                                           |
| Audience | Software Engineers, Software Architects, QA Engineers and AI Coding Agents |

---

# Purpose

This document defines the official testing standards for Project Validator System.

Its purpose is to guarantee:

* Business rule correctness
* Predictable behavior
* Regression protection
* Safe refactoring
* Production readiness

Testing is a mandatory part of the deliverable.

Code without tests is considered incomplete.

---

# Part I — Testing Philosophy

---

# 1. Testing Principles

The goal of testing is:

```text id="v8k7p2"
Validate behavior
```

Not implementation details.

---

# 2. Testing Pyramid

The project adopts:

```text id="q5m2z1"
Unit Tests

↓

Integration Tests

↓

End-to-End Tests
```

Priority:

1. Unit Tests
2. Integration Tests
3. E2E Tests

---

# 3. Testing Requirements

Every business rule must be validated through automated tests.

No business rule should rely solely on manual testing.

---

# 4. Deterministic Behavior

Tests must produce the same result every execution.

Avoid:

* Random behavior
* External dependencies
* Time-dependent assertions

---

# Part II — Official Testing Stack

---

# 5. Unit Testing Framework

Official framework:

```text id="r1j9c4"
Vitest
```

---

# 6. E2E Testing Framework

Official framework:

```text id="m4v8d7"
Supertest
```

---

# 7. Test Data Generation

Official library:

```text id="t7n3q9"
@faker-js/faker
```

---

# 8. Validation Support

Official library:

```text id="c6k5r2"
Zod
```

---

# 9. Mocking Strategy

Official mocking mechanism:

```text id="x9b1w4"
Vitest Mocks
```

---

# Part III — Test Project Structure

---

# 10. Directory Structure

Recommended structure:

```text id="g4d8z6"
test/

unit/

integration/

e2e/

fixtures/

builders/

mocks/
```

---

# 11. Unit Test Structure

```text id="w2f6m8"
test/unit/
```

Contains:

* Domain tests
* Use Case tests
* Policy tests
* Service tests

---

# 12. Integration Test Structure

```text id="e5k1p7"
test/integration/
```

Contains:

* Repository tests
* Database tests
* Infrastructure tests

---

# 13. E2E Test Structure

```text id="n8v4x2"
test/e2e/
```

Contains:

* HTTP tests
* Authentication tests
* Validation tests
* API contract tests

---

# Part IV — Unit Testing Standards

---

# 14. Unit Test Scope

Unit tests validate:

* Business rules
* Domain logic
* Use Cases
* Policies
* Calculations

---

# 15. Unit Test Isolation

Unit tests must not access:

✗ PostgreSQL

✗ Supabase

✗ Gemini

✗ HTTP APIs

✗ External services

---

# 16. Allowed Dependencies

Unit tests may use:

✓ Mocks

✓ Stubs

✓ Builders

✓ Fixtures

---

# 17. Mandatory Unit Test Coverage

The following components require unit tests:

```text id="h6j2q5"
RiskCalculationService

ProjectStatusPolicy

CreateProjectUseCase

UpdateProjectUseCase

DeleteProjectUseCase

ChangeProjectStatusUseCase

AiAnalysisService
```

---

# 18. Risk Calculation Tests

Required scenarios:

✓ Low Risk

✓ Medium Risk

✓ High Risk

✓ Conflict Resolution

✓ Edge Cases

---

# Example

Budget:

```text id="d4s7f9"
750000
```

Duration:

```text id="b3w8n1"
2 months
```

Expected:

```text id="y6k2r4"
Alto
```

---

# 19. Status Transition Tests

Required scenarios:

✓ Allowed transitions

✓ Forbidden transitions

✓ Cancellation transitions

---

# Example

```text id="m9q4x7"
Em análise

↓

Aprovado
```

Allowed.

---

```text id="j1t8p6"
Em análise

↓

Encerrado
```

Forbidden.

---

# 20. Deletion Rule Tests

Required scenarios:

✓ Delete allowed

✓ Delete forbidden

---

# Part V — Integration Testing Standards

---

# 21. Integration Test Purpose

Validate integration between:

* Repositories
* Database
* ORM
* Persistence layer

---

# 22. Integration Scope

Validate:

✓ Inserts

✓ Updates

✓ Deletes

✓ Queries

✓ Migrations

---

# 23. Database Strategy

Preferred:

Dedicated test database.

---

Alternative:

Disposable test schema.

---

# 24. Repository Tests

Required tests:

```text id="z7v1m5"
findById

findAll

create

update

delete
```

---

# 25. Drizzle Integration

Repositories must validate:

✓ Correct mapping

✓ Correct persistence

✓ Correct retrieval

---

# Part VI — End-to-End Testing Standards

---

# 26. E2E Purpose

Validate complete request flow.

---

# 27. E2E Scope

Validate:

✓ HTTP Layer

✓ Validation

✓ Authentication

✓ Business Rules

✓ Error Handling

---

# 28. Required Endpoint Coverage

All endpoints require E2E tests.

```text id="c8r3q1"
POST /projects

GET /projects

GET /projects/:id

PATCH /projects/:id

DELETE /projects/:id

PATCH /projects/:id/status

GET /projects/:id/ai-analysis
```

---

# 29. Authentication Tests

Required scenarios:

✓ Valid Token

✓ Invalid Token

✓ Missing Token

---

# 30. Validation Tests

Required scenarios:

✓ Valid Payload

✓ Invalid Payload

✓ Missing Fields

✓ Invalid Dates

✓ Invalid Budget

---

# Part VII — Test Data Standards

---

# 31. Faker Usage

Use Faker for:

* Names
* Descriptions
* Dates
* Budgets

---

# 32. Builder Pattern

Preferred approach:

```text id="n5v2q8"
ProjectBuilder
```

Purpose:

Generate valid test entities.

---

# Example

```typescript id="g8w6t3"
const project =
  ProjectBuilder
    .create()
    .withHighRisk()
    .build();
```

---

# 33. Fixtures

Fixtures should represent:

* Valid Project
* Low Risk Project
* Medium Risk Project
* High Risk Project
* Closed Project
* Active Project

---

# Part VIII — Mocking Standards

---

# 34. Mock Philosophy

Mock behavior.

Do not mock implementation details.

---

# 35. Repository Mocking

Repositories should be mocked in:

```text id="j2m4x6"
Unit Tests
```

---

# 36. AI Mocking

Gemini must be mocked during:

```text id="u9k5d1"
Unit Tests
```

---

# 37. Infrastructure Mocking

Mock:

* AI Providers
* Database Repositories
* External APIs

---

# Part IX — Coverage Standards

---

# 38. Coverage Philosophy

Coverage is useful.

Coverage is not the goal.

Behavior coverage is the goal.

---

# 39. Critical Coverage

The following require near-complete coverage:

✓ Risk Engine

✓ Lifecycle Rules

✓ Deletion Rules

✓ Authentication

✓ Validation

---

# 40. Coverage Expectations

Recommended:

```text id="s8q2r7"
Unit Tests

> 90%
```

---

```text id="b5n4m1"
Integration Tests

> 80%
```

---

```text id="y1v7t3"
E2E Tests

Critical Flows
```

---

# Part X — AI Testing Standards

---

# 41. AI Testing Philosophy

AI behavior should be validated.

AI provider responses should not be trusted blindly.

---

# 42. Prompt Builder Tests

Validate:

✓ Prompt generation

✓ Project mapping

✓ Missing data handling

---

# 43. AI Client Tests

Validate:

✓ Request creation

✓ Response parsing

✓ Error handling

✓ Timeout handling

---

# 44. AI Analysis Tests

Validate:

✓ Happy path

✓ Invalid AI response

✓ Timeout

✓ Provider failure

---

# 45. Structured Output Validation

Every AI response must be validated against schema.

---

# Part XI — Continuous Integration Requirements

---

# 46. Pull Request Validation

Before merge:

✓ Build passes

✓ Tests pass

✓ Lint passes

---

# 47. Required Pipeline Stages

```text id="t6z8j2"
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

# 48. Merge Restrictions

Code must not be merged when:

✗ Build fails

✗ Tests fail

✗ Lint fails

---

# Part XII — Acceptance Rules

---

# 49. Test Compliance

The testing strategy is compliant only when:

✓ Unit Tests implemented

✓ Integration Tests implemented

✓ E2E Tests implemented

✓ Business Rules tested

✓ Authentication tested

✓ Validation tested

---

# 50. Release Readiness

A release is test-ready only when:

✓ Critical paths validated

✓ Regression tests passing

✓ CI pipeline passing

---

# 51. Definition of Tested

A feature is considered tested when:

✓ Happy path validated

✓ Failure paths validated

✓ Business rules validated

✓ Edge cases validated

✓ Automated tests passing

Manual validation alone is insufficient.

---

# End of Project Validator System Testing Standards

Version: 1.0.0

Status: Approved

Document Type: Testing Standard
