
let plaidAccessToken: string | null = null;

export async function setPlaidAccessToken(token: string) {
  plaidAccessToken = token;
}

export async function getPlaidAccessToken(): Promise<string | null> {
  return plaidAccessToken;
}
