import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
  const data = await request.json();

  const response = await fetch("https://sjcet.in/shorten", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json",
    },
    status: response.status,
  });
}
