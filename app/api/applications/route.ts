import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, description } = body;

    if (!userId) { 
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
    }

    const application = await prismadb.application.create({
      data: {
        name,
        description
      }
    });

    return NextResponse.json(application);
  } catch (error) {
    console.log('[APPLICATIONS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
}