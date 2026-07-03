# Project Validator System API Standards

> API Design and Implementation Standards

---

| Property | Value                                                        |
| -------- | ------------------------------------------------------------ |
| Document | Project Validator System API Standards                       |
| Version  | 1.0.0                                                        |
| Status   | Approved                                                     |
| Type     | API Standard                                                 |
| Audience | Software Engineers, Software Architects and AI Coding Agents |

---

# Purpose

This document defines the official API standards for Project Validator System.

Its purpose is to guarantee:

* Consistency
* Predictability
* Maintainability
* Documentation quality

All HTTP endpoints must follow this standard.

---

# Part I — API Overview

---

# 1. API Style

Official style:

```text id="cnj1xt"
REST
```

---

# 2. Protocol

Official protocol:

```text id="db4kpo"
HTTPS
```

---

# 3. Payload Format

Official format:

```text id="nfg1yq"
JSON
```

---

# 4. Character Encoding

Official encoding:

```text id="s7e4p4"
UTF-8
```

---

# Part II — REST Standards

---

# 5. Resource-Oriented Design

Endpoints must represent resources.

Good:

```text id="yiz4vx"
/projects
```

Bad:

```text id="w9nhw6"
/createProject

/getProject

/updateProject
```

---

# 6. HTTP Verbs

| Verb   | Purpose        |
| ------ | -------------- |
| POST   | Create         |
| GET    | Read           |
| PATCH  | Partial Update |
| DELETE | Delete         |

---

# 7. Idempotency

GET

Must be idempotent.

---

PATCH

Should be idempotent whenever possible.

---

DELETE

Should be idempotent.

---

# Part III — URL Standards

---

# 8. Base URL

```text id="4q4ezj"
/api/v1
```

---

# 9. Resource Naming

Use:

```text id="9vbgbw"
plural nouns
```

Example:

```text id="pwzgtf"
/projects
```

---

# 10. URL Case

Use:

```text id="1n0k0l"
kebab-case
```

Example:

```text id="d4yqgj"
/project-analysis
```

---

# 11. Path Parameters

Example:

```text id="wjlwmw"
/projects/:id
```

---

# 12. Query Parameters

Example:

```text id="cphrx5"
/projects?page=1&limit=20
```

---

# Part IV — Request Standards

---

# 13. Content Type

Required:

```text id="t2dhq5"
application/json
```

---

# 14. Create Project Request

Example:

```json id="cjk8av"
{
  "nome": "ERP Migration",
  "dataDeInicio": "2026-01-01",
  "previsaoDeTermino": "2026-06-01",
  "orcamentoTotal": 250000,
  "descricao": "Migration project"
}
```

---

# 15. Update Project Request

Partial updates are allowed.

Only provided fields should be modified.

---

# Part V — Response Standards

---

# 16. Success Responses

Standard:

```text id="7n4ch7"
200 OK
```

---

# 17. Creation Responses

Standard:

```text id="m0f6gr"
201 Created
```

---

# 18. Deletion Responses

Standard:

```text id="omwbzm"
204 No Content
```

---

# 19. Empty Collections

Return:

```json id="8f1yvw"
[]
```

Never:

```text id="n9g5uv"
404
```

---

# Part VI — Pagination Standards

---

# 20. Pagination Format

Preferred:

```text id="g7g1q7"
?page=1&limit=20
```

---

# 21. Optional Format

Supported:

```text id="immm1j"
?offset=0&limit=20
```

---

# 22. Default Limit

Recommended:

```text id="tz9zn0"
20
```

---

# 23. Maximum Limit

Recommended:

```text id="2rcl3n"
100
```

---

# Part VII — Authentication Standards

---

# 24. Authentication Method

Official mechanism:

```text id="aj74o2"
JWT
```

---

# 25. Header Format

```http id="6azl1s"
Authorization: Bearer <token>
```

---

# 26. Required Claims

```json id="lfyw8n"
{
  "project": "ProjectValidatorSystem",
  "user": "FilipeHG",
  "email": "filipeh.goncalves@gmail.com"
}
```

---

# 27. Protected Endpoints

All endpoints require authentication.

Exception:

```text id="r5rr4m"
/health
```

---

# Part VIII — Error Standards

---

# 28. Official Format

RFC7807

---

# 29. Validation Errors

```text id="khqf3f"
400 Bad Request
```

---

# 30. Authentication Errors

```text id="lrk9ko"
401 Unauthorized
```

---

# 31. Authorization Errors

```text id="sltnps"
403 Forbidden
```

---

# 32. Not Found Errors

```text id="k6r3js"
404 Not Found
```

---

# 33. Business Rule Errors

```text id="cxd38w"
409 Conflict
```

---

# 34. Infrastructure Errors

```text id="txyih6"
503 Service Unavailable
```

---

# 35. Unexpected Errors

```text id="cxl3xg"
500 Internal Server Error
```

---

# Part IX — Swagger Standards

---

# 36. Documentation Requirement

Every endpoint must be documented.

---

# 37. Required Documentation

Every endpoint must define:

✓ Summary

✓ Description

✓ Request DTO

✓ Response DTO

✓ Error Responses

---

# 38. Example Payloads

Swagger examples are mandatory.

---

# Part X — DTO Standards

---

# 39. DTO Philosophy

DTOs define contracts.

DTOs are not domain entities.

---

# 40. CreateProjectDto

Must contain:

```text id="x7pl3w"
nome

dataDeInicio

previsaoDeTermino

orcamentoTotal

descricao
```

---

# 41. UpdateProjectDto

All fields optional.

---

# 42. ChangeProjectStatusDto

Must contain:

```text id="lmf4j4"
status
```

---

# 43. DTO Validation

Validation source:

```text id="rk5z3z"
Drizzle

↓

drizzle-zod

↓

Zod

↓

DTO
```

---

# Part XI — Project Endpoints

---

# 44. Create Project

```http id="87jryr"
POST /projects
```

---

# 45. List Projects

```http id="i2bhm6"
GET /projects
```

---

# 46. Get Project

```http id="5xjlwm"
GET /projects/:id
```

---

# 47. Update Project

```http id="ql9f3h"
PATCH /projects/:id
```

---

# 48. Delete Project

```http id="0sbrnp"
DELETE /projects/:id
```

---

# 49. Change Status

```http id="m68jta"
PATCH /projects/:id/status
```

---

# 50. AI Analysis

```http id="lt1t24"
GET /projects/:id/ai-analysis
```

---

# Part XII — Versioning Standards

---

# 51. Version Strategy

Use:

```text id="mcld3r"
/api/v1
```

---

# 52. Breaking Changes

Require:

New version.

Example:

```text id="dqu3ls"
/api/v2
```

---

# Part XIII — Acceptance Rules

---

# 53. API Compliance

An endpoint is compliant only when:

✓ Authenticated

✓ Validated

✓ Documented

✓ Tested

✓ Versioned

---

# 54. Endpoint Completion Criteria

An endpoint is complete only when:

✓ Controller implemented

✓ DTO implemented

✓ Validation implemented

✓ Swagger documented

✓ Unit Tests passing

✓ E2E Tests passing

---

# End of Project Validator System API Standards

Version: 1.0.0

Status: Approved

Document Type: API Standard
