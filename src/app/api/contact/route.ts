import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Environment variable checks
const requiredEnvVars = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
] as const;

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
}

// Input validation schema
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
});

// Rate limiting map
const rateLimiter = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT = 5; // max requests
const TIME_WINDOW = 3600000; // 1 hour in milliseconds

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    // Check request size
    const contentLength = parseInt(request.headers.get("content-length") || "0");
    if (contentLength > 10000) {
      // 10KB limit
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }

    // Check content type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Only JSON requests are allowed" },
        { status: 415 }
      );
    }

    // Get IP address for rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    // Check rate limit
    const now = Date.now();
    const userLimit = rateLimiter.get(ip);

    if (userLimit) {
      if (now - userLimit.timestamp < TIME_WINDOW) {
        if (userLimit.count >= RATE_LIMIT) {
          return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }
        userLimit.count++;
      } else {
        rateLimiter.set(ip, { count: 1, timestamp: now });
      }
    } else {
      rateLimiter.set(ip, { count: 1, timestamp: now });
    }

    const body = await request.json();

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, email, message } = result.data;

    // Sanitize input (basic example)
    const sanitizedMessage = message.trim().replace(/<[^>]*>/g, "");

    const { error } = await supabase.from("contact_messages").insert([
      {
        name: name.trim(),
        email: email.trim(),
        message: sanitizedMessage,
      },
    ]);

    if (error) throw error;

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error("Error details:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
