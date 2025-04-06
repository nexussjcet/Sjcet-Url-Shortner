import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: "Email parameter is required",
        },
        { status: 400 }
      );
    }

    const { data: user, error } = await supabase
      .from("users")
      .select(
        `
        *,
        urls:urls (
          id,
          shortenedUrl,
          originalUrl,
          shortName,
          createdAt,
          userId
        )
      `
      )
      .eq("email", email)
      .order("createdAt", { foreignTable: "urls", ascending: false })
      .limit(5, { foreignTable: "urls" })
      .single();

    if (error || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found or invalid data",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "Content-Type",
      Allow: "GET",
    },
  });
}
