import Link from 'next/link';

function ClientsPage() {
  const clients = [
    { id: 'rich', name: 'Richelly' },
    { id: 'litry', name: 'Richellytry' },
  ];

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <ul>
        {clients.map(({ id, name }) => (
          <li key={id}>
            {/* Método tradicional de gerar os links */}
            {/* <Link href={`/clients/${id}`}>{name}</Link> */}

            {/* Método via object */}
            <Link
              href={{
                pathname: '/clients/[id]',
                query: {
                  id: id,
                },
              }}
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ClientsPage;
