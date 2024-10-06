import { Outlet } from "react-router-dom"
import Sidebar from "../shared-components/Sidebar"
import Navbar from "../shared-components/Navbar"
import { useState } from "react"

const Layout = () => {
  const [show, setShow] = useState(true);
       

      
  return (
    <main className="flex">
      <section className="flex-none w-2/4 lg:w-1/6 md:w-1/4 border-2 max-h-screen min-h-screen sticky border-yellow-500">
         <Sidebar />
      </section>
      <section className="flex-1">

        <div className="h-16 border-2 border-red-500">
          <Navbar />
        </div>
        <div className="border-purple-600 border-2">
          <Outlet />
         </div>
      </section>
     </main>
  )
}

export default Layout