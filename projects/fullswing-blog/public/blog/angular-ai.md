I was originally going to write my project "Gamify Workout" by hand the old school way, like a chump. But at some point I realized it was a great candidate for an AI learning and experimental project. The project had two pages implemented, so the first step was to generate spec documents from AI to want resemble spec documents that AI would use to generate the pages. The goal is "Vibe Coding" as much as possible, to least as much AI as possible. I don't necessarily believe "Vibe Coding" is the most efficient direction for writing code but I do believe it is the most efficient method for my own learning goals.

Prompt: "Analyze the current code for projects/gamifyworkout and create spec files that AI would understand and be able to build those files. I will use these spec files as a template for adding future specs that AI can use to generate code for new features."

Because I'm on a free edition of Github copilot, the above spanned two days. It created spec documents in a folder `SPECS`. I also added the following:

## Angular
- Add `.vscode/mcp.json`, `llms-full.txt`, `.github/instructions/best-practices.instructions.md` and `.github/instructions/general.instructions.md` from [Angular Developer with AI](https://angular.dev/ai/develop-with-ai)
- Clone the following to `.github/skills` [Angular Skills](https://github.com/angular/skills)
- (Optional) Add a script to pull the latest changes from Angular Skills repository to packages.json

## .NET

