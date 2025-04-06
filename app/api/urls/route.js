import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, name, userId } = body;

    console.log("Received request body:", body);

    if (!url || !name || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { data: userData, error: userLookupError } = await supabase
      .from("users")
      .select("email")
      .eq("id", userId)
      .single();

    if (userLookupError || !userData) {
      console.error("User lookup error:", userLookupError);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const email = userData.email;
    const normalizedEmail = email.toLowerCase().trim();

    console.log("Found user email:", normalizedEmail);

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("email, urlCount")
      .eq("email", normalizedEmail)
      .single();

    if (userError) {
      console.error("User lookup error:", userError);
      return NextResponse.json(
        { error: "Error looking up user" },
        { status: 500 }
      );
    }

    if (!user) {
      console.log("No user found with email:", normalizedEmail);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { data: existingUrl } = await supabase
      .from("urls")
      .select()
      .eq("shortName", name)
      .single();

    if (existingUrl) {
      return NextResponse.json(
        { error: "This short name is already taken" },
        { status: 400 }
      );
    }

    const { data: newUrl, error: urlError } = await supabase
      .from("urls")
      .insert([
        {
          id: crypto.randomUUID(),
          originalUrl: url,
          shortenedUrl: `https://sjcet.in/${name}`,
          shortName: name,
          userEmail: normalizedEmail,
        },
      ])
      .select()
      .single();

    if (urlError) throw urlError;

    const { error: updateError } = await supabase
      .from("users")
      .update({ urlCount: (user.urlCount || 0) + 1 })
      .eq("email", normalizedEmail);

    if (updateError) throw updateError;

    return NextResponse.json({ success: true, data: newUrl });
  } catch (error) {
    console.error("URL creation error:", error);
    return NextResponse.json(
      { error: "Failed to create shortened URL" },
      { status: 500 }
    );
  }
}
