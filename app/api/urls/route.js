import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { url, name, userId } = await req.json();

    // Validate required fields according to schema
    if (!url || !name || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate user exists
    const user = await prisma.users.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check for duplicate shortName
    const existingUrl = await prisma.urls.findUnique({
      where: { shortName: name },
    });

    if (existingUrl) {
      return NextResponse.json(
        { error: "This short name is already taken" },
        { status: 400 }
      );
    }

    // Create URL following schema
    const shortUrl = await prisma.urls.create({
      data: {
        originalUrl: url,
        shortenedUrl: `https://sjcet.in/${name}`,
        shortName: name,
        userId: userId,
      },
    });

    // Update user's URL count
    await prisma.users.update({
      where: { id: userId },
      data: { urlCount: { increment: 1 } },
    });

    return NextResponse.json({
      url: {
        id: shortUrl.id,
        originalUrl: shortUrl.originalUrl,
        shortenedUrl: shortUrl.shortenedUrl,
        shortName: shortUrl.shortName,
        createdAt: shortUrl.createdAt,
      },
      success: true,
    });
  } catch (error) {
    console.error("Error creating URL:", error);
    return NextResponse.json(
      { error: "Failed to create short URL" },
      { status: 500 }
    );
  }
}
