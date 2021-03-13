import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../services/events';

function HomePage(props) {
  return (
    <div>
      <pre>{JSON.stringify(props.events)}</pre>
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getFeaturedEvents();
  return {
    props: {
      events
    }
  }
}

export default HomePage;
