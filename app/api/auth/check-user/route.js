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
    const { email, supabaseId } = await req.json();

    if (!validateCollegeEmail(email)) {
      return NextResponse.json(
        { error: "Invalid college email domain" },
        { status: 400 }
      );
    }

    const user = await prisma.users.findFirst({
      where: {
        OR: [{ email: email }, { id: supabaseId }],
      },
    });

    return NextResponse.json({
      exists: !!user,
      isValidEmail: true,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check user" },
      { status: 500 }
    );
  }
}
