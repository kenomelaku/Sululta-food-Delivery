import { Request, Response } from 'express';
import prisma from '../config/prisma';

export const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    
    const restaurants = await prisma.restaurant.findMany({
      where: {
        isOpen: true,
        ...(category && { categories: { some: { name: category as string } } }),
        ...(search && { name: { contains: search as string, mode: 'insensitive' } })
      },
      include: {
        categories: true
      }
    });
    
    res.json(restaurants);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRestaurantDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const restaurant = await prisma.restaurant.findUnique({
      where: { id },
      include: {
        menuItems: {
          include: { category: true }
        },
        categories: true
      }
    });
    
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createRestaurant = async (req: any, res: Response) => {
  try {
    const { name, description, address, latitude, longitude, logo, banner } = req.body;
    
    const restaurant = await prisma.restaurant.create({
      data: {
        name,
        description,
        address,
        latitude,
        longitude,
        logo,
        banner,
        ownerId: req.user.id
      }
    });
    
    res.status(201).json(restaurant);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};