import useSWR from 'swr';
import { useState, useEffect } from 'react';

function LastSales(props) {
  const [sales, setSales] = useState(props.sales);

  // useSWR possibilida o uso de menos código
  const { data, error } = useSWR(process.env.NEXT_PUBLIC_FIREBASE);

  useEffect(() => {
    if (data) {
      const formatedSales = [];

      for (const key in data) {
        formatedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      setSales(formatedSales);
    }
  }, [data]);

  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setIsLoading(true);

  //   fetch(process.env.NEXT_PUBLIC_FIREBASE)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const formatedSales = [];

  //       for (const key in data) {
  //         formatedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }

  //       setSales(formatedSales);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Dados não encontrados...</p>;
  }

  if (!data && !sales) {
    return <p>Carregando...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          Nome: <strong>{sale.username}</strong>
          <br />
          Volume: <strong>{sale.volume}</strong>
        </li>
      ))}
    </ul>
  );
}

export default LastSales;

// export async function getStaticProps() {
//   const request = await fetch(process.env.NEXT_PUBLIC_FIREBASE);
//   const data = await request.json();
//   const formatedSales = [];

//   for (const key in data) {
//     formatedSales.push({
//       id: key,
//       username: data[key].username,
//       volume: data[key].volume,
//     });
//   }

//   return {
//     props: {
//       sales: formatedSales,
//     },
//   };
// }
export async function getServerSideProps() {
  const request = await fetch(process.env.NEXT_PUBLIC_FIREBASE);
  const data = await request.json();
  const formatedSales = [];

  for (const key in data) {
    formatedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: formatedSales,
    },
  };
}

