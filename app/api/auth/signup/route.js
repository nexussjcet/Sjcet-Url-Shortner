import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();
    const sanitizedData = {
      id: String(data.id || "").trim(),
      name: String(data.name || "").trim(),
      email: String(data.email || "")
        .trim()
        .toLowerCase(),
      dept: String(data.dept || "")
        .trim()
        .toUpperCase(),
      year: data.year ? parseInt(data.year) : null,
      phone: String(data.phone || "").trim(),
      role: String(data.role || "").trim(),
    };

    const requiredFields = ["id", "name", "email", "dept", "phone", "role"];
    if (sanitizedData.role === "student") {
      requiredFields.push("year");
    }
    const missingFields = requiredFields.filter(
      (field) => !sanitizedData[field]
    );

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Missing required fields: ${missingFields.join(", ")}`,
          fields: missingFields,
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedData.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const validDepartments = ["CSE", "ECE", "EEE", "ME", "CE"];
    if (!validDepartments.includes(sanitizedData.dept)) {
      return NextResponse.json(
        {
          error: `Invalid department. Must be one of: ${validDepartments.join(
            ", "
          )}`,
          fields: ["dept"],
        },
        { status: 400 }
      );
    }

    const validRoles = ["STUDENT", "FACULTY"];
    const normalizedRole = sanitizedData.role.toUpperCase();
    if (!validRoles.includes(normalizedRole)) {
      return NextResponse.json(
        {
          error: `Invalid role. Must be one of: ${validRoles.join(", ")}`,
          fields: ["role"],
        },
        { status: 400 }
      );
    }

    sanitizedData.role = normalizedRole;

    if (normalizedRole === "STUDENT") {
      if (
        isNaN(sanitizedData.year) ||
        sanitizedData.year < 1 ||
        sanitizedData.year > 4
      ) {
        return NextResponse.json(
          {
            error: "Year must be a number between 1 and 4",
            fields: ["year"],
          },
          { status: 400 }
        );
      }
    }

    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select()
      .eq("email", sanitizedData.email)
      .single();

    if (checkError && checkError.code !== "PGRST116") {
      throw checkError;
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    const { data: user, error: createError } = await supabase
      .from("users")
      .insert([
        {
          ...sanitizedData,
          urlCount: 0,
        },
      ])
      .select()
      .single();

    if (createError) throw createError;

    return NextResponse.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
