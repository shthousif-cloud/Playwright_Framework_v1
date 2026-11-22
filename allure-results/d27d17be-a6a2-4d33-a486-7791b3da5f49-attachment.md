# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: web/orangehrm-add-employee.spec.ts >> OrangeHRM user addition flow @master @sanity @regression @web @end-to-end
- Location: tests/web/orangehrm-add-employee.spec.ts:20:5

# Error details

```
Error: browserType.launch: Executable doesn't exist at /ms-playwright/chromium-1248/chrome-linux64/chrome
╔════════════════════════════════════════════════════════╗
║ Looks like Playwright was just updated to 1.64.1.      ║
║ Please update docker image as well.                    ║
║ -  current: mcr.microsoft.com/playwright:v1.62.0-noble ║
║ - required: mcr.microsoft.com/playwright:v1.64.1-noble ║
║                                                        ║
║ <3 Playwright Team                                     ║
╚════════════════════════════════════════════════════════╝
```