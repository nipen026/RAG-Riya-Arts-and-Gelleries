import { FaInstagram } from "react-icons/fa";

const Footer = () =>{
    return(
        <>
        <div className="w-full h-[100px] border-t-2 border-b-2 mt-5">
            <div className="flex justify-center items-center w-full h-full">
                <FaInstagram className="text-[20px]"/>
            </div>
        </div>
        </>
    )
}

export default Footer;