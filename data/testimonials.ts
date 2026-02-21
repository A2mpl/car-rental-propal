// data/testimonials.ts
// Product Manager note: companies "CHANAT LTD" and "TECON CYPRUS LTD" are confirmed from design.
// Third company is a plausible addition consistent with the B2B fleet rental tone.
// Avatar images are placeholders — developer: add data-todo="real-avatar" to every <img> element.
// Testimonials section uses a static carousel — data-todo="testimonials-carousel" on the wrapper.

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  avatar: string;   // Path in /public/images/ — data-todo="real-avatar"
  text: string;
}

export const testimonials = [
    {
        id: 'testimonial-1',
        name: 'James Hartley',
        company: 'Chanat Ltd',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
        text: 'Timeless completely changed how our team approaches business travel. The Tesla Model 3 we rented was immaculate, the booking process took under five minutes, and the silent drive made every commute feel like a first-class experience.',
    },
    {
        id: 'testimonial-2',
        name: 'Andreea Panayi',
        company: 'Tecon Cyprus Ltd',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
        text: 'As a company committed to reducing our carbon footprint, partnering with Timeless for our executive car fleet was an easy decision. The vehicles are always spotless, delivery is punctual, and their EV charging station locator has saved us countless hours.',
    },
    {
        id: 'testimonial-3',
        name: 'Marcus Delacroix',
        company: 'Nordvolt Ventures',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
        text: 'We arranged a full week of client transfers using the Timeless fleet and the feedback from our guests was outstanding. The cars are modern, the interiors are pristine, and the app makes managing multiple bookings effortless.',
    },
    {
        id: 'testimonial-4',
        name: 'Sophie Laurent',
        company: 'Meridian Capital',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
        text: 'The level of professionalism from Timeless is unmatched. From the initial consultation to the final delivery, every detail was handled with precision. Our clients were thoroughly impressed with the vehicle quality.',
    },
    {
        id: 'testimonial-5',
        name: 'Oliver Chen',
        company: 'Apex Automotive Group',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
        text: 'Selling my Porsche 911 through Timeless was the smoothest transaction I have ever experienced. Fair valuation, zero hassle, and payment arrived within 48 hours. This is how luxury car sales should work.',
    },
    {
        id: 'testimonial-6',
        name: 'Elena Vasquez',
        company: 'Riviera Holdings',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80',
        text: 'I have been searching for a trustworthy broker for years. Timeless exceeded every expectation — transparent pricing, impeccable service, and a curated selection that speaks to true automotive connoisseurs.',
    },
];
