import { Route, Routes } from "react-router-dom";
// auth
import LogIn from "./Pages/Auth/LogIn";
import SignUp from "./Pages/Auth/SignUp";
// home
import Home from "./Pages/Home";
// dashboard
import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Dashboard/Products/Products";
import AddProduct from "./Pages/Dashboard/Products/AddProduct";
import Users from "./Pages/Dashboard/Users/Users";
import UpdateUser from "./Pages/Dashboard/Users/UpdateUser";
import NewUser from "./Pages/Dashboard/Users/NewUser";
// protect routes 
import RequireAuth from "./Pages/Auth/RequireAuth";
import PresistLogin from "./Pages/Auth/PresistLogIn";
import UpdateProduct from "./Pages/Dashboard/Products/UpadateProduct";
import NoItems from "./Components/NoItems";

const App = () => {
  return (
    <Routes>
      {/* main */}
      <Route path="/" element={<Home />} />

      {/* auth  */}
      <Route path="register" element={<SignUp />} />
      <Route path="login" element={<LogIn />} />

      {/* dashboard */}
      <Route element={<PresistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route index element={<NoItems />} />
            <Route path="products" element={<Products />} />
            <Route path="addproduct" element={<AddProduct />} />
            <Route path="products/:id" element={<UpdateProduct />} />
            <Route path="users" element={<Users />} />
            <Route path="newuser" element={<NewUser />} />
            <Route path="users/:id" element={<UpdateUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
