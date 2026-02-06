import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

export default function TopBar() {
  return (
    <div>
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h5 className="font-bold text-2xl">Dashboard</h5>
          <Link
            to={"/"}
            className="border-[1.5px] border-(--main-color) px-2 py-1 rounded text-(--main-color) flex justify-between items-center transition hover:text-white hover:bg-(--main-color) "
          >
            <IoHomeOutline /> <span className="ms-1">To Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
