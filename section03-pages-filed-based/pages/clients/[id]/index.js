import { useRouter } from 'next/router';

function ProjectsClientPage() {
  const router = useRouter();

  function loadProjectHandler() {
    // se utilizar 'router.replace...' irá substituir a página atual,
    // não tendo replace pra mesma
    router.push({
      pathname: '/clients/[id]/[clientprojectid]',
      query: {
        id: 'rich',
        clientprojectid: 'projectx',
      },
    });
  }

  return (
    <div>
      <h1>Lista de Projetos de um clientes</h1>

      <button onClick={loadProjectHandler}>Ir para projeto X</button>
    </div>
  );
}

export default ProjectsClientPage;
