import { NextResponse } from "next/server";

const permissions = ["Read", "Write", "Delete", "Execute"];

export async function GET() {
  return NextResponse.json(permissions);
}

export async function POST(request: Request) {
  const { permission } = await request.json();
  if (permission && !permissions.includes(permission)) {
    permissions.push(permission);
    return NextResponse.json({ message: "Permission added successfully", permission });
  }
  return NextResponse.json({ message: "Permission already exists or invalid" }, { status: 400 });
}

export async function DELETE(request: Request) {
  const { permission } = await request.json();
  const index = permissions.indexOf(permission);
  if (index !== -1) {
    permissions.splice(index, 1);
    console.log(`Deleted permission: ${permission}`);
    return NextResponse.json({ success: true, permissions });
  }
  return NextResponse.json({ message: "Permission not found" }, { status: 404 });
}

