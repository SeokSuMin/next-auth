import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';
import { IHomeProps } from '..';
import EventList from '../../components/events/EventList';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { DUMMY_EVENTSProps, getFilteredEvents } from '../../dummy-data';
import useSWR from 'swr';
interface IFilteredEventsPageProps {
  filteredEvents: DUMMY_EVENTSProps[];
  hasError?: boolean;
}

const FilteredEventsPage = ({
  filteredEvents,
  hasError,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  // const router = useRouter();
  // const filterData = router.query.slug;
  // const [loadedEvents, setLoadedEvents] = useState<DUMMY_EVENTSProps[]>();

  // const { data, error } = useSWR(
  //   'https://nextjs-course-f9c1b-default-rtdb.firebaseio.com/events.json',
  //   (url) => fetch(url).then((res) => res.json()),
  // );

  // useEffect(() => {
  //   if (data) {
  //     const eventData = [];
  //     for (const key in data) {
  //       eventData.push({
  //         id: key,
  //         date: data[key].date,
  //         description: data[key].description,
  //         image: data[key].image,
  //         isFeatured: data[key].isFeatured,
  //         location: data[key].location,
  //         title: data[key].title,
  //       });
  //     }
  //     setLoadedEvents(eventData);
  //   }
  // }, [data]);

  // if (!loadedEvents) {
  //   return <p className="center">Loading...</p>;
  // }

  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid Filter.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  if (filteredEvents?.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>데이터가 없습니다</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
};

export default FilteredEventsPage;

export const getServerSideProps: GetServerSideProps<IFilteredEventsPageProps> = async (context) => {
  const filteredYear = +(context.query.slug as string[])[0];
  const filteredMonth = +(context.query.slug as string[])[1];

  if (isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030) {
    return {
      props: {
        hasError: true,
        filteredEvents: [],
      },
      // notFound: true,
      // redirect: /
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  return {
    props: { filteredEvents },
  };
};
