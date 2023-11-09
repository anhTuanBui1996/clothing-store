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
