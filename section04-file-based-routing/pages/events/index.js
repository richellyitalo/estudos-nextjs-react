import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { getAllEvents } from '../../dummy-data';

function AllEventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  function onSearchHandler(year, month) {
    const fullPath = `/events/${year}/${month}`

    router.push(fullPath);
  }

  return (
    <div>
      <EventsSearch onSearch={onSearchHandler} />
      <EventList items={events}  />
    </div>
  )
}

export default AllEventsPage;