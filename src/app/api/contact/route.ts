import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

// Enable more detailed error logging
const debug = true;

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

    // Log incoming request in debug mode
    if (debug) {
      console.log("Incoming request:", {
        headers: Object.fromEntries(request.headers),
        body,
      });
    }

    // Validate input
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      console.error("Validation error:", result.error);
      return NextResponse.json(
        {
          error: "Invalid input",
          details: result.error.errors,
        },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // Initialize Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Sanitize input (basic example)
    const sanitizedMessage = message.trim().replace(/<[^>]*>/g, "");

    // Insert data with error logging
    const { data, error } = await supabase
      .from("contact_messages")
      .insert([
        {
          name: name.trim(),
          email: email.trim(),
          message: sanitizedMessage,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return NextResponse.json(
      {
        message: "Success",
        data,
      },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      }
    );
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: debug ? String(error) : undefined,
      },
      { status: 500 }
    );
  }
}

// Add OPTIONS handler for CORS
export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    }
  );
}
