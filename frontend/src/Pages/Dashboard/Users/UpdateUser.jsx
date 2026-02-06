import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { baseUrl, users } from "../../../Api/Api";
import { useContext, useEffect, useState } from "react";
import { Auth } from "../../../Context/AuthContextCreation";
import HeaderComponents from "../../../Components/HeaderComponents";
import Swal from "sweetalert2";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

  // handle errors
  const [emailErr, setEmailErr] = useState("");
  const [accept, setAccept] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useContext(Auth);

  useEffect(() => {
    axios
      .get(`${baseUrl}/${users}/showbyid/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((data) => {
        setName(data.data[0].name);
        setEmail(data.data[0].email);
      });
  }, []);

  const handleUpdateUser = async (userId) => {
    setAccept(true);

    // to check the validation of inputs before post on api
    const isValid =
      name.trim() !== "" && password.length > 8 && rPassword === password;

    if (!isValid) return;

    try {
      const res = await axios.post(
        `${baseUrl}/${users}/update/${userId}`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: rPassword,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
      );

      if (res.status === 200) {
        navigate("/dashboard/users");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (err) {
      setEmailErr(err.status);
    }
  };

  return (
    <div>
      <HeaderComponents head={"Update User"} />

      <div className="flex flex-col justify-center mt-5 w-full">
        {/* name  */}
        <input
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-red-400"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        {accept && name.length <= 0 ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">
            Username can't be empty
          </p>
        ) : null}

        {/* email */}
        <input
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-red-400"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        {accept && email.length <= 0 ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">Email can't be empty</p>
        ) : accept && !email.includes("@") ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">Invalid Email</p>
        ) : emailErr === 422 ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">
            Email has already been taken
          </p>
        ) : null}

        {/* password */}
        <input
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-red-400"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        {accept && password.length < 8 ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">
            Password can't be less than 8 chars
          </p>
        ) : null}

        {/* repeat password */}
        <input
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-red-400"
          type="password"
          value={rPassword}
          onChange={(e) => setRPassword(e.target.value)}
          placeholder="Repeat Password"
        />
        {accept && rPassword.length < 8 && rPassword !== password ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">
            Repeat password can't be less than 8 chars & equal password value
          </p>
        ) : null}

        {/* update btn */}
        <button
          onClick={() => handleUpdateUser(id)}
          className="bg-(--main-color) font-medium text-white w-full rounded p-2 mt-2 cursor-pointer"
        >
          Update User
        </button>
      </div>
    </div>
  );
}
