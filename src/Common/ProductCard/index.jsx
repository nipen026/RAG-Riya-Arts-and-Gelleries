import { Link, useNavigate } from "react-router-dom";
import { ADD_TO_CART, ADD_TO_WISHLIST } from "../../api/api";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const ProductCard = ({ productData }) => {
    const navigate = useNavigate();
    const [isShaking, setIsShaking] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const handleCart = (id) => {
        const getData = localStorage.getItem('access-token-user');
        if (!getData) {
            navigate('/login');
        }
        const data = {
            product_id: id,
            quantity: 1,
            url: ''
        };
        ADD_TO_CART(data).then((res) => {
            navigate('/cart');
        }).catch((err) => {
            console.log(err);
        });
    };
    const handleAddToWishlist = (id) => {
        setWishlist(!wishlist);
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 500);
        const formDataObject = new FormData();
        formDataObject.append('product_id', id)

        ADD_TO_WISHLIST(formDataObject).then((res) => {
        }).catch((err) => {
            console.log(err);
        })
    };
    return (
        <div className="grid grid-cols-4 gap-5 
                max-2xl:grid-cols-3 
                max-xl:grid-cols-2 
                max-md:grid-cols-1">
            {productData
                ?.filter((obj) => obj.status === 'IN_STOCK')
                .map((item, index) => (
                    <div key={index} className="border-2 border-[#f0686a] rounded-xl p-3 w-full 
                                        max-lg:flex max-lg:flex-col max-lg:items-center">

                        {/* Image Section */}
                        <div className="w-[95%] h-[300px] max-lg:h-[200px]">
                            <img src={item.image} className="rounded-lg h-full w-full object-cover bg-no-repeat" alt={item.name} />
                        </div>

                        {/* Product Details */}
                        <div className="w-full mt-2 font-semibold text-center">
                            <Link to={'/product-details'} state={item}>
                                <p className="text-lg">{item.name}</p>
                                <div className="flex flex-wrap justify-center items-center gap-2">
                                    <p className="text-lg">Rs.:- {item.price}.00</p>
                                    <div className="flex gap-1">
                                        <p className="text-gray-400 font-semibold text-[14px]">MRP</p>
                                        <del className="text-gray-400 font-semibold text-[14px]">
                                            Rs.:- {Math.round((item.price * 20) / 100 + item.price)}.00
                                        </del>
                                    </div>
                                    <p className="text-[#f0686a] font-semibold text-[14px]">-20% off</p>
                                </div>
                            </Link>
                        </div>

                        {/* Add to Cart Button */}
                        <div className="flex gap-2">
                            <button
                                className={`w-[70px] text-xl flex justify-center items-center border-[1px] mt-2 border-[#f0686a] text-white 
                               bg-[#f0686a] hover:text-[#f0686a]  
                               hover:bg-white py-2 rounded-lg font-semibold transition-transform ${isShaking ? "animate-wiggle" : ""
                                    }`}
                                onClick={() => handleAddToWishlist(item.id)} 
                            >
                                {wishlist || item.is_favorit ? <FaHeart /> : <FaRegHeart />}
                            </button>
                            <button
                                onClick={() => handleCart(item.id)}
                                className="w-full border-[1px] mt-2 border-[#f0686a] text-white 
                               bg-[#f0686a] hover:text-[#f0686a] transition-all ease-linear 
                               hover:bg-white py-2 rounded-lg font-semibold">
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                ))}
        </div>

    )
}

export default ProductCard;
