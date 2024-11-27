import { NextResponse } from "next/server";

const permissions = ["Read", "Write", "Delete", "Execute"];

export async function GET() {
  return NextResponse.json(permissions);
}

export async function POST(request: Request) {
  const { permission } = await request.json();
  if (permission && !permissions.includes(permission)) {
    permissions.push(permission);
    return NextResponse.json({ message: "Permission added successfully" });
  }
  return NextResponse.json({ message: "Permission already exists or invalid" }, { status: 400 });
}

