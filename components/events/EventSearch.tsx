import React, { useRef } from 'react';
import Button from '../ui/Button';
import classes from './events-search.module.css';

interface IEventSearchProps {
  onSearch: (selectedYear: string, selectedMonth: string) => void;
}

const EventSearch = ({ onSearch }: IEventSearchProps) => {
  const yearSelectRef = useRef<HTMLSelectElement>(null);
  const monthSelectRef = useRef<HTMLSelectElement>(null);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedYear = yearSelectRef.current?.value;
    const selectedMonth = monthSelectRef.current?.value;
    if (selectedYear && selectedMonth) {
      onSearch(selectedYear, selectedMonth);
    }
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.controls}>
        <div className={classes.control}>
          <label htmlFor="year">Year</label>
          <select id="year" ref={yearSelectRef}>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>
        </div>
        <div className={classes.control}>
          <label htmlFor="month">Month</label>
          <select id="month" ref={monthSelectRef}>
            <option value="1">January</option>
            <option value="2">Feburary</option>
            <option value="3">March</option>
            <option value="4">April</option>
            <option value="5">May</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">Aigust</option>
            <option value="9">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>
      </div>
      <Button>Find Events</Button>
    </form>
  );
};

export default EventSearch;
