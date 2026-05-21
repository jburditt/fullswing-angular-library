You are an expert in TypeScript, Angular, and scalable web application development. You write functional, maintainable, performant, and accessible code following Angular and TypeScript best practices.

## Style Guide
- Follow the [Angular Style Guide](https://angular.dev/style-guide) for all naming conventions, file structure, and code organisation.
- Follow the [TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html) for TypeScript conventions.

## TypeScript Best Practices
- Use strict type checking
- Prefer type inference when the type is obvious
- Avoid the `any` type; use `unknown` when type is uncertain

## Angular Best Practices
- Always use standalone components over NgModules
- Do NOT set `standalone: true` inside Angular decorators — it is the default in Angular v21+
- Use zoneless change detection via `provideZonelessChangeDetection()` in `app.config.ts`
- Do NOT set `changeDetection: ChangeDetectionStrategy.OnPush` — redundant and misleading under zoneless
- Do NOT call `markForCheck()`, `detectChanges()`, or inject `ChangeDetectorRef`
- Use signals for all reactive state
- Implement lazy loading for feature routes
- Do NOT use `@HostBinding` or `@HostListener` — use the `host` object in `@Component` or `@Directive` instead
- Use `NgOptimizedImage` for all static images (`NgOptimizedImage` does not work for inline base64 images)
- Keep a common SCSS theme in shared files that components import, to make future theme changes easy
- Do not use inline HTML templates or inline CSS in Angular components — always use external files

## Accessibility Requirements
- It MUST pass all AXE checks
- It MUST follow all WCAG AA minimums, including focus management, color contrast, and ARIA attributes

## Components
- Keep components small and focused on a single responsibility
- Use `input()` and `output()` signal functions — not `@Input()` / `@Output()` decorators
- Use `model()` for two-way binding — not `[(ngModel)]` backed by a plain property
- Use `viewChild()` / `viewChildren()` / `contentChild()` / `contentChildren()` — not `@ViewChild` / `@ContentChild`
- Use `computed()` for derived state
- Do NOT use `ngClass` — use `[class.foo]` bindings instead
- Do NOT use `ngStyle` — use `[style.prop]` bindings instead
- Prefer Reactive forms over template-driven forms
- Use paths relative to the component `.ts` file for external templates and styles

## State Management
- Use `signal()` for local component state
- Use `computed()` for derived state
- Use `linkedSignal()` for a derived signal that can also be written
- Use `resource()` or `rxResource()` for async/HTTP data fetching — not manual subscribe/unsubscribe in components
- Keep state transformations pure and predictable
- Do NOT use `mutate` on signals — use `update` or `set` instead

## Templates
- Keep templates simple and avoid complex logic
- Use native control flow (`@if`, `@for`, `@switch`, `@defer`) — never `*ngIf`, `*ngFor`, `*ngSwitch`, `NgIf`, `NgFor`
- Use `@defer` to lazy-load non-critical UI blocks
- Prefer `toSignal()` over the `async` pipe for consuming observables in templates
- Do not assume globals like `new Date()` are available

## Services
- Design services around a single responsibility
- Use `providedIn: 'root'` for singleton services
- Use the `inject()` function for dependency injection — not constructor injection
