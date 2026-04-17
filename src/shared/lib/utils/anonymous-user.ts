"use client";

const KEY = "jlpt-n3/anon-user-id";

const generate = (): string => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `anon-${Math.random().toString(36).slice(2)}-${Date.now()}`;
};

export const getAnonymousUserId = (): string => {
  if (typeof window === "undefined") return "server";
  const existing = window.localStorage.getItem(KEY);
  if (existing) return existing;
  const fresh = generate();
  window.localStorage.setItem(KEY, fresh);
  return fresh;
};
