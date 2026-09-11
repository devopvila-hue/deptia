# Department priority voting

The home page offers six priorities and an optional contact dialog in Spanish and English.
Submitting without contact details records only the selected departments and locale.
Contact opt-ins record the launch notification consent and the promised one-month trial offer.

## Activation

The current workspace has no configured Supabase project. The route returns HTTP 503 until
the existing server environment variables are set and the migration is applied:

- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY (server only)
- supabase/migrations/20260910144152_department_interest_votes.sql

Use the intended project and the repository's migration workflow. The table is inaccessible
to anonymous and authenticated API clients; only the server service role can insert/read.
Check the deployed route and database permissions after applying the migration.

Successful submissions set an HTTP-only participation cookie and an optional local browser
marker. UUID request IDs make network retries idempotent. These measures prevent accidental
repeat votes; they do not verify a unique person. Apply infrastructure rate limits to the
public endpoint before opening it to high-volume traffic.

## Launch notifications and trial

No email is sent by voting. Launch emails and trial redemption are not implemented here.
The offer is recorded as launch-one-month-free, with department-launch-v1 consent.
Contact only opted-in participants about the selected departments and their trial.
Keep exports private and do not add these addresses to a general newsletter.

## Verification

Run: node --test tests/unit/department-votes.test.cjs

Tests cover validation, contact consent, anonymous votes, persistence failures, duplicate
requests, origin/content checks and the promised offer. They mock the database transport;
a real insert/read and permission check remain necessary once the project is connected.
