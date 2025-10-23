import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log("[Debug] Received request data:", data);

    const payload = {
      url: data.url,
      name: data.name || undefined,
    };

    console.log("[Debug] Sending payload via Axios:", payload);

    const response = await axios.post("https://sjcet.in/shorten", payload, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("[Debug] Axios response data:", response.data);

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
    console.error("[Debug] Error details:", error);

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
