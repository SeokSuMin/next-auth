import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { Fragment } from 'react';
import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import ErrorAlert from '../../components/ui/ErrorAlert';
import { DUMMY_EVENTSProps, getAllEvents, getEventById, getFeaturedEvents } from '../../dummy-data';

interface IEventDetailPageProps {
  event: DUMMY_EVENTSProps | undefined;
}

const EventDetailPage = ({ event }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event?.title} />
      <EventLogistics
        date={event?.date}
        address={event?.location}
        image={event?.image}
        imageAlt={event?.title}
      />
      <EventContent>
        <p>{event?.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default EventDetailPage;

export const getStaticProps: GetStaticProps<IEventDetailPageProps> = async (context) => {
  const eventId = context?.params?.eventId as string;
  const event = await getEventById(eventId);
  return {
    props: {
      event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => {
    return {
      params: {
        eventId: event.id,
      },
    };
  });
  return {
    paths,
    fallback: true,
  };
};
