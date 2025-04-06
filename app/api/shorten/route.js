import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { originalUrl, shortName, userId } = await request.json();

    const existingUrl = await prisma.urls.findUnique({
      where: { shortName },
    });

    if (existingUrl) {
      return NextResponse.json(
        { error: "This short name is already taken" },
        { status: 400 }
      );
    }

    const shortenedUrl = `https://sjcet.in/${shortName}`;

    const newUrl = await prisma.urls.create({
      data: {
        originalUrl,
        shortenedUrl,
        shortName,
        userId,
      },
    });

    await prisma.users.update({
      where: { id: userId },
      data: { urlCount: { increment: 1 } },
    });

    return NextResponse.json({
      success: true,
      shortenedUrl: newUrl.shortenedUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create shortened URL" },
      { status: 500 }
    );
  }
}
