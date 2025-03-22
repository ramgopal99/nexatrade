import { AuthClient } from "@dfinity/auth-client";

export async function authenticateWithII() {
  const authClient = await AuthClient.create();
  
  const days = BigInt(1);
  const hours = BigInt(24);
  const nanoseconds = BigInt(3600000000000);

  await new Promise((resolve) => {
    authClient.login({
      identityProvider: "https://identity.ic0.app",
      maxTimeToLive: days * hours * nanoseconds,
      onSuccess: () => resolve(true),
      onError: (error) => {
        console.error("Authentication error:", error);
        resolve(false);
      },
    });
  });

  return authClient;
}