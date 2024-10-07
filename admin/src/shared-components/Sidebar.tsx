import React, { useReducer } from "react";
import { GoDiamond, GoStack } from "react-icons/go";
import { HiChevronDown } from "react-icons/hi";
import {  MdDashboardCustomize } from "react-icons/md";
import { RiMenu3Fill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

interface SubItem {
  title: string;
  path: string | null;
  icons: JSX.Element;
}

interface SideBarItemType {
  title: string;
  icons: JSX.Element;
  path: string | null;
  subItems: SubItem[] | null;
}

const SidebarItem: SideBarItemType[] = [
  {
    title: "dashboard",
    icons: <MdDashboardCustomize />,
    path: "/",
    subItems: null,
  },
  {
    title: "category",
    icons: <GoStack />,
    path: null,
    subItems: [
      {
        title: "category list",
        path: "/category/view-category",
        icons: <GoDiamond />,
      },
      {
        title: "new category",
        path: "/category/add-category",
        icons: <GoDiamond />,
      },
    ],
  },
];

interface SidebarAction {
  type: "toggle";
  payload: keyof SidebarState;
}

interface SidebarState {
  category: boolean;
}

function reducer(state: SidebarState, action: SidebarAction): SidebarState {
  switch (action.type) {
    case "toggle": {
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    }
    default:
      throw new Error("unknown action: " + action.type);
  }
}

interface SidebarProps {
  show: boolean;
  setShow: (value: boolean) => void;
}

const initialState: SidebarState = {
  category: false,
};

const Sidebar = ({ show, setShow }: SidebarProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string | null) => {
    if (path) navigate(path);
  };

  const isActive = (path: string | null) => location.pathname === path;

  const renderSubItems = (subItems: SubItem[]) => (
    <AnimatePresence>
      {state.category && (
        <motion.section
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="ml-8 overflow-hidden"
        >
          {subItems.map((item, i) => (
            <ul
              key={i}
              className={`flex items-center gap-2 mb-3 mt-2 cursor-pointer hover:text-blue-500 ${
                isActive(item.path) ? "text-blue-500" : "text-gray-800"
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              <li className="text-sm">{item.icons}</li>
              <li className="capitalize text-[14px] leading-[20px] font-medium">
                {item.title}
              </li>
            </ul>
          ))}
        </motion.section>
      )}
    </AnimatePresence>
  );

  return (
    <div className="bg-[#FFFFFF]">
      <main>
        <div className="flex justify-between mx-3 items-center">
          <strong className="font-extrabold text-gray-800 text-2xl mt-3 ml-1 mb-4 inline-flex">
            Admin
          </strong>
          <strong>
            <RiMenu3Fill
              className="text-2xl cursor-pointer"
              onClick={() => setShow(!show)}
            />
          </strong>
        </div>
        <section>
          <nav className="mt-6 flex justify-center flex-col ml-4 gap-2 mr-3">
            {SidebarItem.map((item, index) => (
              <nav key={index}>
                <ul
                  className={`flex items-center gap-2 cursor-pointer pl-4 rounded group hover:bg-[#5570F1] py-2 ${
                    isActive(item.path) && "bg-[#E9F1FF]"
                  }`}
                  onClick={() => {
                    handleNavigation(item.path);
                    if (item.subItems) {
                      dispatch({ type: "toggle", payload: "category" });
                    }
                  }}
                >
                  <li className="flex items-center gap-2">
                    <span className="text-xl group-hover:text-white">
                      {item.icons}
                    </span>
                    <span
                      className={`capitalize font-medium text-md text-gray-800 group-hover:text-white ${
                        isActive(item.path) && "text-blue-600"
                      }`}
                    >
                      {item.title}
                    </span>
                  </li>
                  {item.subItems && (
                    <button className="ml-auto group-hover:text-white">
                      <HiChevronDown
                        className={`transition-transform duration-400 text-2xl ${
                          state.category ? "-rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </ul>
                {item.subItems && renderSubItems(item.subItems)}
              </nav>
            ))}
          </nav>
        </section>
      </main>
    </div>
  );
};

export default Sidebar;
