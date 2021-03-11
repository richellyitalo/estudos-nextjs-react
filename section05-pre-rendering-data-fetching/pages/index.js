import path from 'path';
import Link from 'next/link';

function HomePage(props) {
  const { products, filePath } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const fs = require('fs/promises');
  console.log('Re-gerando dados');
  const filePath = path.join(process.cwd(), 'data', 'dummy-data.json');
  const fileData = await fs.readFile(filePath);
  const data = JSON.parse(fileData);

  if (!data) {
    return {
      redirect: {
        destination: 'https://google.com',
      },
    };
  }

  if (data.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
