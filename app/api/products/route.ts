import { NextResponse } from 'next/server';
import { initialProducts } from '@/lib/data';

export async function GET() {
  try {
    return NextResponse.json(initialProducts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener los productos' },
      { status: 500 }
    );
  }
}
