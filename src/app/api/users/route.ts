import { NextResponse } from "next/server";

let users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Inactive" },
];
let uid = users.length+1;

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const newUser = await req.json();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newUser.email)) {
    return NextResponse.json({ success: false, message: "Invalid email format" });
  }
  users.push({ id: uid++, ...newUser });
  return NextResponse.json({ success: true, users });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  users = users.filter(user => user.id !== id);
  return NextResponse.json({ success: true, users });
}

export async function PUT(req: Request) {
  const updatedUser = await req.json();
  users = users.map(user => user.id === updatedUser.id ? { ...user, ...updatedUser } : user);
  return NextResponse.json({ success: true, users });
}
