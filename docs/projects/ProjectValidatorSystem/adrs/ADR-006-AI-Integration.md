# ADR-006 — AI Integration Strategy

> Architecture Decision Record

---

| Property        | Value                                    |
| --------------- | ---------------------------------------- |
| ADR             | 006                                      |
| Title           | AI Integration Strategy                  |
| Status          | Accepted                                 |
| Date            | 2026-07-02                               |
| Decision Makers | ProjectValidatorSystem Architecture Team |
| Supersedes      | None                                     |
| Superseded By   | None                                     |

---

# Context

The Project Validator System includes a business requirement for generating AI-assisted project analysis.

The system must provide:

```text id="adr006a"
GET /projects/:id/ai-analysis
```

This endpoint should generate:

* Project Summary
* Attention Points
* Executive Recommendation

based on project information stored in the database.

The architecture must support:

* Provider replacement
* Testability
* Isolation
* Maintainability
* Structured responses

The solution must align with:

* ADR-001 Official Architecture
* ADR-002 Technology Stack
* ADR-003 Persistence Strategy
* ADR-004 Validation Strategy
* ADR-005 Authentication Strategy

---

# Problem Statement

AI integrations frequently introduce:

* Vendor lock-in
* Business logic leakage
* Tight coupling
* Difficult testing
* Unpredictable responses

Without architectural boundaries:

* Controllers call AI providers directly
* Prompts become scattered
* Providers become difficult to replace
* Testing becomes unreliable

The project requires a structured AI integration model.

---

# Decision

The Project Validator System shall adopt:

```text id="adr006b"
Provider-Isolated AI Architecture
```

using:

```text id="adr006c"
AiAnalysisService

↓

ProjectAnalysisPromptBuilder

↓

AiClient

↓

AI Provider SDK
```

The AI provider must remain replaceable.

---

# AI Philosophy

Artificial Intelligence is:

```text id="adr006d"
Infrastructure
```

It is not:

* Domain
* Business Logic
* Application Core

AI is considered an external dependency.

The business must continue to function even if the AI provider becomes unavailable.

---

# Decision 1 — AI Ownership

---

## Selected

AI belongs to:

```text id="adr006e"
Infrastructure Layer
```

---

# Why

AI providers are:

* External systems
* Vendor services
* Infrastructure dependencies

They are not part of the domain model.

---

# Consequences

Business rules remain independent from AI.

The domain can survive provider replacement.

---

# Decision 2 — Official Provider

---

## Selected

```text id="adr006f"
Google Gemini 1.5 Flash
```

---

# SDK

```text id="adr006g"
@google/generative-ai
```

---

# Why

Benefits:

✓ Generous free tier

✓ Large context window

✓ Structured Outputs

✓ Easy integration

✓ Good latency

✓ Good TypeScript support

---

# Decision 3 — Provider Isolation

---

## Selected

AI providers must be isolated behind:

```text id="adr006h"
AiClient
```

---

# Why

Benefits:

✓ Provider replacement

✓ Easier testing

✓ Reduced coupling

✓ Better maintainability

---

# Architecture

```text id="adr006i"
AiAnalysisService

↓

AiClient

↓

Gemini
```

---

# Future Example

```text id="adr006j"
AiAnalysisService

↓

AiClient

↓

OpenAI
```

No changes required in:

* Domain
* Controllers
* Use Cases

---

# Decision 4 — Prompt Builder Pattern

---

## Selected

```text id="adr006k"
ProjectAnalysisPromptBuilder
```

---

# Responsibilities

Prompt Builder owns:

✓ Prompt construction

✓ Project context formatting

✓ AI instruction generation

---

# It does NOT own

✗ HTTP calls

✗ Provider communication

✗ Response parsing

---

# Why

Separating prompts improves:

* Readability
* Testing
* Prompt versioning

---

# Example Flow

```text id="adr006l"
Project

↓

Prompt Builder

↓

Prompt String

↓

AiClient
```

---

# Decision 5 — AI Analysis Service

---

## Selected

```text id="adr006m"
AiAnalysisService
```

---

# Responsibilities

Owns:

✓ Orchestration

✓ Repository interaction

✓ Prompt generation

✓ AI invocation

✓ Response validation

---

# Flow

```text id="adr006n"
Repository

↓

Prompt Builder

↓

AiClient

↓

Response Validation

↓

API Response
```

---

# Why

Keeps Controllers extremely thin.

---

# Decision 6 — Structured Outputs

---

## Selected

```text id="adr006o"
Structured Outputs
```

---

# Why

Free-form AI responses are difficult to:

* Validate
* Test
* Parse

Structured Outputs provide:

