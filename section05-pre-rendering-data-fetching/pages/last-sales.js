import useSWR from 'swr';
import { useState, useEffect } from 'react';

function LastSales() {
  const [sales, setSales] = useState();

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

  if (!data || !sales) {
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
