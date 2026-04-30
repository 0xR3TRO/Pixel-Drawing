# Repo structure

```text
.
├── src/
│   ├── features/
│   │   ├── editor/
│   │   │   ├── contracts.ts
│   │   │   ├── domain/
│   │   │   └── ui/
│   │   ├── project-storage/
│   │   └── export-sharing/
│   ├── styles.css
│   └── main.ts
├── docs/
│   ├── adr/
│   ├── architecture/
│   ├── runbooks/
│   └── metrics/
└── .github/
    ├── workflows/
    └── pull_request_template.md
```

## Placement rules

1. Domain rules and state contracts stay in `src/features/*/domain`.
2. UI composition stays in `src/features/*/ui`.
3. Cross-feature contracts are explicit TypeScript interfaces.
4. Process and operational decisions belong in `docs/`.
