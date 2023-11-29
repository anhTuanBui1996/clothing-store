export interface AuthInfo {
  token: string;
  session: string;
}

export async function getAuthentication() {
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/admin`, {
    method: "GET",
    mode: "cors",
  });
  return result;
}

export interface LoginInfo {
  username: string;
  password: string;
}

export async function signInWithCredentials(loginInfo: LoginInfo) {
  try {
    const result = await fetch(
      `${process.env.AUTH_SERVICE_ORIGIN}/auth/login`,
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          Accept: "*/*",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "*"
        },
        body: JSON.stringify(loginInfo),
      }
    );
    return result;
  } catch (ex) {
    console.log(ex);
  }
}

export async function signOut() {
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/logout`, {
    method: "GET",
    cache: "default",
    mode: "no-cors",
  });
  return result;
}
