export interface AuthInfo {
  token: string;
  session: string;
}

export async function getAuthentication() {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/admin/auth`, {
    method: "GET",
    cache: "default",
  });
  return result;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export async function signInWithCredentials(loginInfo: LoginInfo) {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/admin/auth/credentials`, {
    method: "POST",
    cache: "default",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(loginInfo),
  });
  return result;
}
