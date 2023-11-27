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
  const form = new FormData();
  form.append("username", loginInfo.username);
  form.append("password", loginInfo.password);
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/login`, {
    method: "POST",
    cache: "default",
    mode: "cors",
    credentials: "include",
    keepalive: true,
    redirect: "follow",
    body: form,
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
