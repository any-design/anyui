<INSTRUCTIONS>
@/Users/orchiliao/.codex/RTK.md

## Commit Convention

Use `xxx(comp): desc` for commit messages. In this project, that means `type(scope): description`.

- `type`: short lowercase change type, such as `feat`, `fix`, `docs`, `refactor`, `chore`, `test`, `build`, or `ci`.
- `scope`: the affected package, component, or area, such as `vue`, `react`, `svelte`, `button`, `docs`, or `repo`.
- `description`: concise imperative summary in English or Chinese.

Examples:

```text
feat(button): add loading state
fix(vue): export legacy A-prefixed aliases
docs(form): update select examples
chore(repo): migrate to pnpm turbo monorepo
```

## Repo Skills

Repo-local Codex skills live in `.codex/skills`.

- Use `anyui-use-library` for app integration, entrypoints, styles, theme setup, shadcn registry usage, and consuming AnyUI from Vue, React, or Svelte.
- Use `anyui-author-component` for adding or changing AnyUI components, React/Svelte implementations, generator safety, Vue exports, shared APIs, styles, and demos.
- Use `anyui-docs-website` for docs, website pages, component metadata, SEO, localized Markdown, and testground demos.
- Use `anyui-design-language` for global visual direction: cute, fresh, modern, rounded, tactile, token-driven, dark-mode-aware, and optionally liquid-glass.
</INSTRUCTIONS>
