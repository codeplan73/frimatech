import { NextRequest } from "next/server";
import { signOut } from "@/auth";

export async function POST(req: NextRequest) {
  await signOut();
}
