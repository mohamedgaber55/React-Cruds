import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { baseUrl } from "../Api/Api";

export default function Header() {
  const navigate = useNavigate();

  const token = Cookies.get("token");

  // handle logout
  const handleLogout = async () => {
    try {
      await axios.post(`${baseUrl}/logout`, null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      Cookies.remove("token");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="container mx-auto px-5 flex justify-between items-center py-4 border-b border-b-gray-200">
      <Link to={'/'}>
        <h2 className="text-xl font-bold ms-2">CRUD</h2>
      </Link>

      <div>
        {!token ? (
          <div className="flex justify-between gap-2 items-center">
            <Link to={"/login"}>
              <button className="px-5 py-2 border-2 border-(--main-color) bg-(--main-color) text-white rounded cursor-pointer font-medium transition-colors">
                Login
              </button>
              
            </Link>
            <Link to={"/register"}>
              <button className="px-5 py-2 border-2 border-(--main-color) text-(--main-color) rounded cursor-pointer hover:bg-(--main-color) hover:text-white transition-colors">
                Register
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex justify-between gap-2 items-center">
            <Link
              to={"/dashboard"}
              className="px-5 py-1 border-2 border-(--main-color) text-(--main-color) font-medium rounded hover:bg-(--main-color) hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="px-5 py-1 border-2 bg-(--main-color) border-(--main-color) text-white cursor-pointer font-medium rounded transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
