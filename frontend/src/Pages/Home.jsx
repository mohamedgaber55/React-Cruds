import { useEffect, useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import { baseUrl } from "../Api/Api";
import Cookies from "js-cookie";
import Loading from "../Components/Loading";

export default function Home() {
  // products
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);

  // token
  const token = Cookies.get("token");

  // get products
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/product/show`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log(response.data);
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  // map on products
  const productsMap = products.map((product, idx) => (
    <div key={idx}>
      <img src={product.image} alt="product image" className="product-img" />
      <h1 className="mt-5 font-bold text-xl">{product.title}</h1>
      <p className="text-gray-400 mb-2">{product.description}</p>
      <p className="text-(--main-color)">${product.id}00.00</p>
    </div>
  ));

  return (
    <div>
      <Header />
      {loading ? (
        <Loading />
      ) : token ? (
        <>
          <h2 className="mx-4 my-5 text-2xl font-bold text-center">Products</h2>
          <div className=" container mx-auto mt-10 px-15 grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1">
            {productsMap}{" "}
          </div>
        </>
      ) : (
        <div className="text-center mt-10 font-medium">
          <p>Please! Login To See the Products</p>
        </div>
      )}
    </div>
  );
}
