import { FaInstagram } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div>
                {/* Instagram Section */}
                <div className="w-full h-[100px] border-t-2 border-b-2 mt-5 flex justify-center items-center">
                    <FaInstagram className="text-[20px]" />
                </div>

                {/* Footer Section */}
                <div className="bg-[#0a0d18] py-10">
                    <div className="max-w-[90%] mx-auto flex flex-wrap max-2xl:flex-col justify-between max-xl:justify-center items-center text-center lg:text-left">
                        {/* Logo & Links */}
                        <div className="flex flex-col lg:flex-row items-center gap-5">
                            <div className="w-[50px] h-[50px]">
                                <img src="/assets/images/logo.png" alt="logo" />
                            </div>
                            <div className="text-white/60 text-[12px] flex flex-wrap justify-center items-center gap-2">
                                <p>&copy; 2025 RAG Riya Arts and Gifts Reserved</p>
                                <GoDotFill />
                                <Link to="/terms-conditions">
                                    <p className="hover:underline hover:text-white">Terms and Conditions</p>
                                </Link>
                                <GoDotFill />
                                <Link to="/privacy-policy">
                                    <p className="hover:underline hover:text-white">Privacy Policy</p>
                                </Link>
                            </div>
                        </div>

                        {/* Customer Care */}
                        <div className="text-white text-[12px] mt-4 lg:mt-0">
                            <p>Customer Care: info.riyaartsandgalleries@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;