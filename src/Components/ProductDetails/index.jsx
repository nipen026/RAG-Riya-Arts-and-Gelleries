import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ADD_TO_CART, ADD_TO_WISHLIST, DELETE_WISHLIST, ORDER_PLACED } from "../../api/api";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { LuMinus } from "react-icons/lu";
import Slider from "react-slick";


export default function ProductDetails() {
  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [customText, setCustomText] = useState("");
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [images, setImages] = useState([]);
  let slider1, slider2;
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);
  const [productDetails, setProductDetails] = useState();
  const [selectImage, setSelectImage] = useState(productDetails?.image);
  const [quantity, setQuantity] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  localStorage.setItem('productId',productDetails?.id)
  useEffect(() => {
    if (productDetails) {
      const newImages = [productDetails?.image]; // Start with main image
      if (productDetails?.images) {
        newImages.push(...productDetails.images.map(f => f.image)); // Add additional images
      }
      setImages(newImages); // Update state
    }
  }, [productDetails]);



  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  useEffect(() => {
    if (location.state) {
      setProductDetails(location.state);
    }
  }, [location.state]);

  const handleMainImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setMainImage(URL.createObjectURL(file));
    }
  };

  const handleExtraImagesUpload = (event) => {
    const files = Array.from(event.target.files);
    setExtraImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleCart = (id) => {
    const getData = localStorage.getItem('access-token-user');
    if (!getData) {
      navigate('/login');
    }
    const data = {
      product_id: id,
      quantity: quantity,
      url: ''
    };
    ADD_TO_CART(data).then((res) => {
      console.log(res);
      navigate('/cart');
    }).catch((err) => {
      console.log(err);
    });
  };

  const handleDirectBuy = (id) => {
    const getData = localStorage.getItem('access-token-user');
    if (!getData) {
      navigate('/login');
    }
    const items = [];
    items.push({
      product: id,
      quantity: quantity,
      url: ""
    });
    ORDER_PLACED({ items })
      .then((res) => {
        if (res.status === true) {
          navigate("/checkout");
        }
      })
      .catch((err) => console.log(err));
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
  useEffect(() => {
    if (productDetails?.is_favorit) {
      setWishlist(true)
    }
  }, [productDetails])

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Slider
            asNavFor={nav2}
            ref={(slider) => (slider1 = slider)}
            arrows={false}
            autoplay={true}
            autoplaySpeed={5000}
            className="mb-4"
          >
            {images.map((img, index) => (
              <div key={index} className="w-full h-[500px]">
                <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover rounded-lg" />
              </div>
            ))}
          </Slider>
          <Slider
            asNavFor={nav1}
            ref={(slider) => (slider2 = slider)}
            slidesToShow={images.length}
            swipeToSlide={true}
            focusOnSelect={true}
            autoplay={true}
            autoplaySpeed={5000}
            centerMode={true}
            className="px-2"
          >
            {images.map((img, index) => (
              <div key={index} className="p-1">
                <img src={img} alt={`Thumbnail ${index}`} className="h-20 w-20 object-cover rounded-md border border-gray-300" />
              </div>
            ))}
          </Slider>
        </div>

        <div>
          <h1 className="text-2xl font-semibold">{productDetails?.name}</h1>
          <p className="text-lg text-gray-600">Rs. {productDetails?.price}.00</p>
          {productDetails?.status == 'OUT_OF_STOCKS' ? <span className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded">Sold Out</span> : ''}
          <div className="description-text">
            <div dangerouslySetInnerHTML={{ __html: productDetails?.description }} />
          </div>

          {/* <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-full border p-2 rounded-lg"
            />
          </div> */}
          <div className="py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
            <div className="w-full flex justify-between items-center gap-x-5">
              <div className="grow">
                <span className="block text-xs text-gray-500 dark:text-neutral-400">
                  Select quantity
                </span>
                <input
                  className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white"
                  type="number"
                  aria-roledescription="Number field"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div className="flex justify-end items-center gap-x-1.5">
                <button
                  type="button"
                  className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  onClick={handleDecrement}
                  aria-label="Decrease"
                >
                  <LuMinus />
                </button>
                <button
                  type="button"
                  className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
                  onClick={handleIncrement}
                  aria-label="Increase"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              className={`bg-[#f0686a] text-white py-2 rounded-lg w-[100px] text-center flex justify-center items-center text-xl hover:border-[#f0686a] border-[1px] hover:text-[#f0686a] hover:bg-white font-semibold transition-transform ${isShaking ? "animate-wiggle" : ""
                }`}
              onClick={() => handleAddToWishlist(productDetails.id)}
            >
              {wishlist ? <FaHeart /> : <FaRegHeart />}
            </button>
            <button onClick={() => handleCart(productDetails.id)} className="w-full border-[1px] border-[#f0686a] text-[#f0686a] hover:bg-[#f0686a] hover:text-white py-2 rounded-lg font-semibold">ADD TO CART</button>
          </div>

          <div className="mt-6">
            <button onClick={() => handleDirectBuy(productDetails.id)} className="w-full bg-[#f0686a] text-white py-2 rounded-lg hover:border-[#f0686a] border-[1px] hover:text-[#f0686a] hover:bg-white font-semibold">Buy it now</button>
          </div>


        </div>
      </div>
    </div>
  );
}
