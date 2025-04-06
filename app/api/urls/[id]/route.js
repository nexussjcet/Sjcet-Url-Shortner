import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const deletedUrl = await prisma.url.delete({
      where: {
        id: id,
      },
    });

    if (!deletedUrl) {
      return NextResponse.json(
        { success: false, error: "URL not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "URL deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete URL error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete URL" },
      { status: 500 }
    );
  }
}
