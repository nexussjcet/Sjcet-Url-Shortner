import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();
    console.log("[Debug] Received request data:", data);

    const payload = {
      url: data.url,
      name: data.name || undefined,
    };

    console.log("[Debug] Sending payload:", payload);

    const response = await fetch("https://sjcet.in/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log("[Debug] Raw response:", responseText);

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (e) {
      console.error("[Debug] Failed to parse response:", e);
      throw new Error("Invalid response from server");
    }

    console.log("[Debug] Parsed response:", result);

    const shortUrl = result?.shortUrl || result?.data?.shortUrl || result?.url;

    if (shortUrl) {
      return NextResponse.json({
        success: true,
        shortUrl: shortUrl,
      });
    }

    throw new Error("No shortened URL in response");
  } catch (error) {
    console.error("[Debug] Error details:", error);
    return NextResponse.json(
      {
        success: false,
        error: `Failed to shorten URL: ${error.message}`,
        debug: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 400 }
    );
  }
}
