import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

const YANDEX_DISK_OAUTH_TOKEN = process.env.YANDEX_DISK_OAUTH_TOKEN;

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!YANDEX_DISK_OAUTH_TOKEN) {
      return NextResponse.json({ error: "Yandex Disk token not configured" }, { status: 500 });
    }

    // Get upload link from Yandex Disk
    const fileName = encodeURIComponent(file.name);
    const uploadUrl = `https://cloud-api.yandex.net/v1/disk/resources/upload?path=/partner-uploads/${fileName}&overwrite=true`;
    
    const tokenResponse = await fetch(uploadUrl, {
      method: "GET",
      headers: {
        "Authorization": `OAuth ${YANDEX_DISK_OAUTH_TOKEN}`,
      },
    });

    if (!tokenResponse.ok) {
      const error = await tokenResponse.text();
      return NextResponse.json({ error: `Failed to get upload URL: ${error}` }, { status: 500 });
    }

    const { href } = await tokenResponse.json();

    // Upload file to Yandex Disk
    const arrayBuffer = await file.arrayBuffer();
    const uploadResponse = await fetch(href, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: arrayBuffer,
    });

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text();
      return NextResponse.json({ error: `Upload failed: ${error}` }, { status: 500 });
    }

    // Return public link
    const publicUrl = `https://disk.yandex.ru/d/partner-uploads/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      url: publicUrl,
      fileName: file.name,
    });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
