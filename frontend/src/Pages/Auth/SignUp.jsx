import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../../Components/Header";
import { baseUrl, register } from "../../Api/Api";
import { Auth } from "../../Context/AuthContextCreation";

export default function SignUp() {
  // inputs values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rPassword, setRPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");

  // state to handle inputs errors
  const [accept, setAccept] = useState(false);

  const { setToken } = useContext(Auth);

  // navigate
  const navigate = useNavigate();

  // handle submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);

    // to check the validation of inputs before post on api
    const isValid =
      name.trim() !== "" && password.length > 8 && rPassword === password;

    if (!isValid) return;

    try {
      const res = await axios.post(`${baseUrl}/${register}`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: rPassword,
      });

      // set token in cookies
      setToken(res.data.data.token);
      Cookies.set("token", res.data.data.token);

      if (res.status === 200) {
        localStorage.setItem("email", email);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      console.log(err.response);
      setEmailErr(err.response.status);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center h-screen">
        <h5 className="text-2xl font-bold mb-5 -mt-20">Register</h5>
        <div className="shadow rounded-xl overflow-hidden p-3">
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={handleSubmit}
          >
            {/* name  */}
            <div className="p-2 flex flex-col">
              <label htmlFor="name" className="mb-1">
                Your Name
              </label>
              <input
                className="p-2 w-100 shadow rounded outline-0 caret-(--main-color)"
                id="name"
                type="text"
                placeholder="Enter Ur Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {name == "" && accept ? (
                <p className="ms-2 text-red-500">Username is required</p>
              ) : null}
            </div>

            {/* email  */}
            <div className="p-2 flex flex-col">
              <label htmlFor="email" className="mb-1">
                Your email
              </label>
              <input
                className="p-2 w-100 shadow rounded outline-0 caret-(--main-color)"
                id="email"
                type="email"
                placeholder="Enter Ur Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {accept && email.length <= 0 ? (
                <p className="ms-2 text-red-500">
                  Email can't be empty
                </p>
              ) : accept && !email.includes("@") ? (
                <p className="ms-2 text-red-500">Invalid Email</p>
              ) : emailErr === 422 ? (
                <p className="ms-2 text-red-500">
                  Email has already been taken
                </p>
              ) : null}
            </div>

            {/* password  */}
            <div className="p-2 flex flex-col">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                className="p-2 w-100 shadow rounded outline-0 caret-(--main-color)"
                id="password"
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length < 8 && accept ? (
                <p className="ms-2 text-red-500">
                  Password can't be less than 8 chars
                </p>
              ) : null}
            </div>

            {/* repeat password  */}
            <div className="p-2 flex flex-col">
              <label htmlFor="rpassword" className="mb-1">
                Repeat password
              </label>
              <input
                className="mb-3 p-2 w-100 shadow rounded outline-0 caret-(--main-color)"
                id="rpassword"
                type="password"
                placeholder="Repeat Password"
                value={rPassword}
                onChange={(e) => setRPassword(e.target.value)}
              />
              {rPassword !== password && accept ? (
                <p className="ms-2 text-red-500">
                  Repeat password must equal password
                </p>
              ) : null}
            </div>

            {/* submit button  */}
            <button
              className="mb-2 p-2 bg-(--main-color) rounded text-white w-100 cursor-pointer"
              type="submit"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
