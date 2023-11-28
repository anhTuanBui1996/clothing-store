import { signInWithCredentials } from "@/app/_utils/service/AuthService";
import axios from "axios";

export const dynamic = "force-dynamic"; // defaults to force-static
export async function POST(request: Request) {
    const form = await request.formData();
    const result = await fetch(`${process.env.AUTH_SERVICE_ORIGIN}/auth/login`, {
      method: "POST",
      keepalive: true,
      cache: "no-cache",
      mode: "no-cors",
      redirect: "follow",
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br",
        "Contentt-Type": "application/x-www-form-urlencoded",
      },
      body: form,
    });
    // const result = await axios.post(
    //   `${process.env.AUTH_SERVICE_ORIGIN}/login`,
    //   form,
    //   {
    //     headers: {
    //       Accept: "*/*",
    //       "Accept-Encoding": "gzip, deflate, br",
    //       "Access-Control-Allow-Origin": "*",
    //       "Content-Type": "application/x-www-form-urlencoded",
    //     },
        
    //   }
    // );
  return result;
}
