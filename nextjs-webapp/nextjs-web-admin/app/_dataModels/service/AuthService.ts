export interface AuthInfo {
  token: string;
  session: string;
}

export async function getAuthentication(authInfo: AuthInfo) {
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}`, {
    method: "POST",
    cache: "default",
    body: JSON.stringify(authInfo),
  });
  return result;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export async function signInWithCredentials(loginInfo: LoginInfo) {
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/credentials`, {
    method: "POST",
    cache: "default",
    body: JSON.stringify(loginInfo),
  });
  return result;
}
