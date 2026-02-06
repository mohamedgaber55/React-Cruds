import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../../../Api/Api";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../../../Context/AuthContextCreation";
import HeaderComponents from "../../../Components/HeaderComponents";
import Swal from "sweetalert2";

export default function UpdateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  // handle errors
  const [accept, setAccept] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useContext(Auth);

  useEffect(() => {
    axios
      .get(`${baseUrl}/product/showbyid/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);
      });
  }, []);

  const handleUpdateProduct = async (productId) => {
    setAccept(true);

    // to check the validation of inputs before post on api
    const isValid = title.trim() !== "" && description.length > 1;

    if (!isValid) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", img);

      const res = await axios.post(
        `${baseUrl}/product/update/${productId}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (res.status === 200) {
        navigate("/dashboard/products");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      console.log(err.status);
    }
  };

  return (
    <div>
      <HeaderComponents head={"Update Product"} />

      <div className="flex flex-col justify-center mt-5 w-full">
        {/* title  */}
        <input
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-red-400"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Product Title"
        />
        {accept && title.length <= 0 ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">Title can't be empty</p>
        ) : null}

        {/* description */}
        <input
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-red-400"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Product Description"
        />
        {accept && description.length <= 0 ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">
            Description can't be empty
          </p>
        ) : null}

        {/* image */}
        <input
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-red-400"
          type="file"
          onChange={(e) => setImg(e.target.files.item(0))}
          placeholder="password"
          required
        />

        {/* update btn */}
        <button
          onClick={() => handleUpdateProduct(id)}
          className="bg-(--main-color) font-medium text-white w-full rounded p-2 mt-2 cursor-pointer"
        >
          Update Product
        </button>
      </div>
    </div>
  );
}
