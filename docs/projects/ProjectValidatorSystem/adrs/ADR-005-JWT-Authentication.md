# ADR-005 — JWT Authentication Strategy

> Architecture Decision Record

---

| Property        | Value                                    |
| --------------- | ---------------------------------------- |
| ADR             | 005                                      |
| Title           | JWT Authentication Strategy              |
| Status          | Accepted                                 |
| Date            | 2026-07-02                               |
| Decision Makers | ProjectValidatorSystem Architecture Team |
| Supersedes      | None                                     |
| Superseded By   | None                                     |

---

# Context

The Project Validator System exposes protected REST endpoints.

The system requires an authentication mechanism capable of providing:

* Request protection
* Stateless operation
* Simplicity
* Easy implementation
* Easy testing
* Low operational complexity

The project does not require:

* User registration
* Login screens
* Identity providers
* Role-based access control
* Multi-user management

for Version 1.

---

# Problem Statement

The API cannot remain publicly accessible.

A mechanism is required to:

* Authenticate requests
* Prevent anonymous access
* Demonstrate authentication architecture
* Preserve simplicity

The authentication solution should align with:

* ADR-001 Official Architecture
* ADR-002 Technology Stack

---

# Decision

The Project Validator System shall adopt:

```text id="adr005a"
JWT Authentication
```

using:

```text id="adr005b"
Bearer Token

+

NestJS Auth Guard

+

Static Token Strategy
```

for Version 1.

---

# Authentication Philosophy

Authentication exists to:

* Protect endpoints
* Validate callers
* Establish trust

Authentication does not imply:

* User management
* Authorization
* Identity management

These concerns are intentionally out of scope.

---

# Decision 1 — JWT

---

## Selected

```text id="adr005c"
JSON Web Token (JWT)
```

---

## Why

Benefits:

✓ Stateless

✓ Widely adopted

✓ Easy integration

✓ Framework support

✓ Easy testing

✓ No server-side session storage

---

# Rejected Alternative — Session Authentication

---

## Rejected

```text id="adr005d"
Session-Based Authentication
```

---

## Reason

Introduces:

* Session storage
* Additional infrastructure
* Stateful behavior

Unnecessary for project scope.

---

# Rejected Alternative — OAuth2

---

## Rejected

```text id="adr005e"
OAuth2
```

---

## Reason

Introduces:

* Additional complexity
* Identity providers
* Authorization flows

Not required for Version 1.

---

# Rejected Alternative — API Keys

---

## Rejected

```text id="adr005f"
API Key Authentication
```

---

## Reason

JWT provides:

* Better structure
* Better extensibility
* Standardized ecosystem support

---

# Decision 2 — Static Token Strategy

---

## Selected

Version 1 uses:

```text id="adr005g"
Single Static JWT Token
```

---

## Why

The objective of Version 1 is:

* Authentication validation
* Architecture demonstration
* API protection

Not user management.

---

# Consequences

Positive:

✓ Extremely simple

✓ Easy testing

✓ No login endpoint required

✓ No user database required

---

Negative:

✓ Not suitable for enterprise production

Acceptable for project scope.

---

# JWT Payload

---

# Required Claims

The token payload must contain:

```json id="adr005h"
{
  "project": "ProjectValidatorSystem",
  "user": "FilipeHG",
  "email": "filipeh.goncalves@gmail.com"
}
```

---

# Additional Claims

Recommended:

```json id="adr005i"
{
  "iss": "ProjectValidatorSystem",
  "aud": "ProjectValidatorSystem"
}
```

---

# Purpose

Claims provide:

* Context
* Traceability
* Validation

---

# Token Expiration

---

# Selected

```text id="adr005j"
100 years
```

---

# Why

Version 1 intentionally prioritizes:

* Simplicity
* Reduced operational complexity

---

# Important Note

This decision is:

```text id="adr005k"
Project-specific
```

and should not be considered a general production recommendation.

---

# Future Evolution

Future versions may implement:

