import axios from "axios";
import { useContext, useState } from "react";
import { baseUrl } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../../Context/AuthContextCreation";
import Swal from "sweetalert2";
import HeaderComponents from "../../../Components/HeaderComponents";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");

  // handle errors
  const [accept, setAccept] = useState(false);

  const { token } = useContext(Auth);

  // navigate
  const navigate = useNavigate();

  //   handle add function
  const handleAddProduct = async () => {
    setAccept(true);

    // to check the validation of inputs before post on api
    const isValid = title.length > 0 && description.length >= 0;
    if (!isValid) return;

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", img);

      const res = await axios.post(`${baseUrl}/product/create`, formData, {
        headers: { Authorization: "Bearer " + token },
      });

      if (res.status === 200) {
        setTimeout(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product has been added!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/products");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <HeaderComponents head={'New Product'} />
      <div className="flex flex-col mt-8">
        {/* title */}
        <input
          type="text"
          placeholder="Product Title"
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-(--main-color)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {accept && title.length <= 0 ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">Title can't be empty!</p>
        ) : null}

        {/* Description */}
        <input
          type="text"
          placeholder="Product Description"
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-(--main-color)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {accept && description.length <= 0 ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">
            Description can't be empty
          </p>
        ) : null}

        {/* image */}
        <input
          type="file"
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300"
          onChange={(e) => setImg(e.target.files.item(0))}
        />
        {accept && img == "" ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">Upload Image</p>
        ) : null}

        {/* add btn */}
        <button
          className="bg-(--main-color) font-medium text-white w-full rounded p-2 mt-2 cursor-pointer"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
