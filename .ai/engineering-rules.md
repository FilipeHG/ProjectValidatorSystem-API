# Engineering Rules

> Quick Reference Rules for Software Engineers and AI Coding Agents

---

| Property | Value                                   |
| -------- | --------------------------------------- |
| Document | Engineering Rules                       |
| Version  | 1.0.0                                   |
| Status   | Approved                                |
| Type     | Engineering Rules                       |
| Audience | Software Engineers and AI Coding Agents |

---

# Purpose

This document is a condensed version of the Engineering Handbook.

It exists to provide fast decision-making guidance.

When in doubt:

Read the Handbook.

When speed is required:

Read these rules.

---

# Architecture Rules

## Always

✓ Respect the official architecture.

✓ Respect dependency direction.

✓ Keep Controllers thin.

✓ Keep Domain independent.

✓ Keep Infrastructure replaceable.

✓ Keep business rules inside Domain.

✓ Keep Use Cases focused.

✓ Keep responsibilities explicit.

---

## Never

✗ Mix architectural styles.

✗ Introduce new architectures without an ADR.

✗ Place business rules inside Controllers.

✗ Place SQL inside Controllers.

✗ Place infrastructure code inside Domain.

✗ Create circular dependencies.

✗ Create unnecessary layers.

---

# Dependency Rules

## Always

✓ Make dependencies explicit.

✓ Use constructor injection.

✓ Minimize coupling.

✓ Prefer composition over inheritance.

---

## Never

✗ Use Service Locator.

✗ Hide dependencies.

✗ Depend on concrete vendors inside business rules.

✗ Depend on frameworks inside Domain.

---

# Domain Rules

## Always

✓ Treat Domain as the heart of the application.

✓ Keep business rules close to the business model.

✓ Use Value Objects for meaningful concepts.

✓ Protect business invariants.

---

## Never

✗ Import NestJS into Domain.

✗ Import Drizzle into Domain.

✗ Import HTTP concerns into Domain.

✗ Import database concerns into Domain.

✗ Treat Entities as DTOs.

---

# Controller Rules

## Always

✓ Receive requests.

✓ Validate requests.

✓ Call Use Cases.

✓ Return responses.

---

## Never

✗ Execute SQL.

✗ Implement business rules.

✗ Call AI providers directly.

✗ Contain orchestration logic.

✗ Become fat controllers.

---

# Repository Rules

## Always

✓ Use repositories for persistence.

✓ Keep repository responsibilities focused.

✓ Model repository operations around business concepts.

---

## Never

✗ Implement business rules.

✗ Call external APIs.

✗ Create GenericRepository.

✗ Create BaseRepository.

✗ Create CrudRepository.

---

# Service Rules

## Always

✓ Create services when behavior has a clear owner.

✓ Keep services cohesive.

✓ Keep services focused.

---

## Never

✗ Create services without responsibilities.

✗ Create services only to forward calls.

✗ Create God Services.

✗ Create Service Explosion.

---

# Interface Rules

## Always

✓ Create interfaces when multiple implementations exist.

✓ Create interfaces when replacement is expected.

✓ Create interfaces when testing benefits are clear.

---

## Never

✗ Create interfaces automatically.

✗ Create interfaces for every class.

✗ Create speculative abstractions.

---

# Folder Rules

## Always

✓ Organize by responsibility.

✓ Keep folder structures predictable.

✓ Keep folder structures simple.

---

## Never

✗ Create folders just in case.

✗ Create folders without ownership.

✗ Create meaningless structures.

Forbidden examples:

```text id="nx84em"
helpers/

misc/

common/

manager/

generic/

base/
```

---

# Validation Rules

## Always

✓ Validate all external input.

✓ Validate at application boundaries.

✓ Use Zod as the validation standard.

✓ Prefer a single source of truth.

---

## Never

✗ Trust external input.

✗ Duplicate validation logic unnecessarily.

✗ Skip validation.

---

# Error Handling Rules

## Always

✓ Standardize error responses.

✓ Separate business errors from infrastructure errors.

✓ Log unexpected failures.

✓ Follow RFC7807 whenever applicable.

---

## Never

✗ Swallow exceptions.

✗ Return internal stack traces.

✗ Leak implementation details.

---

# Security Rules

## Always

✓ Validate input.

✓ Externalize secrets.

✓ Protect endpoints.

✓ Review dependencies.

✓ Sanitize outputs.

---

## Never

✗ Hardcode credentials.

✗ Commit secrets.

✗ Log passwords.

✗ Log tokens.

✗ Expose sensitive information.

---

# Testing Rules

## Always

✓ Test business rules.

✓ Test happy paths.

✓ Test error paths.

✓ Test edge cases.

✓ Keep tests deterministic.

---

## Never

✗ Skip tests for critical behavior.

✗ Depend on external systems in unit tests.

✗ Test implementation details instead of behavior.

---

# AI Integration Rules

## Always

✓ Isolate AI integrations.

✓ Use provider abstractions.

✓ Version prompts.

✓ Validate AI responses.

✓ Log AI failures.

---

## Never

✗ Place AI calls in Controllers.

✗ Place AI calls in Domain.

✗ Depend directly on a specific AI vendor.

✗ Trust AI output without validation.

---

# Documentation Rules

## Always

✓ Update Swagger.

✓ Update README.

✓ Update ADRs when required.

✓ Document environment variables.

---

## Never

✗ Leave undocumented public APIs.

✗ Leave undocumented architectural decisions.

---

# Refactoring Rules

## Always

✓ Refactor incrementally.

✓ Preserve behavior.

✓ Add tests before major refactoring.

✓ Improve readability.

---

## Never

✗ Rewrite without justification.

✗ Mix refactoring with unrelated features.

✗ Introduce unnecessary abstractions.

---

# Production Rules

## Always

✓ Configure logging.

✓ Configure monitoring.

✓ Configure health checks.

✓ Validate deployment plans.

✓ Validate rollback plans.

---

## Never

✗ Deploy without tests.

✗ Deploy without monitoring.

✗ Deploy without rollback procedures.

✗ Deploy undocumented changes.

---

# Simplicity Rules

When multiple valid solutions exist:

Choose the simplest one.

Evaluate:

1. Fewer responsibilities
2. Fewer abstractions
3. Fewer dependencies
4. Lower cognitive load
5. Easier maintenance

The simplest correct solution wins.

---

# Decision Protocol

Before creating anything ask:

1. Does this responsibility already exist?

2. Is a new abstraction truly needed?

3. Does this belong in the current layer?

4. Can this be simpler?

5. Does this improve maintainability?

If the answer is unclear:

Stop.

Reason.

Then implement.

---

# Golden Rules

1. Protect the architecture.

2. Protect maintainability.

3. Protect simplicity.

4. Respect responsibilities.

5. Respect dependency direction.

6. Respect business rules.

7. Avoid unnecessary complexity.

8. Optimize for future maintainers.

9. Generate only what is necessary.

10. Prefer clarity over cleverness.

---

# End of Engineering Rules

Version: 1.0.0

Status: Approved

Document Type: Engineering Rules
