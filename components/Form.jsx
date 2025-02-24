"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const { data: session } = useSession();

  const handleShorten = async () => {
    if (!session) {
      toast.error("You must be logged in to shorten links!");
      return;
    }

    if (!url || !name) {
      toast.error("URL and name are required!");
      return;
    }

    try {
      const res = await fetch("https://sjcet.in/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, name }),
      });
      const data = await res.json();
      if (res.ok) {
        setShortUrl(data.shortUrl);
        toast.success("URL shortened successfully!");
      } else {
        toast.error(data.message || "Failed to shorten URL.");
      }
    } catch (error) {
      toast.error("Error connecting to API.");
    }
  };

  return (
    <div className="p-4 space-y-4">
      <Input
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={handleShorten}>Shorten</Button>
      {shortUrl && (
        <p>
          Shortened URL:{" "}
          <a href={shortUrl} className="text-blue-500">
            {shortUrl}
          </a>
        </p>
      )}
    </div>
  );
}
