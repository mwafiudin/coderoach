# 0011 — Admin login accepts a username as well as the email

- Date: 2026-10-20
- Status: Accepted

## Context

The Payload admin has two users (farrez and wafi) and only took an email to log
in. Payload 3 supports username login natively (`auth.loginWithUsername`), which
adds a unique `username` column to `users`. Schema changes reach production
through Payload's dev push, done by hand.

## Options considered

1. **Defer:** keep email only; browsers already autofill it.
2. **Email or username:** `loginWithUsername` with `allowEmailLogin: true`.
3. **Username only:** `allowEmailLogin: false`; the email stays for password resets.

Recommended by Claude: 1 (two users, and it costs a production schema push).

## Decision (decided by: farrez)

Option 2, with `requireUsername: false`.

## Reasoning (farrez)

"supaya bisa login cepat tanpa mengetik email panjang"

## Consequences

- `users.username` is nullable and unique. Payload's default makes it required,
  which would add a NOT NULL column to rows that have no value, so the push
  would stop on a prompt. Each account sets its username afterwards.
- Usernames are lower-cased and trimmed by Payload. A username is easier to
  guess than an email, so the lockout after 5 failed attempts (Payload default)
  matters more; it is unchanged.
- The login form now reads "Email or Username".
- Revisit if the admin gains users who should not be able to log in by email,
  or if a username has to become required (needs every account filled first).
