

import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { PiUserCircleBold } from "react-icons/pi";
import { FaAngleDown, FaWarehouse } from "react-icons/fa";
import { BsCartPlus } from "react-icons/bs";
import logo from '../assets/images/logo.png'
const SecondNav = () => {
  return (
      <nav className="px-10 bg-white border-2 py-2">
          <section className="grid grid-cols-12">
              <div className="logo text-5xl col-span-1">
                  <img src={logo} alt="" />
              </div>
              <section className="flex items-center col-span-7 mx-10">
                  <CiSearch className="text-xl font-semibold text-gray-500 relative left-6" />
                  <input type="search" name="search" id="search" placeholder="Search Products Brands and More" className="w-full outline-none bg-[#F0F5FF] text-lg py-2 rounded-md pl-7"/>
              </section>
              <section className="flex items-center justify-between col-span-4 text-lg ">
              <div className="authentication flex gap-1 items-center">
                  <PiUserCircleBold className="text-2xl" />
                  <button>Login</button>
                      <FaAngleDown className="text-xl"/>
                  </div>

                  <div className="cart flex items-center gap-1">
                      <BsCartPlus className="text-2xl" />
                      <p>Cart</p>
                  </div>
                
                  <div className="cart flex items-center gap-1">
                      <FaWarehouse className="text-2xl" />
                      <p>Become a Seller</p>
                  </div>
                  <div className="cart flex items-center gap-1">
                      <CiMenuKebab className="text-2xl" />
                     
                  </div>


                  


              </section>
          </section>
      </nav>
  )
}

export default SecondNav