import { IoSearch } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
            <div className="bg-white sticky top-0 z-[9999]">
                <div className="container">
                    <div className=" flex justify-between items-center">
                        <div className="w-[100px] h-[100px]">
                            <Link to={'/'}>
                                <img src="/assets/images/logo.png" />
                            </Link>
                        </div>
                        <div>
                            <div className="flex items-center gap-5">
                                <IoSearch className="text-[20px]" />
                                <LuUser className="text-[20px]" />
                                <Link to={'/cart'}>
                                    <IoCartOutline className="text-[20px]" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;