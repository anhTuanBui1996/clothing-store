async function getAuthentication(token: string) {
  try {
    const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/admin`, {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Methods": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (ex) {
    console.error(ex);
  }
}

export interface LoginInfo {
  username: string;
  password: string;
}

async function signInWithCredentials(loginInfo: LoginInfo) {
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
          "Access-Control-Allow-Methods": "*",
        },
        body: JSON.stringify(loginInfo),
      }
    );
    return result;
  } catch (ex) {
    console.error(ex);
  }
}

async function signOut() {
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/logout`, {
    method: "GET",
    cache: "default",
    mode: "no-cors",
  });
  return result;
}

export default function useAuth() {
  return {
    getAuthentication,
    signInWithCredentials,
    signOut,
  };
}
