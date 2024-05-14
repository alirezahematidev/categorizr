export function error(method: string, message: string) {
  if (process.env.NODE_ENV !== "test") {
    console.error("Warning: [Categorizr:%s] %s\n", method, message);
  }
}

export function safeError(error: unknown, fallback = "An unknown error occured.") {
  if (process.env.NODE_ENV !== "test") {
    console.error("Warning: [Categorizr] %s\n", error instanceof Error ? error.message : fallback);
  }
}

export function exception(method: string, message: string) {
  return new Error(`[Categorizr:${method}] ${message}`);
}
