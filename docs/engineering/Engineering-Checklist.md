# Engineering Checklist

> Enterprise Software Engineering Verification Checklist

---

| Property | Value                                                                           |
| -------- | ------------------------------------------------------------------------------- |
| Document | Engineering Checklist                                                           |
| Version  | 1.0.0                                                                           |
| Status   | Approved                                                                        |
| Type     | Engineering Standard                                                            |
| Audience | Software Engineers, Software Architects, Technical Leaders and AI Coding Agents |

---

# Purpose

This document provides a standardized checklist for software engineering activities.

The purpose is to ensure consistency, maintainability, quality, security and architectural compliance across all backend projects.

---

# Classification

## Mandatory

```text
[M]
```

Must be satisfied.

Failure blocks approval.

---

## Recommended

```text
[R]
```

Strongly recommended.

May require justification if skipped.

---

## Optional

```text
[O]
```

Context dependent.

Evaluate when applicable.

---

# Part I — Architecture Checklist

---

## Layer Responsibilities

□ [M] Presentation contains no business rules

□ [M] Presentation contains no SQL

□ [M] Presentation contains no infrastructure code

□ [M] Application contains orchestration only

□ [M] Domain contains business rules

□ [M] Domain contains no NestJS dependencies

□ [M] Domain contains no HTTP dependencies

□ [M] Domain contains no database dependencies

□ [M] Infrastructure contains only technical concerns

---

## Dependency Direction

□ [M] Dependency direction respected

□ [M] No layer violations detected

□ [M] No Domain → Infrastructure dependency

□ [M] No Domain → Presentation dependency

□ [M] No circular dependencies

□ [M] Interfaces used appropriately

□ [R] Dependency graph remains simple

---

## Architecture Consistency

□ [M] Official architecture respected

□ [M] Folder structure respected

□ [M] Naming conventions respected

□ [M] No unauthorized architectural style introduced

□ [R] Cohesion evaluated

□ [R] Coupling minimized

---

### Architecture Score

___ / 10

---

# Part II — Development Checklist

---

## Code Quality

□ [M] Code compiles successfully

□ [M] No dead code

□ [M] No commented code

□ [M] No unused imports

□ [M] No TODO left behind

□ [M] No debugging statements

□ [M] No console.log in production code

---

## Simplicity

□ [M] Solution is understandable

□ [M] Complexity justified

□ [M] No unnecessary abstractions

□ [M] No speculative design

□ [R] Simpler alternative evaluated

---

## SOLID Principles

□ [M] Single Responsibility respected

□ [M] Open/Closed respected

□ [M] Liskov Substitution respected

□ [M] Interface Segregation respected

□ [M] Dependency Inversion respected

---

### Development Score

___ / 10

---

# Part III — Code Review Checklist

---

## Readability

□ [M] Intent is clear

□ [M] Naming is meaningful

□ [M] Methods are understandable

□ [M] Classes are understandable

□ [R] Comments explain WHY rather than HOW

---

## Maintainability

□ [M] Responsibilities clearly separated

□ [M] No duplication detected

□ [M] Dependencies justified

□ [M] Side effects minimized

□ [R] Future maintenance impact evaluated

---

## Review Readiness

□ [M] Pull Request description completed

□ [M] Scope documented

□ [M] Tests included

□ [M] Documentation updated

---

### Review Score

___ / 10

---

# Part IV — Testing Checklist

---

## Unit Tests

□ [M] Critical business rules covered

□ [M] Happy paths covered

□ [M] Validation failures covered

□ [M] Error paths covered

□ [M] Edge cases covered

□ [M] Tests deterministic

□ [M] Tests isolated

□ [M] No external dependencies

---

## Integration Tests

□ [M] Repository behavior validated

□ [M] Infrastructure integrations validated

□ [R] Database behavior validated

---

## End-to-End Tests

□ [M] Controllers tested

□ [M] Authentication tested

□ [M] Validation tested

□ [M] Error handling tested

□ [M] Main user flows tested

---

### Testing Score

___ / 10

---

# Part V — API Checklist

---

## REST Standards

□ [M] Resources use nouns

□ [M] HTTP verbs used correctly

□ [M] Status codes correct

□ [M] Error responses standardized

□ [M] Pagination supported

---

## Validation

