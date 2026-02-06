import { AiOutlineUserAdd } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdAddTask } from "react-icons/md";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { NavLink } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="p-3 min-h-screen">
      <NavLink
        to={"products"}
        className={`${(isActive) => (isActive ? "active" : "")} transition w-full py-1 px-2 rounded mb-2 flex items-center`}
      >
        <TfiShoppingCartFull /> <span className="ms-3">Products</span>
      </NavLink>
      <NavLink
        to={"addproduct"}
        className={`${(isActive) => (isActive ? "active" : "")} transition w-full py-1 px-2 rounded mb-2 flex items-center`}
      >
        <MdAddTask /> <span className="ms-3">Add Product</span>
      </NavLink>
      <NavLink
        to={"users"}
        className={`${(isActive) => (isActive ? "active" : "")} transition w-full py-1 px-2 rounded mb-2 flex items-center`}
      >
        <FaUsers /> <span className="ms-3">Users</span>
      </NavLink>
      <NavLink
        to={"newuser"}
        className={`${(isActive) => (isActive ? "active" : "")} transition w-full py-1 px-2 rounded mb-2 flex items-center`}
      >
        <AiOutlineUserAdd /> <span className="ms-3">New User</span>
      </NavLink>
    </div>
  );
}
