---
name: typescript-api-design
description: Maintain stable, intentional TypeScript public APIs for the Angular library while allowing internal refactors.
license: MIT
metadata:
  author: jburditt/fullswing-angular-library
  version: '1.0'
---

# TypeScript API Design (Library-Focused)

Use this skill when changing exported types/classes/functions for `projects/fullswing-angular-library`.

## Activation criteria

Trigger this skill when work touches:
- `projects/fullswing-angular-library/src/public-api.ts`
- any exported interface/class used by library consumers
- provider/auth/config/logging contracts that may affect downstream apps

## Workflow (repeatable)

1. **Inventory public surface**:
   - review `projects/fullswing-angular-library/src/public-api.ts`
   - identify which touched symbols are part of consumer contract
2. **Separate contract from implementation**:
   - keep implementation-only helpers internal
   - export only stable abstractions intentionally
3. **Design for compatibility**:
   - additive changes preferred over breaking signature changes
   - if a break is required, document migration impact in PR notes/commit summary
4. **Cross-check representative usage**:
   - auth (`auth/oauth.service.ts`, auth provider/interceptor)
   - config service interfaces and providers
   - shared component and service exports
5. **Validate build/tests** before completion.

## API design guidance

- Keep public contracts narrow and explicit.
- Prefer interfaces/type aliases for contract clarity.
- Avoid exposing implementation details (private utility types, transient DTO shapes).
- Preserve naming and semantics of existing exported members unless explicitly changing contract version behavior.

## Breaking-change considerations

When changing public API behavior or signatures, document:
- what changed
- who is affected (consumer compile/runtime)
- migration path (new type, adapter, fallback, or deprecation window)

## Anti-patterns

- exporting internal helper types “for convenience”
- silent breaking changes to method signatures or required fields
- re-exporting deep internal modules instead of curated surface exports
- making broad API changes during unrelated refactors

## Verification checklist

- [ ] `public-api.ts` reviewed and intentionally updated (or intentionally unchanged).
- [ ] No accidental export surface expansion.
- [ ] Compatibility impact assessed and documented.
- [ ] Commands run:
  - `ng build fullswing-angular-library`
  - `npx tsc --noEmit`
  - targeted consumer-facing tests where applicable
