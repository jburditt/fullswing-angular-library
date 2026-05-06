# AI Instructions: Angular Unit Testing Best Practices

Act as an expert Angular Engineer. When generating unit tests, follow these strict guidelines to ensure maintainable, fast, and modern test suites.

## 1. Technical Stack & Environment
- **Framework:** Angular 20.
- **Test Runner:** Use Vitest. Avoid Karma/Jasmine unless explicitly requested.
- **Library:** Use `TestBed` for integration; use `ng-mocks` for mocking dependencies.
- **Control Flow:** Use modern `@if`, `@for`, and `@switch` syntax in templates.

## 2. Test Structure (AAA Pattern)
Every `it` block must follow the Arrange-Act-Assert pattern:
- **Arrange:** Set up mocks, spies, and component state.
- **Act:** Execute the method or trigger the UI event.
- **Assert:** Verify the outcome (expectations).

## 3. Component Testing Rules
- **Standalone:** Assume components are `standalone: true`.
- **Change Detection:** Use `fixture.detectChanges()` manually. For `OnPush` components, use `fixture.checkNoChanges()` where applicable.
- **Signals:** Use `component.mySignal.set(value)` and verify results using `expect(component.myComputed())`.
- **DOM Queries:** Prefer `data-testid` selectors over CSS classes or element tags.
  - *Good:* `fixture.debugElement.query(By.css('[data-testid="login-btn"]'))`

## 4. Service & Mocking Strategy
- **Isolation:** Test services in isolation by instantiating them with mocked dependencies rather than full `TestBed` where possible.
- **HTTP:** Use `HttpTestingController` to verify API calls.
- **Dependencies:** Always mock child components and services using `MockBuilder` or `MockProvider` from `ng-mocks` to avoid "Deep Testing."

## 5. Modern Angular Patterns
- **Inject Function:** Use `TestBed.inject(MyService)` instead of the old constructor-based injection in tests.
- **Observables:** Use `firstValueFrom` or `subscribe` with `done()` to test asynchronous streams.
- **Input/Output:** Use the new `input()` and `output()` signal-based APIs.
  - Trigger outputs: `component.myOutput.emit(value)`.

## 6. Naming Conventions
- **Describe Blocks:** Use the format `describe('ClassName / MethodName', () => { ... })`.
- **It Blocks:** Use human-readable requirements: `it('should redirect the user when login is successful', () => { ... })`.

## 7. Constraints
- **No Legacy:** Never use `var`, `promises` (where Observables are expected), or `ngIf/ngFor`.
- **Coverage:** Aim for logic coverage (edge cases, error handling), not just "happy paths."
- **Mock Data:** Create small, reusable `const` mock objects instead of giant inline objects.

## 8. Example Test Case
```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest'; // Import from vitest
import { User } from './user';

describe('User Component', () => {
  let component: User;
  let fixture: ComponentFixture<User>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [User],
    }).compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show login message by default', () => {
    const title = fixture.nativeElement.querySelector('[data-testid="title"]');
    expect(title.textContent).toContain('Please log in.');
  });

  it('should update UI when signals change via login()', () => {
    // Act
    component.login('Alice');
    fixture.detectChanges();

    // Assert
    const title = fixture.nativeElement.querySelector('[data-testid="title"]');
    expect(component.name()).toBe('Alice');
    expect(title.textContent).toContain('Welcome, Alice!');
  });
});
```
