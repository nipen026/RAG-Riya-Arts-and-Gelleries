import React, { useEffect, useState } from "react";
import { APPLY_COUPON, GET_ALL_ORDER, ORDER_PAYMENT_TOKEN, VERIFY_PAYMENT_TOKEN } from "../../api/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [productData, setProductData] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});
  const [orderId, setOrderId] = useState();
  const [razorpayId, setRazorPayId] = useState();
  const [razorpayResponse, setRazorPayResponse] = useState()
  const [coupon, setCoupon] = useState();
  const [cod, setCod] = useState();
  const [price, setPrice] = useState()
  useEffect(() => {
    getOrderDetails();
  }, []);
  const navigate = useNavigate()
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };
  const getOrderDetails = () => {
    GET_ALL_ORDER()
      .then((res) => {
        setOrderId(res.data[0].id)
        setProductData(res.data[0].items);
        setPrice(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Enter a valid email.";
    }

    if (!formData.name) tempErrors.name = "First name is required.";
    if (!formData.address) tempErrors.address = "Address is required.";
    if (!formData.city) tempErrors.city = "City is required.";
    if (!formData.state) tempErrors.state = "State is required.";

    if (!formData.pincode) {
      tempErrors.pincode = "PIN code is required.";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      tempErrors.pincode = "Enter a valid 6-digit PIN code.";
    }

    if (!formData.phone_number) {
      tempErrors.phone_number = "phone_number number is required.";
    } else if (!/^\d{10}$/.test(formData.phone_number)) {
      tempErrors.phone_number = "Enter a valid 10-digit phone number.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      const formDataObject = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataObject.append(key, formData[key]);
      });


      try {
        const res = await ORDER_PAYMENT_TOKEN(orderId, formDataObject);
        setRazorPayId(res.razorpay_order_id);

        if (res.razorpay_order_id) {
          const razorpayLoaded = await loadRazorpay();
          if (!razorpayLoaded) {
            return;
          }
        }
        handlePayment(res.razorpay_order_id, res.amount);
      } catch (err) {
        console.log("Order API Error:", err);
      }
    } else {
      console.log("Validation Failed");
    }
  };

  const handlePayment = async (razorpay_order_id, amount) => {
    const isLoaded = await loadRazorpay(); // Ensure Razorpay is loaded

    if (!isLoaded) {
      alert("Failed to load Razorpay. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_OQTPNvPZpoAUvm", // Replace with your actual Razorpay Key ID
      amount: amount, // Convert INR to paise
      currency: "INR",
      name: "RAG Enterprise",
      description: "Order Payment",
      order_id: razorpay_order_id,
      handler: async function (response) {

        setRazorPayResponse(response)
        const verifyData = {
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id,
          razorpay_signature: response.razorpay_signature,
        };

        try {
          const verifyRes = await VERIFY_PAYMENT_TOKEN(verifyData);
          if (verifyRes.status == true) {
            navigate('/myorder')
          }
        } catch (err) {
          console.error("Payment Verification Error:", err);
        }
      },
      prefill: {
        name: "RAG Enterprise",
        email: "info.riyaartsandgalleries@gmail.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handleChangeCoupon = (e) => {
    const formdataobj = new FormData();
    formdataobj.append('coupon_code', coupon)
    APPLY_COUPON(orderId, formdataobj).then((res) => {
      console.log(res);
      getOrderDetails()
    }).catch((err) => {
      console.log(err);

    });
  }
  return (
    <>
      {productData.length == 0 ?
        <div className="flex flex-col items-center">
          <img
            src="/assets/images/empty-order.png"
            alt="Empty Cart"
            className="w-[400px] h-[400px] object-contain"
          />
          <p className="text-gray-500 mt-4">Your Cart is empty.</p>
        </div> :
        <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
          <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row">
            {/* Left Section - Form */}
            <div className="w-full md:w-2/3 pr-6">
              <h1 className="text-2xl font-bold mb-6">Checkout</h1>
              {/* <h2 className="text-xl font-semibold mt-4 mb-2">Coupon Code</h2> */}
              <div className="mb-4 flex gap-10">
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg"
                  name="coupon"
                  placeholder="Enter Coupon Code"
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  onClick={() => handleChangeCoupon()}
                  className="w-[250px] bg-[#f0686a] hover:bg-white hover:border-[#f0686a] transition-all ease-linear hover:text-[#f0686a] border-2 text-white px-6 py-2 rounded-lg "
                >
                  Apply Coupon
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter your email"
                    onChange={handleChange}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <h2 className="text-xl font-semibold mt-4 mb-2">Delivery</h2>
                <div className="gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      className="p-2 border rounded-lg w-full"
                      name="name"
                      placeholder="Enter Your Name"
                      onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                  </div>
                </div>

                <input
                  type="text"
                  className="w-full p-2 border rounded-lg mb-4"
                  name="address"
                  placeholder="Address"
                  onChange={handleChange}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      className="p-2 border rounded-lg w-full"
                      name="city"
                      placeholder="City"
                      onChange={handleChange}
                    />
                    {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      className="p-2 border rounded-lg w-full"
                      name="state"
                      placeholder="State"
                      onChange={handleChange}
                    />
                    {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                  </div>
                  <div>
                    <input
                      type="text"
                      className="p-2 border rounded-lg w-full"
                      name="pincode"
                      placeholder="PIN Code"
                      onChange={handleChange}
                    />
                    {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode}</p>}
                  </div>
                </div>

                <input
                  type="text"
                  className="w-full p-2 border rounded-lg mb-4"
                  name="phone_number"
                  placeholder="Phone number"
                  onChange={handleChange}
                />
                {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}



                <h2 className="text-xl font-semibold mt-4 mb-2">Payment</h2>
                <div className="p-4 border rounded-lg bg-gray-100 mb-4">
                  <p className="text-gray-700">All transactions are secure and encrypted.</p>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="radio" name="payment" checked className="w-5 h-5" readOnly />
                    <span>UPI, Cards, Wallets, NetBanking</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#f0686a] text-white px-6 py-2 rounded-lg hover:bg-[#f0686a]"
                >
                  Pay now
                </button>
              </form>

            </div>

            {/* Right Section - Order Summary */}
            <div className="w-full md:w-1/3 border-l pl-6 mt-6 md:mt-0">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

              {productData?.map((item) => (
                <div key={item.id} className="flex items-center justify-between mb-4">
                  <img
                    src={`${item?.product?.image}`}
                    alt={item?.product?.name}
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <div>
                    <p className="font-bold">{item?.product?.name}</p>
                    <p className="text-gray-500">Rs. {item?.product?.price}</p>
                  </div>
                  <p className="text-gray-700">x {item.quantity}</p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4">
                <p className="flex justify-between items-center my-4 text-lg font-semibold">Total: <span>Rs. {price?.map((item) => item.final_price ? Math.round(item.final_price + item.discount_amount) : item.total_price)}</span></p>
                {price?.map((item, index) => {
                  return (
                    <>
                      {item.discount_amount !== 0 ?
                        <p key={index} className="flex justify-between items-center my-4 text-md text-gray-500 font-semibold">Discount:<span> - Rs.{Math.round(item.discount_amount)}</span></p>
                        : ''}</>
                  )
                })}
                <p className="flex justify-between items-center my-4 text-lg font-semibold mt-2">Delivery Charges: <span>  Rs. 60</span></p>
                <hr />
                <p className="flex justify-between items-center my-4 text-lg font-bold mt-2">Grand Total: Rs. <span>  Rs.  {price?.map((item) => item.final_price == 0 ? Math.round(item.total_price + 60) : Math.round(item.final_price + 60))}</span></p>
              </div>
            </div>
          </div>
        </div>

      }
    </>
  );
};

export default Checkout;
