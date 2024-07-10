import { useState, useEffect } from "react";
import { Product } from "./components/Product";
import axios, { AxiosError } from "axios";
import { IProduct } from "./models";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const API_URL = "https://fakestoreapi.com/products?limit=5";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError('');
        setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await axios.get<IProduct[]>(API_URL);
      setProducts(response.data);
      setLoading(false);}
      catch (e:unknown) {
        const error = e as AxiosError;
        setLoading(false);
        setError(error.message);
      }
    }

    fetchProducts();

    return () => {};
  }, []);

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <p className="text-center text-3xl font-bold">Loading...</p>}
      {error && <p className="text-center text-4xl font-bold text-red-600">Error</p>}
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default App;
