import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { DELETE_WISHLIST, GET_WISHLIST } from "../../api/api";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);
  const getWisthlist = () =>{
    GET_WISHLIST().then((res)=>{
        setWishlist(res.data)
    }).catch((err)=>console.log(err))
  }
  const removeFromWishlist = (id) => {
    DELETE_WISHLIST(id).then((res)=>{
        getWisthlist();
    }).catch((err)=>{
        console.log(err);
    })
  };

  useEffect(()=>{
    getWisthlist();
  },[])
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 shadow-md">
              <img
                src={product.product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h2 className="text-lg font-semibold mt-2">{product.product.name}</h2>
              <p className="text-gray-600">Rs. {product.product.price}.00</p>
              <div className="flex gap-5 mt-4">
                <Link to={'/product-details'} state={product.product}>
                <button
                //   onClick={() => handleNavigate()}
                  className="w-[150px] border-[1px] border-[#f0686a] text-[#f0686a] hover:bg-[#f0686a] hover:text-white py-2 rounded-lg font-semibold"
                >
                  View Details
                </button>
                </Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="flex justify-center items-center w-full bg-[#f0686a] text-white py-2 rounded-lg hover:border-[#f0686a] border-[1px] hover:text-[#f0686a] hover:bg-white font-semibold"
                >
                  <FaRegTrashAlt className="mr-2" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
