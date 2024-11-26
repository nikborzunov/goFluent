'use client';

import React, { useCallback, useMemo, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { DateClickArg, EventDropArg, EventInput } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { addBooking, removeBooking, updateBooking } from '@/redux/store';
import styles from './calendar.module.css';
import type { RootState, AppDispatch } from '@/redux/store';
import Filters from './Filters';
import ClassList from './ClassList';
import BookingForm from './BookingForm';

interface Booking {
  id: number;
  type: string;
  trainer: string;
  start: string;
}

interface CalendarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Calendar: React.FC<CalendarProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const bookings = useSelector((state: RootState) => state.bookings.bookings);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('09:00');
  const [classType, setClassType] = useState<string>('');
  const [trainer, setTrainer] = useState<string>('');
  const [filters, setFilters] = useState<{
    trainer: string;
    type: string;
    time: string;
  }>({
    trainer: '',
    type: '',
    time: '',
  });

  const classTypes = useMemo(
    () => [
      'English Conversation',
      'Grammar Workshop',
      'Vocabulary Building',
      'Pronunciation Practice',
    ],
    []
  );

  const trainers = useMemo(
    () => [
      { name: 'Amy Catalan', completed: 5 },
      { name: 'Sandra Dee', completed: 3 },
      { name: 'Loraine Beltran', completed: 4 },
    ],
    []
  );

  const handleDateClick = useCallback((arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setSelectedBooking(null);
    setClassType('');
    setTrainer('');
    setSelectedTime('09:00');
  }, []);

  const handleBooking = useCallback(() => {
    if (trainer && selectedDate && selectedTime && classType) {
      const newStart = `${selectedDate}T${selectedTime}:00`;
      const isOverlap = bookings.some(
        (booking) =>
          booking.start === newStart &&
          booking.id !== (selectedBooking?.id || 0)
      );
      if (isOverlap) {
        alert('This time slot is already booked.');
        return;
      }
      if (selectedBooking) {
        dispatch(
          updateBooking({
            ...selectedBooking,
            type: classType,
            trainer,
            start: newStart,
          })
        );
      } else {
        const newBooking: Booking = {
          id: Date.now(),
          type: classType,
          trainer,
          start: newStart,
        };
        dispatch(addBooking(newBooking));
      }
      setSelectedDate('');
      setSelectedTime('09:00');
      setClassType('');
      setTrainer('');
      setSelectedBooking(null);
    }
  }, [
    trainer,
    selectedDate,
    selectedTime,
    classType,
    dispatch,
    bookings,
    selectedBooking,
  ]);

  const handleRemove = useCallback(
    (id: number) => {
      dispatch(removeBooking(id));
    },
    [dispatch]
  );

  const handleEventDrop = useCallback(
    (arg: EventDropArg) => {
      const bookingId = Number(arg.event.id);
      const updatedStart = arg.event.start;
      if (!updatedStart) return;
      const newStartISO = updatedStart.toISOString();
      const isOverlap = bookings.some(
        (booking) => booking.id !== bookingId && booking.start === newStartISO
      );
      if (isOverlap) {
        alert('This time slot is already booked.');
        arg.revert();
        return;
      }
      const bookingToUpdate = bookings.find(
        (booking) => booking.id === bookingId
      );
      if (bookingToUpdate) {
        dispatch(
          updateBooking({
            ...bookingToUpdate,
            start: newStartISO,
          })
        );
      }
    },
    [dispatch, bookings]
  );

  const handleFilterChange = useCallback(
    (newFilters: { trainer: string; type: string; time: string }) => {
      setFilters(newFilters);
    },
    []
  );

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesTrainer = filters.trainer
        ? booking.trainer === filters.trainer
        : true;
      const matchesType = filters.type ? booking.type === filters.type : true;
      const matchesTime = filters.time
        ? booking.start.includes(filters.time)
        : true;
      return matchesTrainer && matchesType && matchesTime;
    });
  }, [bookings, filters]);

  const events: EventInput[] = useMemo(
    () =>
      filteredBookings.map((booking: Booking) => ({
        title: `${booking.type} with ${booking.trainer}`,
        date: booking.start.split('T')[0],
        start: booking.start,
        allDay: false,
        id: booking.id.toString(),
      })),
    [filteredBookings]
  );

  const handleEdit = useCallback((booking: Booking) => {
    setSelectedBooking(booking);
    setSelectedDate(booking.start.split('T')[0]);
    setSelectedTime(booking.start.split('T')[1].slice(0, 5));
    setClassType(booking.type);
    setTrainer(booking.trainer);
  }, []);

  return isOpen ? (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.leftSection}>
          <h2 className={styles.sectionTitle}>Scheduled English Classes</h2>
          <Filters
            filters={filters}
            trainers={trainers}
            classTypes={classTypes}
            onChange={handleFilterChange}
          />
          <ClassList
            bookings={filteredBookings}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        </div>
        <div className={styles.rightSection}>
          <h2 className={styles.sectionTitle}>Book an English Class</h2>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            dateClick={handleDateClick}
            events={events}
            editable
            eventDrop={handleEventDrop}
            height="50vh"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay',
            }}
            eventColor="#055B96"
            eventTextColor="#ffffff"
            dayHeaderContent={(args) => (
              <span style={{ color: '#055B96', fontWeight: '600' }}>
                {args.text}
              </span>
            )}
            dayCellContent={(args) => (
              <span style={{ color: '#055B96' }}>{args.dayNumberText}</span>
            )}
            eventContent={(eventInfo) => (
              <span style={{ color: '#ffffff' }}>{eventInfo.event.title}</span>
            )}
          />
          {(selectedDate || selectedBooking) && (
            <BookingForm
              selectedDate={selectedDate}
              classType={classType}
              selectedTime={selectedTime}
              trainer={trainer}
              classTypes={classTypes}
              trainers={trainers}
              onClassTypeChange={setClassType}
              onTimeChange={setSelectedTime}
              onTrainerChange={setTrainer}
              onBooking={handleBooking}
              isEditing={!!selectedBooking}
            />
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default Calendar;
