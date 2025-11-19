import { Router } from "express";
import { AppDataSource } from "../app";
import { Booking } from "../entity/Booking";
import { Room } from "../entity/Room";
import { PricingService } from '../services/pricingService';
import { BookingService } from '../services/bookingService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const bookingRepo = AppDataSource.getRepository(Booking);
    const bookings = await bookingRepo.find({ relations: ['room'] });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});
router.post("/", async (req, res) => {
  try {
    const { roomId, userName, startTime, endTime } = req.body;
    
    if (!roomId || !userName || !startTime || !endTime) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (start >= end) {
      return res.status(400).json({ error: "End time must be after start time" });
    }
    
    if (start < new Date()) {
      return res.status(400).json({ error: "Cannot book in the past" });
    }
    
    const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if (durationHours > 12) {
      return res.status(400).json({ error: "Booking duration cannot exceed 12 hours" });
    }
    
    const bookingRepo = AppDataSource.getRepository(Booking);
    const roomRepo = AppDataSource.getRepository(Room);

    const room = await roomRepo.findOneBy({ id: roomId });
    if (!room) {
      return res.status(400).json({ error: "Invalid roomId" });
    }

    const hasConflict = await BookingService.checkConflict(roomId, start, end);
    if (hasConflict) {
      return res.status(400).json({ error: "Room already booked for the selected time" });
    }

    const totalPrice = PricingService.calculateTotalPrice(room.baseHourlyRate, start, end);

    const booking = bookingRepo.create({
      roomId,
      userName,
      startTime: start,
      endTime: end,
      totalPrice,
      status: "CONFIRMED",
    });

    await bookingRepo.save(booking);
    res.status(201).json({
      bookingId: booking.id,
      roomId: booking.roomId,
      userName: booking.userName,
      totalPrice: booking.totalPrice,
      status: booking.status
    });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.post("/:id/cancel", async (req, res) => {
  try {
    const bookingRepo = AppDataSource.getRepository(Booking);
    const booking = await bookingRepo.findOneBy({ id: req.params.id });
    
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    
    if (booking.status === "CANCELLED") {
      return res.status(400).json({ error: "Booking already cancelled" });
    }
    
    if (booking.startTime <= new Date()) {
      return res.status(400).json({ error: "Cannot cancel past bookings" });
    }
    
    if (!BookingService.canCancelBooking(booking.startTime)) {
      return res.status(400).json({ error: "Cannot cancel booking less than 2 hours before start time" });
    }

    booking.status = "CANCELLED";
    await bookingRepo.save(booking);
    res.json({ message: "Booking cancelled successfully" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bookingRepo = AppDataSource.getRepository(Booking);
    const booking = await bookingRepo.findOneBy({ id: req.params.id });
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "CANCELLED";
    await bookingRepo.save(booking);
    res.json({ message: "Booking cancelled" });
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
