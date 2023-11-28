import axios from "axios";

export interface AuthInfo {
  token: string;
  session: string;
}

export async function getAuthentication() {
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/`, {
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
  // const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/login`, {
  //   method: "POST",
  //   keepalive: true,
  //   cache: "no-cache",
  //   mode: "no-cors",
  //   credentials: "include",
  //   redirect: "follow",
  //   headers: {
  //     Accept: "*/*",
  //     "Accept-Encoding": "gzip, deflate, br",
  //     "Contentt-Type": "application/x-www-form-urlencoded",
  //   },
  //   body: form,
  // });
  const result = await axios.post(
    `${process.env.AUTH_SERVICE_ORIGIN}/login`,
    form,
    {
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      
    }
  );
  return result;
}

export async function signOut() {
  const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/logout`, {
    method: "GET",
    cache: "default",
    mode: "no-cors",
  });
  return result;
}