✓ Predictability

✓ Validation

✓ Type safety

---

# Required Response Shape

```json id="adr006p"
{
  "resumoDoProjeto": "",
  "pontosDeAtencao": [],
  "recomendacaoExecutiva": ""
}
```

---

# Mandatory Validation

Every AI response must be validated before returning to the client.

---

# Decision 7 — Response Validation

---

## Selected

AI responses must pass through:

```text id="adr006q"
Zod Validation
```

---

# Why

AI providers are probabilistic systems.

Responses cannot be trusted blindly.

---

# Validation Flow

```text id="adr006r"
AI Response

↓

Zod Schema

↓

Validated Output

↓

Client
```

---

# Invalid Response

If validation fails:

```text id="adr006s"
AI Integration Error
```

must be generated.

---

# Decision 8 — Controller Restrictions

---

## Explicit Rule

Controllers must never:

```text id="adr006t"
Call Gemini

Call OpenAI

Build Prompts

Parse AI Responses
```

---

# Correct Flow

```text id="adr006u"
Controller

↓

Use Case

↓

AiAnalysisService
```

---

# Why

Controllers own HTTP concerns only.

---

# Decision 9 — Domain Restrictions

---

## Explicit Rule

Domain Layer must never depend on:

```text id="adr006v"
Gemini

OpenAI

Claude

Azure OpenAI
```

---

# Reason

AI is not business logic.

AI is infrastructure.

---

# Decision 10 — Failure Handling

---

## Selected

AI failures must be isolated.

---

# Examples

* Timeout
* Provider unavailable
* Invalid response
* Rate limit

---

# Business Impact

AI failure must never crash the application.

---

# Expected Behavior

Return:

```text id="adr006w"
503 Service Unavailable
```

or

```text id="adr006x"
AI Integration Error
```

depending on failure type.

---

# Logging Requirements

Every AI failure must be logged.

---

# Required Information

Log:

✓ Timestamp

✓ Correlation Id

✓ Provider

✓ Failure Type

---

Never log:

✗ API Keys

✗ Secrets

---

# Decision 11 — Configuration Management

---

## Selected

Provider credentials belong to:

```text id="adr006y"
Environment Variables
```

---

# Required Variable

```text id="adr006z"
GEMINI_API_KEY
```

---

# Forbidden

Never store:

```text id="adr006aa"
API Keys

Secrets

Tokens
```

inside:

* Source Code
* Git
* Documentation

---

# Decision 12 — Testing Strategy

---

## Unit Tests

Mock:

```text id="adr006ab"
AiClient
```

---

Validate:

✓ Prompt Generation

✓ Response Parsing

✓ Validation

✓ Failure Handling

---

## Integration Tests

Validate:

✓ AiClient Integration

✓ Response Mapping

---

## E2E Tests

Validate:

✓ Endpoint Contract

✓ Authentication

✓ Error Handling

---

# Decision 13 — AI Provider Replacement

---

## Explicit Goal

The system must support future migration to:

```text id="adr006ac"
OpenAI

Claude

Azure OpenAI

Local LLM
```

---

# Replacement Scope

Provider replacement should affect only:

```text id="adr006ad"
AiClient
```

and provider-specific infrastructure.

---

# No Changes Required

Provider replacement must not require modifications to:

✓ Domain

✓ Use Cases

✓ Controllers

✓ Repositories

---

# Consequences

Positive:

✓ Provider independence

✓ Easier testing

✓ Better maintainability

✓ Cleaner architecture

✓ Safer AI integration

---

Negative:

✓ Additional abstraction layer

✓ Additional classes

These trade-offs are acceptable.

---

# Compliance Rules

Every AI implementation must:

✓ Use AiAnalysisService

✓ Use ProjectAnalysisPromptBuilder

✓ Use AiClient

✓ Validate responses

✓ Log failures

---

The following are forbidden:

```text id="adr006ae"
AI calls in Controllers

AI calls in Domain

Prompts inside Controllers

Provider-specific business rules

Unvalidated AI responses
```

---

# Final Decision

The official AI integration strategy of Project Validator System is:

```text id="adr006af"
AiAnalysisService

↓

ProjectAnalysisPromptBuilder

↓

AiClient

↓

Google Gemini

↓

Structured Outputs

↓

Zod Validation
```

This decision is accepted and becomes part of the architectural baseline.

---

# References

* ADR-001 Official Architecture
* ADR-002 Technology Stack
* ADR-004 Validation Strategy
* Project Specification
* Project API Standards
* Project Testing Standards

---

# End of ADR-006

Status: Accepted

Decision: AI Integration Strategy Established
