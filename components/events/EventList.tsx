import { DUMMY_EVENTSProps } from '../../dummy-data';
import EventItem from './EventItem';
import classes from './EventLlist.module.css';

interface EventListProps {
  items: DUMMY_EVENTSProps[];
}

const EventList = ({ items }: EventListProps) => {
  return (
    <ul className={classes.list}>
      {items?.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
          description={event.description}
          isFeatured={event.isFeatured}
        />
      ))}
    </ul>
  );
};

export default EventList;
