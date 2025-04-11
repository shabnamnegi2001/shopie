import React, {useContext} from "react";
import { Link } from "react-router";
import { IoMdHome } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router";
import StoreContext from "../context";

const Navbar = () => {

    const {cartState} = useContext(StoreContext)

    const navigator = useNavigate()
    
    const [product, setProduct] = cartState

    const logout = () => {
    
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigator('/login')
    }

  return (
    <div className="navbar flex flex-row w-full bg-grey-400 h-15 gap-5 p-4 items-center justify-end">
      <Link to="/">Home</Link>
      {
        <button className="cursor-pointer" onClick={logout} >Logout</button>
      }
      <Link to={"/cart"} className="relative" >
        <span className="absolute w-[20px] h-[20px] rounded-full bg-red-400 right-[-10px] top-[-5px] text-center text-sm"> { Object.values(product)?.length} </span>
        <FaShoppingCart style={{fontSize : '24px'}} />
      </Link>
    </div>
  );
};

export default Navbar;
