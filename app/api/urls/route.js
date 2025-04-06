import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { url, name, userId } = await req.json();

    const shortUrl = await prisma.urls.create({
      data: {
        originalUrl: url,
        shortenedUrl: `https://sjcet.in/${name}`,
        shortName: name,
        userId,
      },
    });

    await prisma.users.update({
      where: { id: userId },
      data: { urlCount: { increment: 1 } },
    });

    return NextResponse.json(shortUrl);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create short URL" },
      { status: 500 }
    );
  }
}
