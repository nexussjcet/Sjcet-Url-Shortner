import { supabase } from "@/lib/supabase";
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

    let retries = 3;
    let user;

    while (retries > 0) {
      try {
        const { data, error } = await supabase
          .from("users")
          .select()
          .or(`email.eq.${email},id.eq.${supabaseId}`)
          .single();

        if (error && error.code !== "PGRST116") throw error;
        user = data;
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
      action: user ? "signin" : "signup",
      message: user
        ? "User found, proceed to sign in"
        : "User not found, proceed to sign up",
    });
  } catch (error) {
    console.error("Request error:", error);
    return NextResponse.json(
      {
        error: "Invalid request format",
        details: error.message,
        action: "error",
      },
      { status: 400 }
    );
  }
}
