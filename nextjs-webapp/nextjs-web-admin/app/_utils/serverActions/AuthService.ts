"use server";

export async function getAuthentication(token?: string) {
  try {
    const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/admin`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    return result.status;
  } catch (ex) {
    console.error(ex);
  }
}

export interface LoginInfo {
  username: string;
  password: string;
}

export async function signInWithCredentials(loginInfo?: LoginInfo) {
  try {
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/auth/login`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        cache: "no-store",
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
        body: JSON.stringify(loginInfo),
      }
    );
    const jwtToken = await result.text();
    return jwtToken;
  } catch (ex) {
    console.error(ex);
  }
}

export async function signOut() {
  try {
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/auth/logout`,
      {
        method: "GET",
        mode: "cors",
        credentials: "include",
        redirect: "manual",
        headers: {
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
    return result.status;
  } catch (ex) {
    console.error(ex);
  }
}
