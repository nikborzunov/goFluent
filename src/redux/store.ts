import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: number;
  type: string;
  trainer: string;
  start: string;
}

interface BookingsState {
  bookings: Booking[];
}

const initialState: BookingsState = {
  bookings: [
    {
      id: 1,
      type: 'English Conversation',
      trainer: 'Amy Catalan',
      start: '2023-10-10T09:00:00',
    },
    {
      id: 2,
      type: 'Grammar Workshop',
      trainer: 'Sandra Dee',
      start: '2023-10-12T10:00:00',
    },
    {
      id: 3,
      type: 'Vocabulary Building',
      trainer: 'Loraine Beltran',
      start: '2023-10-15T11:00:00',
    },
  ],
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    removeBooking: (state, action: PayloadAction<number>) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.id !== action.payload
      );
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex(
        (booking) => booking.id === action.payload.id
      );
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
    },
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
  },
});

export const { addBooking, removeBooking, updateBooking, setBookings } =
  bookingsSlice.actions;

const store = configureStore({
  reducer: {
    bookings: bookingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
