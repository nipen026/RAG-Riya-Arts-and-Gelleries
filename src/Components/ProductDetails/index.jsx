import { useEffect, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ADD_TO_CART, ADD_TO_WISHLIST, DELETE_WISHLIST, GET_PRODUCT_DETAILS, ORDER_PLACED } from "../../api/api";
import { FaRegHeart, FaStar } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { LuMinus } from "react-icons/lu";
import Slider from "react-slick";
import { Helmet } from "react-helmet-async";
import ProductCard from "../../Common/ProductCard";


export default function ProductDetails({ productDetailsData }) {
  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [customText, setCustomText] = useState("");
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [images, setImages] = useState([]);
  const [error, setError] = useState({ image: '', url: '' });
  const [allProductData, setAllproductData] = useState([])
  let slider1, slider2;
  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  }, []);
  const [productDetails, setProductDetails] = useState();
  const [selectImage, setSelectImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [base64String, setBase64String] = useState("");

  localStorage.setItem('productId', productDetails?.id)
  useEffect(() => {
    if (productDetails) {
      const newImages = [productDetails?.image]; // Start with main image
      if (productDetails?.images) {
        newImages.push(...productDetails.images.map(f => f.image)); // Add additional images
      }
      setImages(newImages); // Update state
    }
  }, [productDetails]);

  useEffect(() => {
    document.title = `${productDetails?.name} | Buy Now - Rag Riya Arts and Gifts`;
  }, [productDetails?.name]);


  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };
  useEffect(() => {
    if (productDetailsData) {
      setProductDetails(productDetailsData);
    }
  }, [productDetailsData]);

  const handleMainImageUpload = (event) => {
    const file = event.target.file[0]
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBase64String(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error converting file:", error);
      };
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
      return;
    }

    // Validate URL and image if required
    if (productDetails?.is_url) {
      if (!customText.trim()) {
        setError(prev => ({ ...prev, url: "Spotify URL is required." }));
        return;
      }

    } else {
      if (productDetails?.is_image) {
        if (!selectImage) {
          setError(prev => ({ ...prev, image: "Image is required." }));
          return;
        }
      }
    }

    setError({ image: '', url: '' }); // Clear previous errors

    const data = {
      product_id: id,
      quantity: quantity,
      url: customText || '',
      image: base64String || ''
    };

    ADD_TO_CART(data)
      .then((res) => {
        navigate('/cart');
      })
      .catch((err) => {
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
      product_id: id,
      quantity: quantity,
      url: customText || '',
      image: base64String || null
    });
    ORDER_PLACED({items})
      .then((res) => {
        if (res.status === true) {
          navigate("/checkout");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleAddToWishlist = (id) => {
    const access_token = localStorage.getItem('access-token-user');
    if (!access_token) {
        navigate('/login')
    }
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
  useEffect(() => {
    getAllProducts();
  }, [])

  const getAllProducts = () => {
    GET_PRODUCT_DETAILS().then((res) => {
      console.log(res);
      const fetchdata = res.data.data;
      const filterData = fetchdata.filter(
        (obj) => obj.product_type_detail.id == productDetailsData.product_type_detail.id
      ).slice(0, 4);
      console.log(filterData);

      setAllproductData(filterData);
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <Helmet>

        <meta name="description" content={productDetails?.description || "Discover unique handcrafted gifts at Rag Riya Arts and Gifts."} />
        <meta name="keywords" content={productDetails?.name ? `${productDetails.name}, handmade gifts, personalized gifts` : "unique gifts, handmade gifts"} />
        <meta name="author" content="Rag Riya Arts and Gifts" />

        {/* Open Graph (for Facebook, LinkedIn) */}
        <meta property="og:title" content={productDetails?.name ? `${productDetails.name} | Rag Riya Arts and Gifts` : "Rag Riya Arts and Gifts"} />
        <meta property="og:description" content={productDetails?.description || "Find beautiful handcrafted gifts for every occasion."} />
        <meta property="og:image" content={productDetails?.image} />
        <meta property="og:url" content={`https://riyaartsandgifts.in/product-details/${productDetails?.id || ""}`} />
        <meta property="og:type" content="product" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={productDetails?.name ? `${productDetails.name} | Rag Riya Arts and Gifts` : "Rag Riya Arts and Gifts"} />
        <meta name="twitter:description" content={productDetails?.description || "Discover personalized gifts for every occasion."} />
        <meta name="twitter:image" content={productDetails?.image || `${productDetails?.image}`} />

        {/* Canonical URL */}
        <link rel="canonical" href={`https://riyaartsandgifts.in/product-details/${productDetails?.id || ""}`} />
      </Helmet>


      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {productDetailsData?.images?.length  == 0 ?
          <div>
            <img src={productDetails?.image} alt={productDetails?.name}/>
          </div> :
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
}
          <div>
            <h1 className="text-2xl font-semibold">{productDetails?.name}</h1>
            <p className="text-lg text-gray-600">Rs. {productDetails?.price}.00</p>
            <div className="flex gap-1   items-center my-2">
              {[...Array(productDetails?.average_rating)].map((_, i) => (
                <FaStar key={i} size={20} className="text-[#f0686a]" />
              ))}
              {/* <p className="text-lg ml-5">{(productDetails?.average_rating)}</p> */}
            </div>
            {productDetails?.status == 'OUT_OF_STOCKS' ? <span className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded">Sold Out</span> : ''}
            <div className="description-text">
              <div dangerouslySetInnerHTML={{ __html: productDetails?.description }} />
            </div>
            {productDetails?.is_url && (
              <div className="my-4">
                <label className={error.url ? "block text-sm mb-1 font-medium text-red-500" : "block text-sm mb-1 font-medium text-gray-700"}>Spotify URL<sup className="text-md text-red-500">*</sup></label>
                <input
                  type="text"
                  placeholder="Spotify URL"
                  onChange={(e) => setCustomText(e.target.value)}
                  className={error.url ? "w-full border border-red-500 p-2 rounded-lg" : "w-full border p-2 rounded-lg"}
                />
                <p className="text-sm text-gray-400">If the quantity is more than one, multiple URLs can be added using a comma (',').</p>
              </div>
            )}

            {productDetails?.is_image && (
              <div className="my-4">
                <label className="block text-sm mb-1 font-medium text-gray-700">Upload Image</label>
                <input
                  type="file"
                  onChange={(e) => handleMainImageUpload(e)}
                  className="w-full border p-2 rounded-lg"
                />
                {error.image && <p className="text-red-500 text-sm">{error.image}</p>}
              </div>
            )}

            <div className="py-2 px-3 bg-white border border-gray-200 rounded-lg dark:bg-neutral-900 dark:border-neutral-700">
              <div className="w-full flex justify-between items-center gap-x-5">
                <div className="grow">
                  <span className="block text-xs text-gray-500 dark:text-neutral-400">
                    Select quantity
                  </span>
                  <input
                    className="w-full outline-none p-0 bg-transparent border-0 text-gray-800 focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none dark:text-white"
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

        <div className="mt-4">
          <p className="text-[20px] font-semibold">Related Searches</p>
        </div>
        <div className="my-4 mt-[40px]">
          <ProductCard productData={allProductData} />
        </div>

        {productDetails?.reviews?.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Reviews</h3>
            {productDetails?.reviews?.map((rev, index) => (
              <div key={index} className="p-4 border-b">
                <p className="text-gray-700 mb-2">{rev.review_text}</p>
                <div className="flex items-center gap-2">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} size={20} className="text-[#f0686a]" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
      
    </>
  );
}
