import { Router } from "express";
import { AppDataSource } from "../app";
import { Room } from "../entity/Room";
import { Booking } from "../entity/Booking";
import { Between } from "typeorm";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;
    
    const roomRepo = AppDataSource.getRepository(Room);
    const bookingRepo = AppDataSource.getRepository(Booking);
    const rooms = await roomRepo.find();

    const analytics = await Promise.all(rooms.map(async (room) => {
      let whereCondition: any = { roomId: room.id, status: "CONFIRMED" };
      
      if (from && to) {
        whereCondition.startTime = Between(new Date(from as string), new Date(to as string));
      }
      
      const bookings = await bookingRepo.find({ where: whereCondition });

      const totalHours = bookings.reduce((total, b) => {
        return total + ((new Date(b.endTime).getTime() - new Date(b.startTime).getTime()) / 36e5);
      }, 0);

      const totalRevenue = bookings.reduce((total, b) => total + b.totalPrice, 0);

      return {
        roomId: room.id,
        roomName: room.name,
        totalHours: Math.round(totalHours * 100) / 100,
        totalRevenue: Math.round(totalRevenue * 100) / 100
      };
    }));

    res.json(analytics);
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
