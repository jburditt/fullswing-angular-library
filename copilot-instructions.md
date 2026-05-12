# Angular component authoring rules for AI

When writing or regenerating Angular components in this repository, follow these rules:

- Use Angular skills for component generation.
- Override the default behavior so that components never use inline `template` or `styles`.
- Always use external files via `templateUrl` and `styleUrls`.
- Place the external files adjacent to the component TypeScript file using the same base filename.
- Prefer SCSS when project style config supports it.

## .NET API

### Strategy to avoid orphaned backend processes

1. Use the "Run Backend API" VS Code task to start the .NET API. This task runs the API in a dedicated terminal, making it easy to see logs and stop the process when needed. Use the "Stop Backend API" task to stop the API gracefully. Avoid running the API in hidden or shared terminals, as that can lead to orphaned processes that continue running after you're done.

2. Use a dedicated VS Code terminal
- Open a fresh terminal in VS Code before starting the backend.
- Run the API there instead of in a hidden or shared shell.
- That gives you a visible process and lets you stop it manually with Ctrl+C.
