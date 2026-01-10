import { NextRequest, NextResponse } from 'next/server';
import { getOrders, createOrder } from '@/lib/data';
import { Order } from '@/types';

export async function GET() {
  try {
    const orders = getOrders();
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener las órdenes' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, products, status } = body;

    // Calcular el total
    const total = products.reduce((sum: number, product: any) => {
      return sum + product.price * product.quantity;
    }, 0);

    const newOrder = createOrder({
      customerName,
      customerEmail,
      products,
      total,
      status: status || 'pending',
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al crear la orden' },
      { status: 500 }
    );
  }
}
