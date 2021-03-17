import { Fragment } from 'react';
import { useRouter } from 'next/router';

import EventList from '../../components/events/event-list';
import { getFilteredEvents } from '../../services/events';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import ResultsTitle from '../../components/events/results-title';

function FilterEventsPage(props) {
  if (!props.events) {
    return <p className="center">Carregando...</p>;
  }

  if (props.hasError) {
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

  if (!props.events || props.events.length === 0) {
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

  const date = new Date(props.date.year, props.date.month - 1);
  
  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={props.events} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slugs;

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
    return {
      props: {
        hasError: true,
      },
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  const date = {
    year: numYear,
    month: numMonth
  };

  return {
    props: {
      events: filteredEvents,
      date,
    },
  };
}

export default FilterEventsPage;
