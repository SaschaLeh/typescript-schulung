/**
 * A service for sending notifications
 */
export class NotificationService {
    sendEmail(to: string, subject: string, body: string): void {
      // In a real app, this would send an actual email
      console.log(`EMAIL to ${to}: ${subject} - ${body}`);
    }
  
    sendSMS(to: string, message: string): void {
      // In a real app, this would send an actual SMS
      console.log(`SMS to ${to}: ${message}`);
    }
  }
  