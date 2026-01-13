import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const nodeBaseUrl = process.env.CANTO_NODE_URL;

  const apiPath = params.path.join("/");

  const searchParams = request.nextUrl.searchParams.toString();
  const fullUrl = `${nodeBaseUrl}/${apiPath}${
    searchParams ? `?${searchParams}` : ""
  }`;

  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Cosmos Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from node" },
      { status: 500 }
    );
  }
}
