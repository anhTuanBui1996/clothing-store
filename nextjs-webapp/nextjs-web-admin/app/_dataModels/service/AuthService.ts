export interface AuthInfo {
  token: string;
  session: string;
}

export async function getAuthentication() {
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/validate`, {
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
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/login`, {
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
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/logout`, {
    method: "POST",
    cache: "default",
    mode: "no-cors",
  });
  return result;
}
