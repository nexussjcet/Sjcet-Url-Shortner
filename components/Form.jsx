"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function ShortenForm() {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [shortUrl, setShortUrl] = useState(null);

  const handleShorten = async () => {
    if (!auth.currentUser) {
      toast.error("You must be logged in to shorten links!");
      return;
    }

    if (!url || !name) {
      toast.error("URL and name are required!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "urls"), {
        originalUrl: url,
        name: name,
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      });

      const shortUrl = `https://sjcet.in/${docRef.id}`;
      setShortUrl(shortUrl);
      toast.success("URL shortened successfully!");
    } catch (error) {
      toast.error("Failed to shorten URL: " + error.message);
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
