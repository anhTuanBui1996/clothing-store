"use server";
import useAuth from "../_utils/service/AuthService";

export async function checkTokenValid() {
  const headers = import("next/headers");
  const cookies = (await headers).cookies;
  const jwtToken = cookies().get("jwt")?.value;
  const { getAuthentication } = useAuth();
  const res = await getAuthentication(jwtToken || "");
  if (!res?.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.status;
}
