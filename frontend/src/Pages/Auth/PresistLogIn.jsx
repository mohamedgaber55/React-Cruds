import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Auth } from "../../Context/AuthContextCreation";
import axios from "axios";
import { baseUrl } from "../../Api/Api";
import Loading from "../../Components/Loading";
import Cookies from "js-cookie";

export default function PresistLogin() {
  const { token, setToken } = useContext(Auth);
  const [loading, setLoading] = useState(true);

  const cookieToken = Cookies.get('token')

  useEffect(() => {

    
    const refreshToken = async () => {
      try {
        const res = await axios.post(`${baseUrl}/refresh`, null, {
          headers: {
            Authorization: "Bearer " + cookieToken,
          },
        });
        Cookies.set('token', res.data.token);
        setToken(res.data.token);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    !token ? refreshToken() : setLoading(false);
  }, []);

  return loading ? <Loading /> : <Outlet />;
}
