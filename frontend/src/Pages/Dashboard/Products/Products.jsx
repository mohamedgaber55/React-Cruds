import axios from "axios";
import { baseUrl } from "../../../Api/Api";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../../Context/AuthContextCreation";
import HeaderComponents from "../../../Components/HeaderComponents";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";

export default function Users() {
  const [productsData, setProductsData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // token
  const { token } = useContext(Auth);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/product/show`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });

        setProductsData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [isDeleted]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--main-color)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true);
          await axios.delete(`${baseUrl}/product/delete/${id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });

          setIsDeleted((prev) => !prev);

          Swal.fire({
            title: "Deleted!",
            text: "Your product has been deleted.",
            icon: "success",
          });
        } catch (err) {
          console.log(err);
          Swal.fire({
            title: "Error!",
            text: "Something went wrong.",
            icon: "error",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  // map on data
  const productsMap = productsData.map((product, idx) => (
    <tr
      key={idx}
      className="group bg-white border-b border-gray-300 hover:bg-gray-50 transition"
    >
      <td className="p-4 text-center">{idx + 1}</td>
      <td className="p-4 flex justify-center">
        <img
          src={product.image}
          alt="product"
          className="w-12 h-12 object-cover"
        />
      </td>
      <td className="p-4 text-center">{product.title}</td>
      <td className="p-4 text-center">{product.description}</td>
      <td className="p-4 text-center">
        <div className="flex justify-center items-center">
          <Link
            to={`${product.id}`}
            className="bg-(--main-color) text-white px-2 me-1 rounded"
          >
            Update
          </Link>

          <button
            onClick={() => handleDelete(product.id)}
            className="bg-red-500 text-white px-2 rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <HeaderComponents head={"Products"} />
          <div className="w-full overflow-x-auto mt-4">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="w-full bg-white border-b border-gray-300">
                  <th className="p-3">Id</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Description</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>{productsMap}</tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
