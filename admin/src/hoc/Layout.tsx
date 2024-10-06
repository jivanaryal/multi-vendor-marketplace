import { Outlet } from "react-router-dom";
import Sidebar from "../shared-components/Sidebar";
import Navbar from "../shared-components/Navbar";
import { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";

const Layout = () => {
  const [show, setShow] = useState(true);

  return (
    <main className="flex">
      {/* Sidebar section with sliding animation */}
      <section
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r transition-transform duration-300 ease-in-out transform ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar show={show} setShow={setShow} />
      </section>

      {/* Main content area expands to fill space */}
      <section
        className={`flex-1 transition-all duration-300 ease-in-out ${
          show ? "ml-64" : "ml-0"
        }`}
      >
        {/* Navbar with a toggle button for sidebar */}
        <div className="h-16 border-b border-red-500 flex items-center">
          {/* Sidebar toggle button (visible when sidebar is hidden) */}
          <div
            className={`${
              show ? "hidden" : "block"
            } text-2xl font-extrabold cursor-pointer`}
            onClick={() => setShow(!show)}
          >
            <RiMenu2Line className="text-blue-500 focus:ring-2 focus:ring-blue-400 ml-6" />
          </div>
          <Navbar />
        </div>

        {/* Main content outlet */}
        <div className="p-4">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default Layout;
