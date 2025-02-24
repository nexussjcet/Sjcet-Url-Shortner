"use client";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const { data: session } = useSession();
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    if (session) {
      fetchUrls();
    }
  }, [session]);

  const fetchUrls = async () => {
    const { data, error } = await supabase
      .from("shortened_urls")
      .select("*")
      .eq("user_id", session.user.id);

    if (data) setUrls(data);
  };

  if (!session) return <p>Please log in to view your shortened URLs.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Your Shortened URLs</h2>
      {urls.map((url) => (
        <p key={url.id}>
          <a href={url.shortUrl} className="text-blue-500">
            {url.shortUrl}
          </a>
        </p>
      ))}
    </div>
  );
}
