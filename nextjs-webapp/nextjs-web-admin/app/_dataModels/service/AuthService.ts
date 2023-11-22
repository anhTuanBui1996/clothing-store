export interface AuthInfo {
  token: string;
  session: string;
}

export async function getAuthentication() {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/auth/validate`, {
    method: "GET",
    cache: "default",
    mode: "no-cors",
  });
  return result;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export async function signInWithCredentials(loginInfo: LoginInfo) {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/auth/login`, {
    method: "POST",
    cache: "default",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  });
  return result;
}

export async function signOut() {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/auth/logout`, {
    method: "GET",
    cache: "default",
    mode: "no-cors",
  });
  return result;
}
