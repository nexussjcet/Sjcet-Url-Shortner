import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { url, name, userId } = await request.json();

    if (!url || !name || !userId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    try {
      console.log("Searching for user with email:", userId);

      const { data: user, error: userError } = await supabase
        .from("users")
        .select("id, email, name, urlCount, dept, year")
        .eq("email", userId)
        .single();

      if (userError) {
        console.error("User lookup error:", userError);
        return NextResponse.json(
          { error: "Error looking up user" },
          { status: 500 }
        );
      }

      if (!user) {
        console.log("No user found with email:", userId);
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
            originalUrl: url,
            shortenedUrl: `https://sjcet.in/${name}`,
            shortName: name,
            userEmail: userId,
          },
        ])
        .select()
        .single();

      if (urlError) throw urlError;

      const { error: updateError } = await supabase
        .from("users")
        .update({ urlCount: (user.urlCount || 0) + 1 })
        .eq("id", user.id);

      if (updateError) throw updateError;

      return NextResponse.json({ success: true, data: newUrl });
    } catch (error) {
      throw error;
    }
  } catch (error) {
    console.error("URL creation error:", error);
    return NextResponse.json(
      { error: "Failed to create shortened URL" },
      { status: 500 }
    );
  }
}
