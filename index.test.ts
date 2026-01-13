import { createClerkClient } from "@clerk/backend";
import { expect, it } from "bun:test";

it("clerk external account should start with 'eac'", async () => {
  const clerkClient = createClerkClient({
    secretKey: Bun.env.CLERK_SECRET_KEY,
  });

  const user = await clerkClient.users.getUser(
    "user_35Krsb8Hud1jaG23N3B4hN66pBO"
  );

  expect(user?.externalAccounts?.[0]?.id).toStartWith("eac");
});
