
import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import SecondNav from "./SecondNav";
const Navbar = () => {
  return (
    <section>
    <main className="flex justify-between items-center bg-green-800 text-white py-1 px-4">
      <section className="flex items-center  text-xs font-semibold gap-2">
        <FaPhoneAlt />
        <p>+9779844509832</p>
      </section>
      <section className="middle text-xs font-semibold">
        <p>Get 50% off on selected items | Shop Now </p>
      </section>
        <section className="right flex items-center text-xs font-semibold gap-2">
          <FaLocationArrow />
        <p>Nepal</p>
        <b>Butwal</b>
      </section>
      </main>
      <SecondNav />
      </section>
  )
}

export default Navbar