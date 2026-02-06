import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import { baseUrl, logIn } from "../../Api/Api";
import Cookies from "js-cookie";
import { Auth } from "../../Context/AuthContextCreation";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [accept, setAccept] = useState(false);

  const { setToken } = useContext(Auth);

  // navigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAccept(true);

    // to check the validation of inputs before post in api
    const isValid = password.length > 8;
    if (!isValid) return;

    try {
      const res = await axios.post(`${baseUrl}/${logIn}`, {
        email: email,
        password: password,
      });

      // set token in cookies
      setToken(res.data.data.token);
      Cookies.set("token", res.data.data.token);

      if (res.status === 200) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setEmailErr(err.response.status);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col justify-center items-center h-screen">
        <h5 className="text-2xl font-bold mb-5 -mt-10">Login</h5>
        <div className="shadow rounded-xl overflow-hidden p-3">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col"
          >
            {/* email  */}
            <div className="p-2 flex flex-col">
              <label htmlFor="email" className="mb-1">
                Your email
              </label>
              <input
                className="p-2 w-100 shadow rounded outline-0 caret-(--main-color)"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {accept && email.length <= 0 ? (
              <p className="ms-3 text-red-500">
                Email can't be empty
              </p>
            ) : null}

            {/* password  */}
            <div className="mb-3 p-2 flex flex-col">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                className="p-2 mb-2 w-100 shadow rounded outline-0 caret-(--main-color)"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password.length < 8 && accept ? (
                <p className="ms-2 text-red-500">
                  Password can't be less than 8 chars
                </p>
              ) : null}
            </div>

            {/* submit button  */}
            <button
              className="ms-2 mb-2 p-2 bg-(--main-color) rounded text-white w-100 cursor-pointer"
              type="submit"
            >
              Login
            </button>
            {(emailErr == 422 || emailErr == 401) && accept ? (
              <p className="text-red-500">Wrong email or password</p>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
}
