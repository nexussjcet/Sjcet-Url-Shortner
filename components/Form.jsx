"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ShortenForm({ onSuccess }) {
  const [longUrl, setLongUrl] = useState("");
  const [customName, setCustomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        toast.error("You must be logged in to shorten links!");
        return;
      }

      if (!longUrl || !customName) {
        toast.error("URL and name are required!");
        return;
      }

      setIsLoading(true);

      const shortenResponse = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: longUrl,
          name: customName,
        }),
      });

      if (!shortenResponse.ok) {
        const errorData = await shortenResponse.json();
        throw new Error(errorData.error || "Failed to shorten URL");
      }

      const shortenData = await shortenResponse.json();
      if (shortenData.success) {
        const saveResponse = await fetch("/api/urls", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: longUrl,
            name: customName,
            userId: session.user.id,
          }),
        });

        if (!saveResponse.ok) {
          throw new Error("Failed to save URL to database");
        }

        const saveData = await saveResponse.json();
        onSuccess(shortenData);
        setLongUrl("");
        setCustomName("");
      }
    } catch (error) {
      toast.error(error.message || "Error processing URL");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <Input
        placeholder="Enter URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        disabled={isLoading}
      />
      <Input
        placeholder="Enter Name"
        value={customName}
        onChange={(e) => setCustomName(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Processing..." : "Shorten"}
      </Button>
    </form>
  );
}
