import Link from 'next/link'

function HomePage() {
  return (
    <div>
      <h1>Página inicial</h1>

      <ul>
        <li>
          <Link href="/clients">Clientes</Link>
        </li>
        <li>
          <Link href="/portfolio">Portfolio</Link>
        </li>
      </ul>
    </div>
  );
}

export default HomePage;
