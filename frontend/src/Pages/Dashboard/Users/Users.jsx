import axios from "axios";
import { baseUrl, users } from "../../../Api/Api";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Auth } from "../../../Context/AuthContextCreation";
import HeaderComponents from "../../../Components/HeaderComponents";
import Loading from "../../../Components/Loading";
import Swal from "sweetalert2";

export default function Users() {
  const [usersData, setUsersData] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [loading, setLoading] = useState(false);

  // token
  const { token } = useContext(Auth);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/${users}/show`, {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        });
        setUsersData(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
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
          await axios.delete(`${baseUrl}/${users}/delete/${id}`, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });

          setIsDeleted((prev) => !prev);

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
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
  const usersMap = usersData.map((user, idx) => (
    <tr
      key={idx}
      className="group bg-white border-b border-gray-300 hover:bg-gray-50 transition"
    >
      <td className="p-4 text-center">{idx + 1}</td>
      <td className="p-4 text-center">{user.name}</td>
      <td className="p-4 text-center">{user.email}</td>
      <td className="p-4 text-center flex justify-center items-center">
        <Link
          to={`${user.id}`}
          className="bg-(--main-color) text-white px-2 me-1 rounded"
        >
          Update
        </Link>
        <p
          className=" bg-red-500 text-white px-2 rounded cursor-pointer"
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </p>
      </td>
    </tr>
  ));

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <HeaderComponents head={"Users"} />
          <div className="w-full overflow-x-auto mt-4">
            <table className=" w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="w-full bg-white border-b border-gray-300">
                  <th className="p-3">Id</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">actions</th>
                </tr>
              </thead>
              <tbody>{usersMap}</tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
