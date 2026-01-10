import { NextRequest, NextResponse } from 'next/server';
import { getOrderById, updateOrder, deleteOrder } from '@/lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order = getOrderById(params.id);
    if (!order) {
      return NextResponse.json(
        { error: 'Orden no encontrada' },
        { status: 404 }
      );
    }
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener la orden' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, products, status } = body;

    // Calcular el total si hay productos
    let total = 0;
    if (products && products.length > 0) {
      total = products.reduce((sum: number, product: any) => {
        return sum + product.price * product.quantity;
      }, 0);
    }

    const updatedOrder = updateOrder(params.id, {
      customerName,
      customerEmail,
      products,
      total,
      status,
    });

    if (!updatedOrder) {
      return NextResponse.json(
        { error: 'Orden no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al actualizar la orden' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = deleteOrder(params.id);
    if (!success) {
      return NextResponse.json(
        { error: 'Orden no encontrada' },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: 'Orden eliminada correctamente' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al eliminar la orden' },
      { status: 500 }
    );
  }
}
