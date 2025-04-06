import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    const { error } = await supabase.from("urls").delete().eq("id", id);

    if (error) {
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
