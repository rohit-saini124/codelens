export function normalizeUsername(input: string): string {
  return input.trim();
}

export function isValidUsername(input: string): boolean {
  return normalizeUsername(input).length > 0;
}

export function getAnalyzePath(username: string): string {
  return `/analyze/${encodeURIComponent(normalizeUsername(username))}`;
}

export function decodeUsernameParam(param: string): string {
  return decodeURIComponent(param);
}
