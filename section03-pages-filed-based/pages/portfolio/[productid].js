import { useRouter } from 'next/router';

function ProductPageDetailt() {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query);

  // realizar requisicao a partir de router.query.projectid

  return <h1>Detalhe de produto</h1>;
}

export default ProductPageDetailt;
