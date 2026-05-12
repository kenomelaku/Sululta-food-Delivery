import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const createOrder = async (req: any, res: Response) => {
  try {
    const { restaurantId, items, paymentMethod, deliveryAddress, latitude, longitude, subtotal, deliveryFee, total } = req.body;
    
    const order = await prisma.order.create({
      data: {
        customerId: req.user.id,
        restaurantId,
        paymentMethod,
        deliveryAddress,
        latitude,
        longitude,
        subtotal,
        deliveryFee,
        total,
        items: {
          create: items.map((item: any) => ({
            menuItemId: item.menuItemId,
            quantity: item.quantity,
            price: item.price
          }))
        }
      },
      include: {
        items: true
      }
    });
    
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req: any, res: Response) => {
  try {
    const orders = await prisma.order.findMany({
      where: { customerId: req.user.id },
      include: {
        restaurant: true,
        items: { include: { menuItem: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const order = await prisma.order.update({
      where: { id },
      data: { status }
    });
    
    res.json(order);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};