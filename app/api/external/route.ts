import { NextResponse } from "next/server";

// Define the external API URL
const EXTERNAL_API_URL = "https://jsonplaceholder.typicode.com/posts";

export async function GET() {
    try {
        const response = await fetch(EXTERNAL_API_URL);

        if (!response.ok) {
            return NextResponse.json({
                success: false, 
                message: "Failed to fetch the data from API", 
                status: response.status,
            });
        }
        const data = await response.json();
        return NextResponse.json({ success: true, data });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                success: false, 
                message: "Failed to get the error!", 
                error: error.message,
            });
        } else {
            return NextResponse.json({
                success: false, 
                message: "An unknown error occurred",
                error: "Unknown error",
            });
        }
    }
}
