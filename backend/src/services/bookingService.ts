import { AppDataSource } from "../app";
import { Booking } from "../entity/Booking";

export class BookingService {
  static async checkConflict(roomId: string, startTime: Date, endTime: Date, excludeId?: string): Promise<boolean> {
    const bookingRepo = AppDataSource.getRepository(Booking);
    
    const query = bookingRepo.createQueryBuilder("booking")
      .where("booking.roomId = :roomId", { roomId })
      .andWhere("booking.status = :status", { status: "CONFIRMED" })
      .andWhere("booking.startTime < :endTime", { endTime })
      .andWhere("booking.endTime > :startTime", { startTime });
    
    if (excludeId) {
      query.andWhere("booking.id != :excludeId", { excludeId });
    }
    
    const conflictingBooking = await query.getOne();
    return !!conflictingBooking;
  }
  
  static canCancelBooking(startTime: Date): boolean {
    const now = new Date();
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);
    return startTime > twoHoursFromNow;
  }
}