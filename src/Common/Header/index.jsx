import { IoSearch } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { FaShoppingBag, FaSignOutAlt, FaUser } from "react-icons/fa";
import { GET_CART } from "../../api/api";
import { FaRegHeart } from "react-icons/fa";
import { CiLogin } from "react-icons/ci";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [countData, setCountData] = useState(0);
    const navigate = useNavigate()
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        getCartData()
    }, [])
    const getCartData = () => {
        const getData = localStorage.getItem('access-token-user');
        if (getData) {
            GET_CART()
                .then((res) => {
                    setCountData(res?.data?.length || 0); // Ensure it doesn't break if data is undefined
                })
                .catch((err) => console.log(err));
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('access-token-user')
        localStorage.removeItem('refresh-token-user');
        navigate('/')
    }
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
                                <Link to={'/wishlist'}>
                                    <button className="p-2 rounded-full hover:bg-gray-200">
                                        <FaRegHeart className="text-[20px]" />
                                    </button>
                                </Link>
                                <div className="relative" ref={dropdownRef}>
                                    {/* User Icon Button */}
                                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-gray-200">
                                        <LuUser className="text-[20px]" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {isOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-lg z-50">
                                            <ul className="py-2">
                                                {/* My Orders */}
                                                <Link to={'/myorder'}>
                                                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                        <FaShoppingBag className="mr-2 text-gray-600" />
                                                        <span>My Orders</span>
                                                    </li>
                                                </Link>

                                                {/* My Account */}
                                                <Link to={'/profile'}>
                                                    <li className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                        <FaUser className="mr-2 text-gray-600" />
                                                        <span>My Account</span>
                                                    </li>
                                                </Link>

                                                {/* Logout */}
                                                {localStorage.getItem('access-token-user') ?
                                                    <li onClick={() => handleLogout()} className="flex items-center px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer rounded-b-lg">
                                                        <FaSignOutAlt className="mr-2" />
                                                        <span>Logout</span>
                                                    </li> :
                                                    <li onClick={() => navigate('/login')} className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                        <CiLogin className="mr-2 text-gray-600" />
                                                        <span>Log In</span>
                                                    </li>}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <Link to={'/cart'}>
                                    <div className="relative">
                                        <button className="p-2 rounded-full hover:bg-gray-200">
                                            <IoCartOutline className="text-[24px] relative text-gray-700" />
                                        </button>
                                        {/* <IoCartOutline className="text-[24px] relative text-gray-700" /> */}
                                        {countData > 0 && (
                                            <span className="absolute top-0 -right-0 bg-red-500 text-white text-xs font-bold px-[7px] py-[2px] rounded-full">
                                                {countData}
                                            </span>
                                        )}
                                    </div>
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