# Block 19: ESLint & Prettier Guide

Dieses Modul zeigt, wie ESLint und Prettier TypeScript-Code automatisch prüfen und formatieren. Zwei Beispieldateien demonstrieren typische Lint-Probleme und deren Korrekturen im direkten Vergleich.

## Examples

1. **lint-examples.ts**
   - Absichtliche Lint-Probleme: `any`-Typen, fehlende Return-Typen, `var`, `==`, Magic Numbers
   - Jedes Problem mit Kommentar, welche ESLint-Regel es erkennt
   - Inkonsistente Formatierung (Prettier-Verstöße)

2. **lint-fixed.ts**
   - Identischer Code mit allen Korrekturen — Side-by-Side Vergleich
   - Strikte Typen, `const`/`let`, `===`, benannte Konstanten
   - Konsistente Formatierung nach Prettier-Standard

## ESLint Setup-Guide

### 1. Pakete installieren

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

### 2. `.eslintrc.json` erstellen

```json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/naming-convention": [
      "warn",
      { "selector": "variable", "format": ["camelCase", "UPPER_CASE"] },
      { "selector": "function", "format": ["camelCase"] },
      { "selector": "typeLike", "format": ["PascalCase"] }
    ],
    "no-var": "error",
    "prefer-const": "error",
    "eqeqeq": ["error", "always"],
    "prefer-template": "warn",
    "no-magic-numbers": ["warn", { "ignore": [0, 1, -1] }]
  }
}
```

### 3. `.prettierrc` erstellen

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### 4. VS Code Extensions

| Extension | ID | Zweck |
|-----------|-----|-------|
| ESLint | `dbaeumer.vscode-eslint` | Lint-Fehler direkt im Editor anzeigen |
| Prettier | `esbenp.prettier-vscode` | Auto-Formatierung beim Speichern |

**VS Code Settings** (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### 5. npm-Scripts

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "format": "prettier --write \"**/*.ts\"",
    "format:check": "prettier --check \"**/*.ts\""
  }
}
```

## How to Run

```bash
# Compile the TypeScript files
npm run build:block19

# Run examples
npx ts-node block19/lint-examples.ts
npx ts-node block19/lint-fixed.ts
```
