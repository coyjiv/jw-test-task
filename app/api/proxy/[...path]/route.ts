import { type NextRequest, NextResponse } from "next/server"
import { API_CONFIG } from "@/src/shared/config/api"

export async function GET(request: NextRequest, { params }: { params: { path: string[] } }) {
  try {
    const path = params.path.join("/")
    const searchParams = request.nextUrl.searchParams.toString()
    const url = `${API_CONFIG.CMS_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ""}`

    const response = await fetch(url, {
      method: "GET",
      headers: {
        ...API_CONFIG.REQUEST.DEFAULT_HEADERS,
      },
      redirect: "follow",
    })

    if (!response.ok) {
      console.error("API Error:", response.status, response.statusText)
      const errorText = await response.text()
      console.error("Error response body:", errorText)
      return NextResponse.json(
        { error: `API Error: ${response.status} ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    console.log("API Response received successfully:", {
      url,
      dataKeys: Object.keys(data),
      slidesCount: data.slides?.length || 0
    })

    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    })
  } catch (error) {
    console.error("Proxy error:", error)
    return NextResponse.json({ error: "Failed to fetch data from external API" }, { status: 500 })
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
