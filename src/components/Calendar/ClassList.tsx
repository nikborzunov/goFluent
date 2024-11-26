import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import styles from './calendar.module.css';

interface Booking {
  id: number;
  type: string;
  trainer: string;
  start: string;
}

interface ClassListProps {
  bookings: Booking[];
  onEdit: (booking: Booking) => void;
  onRemove: (id: number) => void;
}

const ClassList: React.FC<ClassListProps> = ({
  bookings,
  onEdit,
  onRemove,
}) => {
  return (
    <ul className={styles.classList}>
      {bookings.length === 0 ? (
        <li>No scheduled classes.</li>
      ) : (
        bookings.map((booking) => (
          <li key={booking.id} className={styles.classItem}>
            <div>
              <strong>{booking.type}</strong> with{' '}
              <strong>{booking.trainer}</strong> on{' '}
              {new Date(booking.start).toLocaleDateString()} at{' '}
              {new Date(booking.start).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div>
              <FaEdit
                className={styles.editIcon}
                onClick={() => onEdit(booking)}
                title="Edit Booking"
              />
              <FaTrash
                className={styles.deleteIcon}
                onClick={() => onRemove(booking.id)}
                title="Delete Booking"
              />
            </div>
          </li>
        ))
      )}
    </ul>
  );
};

export default ClassList;
