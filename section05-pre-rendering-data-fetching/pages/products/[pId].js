import { Fragment } from 'react';
import path from 'path';

function productPage(props) {
  const { product } = props;

  // apenas quando fallback: false no getStaticPaths
  if (!product) {
    return <h3>Carregando...</h3>;
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
}

async function getData() {
  const fs = require('fs/promises');
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);
  return data;
}

// fallback
// blocking: aguarda até o HTML da página ser gerado
// false: exibe apenas o que for mapeado
// true: exibe em tempo de execução
export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pId: id } }));

  return { paths: pathsWithParams, fallback: true };
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pId;
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      product,
    },
    revalidate: 5,
  };
}

export default productPage;
