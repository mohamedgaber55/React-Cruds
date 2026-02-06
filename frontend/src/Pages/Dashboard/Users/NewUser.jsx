import axios from "axios";
import { useContext, useState } from "react";
import { baseUrl, users } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../../Context/AuthContextCreation";
import HeaderComponents from "../../../Components/HeaderComponents";
import Swal from "sweetalert2";

export default function NewUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");

  // handle errors
  const [emailErr, setEmailErr] = useState("");
  const [accept, setAccept] = useState(false);

  const { token } = useContext(Auth);

  // navigate
  const navigate = useNavigate();

  //   handle add function
  const handleAddUser = async () => {
    setAccept(true);

    // to check the validation of inputs before post on api
    const isValid =
      name.length > 0 && password.length >= 8 && password === rPassword;
    if (!isValid) return;

    try {
      const res = await axios.post(
        `${baseUrl}/${users}/create`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: rPassword,
        },
        { headers: { Authorization: "Bearer " + token } },
      );

      if (res.status === 200) {
        setTimeout(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "User Created Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/users");
        }, 1000);
      }
    } catch (err) {
      setEmailErr(err.status);
      console.log(err);
    }
  };

  return (
    <div>
      <HeaderComponents head={"New User"} />
      <div className="flex flex-col mt-8">
        {/* name */}
        <input
          type="text"
          placeholder="Username"
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-(--main-color)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {accept && name.length <= 0 ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">
            Username can't be empty!
          </p>
        ) : null}

        {/* email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-(--main-color)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          type="password"
          placeholder="Password"
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-(--main-color)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {accept && password.length < 8 ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">
            Password can't be less than 8 chars
          </p>
        ) : null}

        {/* repeat password */}
        <input
          type="password"
          placeholder="Repeat Password"
          className="w-full bg-white outline-0 p-4 mb-3 border-b border-b-gray-300 caret-(--main-color)"
          value={rPassword}
          onChange={(e) => setRPassword(e.target.value)}
        />
        {accept && rPassword.length < 8 && rPassword !== password ? (
          <p className="ms-2 text-red-500 -mt-2 mb-3">
            Repeat password can't be less than 8 chars & equal password value
          </p>
        ) : null}

        {/* add btn */}
        <button
          className="bg-(--main-color) font-medium text-white w-full rounded p-2 mt-2 cursor-pointer"
          onClick={handleAddUser}
        >
          Add User
        </button>
      </div>
    </div>
  );
}
