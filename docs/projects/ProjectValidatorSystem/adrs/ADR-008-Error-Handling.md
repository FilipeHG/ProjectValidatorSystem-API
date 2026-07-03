# ADR-008 — Error Handling Strategy

> Architecture Decision Record

---

| Property        | Value                                    |
| --------------- | ---------------------------------------- |
| ADR             | 008                                      |
| Title           | Error Handling Strategy                  |
| Status          | Accepted                                 |
| Date            | 2026-07-02                               |
| Decision Makers | ProjectValidatorSystem Architecture Team |
| Supersedes      | None                                     |
| Superseded By   | None                                     |

---

# Context

The Project Validator System exposes REST APIs that must provide predictable, standardized and observable error responses.

The system contains multiple error sources:

* Validation failures
* Authentication failures
* Business rule violations
* Database failures
* AI provider failures
* Unexpected runtime exceptions

Without a unified strategy:

* Clients receive inconsistent responses
* Monitoring becomes difficult
* Debugging becomes expensive
* API contracts become unstable

The project requires a single error handling model.

This ADR aligns with:

* ADR-001 Official Architecture
* ADR-004 Validation Strategy
* ADR-005 Authentication Strategy
* ADR-006 AI Integration Strategy
* ADR-007 Testing Strategy

---

# Problem Statement

Modern APIs frequently suffer from:

* Multiple error formats
* Controller-specific error handling
* Framework-generated responses
* Inconsistent status codes
* Missing diagnostics

Examples:

```text id="adr008a"
Controller A returns:

{
  "message": "Invalid data"
}
```

---

```text id="adr008b"
Controller B returns:

{
  "error": true
}
```

---

```text id="adr008c"
Controller C returns:

{
  "errors": [...]
}
```

---

This inconsistency creates:

* Client complexity
* Documentation ambiguity
* Integration problems

---

# Decision

The Project Validator System shall adopt:

```text id="adr008d"
RFC7807 Problem Details
```

as the official error contract.

All errors must be normalized through:

```text id="adr008e"
Global Exception Filter
```

---

# Error Handling Philosophy

Errors are part of the API contract.

Error responses must be:

* Predictable
* Standardized
* Traceable
* Observable

Clients should always know:

* What failed
* Why it failed
* What type of failure occurred

---

# Decision 1 — RFC7807

---

## Selected

```text id="adr008f"
RFC7807
Problem Details
```

---

# Why

Benefits:

✓ Industry standard

✓ Consistent format

✓ Self-describing

✓ Easy client integration

✓ Better documentation

---

# Standard Response Shape

```json id="adr008g"
{
  "type": "",
  "title": "",
  "status": 400,
  "detail": "",
  "instance": ""
}
```

---

# Decision 2 — Global Exception Filter

---

## Selected

```text id="adr008h"
Global Exception Filter
```

---

# Why

Benefits:

✓ Centralized handling

✓ Consistent responses

✓ Reduced duplication

✓ Easier maintenance

---

# Ownership

Exception handling belongs to:

```text id="adr008i"
Presentation Layer
```

through:

```text id="adr008j"
Global Filters
```

---

# Controllers

Controllers must never manually build error payloads.

---

# Decision 3 — Validation Errors

---

## Source

```text id="adr008k"
ZodValidationPipe
```

---

# HTTP Status

```text id="adr008l"
400 Bad Request
```

---

# Example

```json id="adr008m"
{
  "type": "validation-error",
  "title": "Validation Error",
  "status": 400,
  "detail": "orcamentoTotal must be greater than zero."
}
```

---

# Decision 4 — Authentication Errors

---

## Source

```text id="adr008n"
JwtAuthGuard
```

---

# HTTP Status

```text id="adr008o"
401 Unauthorized
```

---

# Examples

* Missing token
* Invalid token
* Invalid signature
* Invalid claims

---

# Example

```json id="adr008p"
{
  "type": "authentication-error",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Authentication token is invalid."
}
```

---

# Decision 5 — Authorization Errors

---

## Reserved

Version 1 does not implement authorization.

However the standard is defined.

---

# HTTP Status

```text id="adr008q"
403 Forbidden
```

---

# Future Examples

* Missing permission
* Role violation
* Scope violation

---

# Decision 6 — Resource Not Found

---

## HTTP Status

```text id="adr008r"
404 Not Found
```

---

# Example

```json id="adr008s"
{
  "type": "resource-not-found",
  "title": "Project Not Found",
  "status": 404,
  "detail": "Project was not found."
}
```

---

# Decision 7 — Business Rule Violations

---

## Source

Domain Layer

---

# HTTP Status

```text id="adr008t"
409 Conflict
```

---

# Examples

```text id="adr008u"
Invalid Status Transition

Deletion Not Allowed

Lifecycle Violation
```

---

# Example

```json id="adr008v"
{
  "type": "business-rule-violation",
  "title": "Business Rule Violation",
  "status": 409,
  "detail": "Project cannot be deleted while active."
}
```

---

# Decision 8 — Infrastructure Failures

---

## Sources

```text id="adr008w"
Database

Supabase

Gemini

External Services
```

---

# HTTP Status

```text id="adr008x"
503 Service Unavailable
```

