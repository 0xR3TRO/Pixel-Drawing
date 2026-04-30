# Success metrics

## DORA

- Deployment frequency: >= 1 production deploy/week
- Lead time for changes: < 24h for small scoped changes
- Change failure rate: < 15%
- Mean time to recovery (MTTR): < 60 min

## Code quality

- Unit test coverage: >= 70% globally, >= 85% on critical modules
- Flaky tests: < 2%
- Lint and typecheck pass rate on PR: 100%

## Security and reliability

- Open high/critical dependency vulnerabilities older than 7 days: 0
- Frontend runtime error rate: < 1% sessions

## Sprint tracking

Review trends each sprint from:

1. GitHub Actions (quality + deployment metrics)
2. Security workflows (CodeQL, dependency review)
3. Incident registry and runbooks
