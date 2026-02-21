export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'HOW I CAN RENT THE ELECTRIC CAR?',
    answer:
      'Browse our fleet on the OUR MODELS page, select your preferred vehicle, choose your rental dates, and complete the booking form. You can also use our mobile rental app available on Google Play and the App Store. A valid driving licence and a credit card are required at the time of booking.',
  },
  {
    id: 'faq-2',
    question: 'HOW TO CHECK THE STATUS OF THE BOOKING CODE?',
    answer:
      'After completing your reservation, you will receive a confirmation email containing your unique booking code. You can track the real-time status of your booking by entering that code in the "Track My Booking" section of the app or on our website under the MY BOOKINGS menu.',
    defaultOpen: true,
  },
  {
    id: 'faq-3',
    question: 'HOW DO I MAKE A RENT ORDER CHANGE?',
    answer:
      'Changes to an existing rental order — including pickup date, return date, or vehicle selection — can be made up to 24 hours before the scheduled pickup time. Log in to your account, navigate to MY BOOKINGS, select the reservation you wish to modify, and follow the amendment flow.',
  },
  {
    id: 'faq-4',
    question: 'HOW DO I CANCEL A RENT ORDER?',
    answer:
      'Cancellations made more than 48 hours before pickup are fully refunded. Cancellations within 48 hours may be subject to a one-day charge. To cancel, go to MY BOOKINGS, select your reservation, and tap CANCEL ORDER. You will receive a cancellation confirmation and refund details by email.',
  },
  {
    id: 'faq-5',
    question: 'WHAT IF THERE IS A FAILED ORDER WHEN ORDERING A ELECTRIC CAR ON TIMELESS?',
    answer:
      'If your order fails during checkout, please check that your payment method is valid and that your billing details are correct. No charge will be applied for a failed order. If the problem persists, contact our support team via the CONTACT page or call our 24/7 helpline — we will resolve the issue and confirm your booking as quickly as possible.',
  },
];
