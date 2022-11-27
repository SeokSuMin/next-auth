export interface DUMMY_EVENTSProps {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

// const DUMMY_EVENTS: DUMMY_EVENTSProps[] = [
//   {
//     id: 'e1',
//     title: 'Programming for everyone',
//     description:
//       'Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.',
//     location: 'Somestreet 25, 12345 San Somewhereo',
//     date: '2021-05-12',
//     image: 'images/coding-event.jpg',
//     isFeatured: false,
//   },
//   {
//     id: 'e2',
//     title: 'Networking for introverts',
//     description:
//       "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
//     location: 'New Wall Street 5, 98765 New Work',
//     date: '2021-05-30',
//     image: 'images/introvert-event.jpg',
//     isFeatured: true,
//   },
//   {
//     id: 'e3',
//     title: 'Networking for extroverts',
//     description:
//       'You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.',
//     location: 'My Street 12, 10115 Broke City',
//     date: '2022-04-10',
//     image: 'images/extrovert-event.jpg',
//     isFeatured: true,
//   },
// ];

export async function getAllEvents() {
  const resposne = await fetch(
    'https://nextjs-course-f9c1b-default-rtdb.firebaseio.com/events.json',
  );
  const data = (await resposne.json()) as { [key: string]: DUMMY_EVENTSProps };
  const eventData = [];
  for (const key in data) {
    eventData.push({
      id: key,
      date: data[key].date,
      description: data[key].description,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
      location: data[key].location,
      title: data[key].title,
    });
  }
  return eventData;
}

export async function getFeaturedEvents() {
  const allData = await getAllEvents();
  return allData.filter((event) => event.isFeatured);
}

export async function getFilteredEvents(dateFilter: { year: number; month: number }) {
  const { year, month } = dateFilter;
  const allData = await getAllEvents();
  const filteredEvents = allData.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month - 1;
  });

  return filteredEvents;
}

export async function getEventById(id: string) {
  const allData = await getAllEvents();
  return allData.find((event) => event.id === id);
}
