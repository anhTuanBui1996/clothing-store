"use server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";

export type CookieActions = ReadonlyRequestCookies;

export async function getCookie(name: string) {
  return cookies().get(name);
}

export async function setCookie(
  name: string,
  value: string,
  options?: Partial<ResponseCookie> | undefined
) {
  return cookies().set(name, value, options);
}

export async function deleteCookie(name: string) {
  return cookies().delete(name);
}
