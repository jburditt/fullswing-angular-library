# AI Instructions: Angular Unit Testing Best Practices

Act as an expert Angular Engineer. When generating unit tests, follow these strict guidelines to ensure maintainable, fast, and modern test suites.

## 1. Technical Stack & Environment
- **Framework:** Angular 21 with zoneless change detection
- **Library:** Use `TestBed` for integration; use `ng-mocks` for mocking dependencies
- **Control Flow:** Use modern `@if`, `@for`, `@switch`, and `@defer` syntax in templates

## 2. Test Structure (AAA Pattern)
Every `it` block must follow the Arrange-Act-Assert pattern:
- **Arrange:** Set up mocks, spies, and component state
- **Act:** Execute the method or trigger the UI event
- **Assert:** Verify the outcome (expectations)

## 3. Component Testing Rules
- **Standalone:** All components are standalone — import them directly in `TestBed.configureTestingModule({ imports: [MyComponent] })`
- **Change Detection (zoneless):** Call `fixture.detectChanges()` for the initial render. After signal writes, call `TestBed.flushEffects()` to flush pending effects, then `fixture.detectChanges()` to update the DOM. Do NOT reference `ChangeDetectorRef` or `ChangeDetectionStrategy.OnPush`
- **Signals:** Use `component.mySignal.set(value)` to update state; verify results with `expect(component.myComputed())`
- **Signal queries:** Access `viewChild` / `contentChild` results via `component.myQuery()` — they are signals
- **DOM Queries:** Prefer `data-testid` selectors over CSS classes or element tags
  - *Good:* `fixture.debugElement.query(By.css('[data-testid="login-btn"]'))`

## 4. Service & Mocking Strategy
- **Isolation:** Test services in isolation by instantiating them with mocked dependencies rather than a full `TestBed` where possible
- **HTTP:** Use `HttpTestingController` to verify API calls
- **Dependencies:** Mock child components and services using `MockBuilder` or `MockProvider` from `ng-mocks` to avoid deep testing

## 5. Modern Angular Patterns
- **Inject:** Use `TestBed.inject(MyService)` — not constructor-based injection in tests
- **Observables:** Use `firstValueFrom` or `subscribe` with `done()` to test asynchronous streams; prefer `toSignal()` in components so tests only need to assert on signal values
- **Input / Output / Model:**
  - Set signal inputs via `fixture.componentRef.setInput('name', value)`
  - Trigger outputs: `component.myOutput.emit(value)`
  - Assert two-way bindings via `model()` signals: `expect(component.myModel()).toBe(value)`

## 6. Naming Conventions
- **Describe blocks:** `describe('ClassName / methodName', () => { ... })`
- **It blocks:** Human-readable requirements: `it('should redirect the user when login is successful', () => { ... })`

## 7. Constraints
- **No legacy:** Never use `var`, raw Promises where Observables are expected, or `*ngIf` / `*ngFor`
- **No implementation testing:** Test observable behavior — what renders, what is emitted, what state changes — not private methods or internal implementation details
- **Coverage:** Aim for logic coverage (edge cases, error handling), not just happy paths
- **Mock data:** Create small, reusable `const` mock objects instead of large inline objects

## 8. Example Test Case
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show login message by default', () => {
    const title = fixture.debugElement.query(By.css('[data-testid="title"]'));
    expect(title.nativeElement.textContent).toContain('Please log in.');
  });

  it('should update UI when signals change via login()', () => {
    // Act
    component.login('Alice');
    TestBed.flushEffects();
    fixture.detectChanges();

    // Assert
    const title = fixture.debugElement.query(By.css('[data-testid="title"]'));
    expect(component.name()).toBe('Alice');
    expect(title.nativeElement.textContent).toContain('Welcome, Alice!');
  });
});
```

**After implementing any new feature**, add behavioral unit tests that verify observable outcomes — what the component renders, what actions are dispatched, what outputs are emitted — not implementation details like private method calls or internal state. Tests should read like a description of the feature's contract.
