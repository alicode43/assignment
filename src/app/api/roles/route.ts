import { NextResponse } from "next/server";

let roles = [
  { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
  { id: 2, name: "Editor", permissions: ["Read", "Write"] },
];

export async function GET() {
  return NextResponse.json(roles);
}

export async function POST(req: Request) {
  const newRole = await req.json();
  roles.push({ id: Date.now(), ...newRole });
  console.log("New role added:", newRole);
  return NextResponse.json({ success: true, roles });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  roles = roles.filter(role => role.id !== id);
  console.log(`Deleted role with ID: ${id}`);
  return NextResponse.json({ success: true, roles });
}