* Short-lived tokens
* Refresh tokens
* Identity providers

---

# Decision 3 — Authorization Header

---

## Official Format

```http id="adr005l"
Authorization: Bearer <token>
```

---

# Validation Requirement

All protected endpoints must validate:

* Presence
* Signature
* Claims

---

# Decision 4 — NestJS Guard

---

## Selected

```text id="adr005m"
JwtAuthGuard
```

---

# Responsibilities

The guard must:

✓ Read Authorization header

✓ Validate JWT

✓ Extract claims

✓ Reject invalid requests

---

# Guard Ownership

Authentication belongs to:

```text id="adr005n"
Presentation Layer
```

through:

```text id="adr005o"
Guards
```

---

# Reason

Authentication is an HTTP concern.

It is not a business concern.

---

# Decision 5 — Protected Endpoints

---

## Protected

All project endpoints.

```text id="adr005p"
POST   /projects

GET    /projects

GET    /projects/:id

PATCH  /projects/:id

DELETE /projects/:id

PATCH  /projects/:id/status

GET    /projects/:id/ai-analysis
```

---

## Public

Health endpoint only.

```text id="adr005q"
GET /health
```

---

# Decision 6 — Secret Management

---

## Selected

JWT secrets must be externalized.

---

# Environment Variable

```text id="adr005r"
JWT_SECRET
```

---

# Forbidden

Never store secrets in:

```text id="adr005s"
Source Code

Git Repository

README

Swagger Examples
```

---

# Decision 7 — Error Handling

---

# Missing Token

Response:

```text id="adr005t"
401 Unauthorized
```

---

# Invalid Token

Response:

```text id="adr005u"
401 Unauthorized
```

---

# Invalid Claims

Response:

```text id="adr005v"
401 Unauthorized
```

---

# Forbidden Access

Future versions may return:

```text id="adr005w"
403 Forbidden
```

for authorization failures.

---

# Error Format

Official format:

```text id="adr005x"
RFC7807
```

---

# Example

```json id="adr005y"
{
  "type": "authentication-error",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Invalid authentication token."
}
```

---

# Decision 8 — Authorization Scope

---

## Selected

Version 1 implements:

```text id="adr005z"
Authentication Only
```

---

## Not Implemented

```text id="adr005aa"
RBAC

Roles

Permissions

Scopes

Claims-based Authorization
```

---

# Reason

No business requirement currently exists.

---

# Future Evolution

Potential future ADR:

```text id="adr005ab"
ADR-00X

Authorization Strategy
```

---

# Testing Requirements

---

# Unit Tests

Validate:

✓ Token validation

✓ Claim extraction

✓ Invalid token rejection

---

# E2E Tests

Validate:

✓ Valid token

✓ Missing token

✓ Invalid token

✓ Protected endpoints

---

# Compliance Rules

Every protected endpoint must:

✓ Require JWT

✓ Use JwtAuthGuard

✓ Validate claims

✓ Return RFC7807 errors

---

The following are forbidden:

```text id="adr005ac"
Anonymous access

Hardcoded secrets

Controller-based authentication

Authentication inside Use Cases

Authentication inside Domain
```

---

# Consequences

Positive:

✓ Simple architecture

✓ Stateless authentication

✓ Easy testing

✓ Low maintenance cost

✓ Clear separation of concerns

---

Negative:

✓ Single token strategy

✓ No user management

✓ No authorization model

Acceptable for Version 1.

---

# Final Decision

The official authentication strategy of Project Validator System is:

```text id="adr005ad"
JWT Authentication

+

Bearer Token

+

NestJS JwtAuthGuard

+

Static Token Strategy
```

All API endpoints must follow this strategy.

This decision is accepted and becomes part of the architectural baseline.

---

# References

* ADR-001 Official Architecture
* ADR-002 Technology Stack
* ADR-004 Validation Strategy
* Project API Standards
* Project Specification

---

# End of ADR-005

Status: Accepted

Decision: JWT Authentication Strategy Established
