import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
  { params }: { params: { applicationId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, price, description } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!params.applicationId) {
      return new NextResponse("Application id is required", { status: 400 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        description,
        applicationId: params.applicationId
      },
    });
  
    return NextResponse.json(product);
  } catch (error) {
    console.log('[PRODUCTS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
  { params }: { params: { applicationId: string } },
) {
  try {
    const { searchParams } = new URL(req.url)

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.applicationId) {
      return new NextResponse("Application id is required", { status: 400 });
    }

    const payments = await prismadb.payment.findMany({
      where: {
        applicationId: params.applicationId,
      },
      include: {
        order: true,
        user: true
      },
      orderBy: {
        createdAt: 'desc',
      }
    });
  
    return NextResponse.json(payments);
  } catch (error) {
    console.log('[PAYMENTS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};