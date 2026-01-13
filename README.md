# Clerk External Account ID Bug Reproduction

This repository demonstrates an issue with Clerk's `externalAccounts` field where the account IDs have an unexpected prefix.

## The Issue

When fetching a user via `clerkClient.users.getUser()`, the `externalAccounts[].id` field returns IDs prefixed with `idn_` instead of the expected `eac_` prefix. When inspecting the JSON of this particular user on the dashboard, it does show the `eac_` prefix for the external account, meaning the SDK does not retreive the correct ID.

### Dashboard JSON:

```
{
  "id": "user_35Krsb8Hud1jaG23N3B4hN66pBO",
  "object": "user",
  [...]
  "external_accounts": [
    {
      "object": "external_account",
      "id": "eac_35KrrpE2TT3FNZxH3OgDorzeTAq",
      "provider": "oauth_google",
      [...]
    }
  ],
}
```

### Test Result

```
index.test.ts:
 8 |
 9 |   const user = await clerkClient.users.getUser(
10 |     "user_35Krsb8Hud1jaG23N3B4hN66pBO"
11 |   );
12 |
13 |   expect(user?.externalAccounts?.[0]?.id).toStartWith("eac");
                                               ^
error: expect(received).toStartWith(expected)

Expected to start with: "eac"
Received: "idn_35KrrtGstBAZH73wjxtZxyFfAoW"
```

## Running the Test

```bash
bun install
bun test
```

Make sure to set `CLERK_SECRET_KEY` in your environment.
