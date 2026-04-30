# ADR-0001: Local-first modular frontend baseline

## Status

Accepted

## Context

The repository had a single static script with no build, lint, test, CI, or security baseline.  
Documentation and implementation were inconsistent.

## Decision

1. Use a **local-first** architecture for the current phase (no mandatory backend).
2. Migrate runtime to **TypeScript + Vite**.
3. Split code by feature boundaries:
   - `editor`
   - `project-storage`
   - `export-sharing`
4. Enforce quality gates with ESLint, typecheck, tests, and CI.
5. Add baseline security workflows (CodeQL, dependency review, Dependabot).

## Consequences

- Faster onboarding and safer iteration speed.
- Lower regression risk through automated checks.
- Clear migration path to a backend-enabled architecture if online collaboration/user accounts become required.

## Alternatives considered

1. Keep pure static JS without tooling:
   - Lower setup cost, but quality/security risk remains high.
2. Introduce frontend + backend in one step:
   - Higher strategic value, but high delivery risk and scope for current repository maturity.
