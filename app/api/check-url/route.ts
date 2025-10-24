import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { url } = data;

    if (!url) throw new Error("URL is required");

    const apiKey = process.env.VIRUSTOTAL_API_KEY;
    if (!apiKey) throw new Error("VIRUSTOTAL_API_KEY is not set");

    const scanRes = await fetch("https://www.virustotal.com/api/v3/urls", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ url }),
    });

    if (!scanRes.ok)
      throw new Error(`VirusTotal submission failed: ${scanRes.status}`);

    const scanData = await scanRes.json();
    const analysisId = scanData?.data?.id;
    if (!analysisId) throw new Error("VirusTotal scan ID missing");

    let result;
    while (true) {
      const res = await fetch(
        `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
        { headers: { "x-apikey": apiKey } }
      );

      if (!res.ok) throw new Error(`VirusTotal fetch failed: ${res.status}`);

      result = await res.json();

      if (result?.data?.attributes?.status === "completed") break;

      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    const stats = result?.data?.attributes?.stats || {};

    const safe = (stats.malicious ?? 0) === 0 && (stats.suspicious ?? 0) === 0;

    return NextResponse.json({ safe });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    return NextResponse.json(
      { safe: false, error: err.message },
      { status: 400 }
    );
  }
}