---

# Examples

```text id="adr008y"
Database Offline

Gemini Timeout

Provider Failure
```

---

# Why

The problem is temporary.

The client request may succeed later.

---

# Decision 9 — Unexpected Errors

---

## Source

Unhandled Exceptions

---

# HTTP Status

```text id="adr008z"
500 Internal Server Error
```

---

# Example

```json id="adr008aa"
{
  "type": "internal-error",
  "title": "Internal Server Error",
  "status": 500,
  "detail": "Unexpected system error."
}
```

---

# Decision 10 — Domain Exceptions

---

## Selected

Business failures should use:

```text id="adr008ab"
Domain Exceptions
```

---

# Examples

```text id="adr008ac"
ProjectDeletionNotAllowedException

InvalidStatusTransitionException

RiskCalculationException
```

---

# Why

Benefits:

✓ Explicit business failures

✓ Easier testing

✓ Better readability

---

# Decision 11 — Infrastructure Exceptions

---

## Selected

Infrastructure failures should use:

```text id="adr008ad"
Infrastructure Exceptions
```

---

# Examples

```text id="adr008ae"
DatabaseConnectionException

AiProviderException

RepositoryException
```

---

# Why

Separates technical failures from business failures.

---

# Decision 12 — AI Error Strategy

---

## Selected

AI failures are infrastructure failures.

---

# Examples

```text id="adr008af"
Timeout

Rate Limit

Invalid Response

Provider Offline
```

---

# HTTP Status

```text id="adr008ag"
503 Service Unavailable
```

---

# Example

```json id="adr008ah"
{
  "type": "ai-provider-error",
  "title": "AI Provider Failure",
  "status": 503,
  "detail": "Unable to generate project analysis."
}
```

---

# Decision 13 — Correlation IDs

---

## Selected

Every request should have:

```text id="adr008ai"
Correlation ID
```

---

# Purpose

Benefits:

✓ Request tracking

✓ Easier debugging

✓ Better observability

---

# Example

```text id="adr008aj"
X-Correlation-Id
```

---

# Decision 14 — Logging Strategy

---

## Selected

All errors must be logged.

---

# Required Information

```text id="adr008ak"
Timestamp

CorrelationId

Error Type

Status Code

Message

Stack Trace
```

---

# Never Log

```text id="adr008al"
Passwords

JWT Secrets

API Keys

Sensitive Data
```

---

# Decision 15 — Stack Traces

---

## Development

Allowed.

---

## Production

Hidden from clients.

Logged internally only.

---

# Example

Client receives:

```json id="adr008am"
{
  "type": "internal-error",
  "title": "Internal Server Error",
  "status": 500
}
```

---

Internal logs contain:

```text id="adr008an"
Full Stack Trace
```

---

# Decision 16 — Empty Result Strategy

---

## Selected

Collections returning no data are NOT errors.

---

# Example

```http id="adr008ao"
GET /projects
```

---

Response:

```json id="adr008ap"
[]
```

---

HTTP:

```text id="adr008aq"
200 OK
```

---

# Why

Empty collections are valid results.

---

# Decision 17 — Exception Ownership

---

## Controllers

Controllers should:

```text id="adr008ar"
Throw Exceptions
```

or allow exceptions to propagate.

---

Controllers should not:

```text id="adr008as"
Try/Catch Everything
```

---

# Why

Global filters own response normalization.

---

# Decision 18 — Testing Requirements

---

## Unit Tests

Validate:

✓ Domain Exceptions

✓ Infrastructure Exceptions

✓ Error Mapping

---

## E2E Tests

Validate:

✓ RFC7807 Format

✓ Status Codes

✓ Validation Failures

✓ Authentication Failures

✓ Business Rule Violations

---

# Decision 19 — Error Categories

---

## Official Categories

```text id="adr008at"
Validation

Authentication

Authorization

NotFound

Business

Infrastructure

Unexpected
```

---

These categories define all supported failures.

---

# Consequences

Positive:

✓ Consistent API

✓ Easier integrations

✓ Better observability

✓ Better monitoring

✓ Easier testing

✓ Better documentation

---

Negative:

✓ Additional exception classes

✓ Additional filter implementation

These trade-offs are acceptable.

---

# Compliance Rules

All errors must:

✓ Follow RFC7807

✓ Pass through Global Exception Filter

✓ Be logged

✓ Use proper status codes

---

The following are forbidden:

```text id="adr008au"
Custom Error Formats

Controller-specific Error Responses

Raw Stack Traces

Silent Failures

Swallowed Exceptions
```

---

# Final Decision

The official error handling strategy of Project Validator System is:

```text id="adr008av"
RFC7807

+

Global Exception Filter

+

Domain Exceptions

+

Infrastructure Exceptions

+

Correlation IDs

+

Structured Logging
```

This decision is accepted and becomes part of the architectural baseline.

---

# References

* ADR-001 Official Architecture
* ADR-004 Validation Strategy
* ADR-005 Authentication Strategy
* ADR-006 AI Integration Strategy
* Project API Standards
* Project Testing Standards

---

# End of ADR-008

Status: Accepted

Decision: Error Handling Strategy Established
