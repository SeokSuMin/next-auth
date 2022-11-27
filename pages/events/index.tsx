import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import { IHomeProps } from '..';
import EventList from '../../components/events/EventList';
import EventSearch from '../../components/events/EventSearch';
import { getAllEvents } from '../../dummy-data';

const AllEventsPage = ({ featuredEvents }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const findEventsHandler = (selectedYear: string, selectedMonth: string) => {
    const fullPath = `/events/${selectedYear}/${selectedMonth}`;
    router.push(fullPath);
  };

  return (
    <Fragment>
      <Head>
        <title>All Evnents</title>
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={featuredEvents} />
    </Fragment>
  );
};
export default AllEventsPage;

export const getStaticProps: GetStaticProps<IHomeProps> = async (context) => {
  const events = await getAllEvents();
  if (!events) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      featuredEvents: events,
    },
    revalidate: 60,
  };
};
