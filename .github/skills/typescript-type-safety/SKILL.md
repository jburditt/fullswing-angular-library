---
name: typescript-type-safety
description: Strengthen type safety with practical patterns for unknown data, narrowing, unions, generics, and exhaustive handling.
license: MIT
metadata:
  author: jburditt/fullswing-angular-library
  version: '1.0'
---

# TypeScript Type Safety

Use this skill when adding or refactoring TypeScript types in existing code paths.

## Activation criteria

Trigger this skill when you encounter:
- unjustified `any` in app/library code (for example OAuth/config services)
- untyped JSON or HTTP data mapped directly into models
- weak unions, optional-property ambiguity, or unsafe index-signature access

## Workflow (repeatable)

1. **Find unsound edges**: identify `any`, assertions, unsafe dictionary reads, and broad return types.
2. **Model trust boundaries as `unknown`**:
   - external OAuth/API/config/content data starts as `unknown`
   - narrow via type guards before use
3. **Refine internal types**:
   - use discriminated unions for variant states
   - use constrained generics for reusable helpers
   - require explicit return types on exported functions/public methods
4. **Handle completeness**:
   - enforce exhaustive `switch` handling (`never` checks for union exhaustiveness)
   - model optional vs required properties intentionally
5. **Run targeted validation commands**.

## Preferred patterns

- `Record<string, unknown>` over `{ [key: string]: any }`
- small reusable type guards for repeated external payload checks
- `unknown` in `catch` paths, then normalize to structured error/log payloads
- narrow index-signature access with existence checks before property use

## Repository-specific focus

- `projects/fullswing-angular-library/src/auth/oauth.service.ts`
- `projects/fullswing-angular-library/src/services/config/*.ts`
- `projects/fullswing-blog/src/app/db/db.ts` and metadata ingestion paths

## Anti-patterns

- replacing `any` with `as SomeType` without guard/validation
- broadening APIs with `string | any` to bypass compiler feedback
- leaking internal helper types into public exports accidentally
- treating optional properties as always present

## Verification checklist

- [ ] No new unjustified `any` introduced.
- [ ] External values typed as `unknown` before narrowing.
- [ ] Exported/public members have explicit return types where useful for API clarity.
- [ ] Union branches are exhaustively handled.
- [ ] Commands run:
  - `npx tsc --noEmit`
  - relevant `ng build <project>`
  - targeted tests for changed behavior
