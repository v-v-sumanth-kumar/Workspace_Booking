export class PricingService {
  static calculateTotalPrice(baseRate: number, startTime: Date, endTime: Date): number {
    const start = new Date(startTime);
    const end = new Date(endTime);
    let totalPrice = 0;
    
    const current = new Date(start);
    
    while (current < end) {
      const nextHour = new Date(current);
      nextHour.setHours(current.getHours() + 1);
      
      const slotEnd = nextHour > end ? end : nextHour;
      const durationHours = (slotEnd.getTime() - current.getTime()) / (1000 * 60 * 60);
      
      const rate = this.isPeakHour(current) ? baseRate * 1.5 : baseRate;
      totalPrice += rate * durationHours;
      
      current.setTime(nextHour.getTime());
    }
    
    return Math.round(totalPrice);
  }
  
  private static isPeakHour(time: Date): boolean {
    const day = time.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = time.getHours();
    
    // Peak hours: 10 AM–1 PM, 4 PM–7 PM Mon–Fri
    const isWeekday = day >= 1 && day <= 5;
    const isMorningPeak = hour >= 10 && hour < 13;
    const isEveningPeak = hour >= 16 && hour < 19;
    
    return isWeekday && (isMorningPeak || isEveningPeak);
  }
}