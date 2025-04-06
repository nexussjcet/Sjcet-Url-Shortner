import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const user = await prisma.Users.findFirst({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        dept: true,
        year: true,
        phone: true,
        urlCount: true,
        createdAt: true,
        updatedAt: true,
        urls: {
          select: {
            id: true,
            shortenedUrl: true,
            originalUrl: true,
            shortName: true,
            createdAt: true,
            userId: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 5,
        },
      },
    });

    if (!user || !user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found or invalid data",
        },
        { status: 404 }
      );
    }

    const transformedUser = {
      ...user,
      id: String(user.id),
      urls:
        user.urls?.map((url) => ({
          ...url,
          id: String(url.id),
          userId: String(url.userId),
          createdAt: url.createdAt?.toISOString(),
        })) || [],
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: transformedUser,
    });
  } catch (error) {
    console.error("API Error:", {
      message: error.message,
      stack: error.stack,
      path: request.url,
    });

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
        message: error.message,
        details:
          process.env.NODE_ENV === "development"
            ? { stack: error.stack, path: request.url }
            : undefined,
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
