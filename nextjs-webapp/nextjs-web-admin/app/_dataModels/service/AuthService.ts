export interface AuthInfo {
  token: string;
  session: string;
}

export async function getAuthentication() {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/validate`, {
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
  const formData = new FormData();
  formData.append("username", loginInfo.username);
  formData.append("password", loginInfo.password);
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/login`, {
    method: "POST",
    cache: "default",
    mode: "no-cors",
    body: formData,
  });
  return result;
}

export async function signOut() {
  const result = await fetch(`${process.env.USER_SERVICE_ORIGIN}/logout`, {
    method: "GET",
    cache: "default",
    mode: "no-cors",
  });
  return result;
}
