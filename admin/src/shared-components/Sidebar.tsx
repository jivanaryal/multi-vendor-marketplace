import { useReducer } from "react"
import { HiChevronDown } from "react-icons/hi"
import { IoBagAdd } from "react-icons/io5"
import { MdCategory, MdDashboardCustomize, MdOutlineFormatListNumberedRtl } from "react-icons/md"
import { RiMenu3Fill } from "react-icons/ri"
import { useLocation, useNavigate } from "react-router-dom"



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



const SidebarItem:SideBarItemType[] = [
    {
    title: "dashboard",
    icons: <MdDashboardCustomize />,
    path: "/",
    subItems: null,
    },
    {
    title: "category",
    icons: <MdCategory />,
    path: null,
        subItems: [
            {
             title: "add category",
        path: "/category/add-category",
        icons: <IoBagAdd />,
            }, {
                title: "view category",
                path: "/category/view-category",
                icons: <MdOutlineFormatListNumberedRtl />
        }
    ],
    },
]


interface SidebarAction {
    type: "toggle",
    payload:keyof SidebarState,
}


interface SidebarState {
  category: boolean;
}



function reducer(state:SidebarState, action:SidebarAction):SidebarState {
    switch (action.type) {
        case "toggle": {
            return {
                ...state, 
                [action.payload]: !state[action.payload],
            }
        }
        default:
            throw new Error("unknow action: " + action.type)
     }
}







const initialState:SidebarState = {
    category:false,
}


const Sidebar = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path: string | null)=>{
        if (path) navigate(path);
    }

    const isActive = (path: string | null) => location.pathname === path;

    const renderSubItems = (subItems: SubItem[]) => (
        <section className="ml-8 mt-1 ">


            {subItems.map((item, i) => (
                <ul
                    key={i}
                    className={`flex items-center gap-2 my-4 cursor-pointer hover:text-blue-500 ${isActive(item.path) ? "text-blue-500" : "text-gray-800"
                        }`}
                    onClick={() => handleNavigation(item.path)}
                >
                    <li className="text-xl">{item.icons}</li>
                    <li className="capitalize text-[15px] leading-[20px] font-medium">
                        {item.title}
                    </li>
                </ul>
            ))}
        </section>
    );
  return (
      <div className="bg-[#FFFFFF]">
      <main>
        {/* <img src={logo} alt="logo" className="h-14 inline-flex animate-pulse -mt-1"/> */}
        <div className="flex justify-between mx-3 items-center">
        <strong className="font-extrabold text-gray-800   text-2xl mt-3  ml-1 mb-4 inline-flex">
         Admin
          </strong>
          <strong>
            <RiMenu3Fill className="text-2xl cursor-pointer"/>
          </strong>
          </div>
        <section>
          <nav className="mt-6 flex justify-center  flex-col ml-4 gap-2 mr-3">
            {SidebarItem.map((item, index) => (
              <nav key={index}>
                <ul
                  className={`flex  items-center gap-2 cursor-pointer pl-4 rounded group hover:bg-[#5570F1] py-2 ${
                    isActive(item.path) && "bg-[#E9F1FF]"
                  }`}
                        onClick={() => {
                            
                            handleNavigation(item.path)
                            if (item.subItems) {
                                
                                dispatch({ type: "toggle", payload: "category" })
                            }
                        }
                            
                        }
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
                    <button
                     
                      className="ml-auto group-hover:text-white"
                    >
                      <HiChevronDown
                        className={`transition-transform duration-400 text-2xl ${
                          state.category ? "-rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </ul>
                {item.subItems &&
                  state.category &&
                  renderSubItems(item.subItems)}
              </nav>
            ))}
          </nav>
        </section>
      </main>
    </div>
  )
}

export default Sidebar