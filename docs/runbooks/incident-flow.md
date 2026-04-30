# Incident flow

## Severity model

- **SEV-1:** major outage / data integrity risk
- **SEV-2:** major feature degraded
- **SEV-3:** limited impact or workaround available

## Response flow

1. Detect and triage (owner: on-call engineer).
2. Assign incident commander.
3. Mitigate immediately (rollback or feature disable).
4. Communicate status to stakeholders.
5. Produce post-incident review with action items.

## Time-boxed targets

- Initial acknowledgement: <= 10 minutes
- Mitigation start: <= 20 minutes
- Post-incident review: <= 48 hours
