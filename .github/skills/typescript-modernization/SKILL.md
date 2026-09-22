---
name: typescript-modernization
description: Safely modernize existing TypeScript in this workspace while preserving Angular/library behavior and compatibility.
license: MIT
metadata:
  author: jburditt/fullswing-angular-library
  version: '1.0'
---

# TypeScript Modernization (Incremental + Safe)

Use this skill when you are modernizing existing TypeScript in `projects/fullswing-angular-library` or `projects/fullswing-blog` without changing product behavior.

## Use with existing Angular guidance

- This skill **complements** `.github/skills/angular-developer` and repo instructions.
- Keep Angular-specific architecture and style decisions intact while improving TypeScript quality.

## Activation criteria

Trigger this skill when you see:
- legacy `any` usage (for example `azureUserInfo: any` in `projects/fullswing-angular-library/src/auth/oauth.service.ts`)
- unsafe index access patterns (for example config lookups)
- mutable state that should be read-only by contract
- old syntax that can be upgraded without behavior changes

## Workflow (repeatable)

1. **Scope first**: change only the files needed for the task; avoid unrelated churn.
2. **Map runtime boundaries**: identify values from OAuth/config/HTTP/JSON before typing internals.
3. **Modernize incrementally**:
   - prefer `unknown` over `any` at trust boundaries
   - use narrowing/type guards before property access
   - use `readonly`, `as const`, and `satisfies` where they improve safety without breaking consumers
   - prefer optional chaining and nullish coalescing over brittle checks
4. **Preserve compatibility**:
   - do not change library exports or public signatures unless explicitly requested
   - for behavior-preserving refactors, keep call sites stable
5. **Validate each step** with targeted commands.

## Modernization rules

- Prefer precise types and helper aliases over broad object maps.
- Keep public mutable state minimal; expose read-only views where possible.
- Avoid aggressive tsconfig tightening in one large change; adopt flags incrementally with proof.
- Keep generated/third-party API models untouched unless task requires adaptation wrappers.

## Anti-patterns

- repo-wide type churn in a focused issue
- replacing `any` with incorrect concrete types without runtime proof
- non-null assertions (`!`) used to silence errors instead of modeling lifecycle/state
- changing Angular patterns or routing structure as part of TypeScript-only cleanup

## Verification checklist

- [ ] Changes are localized and behavior-preserving.
- [ ] Public library API remains compatible unless change is explicitly approved.
- [ ] `any` usage was reduced or justified.
- [ ] Validation commands completed:
  - `npx tsc --noEmit`
  - `ng build fullswing-angular-library`
  - `ng build fullswing-blog`
  - run targeted tests for touched areas (for example `ng test <project> --include=...`)
