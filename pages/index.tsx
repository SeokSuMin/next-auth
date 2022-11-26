import Link from 'next/link';
import EventList from '../components/events/EventList';
import { getFeaturedEvents } from '../dummy-data';

const Home = () => {
  const featureEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={featureEvents} />
    </div>
  );
};
export default Home;
