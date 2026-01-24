/# AGENTS.md

This document provides essential guidelines and commands for agentic coding agents operating within this repository. Adhering to these standards ensures consistency, maintainability, and compatibility with the project's development workflow.

---

## 1. Build, Lint, and Test Commands

### 1.1 Build Commands

The primary build commands are defined in `package.json`:

- **Development Server**: `npm run dev`
  - Starts a local development server for the Rspress documentation site.
- **Production Build**: `npm run build`
  - Generates a production-ready build of the Rspress site.
- **Preview Production Build**: `npm run preview`
  - Serves the production build locally for review.

### 1.2 Linting & Formatting

This project uses **Prettier** for code formatting, as indicated by `"prettier": "@qiphon/prettier-config"` in `package.json`. While a specific `lint` script isn't explicitly defined, it's recommended to integrate **ESLint** for static code analysis.

- **Formatting**:
  - To format all files according to the Prettier configuration:

    ```bash
    npx prettier --write .
    ```

  - To check for formatting issues without fixing them:

    ```bash
    npx prettier --check .
    ```

- **Linting (Recommended)**:
  - If ESLint is configured, run it with:

    ```bash
    npx eslint . --ext .js,.jsx,.ts,.tsx
    ```

  - To fix auto-fixable linting issues:

    ```bash
    npx eslint . --ext .js,.jsx,.ts,.tsx --fix
    ```

  - _Note: If ESLint is not yet configured, consider adding a `.eslintrc.js` file and corresponding `lint` script in `package.json`._

### 1.3 Testing

No explicit testing framework or scripts were found in `package.json`. For React/TypeScript projects, **Jest** is a common choice.

- **Running All Tests (Hypothetical Jest Setup)**:

  ```bash
  npx jest
  ```

- **Running a Single Test File (Hypothetical Jest Setup)**:

  ```bash
  npx jest path/to/your/test/file.test.ts
  ```

  - Replace `path/to/your/test/file.test.ts` with the actual path to the test file.

- _Note: If testing is not yet set up, consider installing Jest (`npm install --save-dev jest @types/jest ts-jest`) and configuring it._

---

## 2. Code Style Guidelines

The following guidelines should be adhered to for all new and modified code. Where specific configurations (like ESLint rules) are absent, follow general best practices for TypeScript and React.

### 2.1 Imports

- **Ordering**: Group imports by type:
  1. Node.js built-in modules (e.g., `path`, `fs`)
  2. External libraries (e.g., `react`, `lodash`)
  3. Internal project modules (absolute paths preferred when possible)
  4. Relative imports
- **Spacing**: Add a blank line between import groups.
- **Destructuring**: Prefer destructuring for named imports.

  ```typescript
  import React, { FC } from 'react'
  import { someUtil } from '@/utils'
  ```

### 2.2 Formatting

- **Automated Formatting**: Rely on Prettier (`npx prettier --write .`) to handle most formatting concerns (indentation, line breaks, quotes, semicolons).
- **Line Length**: Aim for a maximum of 100-120 characters per line. Prettier will handle this where possible.

### 2.3 Types

- **TypeScript Usage**: Always use TypeScript for new code. Avoid `any` type unless absolutely necessary and justified.
- **Explicit Types**: Clearly define types for function arguments, return values, and complex object structures.
- **Interfaces/Types**: Use `interface` for object shapes and `type` for aliases or union types.

### 2.4 Naming Conventions

- **Components**: PascalCase (e.g., `MyComponent`, `UserProfile`).
- **Variables/Functions**: camelCase (e.g., `myVariable`, `calculateTotalPrice`).
- **Constants**: UPPER_SNAKE_CASE for global constants (e.g., `API_KEY`).
- **Files**: kebab-case for component files (e.g., `user-profile.tsx`), camelCase for utility files (e.g., `utils.ts`).

### 2.5 Error Handling

- **Explicit Errors**: Throw meaningful errors with clear messages.
- **Try-Catch**: Use `try-catch` blocks for asynchronous operations and other code that might throw exceptions.
- **User Feedback**: Provide clear feedback to the user when an error occurs in the UI.

### 2.6 Comments

- **When to Comment**: Use comments to explain _why_ a particular piece of code exists, not _what_ it does (unless the "what" is non-obvious).
- **JSDoc**: Use JSDoc-style comments for functions, classes, and complex types to describe their purpose, parameters, and return values.
- **Avoid Redundant Comments**: Don't comment on self-explanatory code.

---

## 3. Cursor/Copilot Rules

- No specific configuration files for Cursor (`.cursor/rules/`, `.cursorrules`) or Copilot (`.github/copilot-instructions.md`) were found in this repository. Agents should follow the general code style guidelines outlined above.
