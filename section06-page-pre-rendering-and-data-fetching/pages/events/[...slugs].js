import { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../services/events';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import ResultsTitle from '../../components/events/results-title';

function FilterEventsPage(props) {
  const router = useRouter();

  const filteredData = router.query.slugs;

  if (!filteredData) {
    return <p className="center">Carregando...</p>;
  }
  
  const [loadedEvents, setLoadedEvents] = useState();

  const { data, error } = useSWR(process.env.NEXT_PUBLIC_FIREBASE);

  useEffect(() => {
    const events = [];
    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }

    setLoadedEvents(events);
  }, [data]);

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (!loadedEvents) {
    return <p className="center">Carregando...</p>;
  }

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > new Date().getFullYear() + 20 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Parametros inválidos.</p>
        </ErrorAlert>
        <p className="center">
          <Button link="/events">Confira todos os eventos</Button>
        </p>
      </Fragment>
    );
  }

  const eventsFiltered = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!eventsFiltered || eventsFiltered.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Nenhum evento encontrado.</p>
        </ErrorAlert>
        <p className="center">
          <Button link="/events">Ver todos os eventos</Button>
        </p>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={eventsFiltered} />
    </div>
  );
}

export default FilterEventsPage;
