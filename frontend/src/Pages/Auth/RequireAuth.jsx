import { useContext } from "react";
import { Auth } from "../../Context/AuthContextCreation";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const { token } = useContext(Auth);

  return token ? <Outlet /> : <Navigate to={"/login"} />;

  //  state={{from: location}} replace to: '/login'
}
