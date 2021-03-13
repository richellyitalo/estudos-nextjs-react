import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../dummy-data';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilterEventsPage() {
  const router = useRouter();

  const filterData = router.query.slugs;

  if (!filterData) {
    return <p className="center">Carregando...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > new Date().getFullYear() + 20 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Parametros inválidos.</p>
        </ErrorAlert>
        <p className="center">
          <Button link="/events">Ver todos os eventos</Button>
        </p>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
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

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}

export default FilterEventsPage;
