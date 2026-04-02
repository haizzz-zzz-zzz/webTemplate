import { initialBookings } from '../data';

export const STORAGE_KEY = 'hotel_bookings';

export const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBookings));
  }
};

export const getBookings = () => {
  initStorage();
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveBooking = (booking) => {
  initStorage();
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === booking.id);

  if (index !== -1) {
    // Update existing booking
    bookings[index] = { ...booking, updatedAt: new Date().toISOString() };
  } else {
    // Add new booking
    bookings.push({ ...booking, createdAt: new Date().toISOString(), status: 'Booked' });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
};

export const cancelBooking = (id) => {
  initStorage();
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);
  if (index !== -1) {
    bookings[index].status = 'Cancelled';
    bookings[index].updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    return true;
  }
  return false;
};

export const getBookingById = (id) => {
  initStorage();
  const bookings = getBookings();
  return bookings.find((b) => b.id === id);
};
