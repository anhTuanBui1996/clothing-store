import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { paramsToSign } = body;
  try {
    if (process.env.CLOUDINARY_API_SECRET) {
      const signature = cloudinary.utils.api_sign_request(
        paramsToSign,
        process.env.CLOUDINARY_API_SECRET
      );
      return NextResponse.json({ signature });
    }
    console.warn("Environment variables doesn't have CLOUDINARY_API_SECRET!");
    return NextResponse.error();
  } catch (ex) {
    console.error(ex);
    return NextResponse.error();
  }
}
