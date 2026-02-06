import { Outlet } from "react-router-dom";
import SideBar from "../../Components/SideBar";
import TopBar from "../../Components/TopBar";

export default function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="flex">
        <div className="max-w-50 flex-1 ">
          <SideBar /> 
        </div>
      <div className="p-4 flex-1 bg-[#eff4f8d6] rounded-tl-2xl min-h-screen">
        <Outlet />
      </div>
      </div>
      
    </div>
  );
}
