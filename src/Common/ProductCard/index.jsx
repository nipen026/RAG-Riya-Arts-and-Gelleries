import { data, Link, useNavigate } from "react-router-dom";
import { ADD_TO_CART, ADD_TO_WISHLIST } from "../../api/api";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState } from "react";

const ProductCard = ({ productData }) => {
    const navigate = useNavigate();
    const [isShaking, setIsShaking] = useState(false);
    const [wishlist, setWishlist] = useState(false);
    const [isAddTocartDetails, setIsAddTocartDetails] = useState({ image: false, url: false });
    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState({ image: '', url: '' });
    const [productDataoptions,setproductDataOptions] = useState()

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };
    const handleCart = (product) => {
        setproductDataOptions(product)
        const getData = localStorage.getItem('access-token-user');
        if (!getData) {
            navigate('/login');
        }
        if (product?.is_url) {
            isAddTocartDetails.url = true
            if (!text.trim()) {
                setError(prev => ({ ...prev, url: "Spotify URL is required." }));
                return;
            }

        } else {
            if (product?.is_image) {
                isAddTocartDetails.image = true
                if (!image) {
                    setError(prev => ({ ...prev, image: "Image is required." }));
                    return;
                }
            }
        }
        console.log(product);
        
        const data = {
            product_id: product.id,
            quantity: 1,
            url: text ? text : '',
            image: image || ''
        };
        console.log(data);
        
        ADD_TO_CART(data).then((res) => {
            setIsAddTocartDetails({image: false, url: false})
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
    const handleOption = () =>{
        handleCart(productDataoptions);
    } 
    return (
        <div className="grid grid-cols-4 gap-5 
                max-2xl:grid-cols-3 
                max-xl:grid-cols-2 
                max-md:grid-cols-1">
            {productData
                ?.filter((obj) => obj.status === 'IN_STOCK')
                .map((item, index) => (
                    <div key={index} className="border-2 border-[#f0686a] rounded-xl p-3 w-full 
                                        max-lg:flex max-lg:flex-col max-lg:items-center" data-aos="flip-left">

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
                                onClick={() => handleCart(item)}
                                className="w-full border-[1px] mt-2 border-[#f0686a] text-white 
                               bg-[#f0686a] hover:text-[#f0686a] transition-all ease-linear 
                               hover:bg-white py-2 rounded-lg font-semibold">
                                ADD TO CART
                            </button>
                        </div>
                    </div>
                ))}
            {isAddTocartDetails.image || isAddTocartDetails.url ? <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    {isAddTocartDetails.url ?
                        <div className="my-4">
                            <label className={error.url ? "block text-sm mb-1 font-medium text-red-500" : "block text-sm mb-1 font-medium text-gray-700"}>Spotify URL<sup className="text-md text-red-500">*</sup></label>
                            <input
                                type="text"
                                placeholder="Spotify URL"
                                onChange={(e) => setText(e.target.value)}
                                className={error.url ? "w-full border border-red-500 p-2 rounded-lg" : "w-full border p-2 rounded-lg"}
                            />
                            <p className="text-sm text-gray-400">If the quantity is more than one, multiple URLs can be added using a comma (',').</p>
                        </div> : ''}
                    {isAddTocartDetails.image ?
                        <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" /> : ''}
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setIsAddTocartDetails({ image: false, url: false })} className="px-4 py-2 bg-gray-500 text-white rounded-lg">Close</button>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={()=>handleOption()}>Submit</button>
                    </div>
                </div>
            </div> : ''}
        </div>

    )
}

export default ProductCard;
