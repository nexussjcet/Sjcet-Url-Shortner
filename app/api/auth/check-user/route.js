import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const validateCollegeEmail = (email) => {
  const domain = "sjcetpalai.ac.in";
  const departments = [
    "cs",
    "cseai",
    "cy",
    "aids",
    "mba",
    "mca",
    "ec",
    "ee",
    "me",
    "ce",
  ];

  if (email.endsWith(`@${domain}`)) return true;

  const [localPart, emailDomain] = email.split("@");
  const departmentPrefix = emailDomain.split(".")[0].toLowerCase();
  if (
    departments.includes(departmentPrefix) &&
    emailDomain.endsWith(`.${domain}`)
  ) {
    return true;
  }

  const yearPattern = /\d{4}$/;
  if (localPart.includes("+")) {
    const [, year] = localPart.split("+");
    if (
      yearPattern.test(year) &&
      departments.includes(departmentPrefix) &&
      emailDomain.endsWith(`.${domain}`)
    ) {
      return true;
    }
  }

  return false;
};

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, supabaseId } = body;

    if (!email || !supabaseId) {
      return NextResponse.json(
        { error: "Email and supabaseId are required" },
        { status: 400 }
      );
    }

    if (!validateCollegeEmail(email)) {
      return NextResponse.json(
        { error: "Invalid college email domain" },
        { status: 400 }
      );
    }

    try {
      let retries = 3;
      let user;

      while (retries > 0) {
        try {
          user = await prisma.users.findFirst({
            where: {
              OR: [{ email: email }, { id: supabaseId }],
            },
          });
          break;
        } catch (connectionError) {
          retries--;
          if (retries === 0) throw connectionError;
          await new Promise((resolve) => setTimeout(resolve, 1000)); 
        }
      }

      return NextResponse.json({
        exists: !!user,
        isValidEmail: true,
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return NextResponse.json(
        { error: "Database connection failed. Please try again later." },
        { status: 503 }
      );
    }
  } catch (error) {
    console.error("Request error:", error);
    return NextResponse.json(
      { error: "Invalid request format" },
      { status: 400 }
    );
  }
}
