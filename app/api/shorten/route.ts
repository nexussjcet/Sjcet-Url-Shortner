import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const payload = {
      url: data.url,
      name: data.name,
    };

    const apiUrl = process.env.SHORTX_API_URL;
    if (!apiUrl) throw new Error("Missing SHORTX_API_URL env var");

    const response = await axios.post(apiUrl, payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = response.data;
    const shortUrl = result?.shortUrl || result?.data?.shortUrl || result?.url;

    if (shortUrl) {
      return NextResponse.json({
        success: true,
        shortUrl,
      });
    }

    throw new Error("No shortened URL in response");
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json(
      {
        success: false,
        error: `Failed to shorten URL: ${err.message}`,
        debug: process.env.NODE_ENV === "development" ? err.stack : undefined,
      },
      { status: 400 }
    );
  }
}
