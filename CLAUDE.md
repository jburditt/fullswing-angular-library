# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Coding Standards

Before writing or modifying any code, read all files in:
- `.github/instructions/` — coding standards and Angular best practices
- `.github/skills/` — Angular skill references (components, signals, forms, routing, testing, etc.)

## Workspace Structure

This is an Angular CLI workspace (`angular.json`) with three projects under `projects/`:

| Project | Type | Description |
|---|---|---|
| `fullswing-angular-library` | Library | Shared components and services (OAuth, forms, logging, toast, DI providers) |
| `fullswing-blog` | Application | SSR blog using Angular + markdown |
| `gamifyworkout` | Application | Fitness + RPG gamification app — **cloned separately** via `git clone https://github.com/jburditt/GamifyWorkout.git projects/gamifyworkout` |

## Commands

All commands run from the workspace root.

```bash
# Serve
ng serve gamifyworkout          # https://localhost:4200 (with SSL via prestart script)
ng serve fullswing-blog

# Build
ng build gamifyworkout
ng build fullswing-angular-library

# Test
ng test gamifyworkout           # Run all tests (Karma/Jasmine)
ng test gamifyworkout --include="**/gym.component.spec.ts"  # Single spec file

# Regenerate OpenAPI client (requires backend running at localhost:8080)
npx ng-openapi-gen --input http://localhost:8080/swagger/v1/swagger.json --output projects/gamifyworkout/src/app/api --exclude-tags Metadata

# Deploy GamifyWorkout to Azure Static Web Apps
npm run deploy
```

## Backend (GamifyWorkout only)

The .NET 9 API lives in `projects/gamifyworkout/api/`. Use the **"Run Backend API"** VS Code task to start it — do not run it in a hidden or shared terminal to avoid orphaned processes. Use **"Stop Backend API"** to shut it down. The API serves Swagger at `https://localhost:8080`.

## GamifyWorkout Architecture

### Frontend (`projects/gamifyworkout/src/app/`)

```
app/
├── api/                     # DO NOT EDIT — OpenAPI-generated services and models
│   ├── models/              # TypeScript interfaces matching backend DTOs
│   └── services/            # HTTP clients (GymService, ScheduleService, etc.)
├── core/
│   └── auth/                # AuthGuard, ApiAuthenticationService
├── features/
│   └── rpg/
│       ├── component/       # ManageGymComponent, GymEquipmentTableComponent, WeekContainerComponent
│       ├── model/           # Player, Warrior, Enemy, BaseCreature classes
│       └── store/           # NgRx: player.actions, player.reducer, hydration.reducer
└── modules/
    ├── inventory/           # GymPageComponent + AddGymEquipmentDialog
    └── schedule/            # WeekPageComponent, TodayScheduleComponent + dialogs
```

**Routing** (lazy-loaded):
- `/` → `HomePageComponent`
- `/inventory/gym` → `GymPageComponent`
- `/schedule/week` → `WeekPageComponent`
- `/schedule/today` → `TodayScheduleComponent`

**Path aliases** (defined in `tsconfig.app.json`):
- `@app/*` → `src/app/*`
- `@features/*` → `src/app/features/*`
- `fullswing-angular-library` → `projects/fullswing-angular-library/src/public-api`

**NgRx store** manages `PlayerState` (hp, maxHp, mp, maxMp, experience, level). The hydration meta-reducer exists but is currently commented out.

**`fullswing-angular-library`** provides: `AuthenticationService`, `MenuComponent`, `TextboxComponent`, `ValidationMessageComponent`, `DatepickerComponent`, `AddressComponent`, logging factory, toast service, config service, OAuth provider, and HTTP interceptor. Import providers via `provideOAuthService()`, `provideConfigService()`, etc.

### Backend (`projects/gamifyworkout/api/`)

- `Core/Models/` — domain models (`Gym`, `Equipment`, `Schedule`, `Exercise`, `WorkoutLog`, `User`) all extending `BaseEntity`
- `Core/Database/Repository.cs` — generic repository interface
- `Database/Services/EfRepository.cs` — EF Core implementation; synchronous (`SaveChanges()`)
- `Api/Controllers/` — thin controllers that call `Repository` directly
- `Api/Extensions/ServiceCollectionExtensions.cs` — all DI registration

## Component Conventions

- Place `.html` and `.scss` files adjacent to the `.ts` file with the same base name
- Use SCSS for styles
- Standalone components only — do **not** set `standalone: true` in the decorator (it is the default in Angular 21)
- `ChangeDetectionStrategy.OnPush` on all components
- `input()` / `output()` signal functions, not `@Input()` / `@Output()` decorators
- `inject()` for dependency injection, not constructor injection
- Native control flow (`@if`, `@for`, `@switch`) — not `*ngIf`, `*ngFor`
- No `ngClass` or `ngStyle` — use `[class.foo]` and `[style.prop]` bindings

## Testing

The `TestProvider` module in `src/app/test-provider.ts` supplies the standard set of DI providers for component tests — import it alongside the component under test.

Spec files live adjacent to their source files. Run a single spec with `--include`.

**After implementing any new feature**, add behavioral unit tests that verify observable outcomes — what the component renders, what actions are dispatched, what outputs are emitted — not implementation details like private method calls or internal state. Tests should read like a description of the feature's contract.

## Feature Specs

GamifyWorkout requirements live in `projects/gamifyworkout/SPECS/`. Start with `SPECS_INDEX.md` for navigation. Each spec includes API contracts, component specs, and code generation notes for AI. The `today-schedule.md` spec is in **Design** status
