---
name: typescript-runtime-validation
description: Add runtime validation for untrusted data (JSON/config/OAuth/API/content metadata) while keeping TypeScript types honest.
license: MIT
metadata:
  author: jburditt/fullswing-angular-library
  version: '1.0'
---

# TypeScript Runtime Validation

Use this skill when handling data that comes from outside the TypeScript compiler’s guarantees.

## Activation criteria

Trigger this skill when code consumes:
- OAuth/user profile payloads (`projects/fullswing-angular-library/src/auth/oauth.service.ts`)
- configuration JSON (`projects/fullswing-angular-library/src/services/config/*.ts`)
- HTTP/API responses
- blog/content metadata JSON (`projects/fullswing-blog/public/data.json`) and markdown-related metadata wiring (`projects/fullswing-blog/src/app/db/db.ts`)

## Workflow (repeatable)

1. **Mark external input as `unknown`** immediately.
2. **Validate at boundary** before mapping into app/library types.
3. **Use existing dependencies first**; add a new validation dependency only when local guards become unmaintainable.
4. **Return useful failures**:
   - include which field failed and why
   - avoid opaque errors like “invalid data”
5. **Map validated data** into explicit domain types used internally.
6. **Add/adjust tests** for valid and invalid payload paths.

## Validation guidance

- TypeScript interfaces alone do not validate runtime JSON.
- Prefer small local guard functions for simple shapes.
- For complex nested payloads, centralize schema/guard logic and reuse it.
- Keep validation close to ingestion boundaries, not scattered in components.

## Sidecar metadata considerations

For markdown/JSON metadata flows, ensure:
- required fields are present (`route`, `title`, etc.)
- date/category formats are validated before use
- route keys are normalized consistently
- malformed entries produce actionable diagnostics

## Anti-patterns

- casting untrusted data with `as` and skipping checks
- validating only some fields while treating the rest as trusted
- forcing a new runtime validation package for trivial checks
- swallowing validation errors and continuing with partial data silently

## Verification checklist

- [ ] External data starts as `unknown`.
- [ ] Validation occurs before domain mapping.
- [ ] Error messages identify failing fields/records.
- [ ] Tests cover success and failure cases for touched validators.
- [ ] Commands run:
  - `npx tsc --noEmit`
  - relevant `ng build <project>`
  - targeted tests for validation logic
