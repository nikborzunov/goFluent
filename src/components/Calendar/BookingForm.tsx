import React from 'react';
import styles from './calendar.module.css';

interface BookingFormProps {
  selectedDate: string;
  classType: string;
  selectedTime: string;
  trainer: string;
  classTypes: string[];
  trainers: { name: string; completed: number }[];
  onClassTypeChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onTrainerChange: (value: string) => void;
  onBooking: () => void;
  isEditing: boolean;
}

const BookingForm: React.FC<BookingFormProps> = ({
  selectedDate,
  classType,
  selectedTime,
  trainer,
  classTypes,
  trainers,
  onClassTypeChange,
  onTimeChange,
  onTrainerChange,
  onBooking,
  isEditing,
}) => {
  return (
    <div className={styles.bookingForm}>
      <h3>Book an English class on {selectedDate}</h3>
      <label>
        Class Type:
        <select
          value={classType}
          onChange={(e) => onClassTypeChange(e.target.value)}
        >
          <option value="">Select class type</option>
          {classTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        Time:
        <select
          value={selectedTime}
          onChange={(e) => onTimeChange(e.target.value)}
        >
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
        </select>
      </label>
      <label>
        Select Trainer:
        <select
          value={trainer}
          onChange={(e) => onTrainerChange(e.target.value)}
        >
          <option value="">Select a trainer</option>
          {trainers.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name} - {t.completed} classes completed
            </option>
          ))}
        </select>
      </label>
      <button onClick={onBooking} className={styles.bookButton}>
        {isEditing ? 'Update Booking' : 'Book'}
      </button>
    </div>
  );
};

export default BookingForm;
