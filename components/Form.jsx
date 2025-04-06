"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ShortenForm({ onSuccess }) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleShorten = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      toast.error("You must be logged in to shorten links!");
      return;
    }

    if (!url || !name) {
      toast.error("URL and name are required!");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("https://sjcet.in/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalUrl: url,
          shortName: name,
          userId: session.user.id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to shorten URL");
      }

      onSuccess?.(data.shortenedUrl);
      toast.success("URL shortened successfully!");

      setUrl("");
      setName("");
    } catch (error) {
      toast.error(error.message || "Error processing your request");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Input
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isLoading}
      />
      <Button onClick={handleShorten} disabled={isLoading} className="w-full">
        {isLoading ? "Processing..." : "Shorten"}
      </Button>
    </div>
  );
}
