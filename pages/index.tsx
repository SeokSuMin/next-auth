import { GetStaticProps, InferGetStaticPropsType } from 'next';
import EventList from '../components/events/EventList';
import { DUMMY_EVENTSProps, getFeaturedEvents } from '../dummy-data';

export interface IHomeProps {
  featuredEvents: DUMMY_EVENTSProps[];
}

const Home = ({ featuredEvents }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div>
      <EventList items={featuredEvents} />
    </div>
  );
};
export default Home;

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
  const featuredEvents = await getFeaturedEvents();
  if (!featuredEvents) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      featuredEvents,
    },
    revalidate: 60,
  };
};