□ [M] DTOs validated

□ [M] Zod schemas implemented

□ [M] Input validation centralized

□ [M] Invalid payloads rejected

---

## Documentation

□ [M] Swagger updated

□ [M] Request examples documented

□ [M] Response examples documented

□ [M] Error responses documented

---

### API Score

___ / 10

---

# Part VI — Database Checklist

---

## Schema Design

□ [M] Naming conventions respected

□ [M] Primary keys defined

□ [M] Foreign keys defined

□ [M] Audit fields present

---

## Queries

□ [M] Queries reviewed

□ [M] No N+1 queries

□ [M] Pagination implemented

□ [M] Filters validated

---

## Migrations

□ [M] Migration created

□ [M] Migration reviewed

□ [M] Migration tested

□ [M] Rollback considered

---

## Indexes

□ [M] Required indexes created

□ [R] Index strategy reviewed

---

### Database Score

___ / 10

---

# Part VII — Security Checklist

---

## Authentication

□ [M] Authentication required

□ [M] JWT validation implemented

□ [M] Secrets externalized

---

## Authorization

□ [M] Access controls reviewed

□ [M] Protected endpoints secured

□ [M] Unauthorized access rejected

---

## Input Protection

□ [M] Validation implemented

□ [M] Injection attacks prevented

□ [M] Sensitive data protected

---

## Logging

□ [M] No secrets logged

□ [M] No credentials logged

□ [M] No personal data exposed

---

### Security Score

___ / 10

---

# Part VIII — AI Integration Checklist

---

## Architecture

□ [M] AI isolated from business rules

□ [M] Provider abstraction respected

□ [M] AI implementation replaceable

---

## Prompt Design

□ [M] Prompt versioned

□ [M] Prompt documented

□ [M] Prompt reviewed

---

## Structured Outputs

□ [M] Structured output used when available

□ [M] Output validation implemented

□ [M] Invalid responses handled

---

## Reliability

□ [M] Timeout configured

□ [M] Error handling implemented

□ [M] Logging implemented

□ [R] Cache strategy evaluated

---

### AI Score

___ / 10

---

# Part IX — Production Checklist

---

## Observability

□ [M] Structured logging implemented

□ [M] Error logging implemented

□ [M] Request logging implemented

□ [M] Correlation ID implemented

---

## Monitoring

□ [M] Health endpoint available

□ [M] Monitoring configured

□ [M] Alerts configured

---

## Reliability

□ [M] Graceful shutdown implemented

□ [M] Failure scenarios reviewed

□ [M] Recovery strategy documented

---

### Production Score

___ / 10

---

# Part X — Release Checklist

---

## Release Readiness

□ [M] Build successful

□ [M] Tests passing

□ [M] Lint passing

□ [M] Documentation updated

□ [M] Environment variables validated

---

## Deployment

□ [M] Deployment plan validated

□ [M] Rollback plan validated

□ [M] Migration plan validated

□ [M] Monitoring verified

---

## Approval

□ [M] Technical approval obtained

□ [M] Architecture approval obtained

□ [M] Release approved

---

### Release Score

___ / 10

---

# Part XI — Definition of Ready

A work item is considered Ready when:

□ [M] Requirement understood

□ [M] Business rules identified

□ [M] Acceptance criteria defined

□ [M] Dependencies identified

□ [M] Scope understood

□ [M] Architecture impact evaluated

□ [M] Open questions resolved

---

# Part XII — Definition of Done

A work item is considered Done when:

□ [M] Requirements implemented

□ [M] Business rules validated

□ [M] Tests passing

□ [M] Documentation updated

□ [M] Architecture respected

□ [M] Security reviewed

□ [M] Production standards satisfied

□ [M] Code reviewed

□ [M] Approved for release

---

# Engineering Quality Score

Architecture: ___ / 10

Development: ___ / 10

Review: ___ / 10

Testing: ___ / 10

API: ___ / 10

Database: ___ / 10

Security: ___ / 10

AI: ___ / 10

Production: ___ / 10

Release: ___ / 10

---

# Final Approval

□ Approved

□ Approved with Conditions

□ Rejected

---

# Comments

---

---

---

---

# End of Engineering Checklist

Version: 1.0.0

Status: Approved

Document Type: Engineering Standard
