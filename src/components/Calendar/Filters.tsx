import React from 'react';
import styles from './calendar.module.css';

interface FiltersProps {
  filters: {
    trainer: string;
    type: string;
    time: string;
  };
  trainers: { name: string; completed: number }[];
  classTypes: string[];
  onChange: (filters: { trainer: string; type: string; time: string }) => void;
}

const Filters: React.FC<FiltersProps> = ({
  filters,
  trainers,
  classTypes,
  onChange,
}) => {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...filters, [name]: value });
  };

  return (
    <div className={styles.filters}>
      <h3 className={styles.filterTitle}>Filters</h3>
      <label>
        Trainer:
        <select
          name="trainer"
          value={filters.trainer}
          onChange={handleSelectChange}
        >
          <option value="">All</option>
          {trainers.map((t) => (
            <option key={t.name} value={t.name}>
              {t.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Class Type:
        <select name="type" value={filters.type} onChange={handleSelectChange}>
          <option value="">All</option>
          {classTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      <label>
        Time:
        <select name="time" value={filters.time} onChange={handleSelectChange}>
          <option value="">All</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
          <option value="12:00">12:00</option>
        </select>
      </label>
    </div>
  );
};

export default Filters;
