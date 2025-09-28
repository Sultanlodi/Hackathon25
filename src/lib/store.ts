
// Simple in-memory store for Plaid access tokens
// (Replace with DB in production)

const plaidTokens: Record<string, string> = {};

// Save access token for a specific user
export function saveAccessToken(userId: string, token: string) {
  plaidTokens[userId] = token;
}

// Retrieve access token for a user
export function getAccessToken(userId: string): string | null {
  return plaidTokens[userId] || null;
}

// For debug/demo: check if user has linked bank
export function isLinked(userId: string): boolean {
  return !!plaidTokens[userId];
}
