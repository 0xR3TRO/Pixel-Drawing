# Rollback and hotfix runbook

## Rollback strategy

1. Identify last known good release artifact.
2. Redeploy previous artifact/version.
3. Verify application health and smoke paths.
4. Keep incident issue open until root cause is documented.

## Hotfix strategy

1. Create `hotfix/<ticket-or-incident-id>` from latest production tag.
2. Implement minimal isolated fix.
3. Require full CI pass and peer review.
4. Release patch version.
5. Back-merge hotfix into main branch.

## Exit criteria

- Production is stable.
- Monitoring does not show regression.
- Root cause and preventive action are logged.
