import classes from './event-summary.module.css';

interface IEventSummaryProps {
  title: string;
}

function EventSummary({ title }: IEventSummaryProps) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
